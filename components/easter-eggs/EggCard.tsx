'use client'

import { type CSSProperties, type PointerEvent, useEffect, useRef } from 'react'
import { rarityColors, type EggContent } from './eggTypes'
import { drawEggCard, ensureCardFonts } from './eggCardArt'
import type { EggRecord } from './eggStore'

type EggCardProps = {
  egg: EggContent
  record: EggRecord | undefined
  /** Canvas pixels per card unit; thumbnails can render smaller. */
  resolution?: number
  tilt?: boolean
}

export function EggCard({ egg, record, resolution, tilt = false }: EggCardProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const shellRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    let cancelled = false
    const scale = resolution ?? Math.min(2, Math.max(1, window.devicePixelRatio || 1))
    drawEggCard(canvas, egg, record, scale)
    void ensureCardFonts().then(() => { if (!cancelled) drawEggCard(canvas, egg, record, scale) })
    return () => { cancelled = true }
  }, [egg, record, resolution])

  function handlePointerMove(event: PointerEvent<HTMLDivElement>) {
    const shell = shellRef.current
    if (!tilt || !shell || event.pointerType === 'touch') return
    const box = shell.getBoundingClientRect()
    const x = (event.clientX - box.left) / box.width
    const y = (event.clientY - box.top) / box.height
    shell.style.setProperty('--tilt-x', `${(.5 - y) * 14}deg`)
    shell.style.setProperty('--tilt-y', `${(x - .5) * 18}deg`)
    shell.style.setProperty('--glare-x', `${x * 100}%`)
    shell.style.setProperty('--glare-y', `${y * 100}%`)
  }

  function handlePointerLeave() {
    const shell = shellRef.current
    if (!shell) return
    ;['--tilt-x', '--tilt-y', '--glare-x', '--glare-y'].forEach((name) => shell.style.removeProperty(name))
  }

  const style = { '--egg-rarity': rarityColors[egg.rarity] } as CSSProperties

  return <div ref={shellRef} className={`egg-card rarity-${egg.rarity.toLowerCase()}${tilt ? ' can-tilt' : ''}`} style={style} onPointerMove={handlePointerMove} onPointerLeave={handlePointerLeave}>
    <canvas ref={canvasRef} role="img" aria-label={`${egg.title} — ${egg.rarity.toLowerCase()} RoboFiesta secret card. ${egg.flavor}`} />
    <span className="egg-card-foil" aria-hidden="true" />
    <span className="egg-card-glare" aria-hidden="true" />
  </div>
}
