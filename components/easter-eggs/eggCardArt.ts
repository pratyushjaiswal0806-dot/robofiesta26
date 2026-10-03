'use client'

import type { EggId } from './eggManifest'
import { eggLabel, rarityColors, rarityStars, type EggContent } from './eggTypes'
import type { EggRecord } from './eggStore'

export const CARD_WIDTH = 720
export const CARD_HEIGHT = 1008

const INK = '#2a0b4f'
const DEEP = '#18062f'
const PURPLE = '#6c2bd9'
const CREAM = '#fff9e6'
const IVORY = '#fffdf4'
const YELLOW = '#f4c63f'
const CORAL = '#ff5f6d'
const PIXEL_FONT = '"Press Start 2P", monospace'
const BODY_FONT = '"DM Sans", sans-serif'

type Cell = string | null
type Grid = Cell[][]

const emptyGrid = (size: number): Grid => Array.from({ length: size }, () => Array<Cell>(size).fill(null))

/** Wraps every filled pixel in a one-cell ink outline, like the site's hand-built CSS art. */
function outlined(grid: Grid): Grid {
  const out = grid.map((row) => [...row])
  grid.forEach((row, y) => row.forEach((cell, x) => {
    if (cell) return
    const touches = [[0, 1], [1, 0], [0, -1], [-1, 0]].some(([dx, dy]) => grid[y + dy]?.[x + dx])
    if (touches) out[y][x] = INK
  }))
  return out
}

function polar(size: number, cx: number, cy: number, paint: (dx: number, dy: number, r: number, angle: number, x: number, y: number) => Cell): Grid {
  const grid = emptyGrid(size)
  for (let y = 0; y < size; y += 1) for (let x = 0; x < size; x += 1) {
    const dx = x + .5 - cx
    const dy = y + .5 - cy
    grid[y][x] = paint(dx, dy, Math.hypot(dx, dy), Math.atan2(dy, dx), x, y)
  }
  return grid
}

const handPalette: Record<string, string> = {
  k: INK, y: YELLOW, c: '#9be7ff', w: IVORY, r: CORAL, p: PURPLE, P: '#f4dfff', g: '#68c44a',
}

const fromRows = (rows: readonly string[]): Grid => rows.map((row) => Array.from(row, (char) => handPalette[char] ?? null))

const robotSprite = () => fromRows([
  '......kkkk......',
  '......krrk......',
  '......kkkk......',
  '.......kk.......',
  '..kkkkkkkkkkkk..',
  '.kyyyyyyyyyyyyk.',
  '.kykkkkkkkkkkyk.',
  '.kykcccccccckyk.',
  '.kykcwkccwkckyk.',
  '.kykckkcckkckyk.',
  '.kykcccccccckyk.',
  '.kykccrrrrcckyk.',
  '.kykkkkkkkkkkyk.',
  '.kyyyyyyyyyyyyk.',
  '.kyyyyprrpyyyyk.',
  '.kkkkkkkkkkkkkk.',
])

const controllerSprite = () => fromRows([
  '........k.......',
  '........k.......',
  '........k.......',
  '..kkkkkkkkkkkk..',
  '.kwwwwwwwwwwwwk.',
  'kwwkwwwwwwwwgwwk',
  'kwkkkwwwwwwcwrwk',
  'kwwkwwwppwwwywwk',
  'kwwwwwwwwwwwwwwk',
  'kwwwkkkkkkkkwwwk',
  'kwwwk......kwwwk',
  '.kkk........kkk.',
])

const moonSprite = () => {
  const grid = polar(22, 11, 12, (dx, dy, r) => {
    if (r > 8) return null
    const crater = [[-3, -3, 1.7], [2.5, -1.5, 1.3], [-1.5, 3.5, 2.1]].some(([cx, cy, cr]) => Math.hypot(dx - cx, dy - cy) <= cr)
    if (crater) return '#d8b762'
    if (dx + dy > 6) return '#e8c66f'
    return '#fff0aa'
  })
  for (let y = 1; y <= 5; y += 1) grid[y][14] = INK
  for (let x = 15; x <= 17; x += 1) { grid[1][x] = CORAL; grid[2][x] = CORAL }
  return outlined(grid)
}

const gearSprite = () => {
  const grid = polar(22, 11, 11, (dx, dy, r, angle) => {
    const outer = Math.cos(angle * 8) > .2 ? 9.6 : 7.4
    if (r > outer || r < 2.6) return null
    if (Math.abs(r - 5) < .55) return '#5e8a8a'
    if (dx + dy > 3.5) return '#5e8a8a'
    if (dx + dy < -6) return '#d6f1f1'
    return '#9bc5c5'
  })
  ;[[5, 15], [6, 16], [15, 6], [16, 13], [14, 16], [7, 5]].forEach(([x, y]) => { if (grid[y][x]) grid[y][x] = '#57301f' })
  return outlined(grid)
}

const radarSprite = () => {
  const sweep = -Math.PI / 4
  const grid = polar(22, 11, 11, (dx, dy, r, angle) => {
    if (r > 9.6) return null
    if (r > 8.7) return PURPLE
    let delta = sweep - angle
    while (delta < 0) delta += Math.PI * 2
    if (delta < .2) return '#8eff85'
    if (delta < .7) return '#3fbf5f'
    if (Math.abs(r - 6) < .5 || Math.abs(r - 3) < .5 || Math.abs(dx) < .6 || Math.abs(dy) < .6) return '#1f6b45'
    return '#16083c'
  })
  ;[[14, 12], [15, 12], [14, 13], [15, 13]].forEach(([x, y]) => { grid[y][x] = CORAL })
  return outlined(grid)
}

const zipTieSprite = () => {
  const grid = polar(22, 10.5, 9.5, (dx, dy, r, angle) => {
    if (r > 7.6 || r < 5) return null
    return Math.round(angle * 6) % 2 === 0 ? PURPLE : '#9a6cf0'
  })
  for (let y = 15; y <= 18; y += 1) for (let x = 8; x <= 12; x += 1) grid[y][x] = '#9bc5c5'
  grid[16][10] = INK
  grid[17][10] = INK
  for (let x = 13; x <= 19; x += 1) { grid[17][x] = PURPLE; grid[18][x] = x % 2 ? '#9a6cf0' : PURPLE }
  return outlined(grid)
}

const sprites: Record<EggId, () => Grid> = {
  s0: robotSprite,
  s1: moonSprite,
  s2: gearSprite,
  s3: controllerSprite,
  s4: radarSprite,
  s5: zipTieSprite,
}

/** Small deterministic random generator so each card's starfield is stable across renders. */
function seeded(seed: number) {
  let value = seed
  return () => {
    value |= 0
    value = value + 0x6d2b79f5 | 0
    let t = Math.imul(value ^ value >>> 15, 1 | value)
    t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t
    return ((t ^ t >>> 14) >>> 0) / 4294967296
  }
}

/** Rectangle with two-step pixel notches cut from each corner. */
function steppedPath(ctx: CanvasRenderingContext2D, x: number, y: number, w: number, h: number, step: number) {
  const s = step
  ctx.beginPath()
  ctx.moveTo(x + s * 2, y)
  ctx.lineTo(x + w - s * 2, y); ctx.lineTo(x + w - s * 2, y + s); ctx.lineTo(x + w - s, y + s); ctx.lineTo(x + w - s, y + s * 2); ctx.lineTo(x + w, y + s * 2)
  ctx.lineTo(x + w, y + h - s * 2); ctx.lineTo(x + w - s, y + h - s * 2); ctx.lineTo(x + w - s, y + h - s); ctx.lineTo(x + w - s * 2, y + h - s); ctx.lineTo(x + w - s * 2, y + h)
  ctx.lineTo(x + s * 2, y + h); ctx.lineTo(x + s * 2, y + h - s); ctx.lineTo(x + s, y + h - s); ctx.lineTo(x + s, y + h - s * 2); ctx.lineTo(x, y + h - s * 2)
  ctx.lineTo(x, y + s * 2); ctx.lineTo(x + s, y + s * 2); ctx.lineTo(x + s, y + s); ctx.lineTo(x + s * 2, y + s)
  ctx.closePath()
}

function fillStepped(ctx: CanvasRenderingContext2D, x: number, y: number, w: number, h: number, step: number, color: string) {
  steppedPath(ctx, x, y, w, h, step)
  ctx.fillStyle = color
  ctx.fill()
}

function pixelStar(ctx: CanvasRenderingContext2D, x: number, y: number, unit: number, color: string) {
  ctx.fillStyle = color
  ctx.fillRect(x - unit / 2, y - unit * 1.5, unit, unit * 3)
  ctx.fillRect(x - unit * 1.5, y - unit / 2, unit * 3, unit)
}

function text(ctx: CanvasRenderingContext2D, value: string, x: number, y: number, size: number, color: string, align: CanvasTextAlign = 'left', font = PIXEL_FONT, weight = '400') {
  ctx.font = `${weight} ${size}px ${font}`
  ctx.textAlign = align
  ctx.textBaseline = 'middle'
  ctx.fillStyle = color
  ctx.fillText(value, x, y)
}

function wrap(ctx: CanvasRenderingContext2D, value: string, maxWidth: number) {
  const lines: string[] = []
  let line = ''
  value.split(' ').forEach((word) => {
    const attempt = line ? `${line} ${word}` : word
    if (ctx.measureText(attempt).width > maxWidth && line) {
      lines.push(line)
      line = word
    } else line = attempt
  })
  if (line) lines.push(line)
  return lines
}

function drawArt(ctx: CanvasRenderingContext2D, egg: EggContent) {
  const x = 56, y = 124, w = 608, h = 420
  ctx.fillStyle = INK
  ctx.fillRect(x - 6, y - 6, w + 12, h + 12)
  ctx.save()
  ctx.beginPath()
  ctx.rect(x, y, w, h)
  ctx.clip()

  const sky = egg.theme.sky
  const band = h / sky.length
  sky.forEach((color, index) => {
    ctx.fillStyle = color
    ctx.fillRect(x, y + index * band, w, band + 1)
  })
  // Two dithered rows soften each band edge the way the site's SkyWorld does.
  const cell = 8
  sky.forEach((color, index) => {
    if (!index) return
    const edge = Math.round(y + index * band)
    ctx.fillStyle = color
    for (let col = 0; col * cell < w; col += 1) {
      if (col % 2 === 0) ctx.fillRect(x + col * cell, edge - cell, cell, cell)
      if (col % 4 === 1) ctx.fillRect(x + col * cell, edge - cell * 2, cell, cell)
    }
    ctx.fillStyle = sky[index - 1]
    for (let col = 0; col * cell < w; col += 1) if (col % 4 === 3) ctx.fillRect(x + col * cell, edge, cell, cell)
  })

  const cx = x + w / 2, cy = y + h / 2 + 6
  ctx.fillStyle = 'rgba(255, 253, 244, .13)'
  for (let ray = 0; ray < 16; ray += 2) {
    const a = ray / 16 * Math.PI * 2
    const b = (ray + 1) / 16 * Math.PI * 2
    ctx.beginPath()
    ctx.moveTo(cx, cy)
    ctx.lineTo(cx + Math.cos(a) * 520, cy + Math.sin(a) * 520)
    ctx.lineTo(cx + Math.cos(b) * 520, cy + Math.sin(b) * 520)
    ctx.closePath()
    ctx.fill()
  }

  const random = seeded(egg.number * 97 + 13)
  for (let index = 0; index < 26; index += 1) {
    const sx = Math.round(x + 12 + random() * (w - 24))
    const sy = Math.round(y + 12 + random() * (h - 24))
    const big = random() > .72
    if (big) pixelStar(ctx, sx, sy, 4, 'rgba(255, 253, 244, .85)')
    else {
      ctx.fillStyle = `rgba(255, 253, 244, ${.35 + random() * .5})`
      ctx.fillRect(sx, sy, 4, 4)
    }
  }

  const grid = sprites[egg.id]()
  let minX = Infinity, minY = Infinity, maxX = -1, maxY = -1
  grid.forEach((row, gy) => row.forEach((value, gx) => {
    if (!value) return
    minX = Math.min(minX, gx); maxX = Math.max(maxX, gx)
    minY = Math.min(minY, gy); maxY = Math.max(maxY, gy)
  }))
  const spriteW = maxX - minX + 1, spriteH = maxY - minY + 1
  const unit = Math.floor(Math.min(300 / spriteW, 300 / spriteH))
  const ox = Math.round(cx - spriteW * unit / 2), oy = Math.round(cy - spriteH * unit / 2)
  const shadow = Math.round(unit * .6)
  ctx.fillStyle = 'rgba(24, 6, 47, .55)'
  grid.forEach((row, gy) => row.forEach((value, gx) => { if (value) ctx.fillRect(ox + (gx - minX) * unit + shadow, oy + (gy - minY) * unit + shadow, unit, unit) }))
  grid.forEach((row, gy) => row.forEach((value, gx) => {
    if (!value) return
    ctx.fillStyle = value
    ctx.fillRect(ox + (gx - minX) * unit, oy + (gy - minY) * unit, unit, unit)
  }))

  ctx.fillStyle = 'rgba(42, 11, 79, .1)'
  for (let line = 0; line < h; line += 4) ctx.fillRect(x, y + line, w, 1)
  ctx.restore()

  // Corner tags sit on the art frame like stickers on a console screen.
  const rarity = rarityColors[egg.rarity]
  ctx.fillStyle = INK
  ctx.fillRect(x, y, 128, 36)
  text(ctx, `No.${String(egg.number).padStart(2, '0')}`, x + 14, y + 19, 14, YELLOW)
  const stars = rarityStars[egg.rarity]
  ctx.font = `400 12px ${PIXEL_FONT}`
  const label = egg.rarity
  const tagW = ctx.measureText(label).width + 28 + stars * 18
  ctx.fillStyle = INK
  ctx.fillRect(x + w - tagW - 6, y, tagW + 6, 40)
  ctx.fillStyle = rarity
  ctx.fillRect(x + w - tagW, y, tagW, 34)
  for (let star = 0; star < stars; star += 1) pixelStar(ctx, x + w - tagW + 16 + star * 18, y + 17, 4, INK)
  text(ctx, label, x + w - 12, y + 18, 12, INK, 'right')
}

function drawStatBar(ctx: CanvasRenderingContext2D, label: string, value: number, y: number, accent: string) {
  text(ctx, label, 76, y, 12, INK)
  for (let segment = 0; segment < 10; segment += 1) {
    const sx = 290 + segment * 30
    ctx.fillStyle = INK
    ctx.fillRect(sx, y - 9, 26, 18)
    ctx.fillStyle = segment < value ? accent : '#eadfc6'
    ctx.fillRect(sx + 3, y - 6, 20, 12)
    if (segment < value) {
      ctx.fillStyle = 'rgba(255, 253, 244, .55)'
      ctx.fillRect(sx + 3, y - 6, 20, 3)
    }
  }
  text(ctx, String(value * 10), 644, y, 12, PURPLE, 'right')
}

export function drawEggCard(canvas: HTMLCanvasElement, egg: EggContent, record: EggRecord | undefined, scale: number) {
  canvas.width = CARD_WIDTH * scale
  canvas.height = CARD_HEIGHT * scale
  const ctx = canvas.getContext('2d')
  if (!ctx) return
  ctx.setTransform(scale, 0, 0, scale, 0, 0)
  ctx.imageSmoothingEnabled = false
  const rarity = rarityColors[egg.rarity]

  ctx.fillStyle = INK
  ctx.fillRect(0, 0, CARD_WIDTH, CARD_HEIGHT)
  fillStepped(ctx, 12, 12, CARD_WIDTH - 24, CARD_HEIGHT - 24, 8, rarity)
  if (rarityStars[egg.rarity] >= 3) {
    const random = seeded(egg.number * 31 + 7)
    for (let spark = 0; spark < 18; spark += 1) {
      const side = spark % 4
      const along = random()
      const sx = side < 2 ? 20 + along * (CARD_WIDTH - 40) : side === 2 ? 19 : CARD_WIDTH - 19
      const sy = side < 2 ? (side === 0 ? 19 : CARD_HEIGHT - 19) : 20 + along * (CARD_HEIGHT - 40)
      ctx.fillStyle = 'rgba(255, 253, 244, .7)'
      ctx.fillRect(Math.round(sx) - 2, Math.round(sy) - 2, 4, 4)
    }
  }
  fillStepped(ctx, 26, 26, CARD_WIDTH - 52, CARD_HEIGHT - 52, 6, INK)
  fillStepped(ctx, 32, 32, CARD_WIDTH - 64, CARD_HEIGHT - 64, 6, CREAM)

  // Paper dither keeps the cream face from looking flat in the exported image.
  ctx.fillStyle = 'rgba(108, 43, 217, .05)'
  for (let py = 40; py < CARD_HEIGHT - 40; py += 8) for (let px = 40 + (py / 8 % 2) * 4; px < CARD_WIDTH - 40; px += 8) ctx.fillRect(px, py, 2, 2)

  ctx.fillStyle = PURPLE
  ctx.fillRect(32, 44, CARD_WIDTH - 64, 56)
  ctx.fillStyle = INK
  ctx.fillRect(32, 100, CARD_WIDTH - 64, 4)
  text(ctx, "ROBOFIESTA'26", 56, 73, 18, YELLOW)
  text(ctx, eggLabel(egg), CARD_WIDTH - 56, 73, 12, CREAM, 'right')

  drawArt(ctx, egg)

  ctx.fillStyle = DEEP
  ctx.fillRect(84, 576, 564, 80)
  fillStepped(ctx, 76, 568, 564, 80, 4, INK)
  fillStepped(ctx, 80, 572, 556, 72, 4, YELLOW)
  ctx.fillStyle = 'rgba(255, 253, 244, .5)'
  ctx.fillRect(88, 578, 540, 4)
  let titleSize = 36
  ctx.font = `400 ${titleSize}px ${PIXEL_FONT}`
  while (ctx.measureText(egg.title).width > 500 && titleSize > 16) {
    titleSize -= 2
    ctx.font = `400 ${titleSize}px ${PIXEL_FONT}`
  }
  text(ctx, egg.title, 361, 612, titleSize, CORAL, 'center')
  text(ctx, egg.title, 358, 609, titleSize, INK, 'center')

  text(ctx, `CODENAME // ${egg.codename}`, CARD_WIDTH / 2, 682, 12, PURPLE, 'center')

  ctx.font = `italic 500 21px ${BODY_FONT}`
  const lines = wrap(ctx, egg.flavor, 556).slice(0, 3)
  lines.forEach((line, index) => text(ctx, line, CARD_WIDTH / 2, 720 + index * 29, 21, INK, 'center', BODY_FONT, 'italic 500'))

  const statsTop = 814
  ctx.fillStyle = IVORY
  ctx.fillRect(56, statsTop - 2, 608, 100)
  ctx.strokeStyle = INK
  ctx.lineWidth = 3
  ctx.strokeRect(57.5, statsTop - .5, 605, 97)
  egg.stats.forEach(([label, value], index) => drawStatBar(ctx, label, value, statsTop + 22 + index * 28, egg.theme.accent))

  ctx.fillStyle = INK
  for (let dash = 56; dash < 664; dash += 16) ctx.fillRect(dash, 922, 8, 3)
  const found = record ? new Date(record.foundAt).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }).toUpperCase() : 'NOT YET FOUND'
  text(ctx, `FOUND ${found}`, 56, 944, 10, INK)
  text(ctx, record ? `#${record.serial}` : '#RF26-??-????', CARD_WIDTH - 56, 944, 10, PURPLE, 'right')
  text(ctx, 'RVITM ROBOTICS COMMUNITY · BANGALORE · 16–18 OCT 2026', CARD_WIDTH / 2, 962, 13, '#6b4b8f', 'center', BODY_FONT, '600')

}

let fontsReady: Promise<void> | null = null

/** Canvas text only uses web fonts that have already loaded, so wait for the exact faces. */
export function ensureCardFonts() {
  fontsReady ??= Promise.all([
    document.fonts.load(`400 36px ${PIXEL_FONT}`),
    document.fonts.load(`italic 500 21px ${BODY_FONT}`),
    document.fonts.load(`600 13px ${BODY_FONT}`),
  ]).then(() => undefined, () => undefined)
  return fontsReady
}

export async function eggCardBlob(egg: EggContent, record: EggRecord | undefined) {
  await ensureCardFonts()
  const canvas = document.createElement('canvas')
  drawEggCard(canvas, egg, record, 2)
  return new Promise<Blob | null>((resolve) => canvas.toBlob(resolve, 'image/png'))
}

export const eggCardFileName = (egg: EggContent) => `robofiesta26-secret-${String(egg.number).padStart(2, '0')}-${egg.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')}.png`
