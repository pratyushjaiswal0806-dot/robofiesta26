'use client'

import type { EggId } from './eggManifest'

export type EggRecord = { foundAt: string; serial: string }
export type EggCollection = Partial<Record<EggId, EggRecord>>

const STORAGE_KEY = 'robofiesta-cards'
export const OPEN_VAULT_EVENT = 'robofiesta:vault'

const listeners = new Set<() => void>()
const emptyCollection: EggCollection = {}
let cache: EggCollection | null = null

function read(): EggCollection {
  if (cache) return cache
  try {
    const parsed: unknown = JSON.parse(window.localStorage.getItem(STORAGE_KEY) ?? '{}')
    cache = parsed && typeof parsed === 'object' ? parsed as EggCollection : {}
  } catch {
    cache = {}
  }
  return cache
}

function write(next: EggCollection) {
  cache = next
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next))
  } catch {
    /* Eggs still work for this visit when storage is unavailable. */
  }
  listeners.forEach((listener) => listener())
}

export function subscribeEggs(listener: () => void) {
  listeners.add(listener)
  const handleStorage = (event: StorageEvent) => {
    if (event.key !== STORAGE_KEY) return
    cache = null
    listener()
  }
  window.addEventListener('storage', handleStorage)
  return () => {
    listeners.delete(listener)
    window.removeEventListener('storage', handleStorage)
  }
}

export const getEggSnapshot = () => read()
export const getEggServerSnapshot = () => emptyCollection

function makeSerial(number: number) {
  const alphabet = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789'
  const values = new Uint8Array(4)
  window.crypto.getRandomValues(values)
  const code = Array.from(values, (value) => alphabet[value % alphabet.length]).join('')
  return `RF26-${String(number).padStart(2, '0')}-${code}`
}

/** Records a discovery and returns its record plus whether it was new. */
export function collectEgg(id: EggId, number: number): { record: EggRecord; isNew: boolean } {
  const current = read()
  const existing = current[id]
  if (existing) return { record: existing, isNew: false }
  const record = { foundAt: new Date().toISOString(), serial: makeSerial(number) }
  write({ ...current, [id]: record })
  return { record, isNew: true }
}

export function resetEggs() {
  write({})
}

export function openEggVault() {
  window.dispatchEvent(new Event(OPEN_VAULT_EVENT))
}
