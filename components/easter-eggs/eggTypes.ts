import { EGG_TOTAL, type EggId } from './eggManifest'

export type EggRarity = 'TRAINING' | 'RARE' | 'EPIC' | 'LEGENDARY'
export type EggStat = readonly [label: string, value: number]

/** What the server returns for one card. Nothing here ships until an egg is found. */
export type EggContent = {
  id: EggId
  number: number
  counted: boolean
  title: string
  codename: string
  rarity: EggRarity
  flavor: string
  howFound: string
  stats: readonly [EggStat, EggStat, EggStat]
  theme: { sky: readonly string[]; accent: string }
}

export type EggHint = { id: EggId; hint: string }

export const rarityColors: Record<EggRarity, string> = {
  TRAINING: '#9be7ff',
  RARE: '#68c44a',
  EPIC: '#ff5f6d',
  LEGENDARY: '#f4c63f',
}

export const rarityStars: Record<EggRarity, number> = { TRAINING: 1, RARE: 2, EPIC: 3, LEGENDARY: 4 }

export const eggLabel = (egg: Pick<EggContent, 'number' | 'counted'>) => egg.counted
  ? `SECRET ${String(egg.number).padStart(2, '0')}/${String(EGG_TOTAL).padStart(2, '0')}`
  : 'TRAINING 00'
