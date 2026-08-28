'use client'

import { createContext, ReactNode, useCallback, useContext, useEffect, useRef, useState } from 'react'
import { MotionConfig } from 'framer-motion'

type SoundContextValue = { enabled: boolean; toggle: () => void }
const SoundContext = createContext<SoundContextValue>({ enabled: false, toggle: () => undefined })

const melody = [659,784,880,784,659,523,587,659,784,988,880,784,659,587,523,587,659,784,880,1047,988,880,784,659,587,659,523,587,659,784,659,0]

export function SoundProvider({ children }: { children: ReactNode }) {
  const [enabled, setEnabled] = useState(false)
  const contextRef = useRef<AudioContext | null>(null)
  const masterRef = useRef<GainNode | null>(null)
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null)
  const stepRef = useRef(0)
  const enabledRef = useRef(false)

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
    envelope.gain.exponentialRampToValueAtTime(volume, now + .012)
    envelope.gain.exponentialRampToValueAtTime(.0001, now + duration)
    oscillator.connect(envelope).connect(master)
    oscillator.start(now)
    oscillator.stop(now + duration + .02)
  }, [])

  const startEngine = useCallback(() => {
    if (contextRef.current) return
    const context = new AudioContext()
    const master = context.createGain()
    master.gain.value = 0
    master.connect(context.destination)
    contextRef.current = context
    masterRef.current = master
    timerRef.current = setInterval(() => {
      const step = stepRef.current % melody.length
      playTone(melody[step], .105, 'square', .105)
      if (step % 4 === 0) playTone(step % 8 === 0 ? 131 : 165, .28, 'triangle', .16)
      stepRef.current += 1
    }, 142)
  }, [playTone])

  const toggle = useCallback(() => {
    startEngine()
    const context = contextRef.current
    const master = masterRef.current
    if (!context || !master) return
    void context.resume()
    const next = !enabledRef.current
    enabledRef.current = next
    setEnabled(next)
    const now = context.currentTime
    master.gain.cancelScheduledValues(now)
    master.gain.setValueAtTime(master.gain.value, now)
    master.gain.linearRampToValueAtTime(next ? .16 : 0, now + .28)
  }, [startEngine])

  useEffect(() => {
    const handlePointerOver = (event: PointerEvent) => {
      if (!enabledRef.current) return
      const target = event.target as HTMLElement | null
      const control = target?.closest('button, .pixel-button')
      if (!control || control.contains(event.relatedTarget as Node | null)) return
      playTone(1047, .045, 'square', .055)
    }
    const handlePointerDown = (event: PointerEvent) => {
      if (!enabledRef.current || !(event.target as HTMLElement | null)?.closest('button, .pixel-button')) return
      playTone(523, .065, 'square', .075)
    }
    document.addEventListener('pointerover', handlePointerOver)
    document.addEventListener('pointerdown', handlePointerDown)
    return () => {
      document.removeEventListener('pointerover', handlePointerOver)
      document.removeEventListener('pointerdown', handlePointerDown)
      if (timerRef.current) clearInterval(timerRef.current)
      void contextRef.current?.close()
    }
  }, [playTone])

  return <MotionConfig reducedMotion="user"><SoundContext.Provider value={{ enabled, toggle }}>{children}</SoundContext.Provider></MotionConfig>
}

export const useSound = () => useContext(SoundContext)
