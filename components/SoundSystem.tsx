'use client'

import { createContext, ReactNode, useCallback, useContext, useEffect, useState } from 'react'

type SoundContextValue = { enabled: boolean; toggle: () => void; trackTitle: string }

const SoundContext = createContext<SoundContextValue>({ enabled: true, toggle: () => undefined, trackTitle: 'Soundtrack' })
const SOUND_STORAGE_KEY = 'robofiesta-sound-enabled'

// No audio is generated or played yet. The on/off state is kept (and synced across tabs)
// so MP3 playback can be added here later: start/pause an <audio> element when `enabled` changes.
export function SoundProvider({ children }: { children: ReactNode }) {
  const [enabled, setEnabled] = useState(true)

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

  return <SoundContext.Provider value={{ enabled, toggle, trackTitle: 'Soundtrack' }}>{children}</SoundContext.Provider>
}

export const useSound = () => useContext(SoundContext)
