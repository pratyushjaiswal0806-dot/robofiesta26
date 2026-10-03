'use client'

import { useCallback, useEffect, useRef, useState, useSyncExternalStore } from 'react'
import dynamic from 'next/dynamic'
import { usePathname } from 'next/navigation'
import { eggManifest, getManifestEntry, type EggId, type EggManifestEntry } from './eggManifest'
import type { EggContent } from './eggTypes'
import { fetchEggs } from './eggClient'
import { useSound } from '@/components/SoundSystem'
import type { RevealSource } from './EggReveal'
import { playEggPoke, playEggUnlock } from './eggSounds'
import { OPEN_VAULT_EVENT, collectEgg, getEggServerSnapshot, getEggSnapshot, resetEggs, subscribeEggs } from './eggStore'

// The card UI and canvas renderer only download once someone actually finds an egg.
const EggReveal = dynamic(() => import('./EggReveal').then((module) => module.EggReveal), { ssr: false })
const EggVault = dynamic(() => import('./EggVault').then((module) => module.EggVault), { ssr: false })

const KONAMI_KEYS = ['arrowup', 'arrowup', 'arrowdown', 'arrowdown', 'arrowleft', 'arrowright', 'arrowleft', 'arrowright', 'b', 'a']
const KONAMI_TOUCH = [...KONAMI_KEYS.slice(0, 8), 'tap', 'tap']
const TAP_WINDOW_MS = 1600

type Reveal = { egg: EggContent; isNew: boolean; source: RevealSource }

const endsWith = (buffer: string[], sequence: string[]) => buffer.length >= sequence.length && sequence.every((key, index) => buffer[buffer.length - sequence.length + index] === key)

/** True when a click lands on the rendered glyphs of `phrase` inside an element matching `scope`. */
function clickedPhrase(event: MouseEvent, scope: string, phrase: string) {
  const container = (event.target as Element | null)?.closest(scope)
  if (!container) return false
  const walker = document.createTreeWalker(container, NodeFilter.SHOW_TEXT)
  for (let node = walker.nextNode(); node; node = walker.nextNode()) {
    const start = node.textContent?.indexOf(phrase) ?? -1
    if (start < 0) continue
    const range = document.createRange()
    range.setStart(node, start)
    range.setEnd(node, start + phrase.length)
    return Array.from(range.getClientRects()).some((rect) => event.clientX >= rect.left - 2 && event.clientX <= rect.right + 2 && event.clientY >= rect.top - 2 && event.clientY <= rect.bottom + 2)
  }
  return false
}

const isTypingTarget = (target: EventTarget | null) => target instanceof HTMLElement && (target.isContentEditable || ['INPUT', 'TEXTAREA', 'SELECT'].includes(target.tagName))

/**
 * Listens for the hidden triggers across every route. Triggers match elements the
 * page already renders (no marker attributes), so inspecting the DOM reveals nothing.
 */
export function EasterEggs() {
  const collection = useSyncExternalStore(subscribeEggs, getEggSnapshot, getEggServerSnapshot)
  const { enabled: soundEnabled } = useSound()
  const pathname = usePathname()
  const [reveal, setReveal] = useState<Reveal | null>(null)
  const [vaultOpen, setVaultOpen] = useState(false)
  const busyRef = useRef(false)
  const soundRef = useRef(soundEnabled)
  busyRef.current = Boolean(reveal) || vaultOpen
  soundRef.current = soundEnabled

  const unlock = useCallback(async (entry: EggManifestEntry) => {
    const [egg] = await fetchEggs([entry.id])
    if (!egg) return
    const { isNew } = collectEgg(entry.id, entry.number)
    if (soundRef.current) playEggUnlock()
    setVaultOpen(false)
    setReveal({ egg, isNew, source: 'hunt' })
  }, [])

  useEffect(() => {
    const taps = new Map<string, { count: number; last: number }>()
    const handleClick = (event: MouseEvent) => {
      if (busyRef.current) return
      const target = event.target as Element | null
      if (!target) return
      let hit: { entry: EggManifestEntry; taps: number; element: Element | null } | null = null
      for (const entry of eggManifest) {
        const trigger = entry.trigger
        if (trigger.kind === 'tap') {
          const element = target.closest(trigger.selector)
          if (element) { hit = { entry, taps: trigger.taps, element }; break }
        } else if (trigger.kind === 'phrase' && clickedPhrase(event, trigger.scope, trigger.phrase)) {
          hit = { entry, taps: trigger.taps, element: null }
          break
        }
      }
      if (!hit) return
      const { entry, taps: needed, element } = hit
      const now = performance.now()
      const previous = taps.get(entry.id)
      const count = previous && now - previous.last < TAP_WINDOW_MS ? previous.count + 1 : 1
      taps.set(entry.id, { count, last: now })
      if (element) {
        element.classList.remove('pixel-nudge')
        void (element as HTMLElement).offsetWidth
        element.classList.add('pixel-nudge')
        window.setTimeout(() => element.classList.remove('pixel-nudge'), 420)
      }
      if (count < needed) {
        if (soundRef.current) playEggPoke(count)
        return
      }
      taps.delete(entry.id)
      void unlock(entry)
    }
    document.addEventListener('click', handleClick)
    return () => document.removeEventListener('click', handleClick)
  }, [unlock])

  useEffect(() => {
    const konami = getManifestEntry('s3')
    if (!konami) return
    const keys: string[] = []
    const gestures: string[] = []
    let touchStart: { x: number; y: number; time: number } | null = null

    const push = (buffer: string[], token: string, sequence: string[]) => {
      buffer.push(token)
      if (buffer.length > sequence.length) buffer.shift()
      if (!busyRef.current && endsWith(buffer, sequence)) {
        buffer.length = 0
        void unlock(konami)
      }
    }
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.metaKey || event.ctrlKey || event.altKey || isTypingTarget(event.target)) return
      push(keys, event.key.toLowerCase(), KONAMI_KEYS)
    }
    const handleTouchStart = (event: TouchEvent) => {
      const touch = event.touches[0]
      touchStart = event.touches.length === 1 && touch ? { x: touch.clientX, y: touch.clientY, time: performance.now() } : null
    }
    const handleTouchEnd = (event: TouchEvent) => {
      const touch = event.changedTouches[0]
      if (!touchStart || !touch) return
      const dx = touch.clientX - touchStart.x
      const dy = touch.clientY - touchStart.y
      const elapsed = performance.now() - touchStart.time
      touchStart = null
      if (Math.max(Math.abs(dx), Math.abs(dy)) < 12 && elapsed < 320) return push(gestures, 'tap', KONAMI_TOUCH)
      if (Math.max(Math.abs(dx), Math.abs(dy)) < 40) return
      const direction = Math.abs(dx) > Math.abs(dy) ? (dx > 0 ? 'arrowright' : 'arrowleft') : (dy > 0 ? 'arrowdown' : 'arrowup')
      push(gestures, direction, KONAMI_TOUCH)
    }
    document.addEventListener('keydown', handleKeyDown)
    document.addEventListener('touchstart', handleTouchStart, { passive: true })
    document.addEventListener('touchend', handleTouchEnd, { passive: true })
    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      document.removeEventListener('touchstart', handleTouchStart)
      document.removeEventListener('touchend', handleTouchEnd)
    }
  }, [unlock])

  useEffect(() => {
    const openVault = () => {
      setReveal(null)
      setVaultOpen(true)
    }
    window.addEventListener(OPEN_VAULT_EVENT, openVault)
    return () => window.removeEventListener(OPEN_VAULT_EVENT, openVault)
  }, [])

  useEffect(() => {
    setReveal(null)
    setVaultOpen(false)
  }, [pathname])

    return <>
    {reveal && <EggReveal
      key={`${reveal.egg.id}-${reveal.source}`}
      egg={reveal.egg}
      record={collection[reveal.egg.id]}
      collection={collection}
      isNew={reveal.isNew}
      source={reveal.source}
      onClose={() => setReveal(null)}
      onOpenVault={() => { setReveal(null); setVaultOpen(true) }}
    />}
    {vaultOpen && <EggVault
      collection={collection}
      onClose={() => setVaultOpen(false)}
      onSelect={(egg) => { setVaultOpen(false); setReveal({ egg, isNew: false, source: 'vault' }) }}
      onReset={resetEggs}
    />}
  </>
}
