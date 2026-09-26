"use client"

import * as React from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { cn } from "@/lib/utils"

const useIsoLayoutEffect = typeof window !== "undefined" ? React.useLayoutEffect : React.useEffect

export interface CoverflowSlide {
  src: string
  alt: string
  width?: number
  height?: number
  title?: string
  subtitle?: string
  href?: string
  meta?: { label: string; value: string }[]
}

export interface CoverflowCarouselProps {
  slides: CoverflowSlide[]
  rotate?: number
  depth?: number
  perspective?: number
  falloff?: number
  fade?: number
  cardWidth?: string
  gap?: number
  loop?: boolean
  showCaption?: boolean
  showPagination?: boolean
  showNavigation?: boolean
  label?: string
  className?: string
  cardClassName?: string
}

export function CoverflowCarousel({
  slides,
  rotate = 44,
  depth = 0.6,
  perspective = 3,
  falloff = 0.56,
  fade = 0.1,
  cardWidth = "clamp(148px, 22vw, 260px)",
  gap = 0.05,
  loop = true,
  showCaption = true,
  showPagination = true,
  showNavigation = true,
  label = "Choose your arena carousel",
  className,
  cardClassName,
}: CoverflowCarouselProps) {
  const count = slides.length
  const frameRef = React.useRef<HTMLDivElement>(null)
  const cardRefs = React.useRef<(HTMLDivElement | null)[]>([])
  const posRef = React.useRef(0)
  const targetRef = React.useRef(0)
  const widthRef = React.useRef(0)
  const rafRef = React.useRef<number | null>(null)
  const dragRef = React.useRef<{ id: number; x: number; pos: number; v: number; t: number } | null>(null)
  const [selected, setSelected] = React.useState(0)

  const indexAt = React.useCallback((pos: number) => ((Math.round(pos) % count) + count) % count, [count])

  const paint = React.useCallback(() => {
    const width = widthRef.current
    if (!width || !count) return
    const pitch = width * (1 + gap)
    const pos = posRef.current
    cardRefs.current.forEach((card, index) => {
      if (!card) return
      let offset = index - pos
      if (loop) {
        offset = ((offset % count) + count) % count
        if (offset > count / 2) offset -= count
      }
      const distance = Math.abs(offset)
      const ramp = Math.pow(distance, falloff)
      const tilt = Math.min(rotate * ramp, 82) * Math.sign(offset)
      card.style.transform = `translateX(calc(-50% + ${offset * pitch}px)) translateZ(${-depth * width * ramp}px) rotateY(${-tilt}deg)`
      const edge = loop ? Math.min(1, Math.max(0, count / 2 - distance)) : 1
      card.style.opacity = String(Math.max(0, 1 - fade * distance) * edge)
      card.style.zIndex = String(100 - Math.round(distance))
    })
  }, [count, depth, fade, falloff, gap, loop, rotate])

  const settle = React.useCallback((target: number) => {
    if (rafRef.current !== null) cancelAnimationFrame(rafRef.current)
    targetRef.current = target
    setSelected(indexAt(target))
    const step = () => {
      const remaining = target - posRef.current
      if (Math.abs(remaining) < 0.0004) {
        posRef.current = target
        paint()
        rafRef.current = null
        return
      }
      posRef.current += remaining * 0.16
      paint()
      rafRef.current = requestAnimationFrame(step)
    }
    rafRef.current = requestAnimationFrame(step)
  }, [indexAt, paint])

  const clamp = React.useCallback((pos: number) => loop ? pos : Math.max(0, Math.min(count - 1, pos)), [count, loop])
  const goTo = React.useCallback((index: number) => {
    const target = loop ? index + Math.round((targetRef.current - index) / count) * count : index
    settle(clamp(target))
  }, [clamp, count, loop, settle])
  const nudge = React.useCallback((by: number) => settle(clamp(Math.round(targetRef.current) + by)), [clamp, settle])

  const onPointerDown = (event: React.PointerEvent<HTMLDivElement>) => {
    if (rafRef.current !== null) cancelAnimationFrame(rafRef.current)
    rafRef.current = null
    event.currentTarget.setPointerCapture(event.pointerId)
    targetRef.current = posRef.current
    dragRef.current = { id: event.pointerId, x: event.clientX, pos: posRef.current, v: 0, t: performance.now() }
  }

  const onPointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    const drag = dragRef.current
    if (!drag || drag.id !== event.pointerId) return
    const pitch = widthRef.current * (1 + gap)
    if (!pitch) return
    const now = performance.now()
    const previous = posRef.current
    posRef.current = clamp(drag.pos - (event.clientX - drag.x) / pitch)
    drag.v = ((posRef.current - previous) / Math.max(now - drag.t, 1)) * 1000
    drag.t = now
    const index = indexAt(posRef.current)
    if (index !== selected) setSelected(index)
    paint()
  }

  const endDrag = (event: React.PointerEvent<HTMLDivElement>) => {
    const drag = dragRef.current
    if (!drag || drag.id !== event.pointerId) return
    dragRef.current = null
    const carried = Math.max(-2, Math.min(2, drag.v * 0.18))
    settle(clamp(Math.round(posRef.current + carried)))
  }

  useIsoLayoutEffect(() => {
    const frame = frameRef.current
    if (!frame) return
    const measure = () => {
      const card = cardRefs.current[0]
      if (!card) return
      widthRef.current = card.offsetWidth
      paint()
    }
    measure()
    const observer = new ResizeObserver(measure)
    observer.observe(frame)
    return () => observer.disconnect()
  }, [paint])

  React.useEffect(() => () => { if (rafRef.current !== null) cancelAnimationFrame(rafRef.current) }, [])

  if (!count) return null
  const active = slides[selected]

  return (
    <div className={cn("w-full", className)} style={{ ["--cf-card" as string]: cardWidth }} role="region" aria-roledescription="carousel" aria-label={label}>
      <div className="relative">
        <div ref={frameRef} tabIndex={0} onPointerDown={onPointerDown} onPointerMove={onPointerMove} onPointerUp={endDrag} onPointerCancel={endDrag} onKeyDown={(event) => { if (event.key === "ArrowLeft") { event.preventDefault(); nudge(-1) } else if (event.key === "ArrowRight") { event.preventDefault(); nudge(1) } }} className="cursor-grab overflow-hidden py-10 outline-none ring-[#2A1454] focus-visible:ring-2 active:cursor-grabbing" style={{ perspective: `calc(var(--cf-card) * ${perspective})`, touchAction: "pan-y" }}>
          <div className="relative select-none" style={{ height: "var(--cf-card)", transformStyle: "preserve-3d" }}>
            {slides.map((slide, index) => (
              <div key={index} ref={(node) => { cardRefs.current[index] = node }} role="button" tabIndex={index === selected ? 0 : -1} aria-roledescription="slide" aria-label={`${index + 1} of ${count}: ${slide.title ?? slide.alt}`} aria-current={index === selected} onClick={() => goTo(index)} onKeyDown={(event) => { if (event.key === 'Enter' || event.key === ' ') { event.preventDefault(); goTo(index) } }} className={cn("absolute left-1/2 top-0 aspect-square cursor-pointer overflow-hidden rounded-sm border-4 border-[#2A1454] bg-[#FFF6DC] shadow-[6px_6px_0_0_#2A1454] will-change-transform", cardClassName)} style={{ width: "var(--cf-card)" }}>
                <Image src={slide.src} alt={slide.alt} width={slide.width ?? 512} height={slide.height ?? 512} sizes="(max-width: 640px) 148px, (max-width: 1200px) 22vw, 260px" quality={85} loading="lazy" draggable={false} className="h-full w-full select-none object-cover [image-rendering:pixelated]" />
              </div>
            ))}
          </div>
        </div>
        {showNavigation && <>
          <button type="button" aria-label="Previous slide" onPointerDown={(event) => event.stopPropagation()} onClick={(event) => { event.stopPropagation(); nudge(-1) }} className="absolute left-3 top-1/2 z-[200] -translate-y-1/2 rounded-sm border-4 border-[#2A1454] bg-[#F5D565] p-2 text-[#2A1454] shadow-[3px_3px_0_0_#2A1454] transition hover:-translate-y-[55%] hover:shadow-[5px_5px_0_0_#2A1454] active:translate-x-[2px] active:shadow-[1px_1px_0_0_#2A1454]"><ChevronLeft aria-hidden="true" className="size-5" strokeWidth={3} /></button>
          <button type="button" aria-label="Next slide" onPointerDown={(event) => event.stopPropagation()} onClick={(event) => { event.stopPropagation(); nudge(1) }} className="absolute right-3 top-1/2 z-[200] -translate-y-1/2 rounded-sm border-4 border-[#2A1454] bg-[#F5D565] p-2 text-[#2A1454] shadow-[3px_3px_0_0_#2A1454] transition hover:-translate-y-[55%] hover:shadow-[5px_5px_0_0_#2A1454] active:-translate-x-[2px] active:shadow-[1px_1px_0_0_#2A1454]"><ChevronRight aria-hidden="true" className="size-5" strokeWidth={3} /></button>
        </>}
      </div>
      {showCaption && active?.title && <div key={selected} aria-live="polite" className="mt-4 flex flex-col items-center px-6 text-center duration-300 animate-in fade-in">
        <p className="font-pixel text-[15px] uppercase tracking-tight text-[#2A1454]">{active.title}</p>
        {active.subtitle && <p className="mt-1 text-[13px] text-[#6B5B95]">{active.subtitle}</p>}
        {active.meta && active.meta.length > 0 && <dl className="mt-5 flex w-full max-w-[420px] flex-wrap justify-center gap-2 text-[11px]">{active.meta.map((row) => <div key={row.label} className="rounded-sm border-2 border-[#2A1454] bg-[#FFF6DC] px-2 py-1 shadow-[2px_2px_0_0_#2A1454]"><dt className="inline text-[#6B5B95]">{row.label}: </dt><dd className="inline font-semibold text-[#2A1454]">{row.value}</dd></div>)}</dl>}
        {active.href && <Link href={active.href} className="carousel-detail-link">View full challenge <ChevronRight size={15} aria-hidden="true" /></Link>}
      </div>}
      {showPagination && <div className="mt-6 flex items-center justify-center gap-3">{slides.map((_, index) => <button key={index} type="button" aria-label={`Go to slide ${index + 1}`} aria-current={index === selected} onPointerDown={(event) => event.stopPropagation()} onClick={(event) => { event.stopPropagation(); goTo(index) }} className={cn("size-3 rotate-45 border-2 border-[#2A1454] transition-colors", index === selected ? "bg-[#F5D565]" : "bg-transparent opacity-50")} />)}</div>}
    </div>
  )
}
