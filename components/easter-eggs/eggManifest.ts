/**
 * The only egg knowledge shipped to every visitor: opaque ids and how to
 * trigger them. Card text, hints, and stats live on the server (lib/eggContent.ts)
 * and are only fetched after a trigger fires.
 */
export type EggId = 's0' | 's1' | 's2' | 's3' | 's4' | 's5'

export type EggTrigger =
  | { kind: 'tap'; selector: string; taps: number }
  | { kind: 'phrase'; scope: string; phrase: string; taps: number }
  | { kind: 'konami' }

export type EggManifestEntry = { id: EggId; number: number; counted: boolean; trigger: EggTrigger }

export const eggManifest: readonly EggManifestEntry[] = [
  { id: 's0', number: 0, counted: false, trigger: { kind: 'tap', selector: '.mascot-float', taps: 3 } },
  { id: 's1', number: 1, counted: true, trigger: { kind: 'tap', selector: '.pixel-moon', taps: 5 } },
  { id: 's2', number: 2, counted: true, trigger: { kind: 'tap', selector: '.buried-gear', taps: 3 } },
  { id: 's3', number: 3, counted: true, trigger: { kind: 'konami' } },
  { id: 's4', number: 4, counted: true, trigger: { kind: 'tap', selector: '.lost-blip', taps: 1 } },
  { id: 's5', number: 5, counted: true, trigger: { kind: 'phrase', scope: '.credits > p', phrase: 'zip ties', taps: 3 } },
]

export const countedIds = eggManifest.filter((egg) => egg.counted).map((egg) => egg.id)
export const EGG_TOTAL = countedIds.length
export const getManifestEntry = (id: string) => eggManifest.find((egg) => egg.id === id)
