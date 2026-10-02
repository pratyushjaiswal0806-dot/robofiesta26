'use client'

import { useEffect, useRef } from 'react'

const sparkles = [
  ['7%','3%','s1'],['86%','5%','s2'],['18%','10%','s3'],['74%','16%','s1'],
  ['9%','24%','s2'],['91%','31%','s3'],['14%','41%','s1'],['83%','49%','s2'],
  ['5%','61%','s3'],['92%','72%','s1'],['16%','82%','s2'],['78%','91%','s3'],
]

export function SkyWorld({ showProgress = true }: { showProgress?: boolean }) {
  const skyRef=useRef<HTMLDivElement>(null)
  const readoutRef=useRef<HTMLSpanElement>(null)
  const verticalFillRef=useRef<HTMLElement>(null)
  const horizontalFillRef=useRef<HTMLElement>(null)
  const energyRef=useRef<HTMLDivElement>(null)

  useEffect(() => {
    let frame=0
    let previous=-1
    let previousScrolled=false
    let rangeDirty=true
    let maximum=1
    let pointerDirty=false
    let pointerX=0
    let pointerY=0
    let viewportWidth=window.innerWidth
    let viewportHeight=window.innerHeight
    let fontsCancelled=false
    const scrollElement = document.scrollingElement || document.documentElement
    const pointerFine=window.matchMedia('(pointer: fine)').matches

    const measureRange=()=>{
      maximum=Math.max(1,scrollElement.scrollHeight-scrollElement.clientHeight)
      rangeDirty=false
    }

    const update=() => {
      frame=0
      if (rangeDirty) measureRange()
      const ratio=Math.min(1,Math.max(0,scrollElement.scrollTop/maximum))
      const percent=Math.round(ratio*100)
      const scrolled=scrollElement.scrollTop>24
      if (scrolled!==previousScrolled) {
        previousScrolled=scrolled
        document.body.classList.toggle('is-scrolled',scrolled)
      }
      if (percent!==previous) {
        previous=percent
        if (skyRef.current) skyRef.current.style.backgroundPositionY=`${percent}%`
        if (readoutRef.current) readoutRef.current.textContent=`${String(percent).padStart(2,'0')}%`
        energyRef.current?.setAttribute('aria-valuenow',String(percent))
        energyRef.current?.setAttribute('aria-valuetext',`${percent}% of page explored`)
        if (verticalFillRef.current) verticalFillRef.current.style.transform=`scaleY(${ratio})`
        if (horizontalFillRef.current) horizontalFillRef.current.style.transform=`scaleX(${ratio})`
      }
      if (pointerDirty) {
        pointerDirty=false
        document.documentElement.style.setProperty('--pointer-x',String((pointerX/viewportWidth-.5)*2))
        document.documentElement.style.setProperty('--pointer-y',String((pointerY/viewportHeight-.5)*2))
      }
    }
    const schedule=()=>{if (!frame) frame=window.requestAnimationFrame(update)}
    const handleResize=()=>{
      rangeDirty=true
      viewportWidth=window.innerWidth
      viewportHeight=window.innerHeight
      schedule()
    }
    const handlePointer=(event: PointerEvent)=>{
      if (!pointerFine) return
      pointerX=event.clientX
      pointerY=event.clientY
      pointerDirty=true
      schedule()
    }
    update()
    window.addEventListener('scroll',schedule,{passive:true})
    window.addEventListener('resize',handleResize,{passive:true})
    if (pointerFine) window.addEventListener('pointermove',handlePointer,{passive:true})
    const observer = typeof ResizeObserver === 'undefined' ? null : new ResizeObserver(()=>{
      rangeDirty=true
      schedule()
    })
    observer?.observe(document.documentElement)
    void document.fonts?.ready.then(()=>{
      if (fontsCancelled) return
      rangeDirty=true
      schedule()
    })
    return ()=>{
      fontsCancelled=true
      window.cancelAnimationFrame(frame)
      window.removeEventListener('scroll',schedule)
      window.removeEventListener('resize',handleResize)
      if (pointerFine) window.removeEventListener('pointermove',handlePointer)
      observer?.disconnect()
      document.body.classList.remove('is-scrolled')
    }
  },[])

  return <>
    <div ref={skyRef} className="sky-world" aria-hidden="true" />
    <div className="sky-dither" aria-hidden="true" />
    <div className="world-decor" aria-hidden="true">
      {sparkles.map(([left,top,size],i)=><i key={i} className={`world-spark ${size}`} style={{left,top,animationDelay:`-${i*.61}s`}} />)}
      <i className="pixel-bulb bulb-one"><b/></i>
      <i className="pixel-bulb bulb-two"><b/></i>
      <i className="pixel-bulb bulb-three"><b/></i>
      <i className="circuit-glyph glyph-one">⌁</i>
      <i className="circuit-glyph glyph-two">⚙</i>
      <i className="circuit-glyph glyph-three">▦</i>
    </div>
    {showProgress && <div ref={energyRef} className="energy" role="progressbar" aria-label="Page scroll progress" aria-valuemin={0} aria-valuemax={100} aria-valuenow={0}>
      <span ref={readoutRef} className="energy-readout">00%</span>
      <b className="energy-label">PROGRESS</b>
      <div className="energy-track"><i ref={verticalFillRef} className="energy-fill desktop"/><i ref={horizontalFillRef} className="energy-fill mobile"/></div>
      <small>LVL</small>
    </div>}
  </>
}
