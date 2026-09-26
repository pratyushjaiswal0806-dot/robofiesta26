'use client'

import { useEffect, useRef, useState } from 'react'
import { usePathname, useRouter } from 'next/navigation'

const revealSelector = [
  '.section-head',
  '.transmission',
  '.sponsor-row',
  '.schedule-panel',
  '.prize-copy',
  '.vault-stage',
  '.prize-card',
  '.feature',
  '.faq-item',
  '.person',
  '.poster-entry',
  '.contact-details',
  '.contact-form',
  '.contact-console',
  '.footer-console',
  '.not-found-copy',
  '.not-found-console',
  '.reveal-block',
  '.event-card',
].join(',')

const clickVectors = [[-22,-18],[22,-18],[-25,17],[25,17],[0,-28],[0,27]] as const

export function MotionDirector() {
  const pathname=usePathname()
  const router=useRouter()
  const [routePhase,setRoutePhase]=useState<'idle'|'covering'|'revealing'>('revealing')
  const navigationTimer=useRef<number>()
  const navigationLocked=useRef(false)

  useEffect(() => {
    const reduced=window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduced) { setRoutePhase('idle'); return }
    setRoutePhase('revealing')
    document.body.classList.remove('is-route-leaving')
    const stop=window.setTimeout(()=>{
      setRoutePhase('idle')
      navigationLocked.current=false
    },680)
    return ()=>window.clearTimeout(stop)
  },[pathname])

  useEffect(() => {
    const reduced=window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduced) return
    const navigate=(event: MouseEvent) => {
      if (event.defaultPrevented || event.button!==0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey || navigationLocked.current) return
      const target=event.target as Element | null
      const anchor=target?.closest<HTMLAnchorElement>('a[href]')
      if (!anchor || anchor.target || anchor.hasAttribute('download') || anchor.dataset.noTransition!==undefined) return
      const destination=new URL(anchor.href,window.location.href)
      if (destination.origin!==window.location.origin) return
      const sameDocument=destination.pathname===window.location.pathname && destination.search===window.location.search
      if (sameDocument) return
      event.preventDefault()
      navigationLocked.current=true
      document.body.classList.add('is-route-leaving')
      setRoutePhase('covering')
      window.clearTimeout(navigationTimer.current)
      navigationTimer.current=window.setTimeout(()=>{
        router.push(`${destination.pathname}${destination.search}${destination.hash}`)
      },390)
    }
    document.addEventListener('click',navigate)
    return ()=>{
      document.removeEventListener('click',navigate)
      window.clearTimeout(navigationTimer.current)
    }
  },[router])

  useEffect(() => {
    const reduced=window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduced) return
    let observer: IntersectionObserver | undefined
    const frame=window.requestAnimationFrame(() => {
      const nodes=Array.from(document.querySelectorAll<HTMLElement>(revealSelector))
      observer=new IntersectionObserver(entries => {
        entries.forEach(entry => {
          if (!entry.isIntersecting) return
          entry.target.classList.add('motion-visible')
          observer?.unobserve(entry.target)
        })
      },{threshold:.08,rootMargin:'0px 0px -7% 0px'})
      nodes.forEach((node,index) => {
        node.classList.add('motion-ready')
        node.style.setProperty('--motion-delay',`${(index%5)*55}ms`)
        observer?.observe(node)
      })
    })
    return ()=>{window.cancelAnimationFrame(frame);observer?.disconnect()}
  },[pathname])

  useEffect(() => {
    const reduced=window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduced) return
    const finePointer=window.matchMedia('(pointer: fine)').matches
    const handleClick=(event: PointerEvent) => {
      if (!finePointer) return
      clickVectors.forEach(([x,y],index) => {
        const spark=document.createElement('i')
        spark.className='click-pixel'
        spark.style.left=`${event.clientX}px`
        spark.style.top=`${event.clientY}px`
        spark.style.setProperty('--spark-x',`${x}px`)
        spark.style.setProperty('--spark-y',`${y}px`)
        spark.style.setProperty('--spark-delay',`${index*12}ms`)
        document.body.appendChild(spark)
        spark.addEventListener('animationend',()=>spark.remove(),{once:true})
      })
    }
    const handleVisibility=()=>document.body.classList.toggle('is-page-hidden',document.hidden)
    window.addEventListener('pointerdown',handleClick,{passive:true})
    document.addEventListener('visibilitychange',handleVisibility)
    return ()=>{
      window.removeEventListener('pointerdown',handleClick)
      document.removeEventListener('visibilitychange',handleVisibility)
      document.body.classList.remove('is-page-hidden')
    }
  },[])

  return <>
    <div className={`route-wipe is-${routePhase}`} aria-hidden="true">{Array.from({length:12}).map((_,index)=><i key={index}/>)}<b>{routePhase==='covering'?'LOADING NEXT LEVEL…':'LEVEL READY'}</b></div>
    <div className="motion-ambient" aria-hidden="true">{Array.from({length:10}).map((_,index)=><i key={index}/>)}</div>
  </>
}
