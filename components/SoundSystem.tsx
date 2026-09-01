'use client'

import { createContext, ReactNode, useCallback, useContext, useEffect, useRef, useState } from 'react'

type SoundContextValue = { enabled: boolean; toggle: () => void }
type ChipNote = readonly [frequency: number, beats: number, bass?: number]

const SoundContext = createContext<SoundContextValue>({ enabled: true, toggle: () => undefined })

const pitch = {
  G2: 98, A2: 110, C3: 130.81, E3: 164.81,
  C4: 261.63, E4: 329.63, F4: 349.23, G4: 392, GS4: 415.3, A4: 440, B4: 493.88,
  C5: 523.25, D5: 587.33, DS5: 622.25, E5: 659.25, F5: 698.46,
} as const

// A looping pulse-wave arrangement of Beethoven's public-domain Für Elise theme.
// One beat is a sixteenth note; longer values preserve the theme's familiar pauses.
const furElise: ChipNote[] = [
  [pitch.E5,1],[pitch.DS5,1],[pitch.E5,1],[pitch.DS5,1],[pitch.E5,1],[pitch.B4,1],[pitch.D5,1],[pitch.C5,1],[pitch.A4,3,pitch.A2],[0,1],
  [pitch.C4,1,pitch.A2],[pitch.E4,1],[pitch.A4,1],[pitch.B4,3,pitch.E3],[0,1],[pitch.E4,1,pitch.E3],[pitch.GS4,1],[pitch.B4,1],[pitch.C5,3,pitch.A2],[0,2],
  [pitch.E5,1],[pitch.DS5,1],[pitch.E5,1],[pitch.DS5,1],[pitch.E5,1],[pitch.B4,1],[pitch.D5,1],[pitch.C5,1],[pitch.A4,3,pitch.A2],[0,1],
  [pitch.C4,1,pitch.A2],[pitch.E4,1],[pitch.A4,1],[pitch.B4,3,pitch.E3],[0,1],[pitch.E4,1,pitch.E3],[pitch.C5,1],[pitch.B4,1],[pitch.A4,4,pitch.A2],[0,2],
  [pitch.B4,1,pitch.E3],[pitch.C5,1],[pitch.D5,1],[pitch.E5,3,pitch.C3],[0,1],[pitch.G4,1,pitch.G2],[pitch.F5,1],[pitch.E5,1],[pitch.D5,3,pitch.G2],[0,1],
  [pitch.F4,1,pitch.A2],[pitch.E5,1],[pitch.D5,1],[pitch.C5,3,pitch.A2],[0,1],[pitch.E4,1,pitch.E3],[pitch.D5,1],[pitch.C5,1],[pitch.B4,3,pitch.E3],[0,2],
  [pitch.E5,1],[pitch.DS5,1],[pitch.E5,1],[pitch.DS5,1],[pitch.E5,1],[pitch.B4,1],[pitch.D5,1],[pitch.C5,1],[pitch.A4,3,pitch.A2],[0,1],
  [pitch.C4,1,pitch.A2],[pitch.E4,1],[pitch.A4,1],[pitch.B4,3,pitch.E3],[0,1],[pitch.E4,1,pitch.E3],[pitch.C5,1],[pitch.B4,1],[pitch.A4,5,pitch.A2],[0,4],
]

const STEP_MS = 138

export function SoundProvider({ children }: { children: ReactNode }) {
  const [enabled, setEnabled] = useState(true)
  const contextRef = useRef<AudioContext | null>(null)
  const masterRef = useRef<GainNode | null>(null)
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const stepRef = useRef(0)
  const enabledRef = useRef(true)
  const sequenceStartedRef = useRef(false)

  const playTone = useCallback((frequency: number, duration = .12, type: OscillatorType = 'square', volume = .12) => {
    const context = contextRef.current
    const master = masterRef.current
    if (!context || !master || !frequency) return
    const oscillator = context.createOscillator()
    const envelope = context.createGain()
    const now = context.currentTime
    oscillator.type = type
    oscillator.frequency.setValueAtTime(frequency, now)
    envelope.gain.setValueAtTime(.0001, now)
    envelope.gain.exponentialRampToValueAtTime(volume, now + .01)
    envelope.gain.setValueAtTime(volume * .82, Math.max(now + .011, now + duration * .68))
    envelope.gain.exponentialRampToValueAtTime(.0001, now + duration)
    oscillator.connect(envelope).connect(master)
    oscillator.start(now)
    oscillator.stop(now + duration + .02)
  }, [])

  const startEngine = useCallback(() => {
    if (contextRef.current) return contextRef.current
    const context = new AudioContext()
    const master = context.createGain()
    master.gain.value = .12
    master.connect(context.destination)
    contextRef.current = context
    masterRef.current = master

    const playNext = () => {
      const [frequency, beats, bass] = furElise[stepRef.current % furElise.length]
      const duration = beats * STEP_MS / 1000
      playTone(frequency, Math.max(.07, duration * .82), 'square', .16)
      if (bass) playTone(bass, Math.max(.18, duration * .94), 'triangle', .2)
      stepRef.current += 1
      timerRef.current = setTimeout(playNext, beats * STEP_MS)
    }
    const beginSequence = () => {
      if (sequenceStartedRef.current || context.state !== 'running') return
      sequenceStartedRef.current = true
      playNext()
    }
    context.onstatechange = beginSequence
    beginSequence()
    return context
  }, [playTone])

  const toggle = useCallback(() => {
    const context = startEngine()
    const master = masterRef.current
    if (!context || !master) return
    const next = !enabledRef.current
    enabledRef.current = next
    setEnabled(next)
    if (next) void context.resume().catch(()=>undefined)
    const now = context.currentTime
    master.gain.cancelScheduledValues(now)
    master.gain.setValueAtTime(master.gain.value, now)
    master.gain.linearRampToValueAtTime(next ? .12 : 0, now + .22)
  }, [startEngine])

  useEffect(() => {
    const context = startEngine()
    void context.resume().catch(()=>undefined)
    const unlockAudio = () => {
      const current = contextRef.current
      if (enabledRef.current && current?.state === 'suspended') void current.resume().catch(()=>undefined)
    }
    const handlePointerOver = (event: PointerEvent) => {
      if (!enabledRef.current) return
      const target = event.target as HTMLElement | null
      const control = target?.closest('button, .pixel-button')
      if (!control || control.contains(event.relatedTarget as Node | null)) return
      playTone(1047, .045, 'square', .045)
    }
    const handlePointerDown = (event: PointerEvent) => {
      if (!enabledRef.current || !(event.target as HTMLElement | null)?.closest('button, .pixel-button')) return
      playTone(523, .065, 'square', .06)
    }
    document.addEventListener('pointerover', handlePointerOver)
    document.addEventListener('pointerdown', unlockAudio)
    document.addEventListener('pointerdown', handlePointerDown)
    document.addEventListener('keydown', unlockAudio)
    return () => {
      document.removeEventListener('pointerover', handlePointerOver)
      document.removeEventListener('pointerdown', unlockAudio)
      document.removeEventListener('pointerdown', handlePointerDown)
      document.removeEventListener('keydown', unlockAudio)
      if (timerRef.current) clearTimeout(timerRef.current)
      timerRef.current = null
      sequenceStartedRef.current = false
      contextRef.current = null
      masterRef.current = null
      void context?.close()
    }
  }, [playTone, startEngine])

  return <SoundContext.Provider value={{ enabled, toggle }}>{children}</SoundContext.Provider>
}

export const useSound = () => useContext(SoundContext)
