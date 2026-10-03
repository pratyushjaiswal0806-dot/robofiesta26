'use client'

import { createContext, ReactNode, useCallback, useContext, useEffect, useRef, useState } from 'react'

type SoundContextValue = { enabled: boolean; toggle: () => void; trackTitle: string; playCardSong: () => void; stopCardSong: () => void }

const SoundContext = createContext<SoundContextValue>({ enabled: true, toggle: () => undefined, trackTitle: 'Soundtrack', playCardSong: () => undefined, stopCardSong: () => undefined })
const SOUND_STORAGE_KEY = 'robofiesta-sound-enabled'
const TRACKS = [1, 2, 3, 4, 5, 6].map((number) => ({ src: `/audio/track-${number}.mp3`, title: `Track ${number}` }))
const CARD_SONG = '/audio/card.mp3'

// Tracks 1-6 play in order on a loop once the visitor first interacts (browsers block earlier autoplay).
// The card song plays whenever an easter egg is discovered, pausing the soundtrack until it ends.
export function SoundProvider({ children }: { children: ReactNode }) {
  const [enabled, setEnabled] = useState(true)
  const [trackIndex, setTrackIndex] = useState(0)
  const [unlocked, setUnlocked] = useState(false)
  const musicRef = useRef<HTMLAudioElement | null>(null)
  const cardRef = useRef<HTMLAudioElement | null>(null)
  const enabledRef = useRef(enabled)
  enabledRef.current = enabled

  const toggle = useCallback(() => {
    setEnabled((current) => {
      const next = !current
      try {
        window.localStorage.setItem(SOUND_STORAGE_KEY, next ? '1' : '0')
      } catch {
        /* The toggle still works when storage is unavailable. */
      }
      return next
    })
  }, [])

  const playCardSong = useCallback(() => {
    const card = cardRef.current
    if (!card || !enabledRef.current) return
    musicRef.current?.pause()
    card.currentTime = 0
    void card.play().catch(() => musicRef.current?.play().catch(() => undefined))
  }, [])

  const stopCardSong = useCallback(() => {
    const card = cardRef.current
    if (!card || card.paused) return
    card.pause()
    if (enabledRef.current) void musicRef.current?.play().catch(() => undefined)
  }, [])

  useEffect(() => {
    try {
      if (window.localStorage.getItem(SOUND_STORAGE_KEY) === '0') setEnabled(false)
    } catch {
      /* Keep the default ON state when storage is unavailable. */
    }
    const handleStorage = (event: StorageEvent) => {
      if (event.key === SOUND_STORAGE_KEY) setEnabled(event.newValue !== '0')
    }
    window.addEventListener('storage', handleStorage)
    return () => window.removeEventListener('storage', handleStorage)
  }, [])

  useEffect(() => {
    const music = new Audio(TRACKS[0].src)
    music.preload = 'none'
    music.volume = .5
    const card = new Audio(CARD_SONG)
    card.preload = 'auto'
    card.addEventListener('ended', () => {
      if (enabledRef.current) void music.play().catch(() => undefined)
    })
    music.addEventListener('ended', () => setTrackIndex((index) => (index + 1) % TRACKS.length))
    musicRef.current = music
    cardRef.current = card
    const unlock = () => setUnlocked(true)
    window.addEventListener('pointerdown', unlock, { once: true })
    window.addEventListener('keydown', unlock, { once: true })
    return () => {
      window.removeEventListener('pointerdown', unlock)
      window.removeEventListener('keydown', unlock)
      music.pause()
      card.pause()
    }
  }, [])

  useEffect(() => {
    const music = musicRef.current
    const card = cardRef.current
    if (!music || !card) return
    const src = new URL(TRACKS[trackIndex].src, window.location.href).href
    if (music.src !== src) music.src = src
    if (enabled && unlocked && card.paused) void music.play().catch(() => undefined)
    else if (!enabled) {
      music.pause()
      card.pause()
    }
  }, [enabled, unlocked, trackIndex])

  return <SoundContext.Provider value={{ enabled, toggle, trackTitle: TRACKS[trackIndex].title, playCardSong, stopCardSong }}>{children}</SoundContext.Provider>
}

export const useSound = () => useContext(SoundContext)
