"use client"

import React, { useEffect, useRef } from 'react'
import { gsap } from 'gsap'

interface Mouse {
  x: number
  y: number
  smoothX: number
  smoothY: number
  diff: number
}

const PIXEL_COLORS = ['#F5D565', '#FF7A3D', '#FF3CAC', '#7C3AED', '#FFF6DC']
const GRID = 6

class PixelParticle {
  size: number
  x: number
  y: number
  el: SVGRectElement

  constructor(x: number, y: number, size: number, particles: PixelParticle[]) {
    this.size = Math.max(GRID, Math.round(size / GRID) * GRID)
    this.x = Math.round(x / GRID) * GRID
    this.y = Math.round(y / GRID) * GRID

    this.el = document.createElementNS('http://www.w3.org/2000/svg', 'rect')
    this.el.setAttribute('x', this.x.toString())
    this.el.setAttribute('y', this.y.toString())
    this.el.setAttribute('width', this.size.toString())
    this.el.setAttribute('height', this.size.toString())
    this.el.setAttribute('fill', PIXEL_COLORS[Math.floor(Math.random() * PIXEL_COLORS.length)])
    this.el.setAttribute('shape-rendering', 'crispEdges')

    const timeline = gsap.timeline()
    timeline.to(this, { size: this.size * 1.6, ease: 'steps(4)', duration: 0.35 })
    timeline.to(this, { size: 0, ease: 'steps(3)', duration: 0.55 }, 0.4)
    timeline.call(() => this.kill(particles))
  }

  kill(particles: PixelParticle[]) {
    const index = particles.indexOf(this)
    if (index > -1) particles.splice(index, 1)
    this.el.remove()
  }

  render() {
    this.el.setAttribute('width', this.size.toString())
    this.el.setAttribute('height', this.size.toString())
  }
}

export default function FooterPixelSparks() {
  const svgRef = useRef<SVGSVGElement>(null)
  const wrapperRef = useRef<SVGGElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const mouseRef = useRef<Mouse>({ x: 0, y: 0, smoothX: 0, smoothY: 0, diff: 0 })
  const particlesRef = useRef<PixelParticle[]>([])
  const animationIdRef = useRef<number>()

  useEffect(() => {
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)')
    const precisePointer = window.matchMedia('(pointer: fine)')
    if (reducedMotion.matches || !precisePointer.matches) return

    const mouse = mouseRef.current
    const particles = particlesRef.current
    const container = containerRef.current
    const svg = svgRef.current
    if (!container || !svg) return

    const onMouseMove = (event: MouseEvent) => {
      const rect = container.getBoundingClientRect()
      const inside = event.clientX >= rect.left && event.clientX <= rect.right && event.clientY >= rect.top && event.clientY <= rect.bottom
      if (!inside) return
      mouse.x = event.clientX - rect.left
      mouse.y = event.clientY - rect.top
    }

    const onResize = () => {
      const rect = container.getBoundingClientRect()
      svg.setAttribute('width', rect.width.toString())
      svg.setAttribute('height', rect.height.toString())
    }

    const emit = () => {
      if (mouse.diff <= 1.5 || particles.length >= 90) return
      const particle = new PixelParticle(mouse.smoothX, mouse.smoothY, Math.min(30, mouse.diff * 0.4), particles)
      particles.push(particle)
      wrapperRef.current?.prepend(particle.el)
    }

    const loop = () => {
      mouse.smoothX += (mouse.x - mouse.smoothX) * 0.15
      mouse.smoothY += (mouse.y - mouse.smoothY) * 0.15
      mouse.diff = Math.hypot(mouse.x - mouse.smoothX, mouse.y - mouse.smoothY)
      emit()
      particles.forEach((particle) => particle.render())
      animationIdRef.current = requestAnimationFrame(loop)
    }

    window.addEventListener('mousemove', onMouseMove)
    window.addEventListener('resize', onResize)
    const resizeObserver = new ResizeObserver(onResize)
    resizeObserver.observe(container)
    onResize()
    loop()

    return () => {
      window.removeEventListener('mousemove', onMouseMove)
      window.removeEventListener('resize', onResize)
      resizeObserver.disconnect()
      if (animationIdRef.current) cancelAnimationFrame(animationIdRef.current)
      particles.forEach((particle) => {
        gsap.killTweensOf(particle)
        particle.el.remove()
      })
      particles.length = 0
    }
  }, [])

  return (
    <div ref={containerRef} className="pointer-events-none absolute inset-0 z-10 overflow-hidden" aria-hidden="true">
      <svg ref={svgRef} xmlns="http://www.w3.org/2000/svg" className="absolute inset-0 h-full w-full" style={{ imageRendering: 'pixelated' }}>
        <g ref={wrapperRef} />
      </svg>
    </div>
  )
}
