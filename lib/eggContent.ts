import type { EggId } from '@/components/easter-eggs/eggManifest'
import type { EggContent } from '@/components/easter-eggs/eggTypes'

/** Server-only: imported by app/api/egg/route.ts so none of this reaches the client bundle. */
type EggRecordSource = EggContent & { hint: string }

export const eggSources: readonly EggRecordSource[] = [
  {
    id: 's0',
    number: 0,
    counted: false,
    title: 'HELLO, OPERATOR',
    codename: 'TRAINING EGG',
    rarity: 'TRAINING',
    flavor: 'You poked the mascot and it poked back. Every great hunt starts with one curious click.',
    howFound: 'Tapped the hero robot three times.',
    hint: 'Say hi to the robot on the home screen. It likes a triple tap.',
    stats: [['CURIOSITY', 7], ['STEALTH', 2], ['FRIENDSHIP', 10]],
    theme: { sky: ['#5a1ab4', '#9b31c6', '#ff5f91', '#ff9565', '#fff3bd'], accent: '#9be7ff' },
  },
  {
    id: 's1',
    number: 1,
    counted: true,
    title: 'MOONSHOT',
    codename: 'LUNAR KNOCK',
    rarity: 'RARE',
    flavor: 'Five knocks and the moon finally opened its airlock. Aim high — the arena rewards it.',
    howFound: 'Knocked on the hero moon five times.',
    hint: 'Some say the moon answers if you knock on it enough times.',
    stats: [['ALTITUDE', 10], ['PATIENCE', 8], ['STEALTH', 5]],
    theme: { sky: ['#16083c', '#2a0b4f', '#3d1478', '#5a1ab4'], accent: '#f4c63f' },
  },
  {
    id: 's2',
    number: 2,
    counted: true,
    title: 'DIG SITE',
    codename: 'BURIED GEAR',
    rarity: 'RARE',
    flavor: 'Under the grass, under the dirt: a gear from the very first RoboFiesta bot. Probably.',
    howFound: 'Dug up the gear buried at the bottom of the home page.',
    hint: 'Builders bury their spare parts. Dig at the very bottom of base camp.',
    stats: [['GRIT', 9], ['PATIENCE', 7], ['TORQUE', 8]],
    theme: { sky: ['#9be7ff', '#68c44a', '#57301f', '#3f2218'], accent: '#68c44a' },
  },
  {
    id: 's3',
    number: 3,
    counted: true,
    title: 'CHEAT CODE',
    codename: 'KONAMI PROTOCOL',
    rarity: 'EPIC',
    flavor: 'Thirty extra lives granted. Spend them wisely in the arena — the judges cannot see them.',
    howFound: 'Entered the legendary code: ↑ ↑ ↓ ↓ ← → ← → B A.',
    hint: 'Old-school players already know the code: arrows first, then B and A. On touch, swipe it and tap twice.',
    stats: [['RETRO', 10], ['REFLEX', 9], ['LIVES', 10]],
    theme: { sky: ['#2a0b4f', '#6c2bd9', '#ff5f6d', '#ff8b78'], accent: '#ff5f6d' },
  },
  {
    id: 's4',
    number: 4,
    counted: true,
    title: 'SIGNAL HUNTER',
    codename: 'LOST AND FOUND',
    rarity: 'EPIC',
    flavor: 'You wandered off the map and caught the one blip nobody else noticed. Lost is just a coordinate.',
    howFound: 'Caught the red blip on the 404 radar.',
    hint: 'Get lost. Really lost — visit a page that does not exist, then catch the blip.',
    stats: [['RANGE', 9], ['FOCUS', 10], ['STEALTH', 8]],
    theme: { sky: ['#0d0526', '#16083c', '#123a3a', '#1f6b45'], accent: '#8eff85' },
  },
  {
    id: 's5',
    number: 5,
    counted: true,
    title: 'ZIP TIE LEGEND',
    codename: 'STRUCTURAL INTEGRITY',
    rarity: 'LEGENDARY',
    flavor: 'Holding every robot together since forever. Respect the zip tie and it will respect you.',
    howFound: 'Pulled the zip ties in the credits three times.',
    hint: 'The credits admit to an unreasonable number of something. Pull it three times.',
    stats: [['TENSION', 10], ['LOYALTY', 10], ['CHAOS', 7]],
    theme: { sky: ['#ff9565', '#f4c63f', '#fff0aa', '#fff9e6'], accent: '#f4c63f' },
  },
]

export const getEggSource = (id: string) => eggSources.find((egg) => egg.id === id)
export type { EggId }
