'use client'

import { useEffect, useRef } from 'react'

const sparkles = [
  ['7%','3%','s1'],['86%','5%','s2'],['18%','10%','s3'],['74%','16%','s1'],
  ['9%','24%','s2'],['91%','31%','s3'],['14%','41%','s1'],['83%','49%','s2'],
  ['5%','61%','s3'],['92%','72%','s1'],['16%','82%','s2'],['78%','91%','s3'],
]

export function SkyWorld() {
  const skyRef=useRef<HTMLDivElement>(null)
  const readoutRef=useRef<HTMLSpanElement>(null)
  const verticalFillRef=useRef<HTMLElement>(null)
  const horizontalFillRef=useRef<HTMLElement>(null)
  const energyRef=useRef<HTMLDivElement>(null)

  useEffect(() => {
    let frame=0
    let previous=-1
    const update=() => {
      frame=0
      const maximum=Math.max(1,document.documentElement.scrollHeight-window.innerHeight)
      const ratio=Math.min(1,Math.max(0,window.scrollY/maximum))
      const percent=Math.round(ratio*100)
      if (percent===previous) return
      previous=percent
      if (skyRef.current) skyRef.current.style.backgroundPositionY=`${percent}%`
      if (readoutRef.current) readoutRef.current.textContent=`${String(percent).padStart(2,'0')}%`
      energyRef.current?.setAttribute('aria-valuenow',String(percent))
      if (verticalFillRef.current) verticalFillRef.current.style.transform=`scaleY(${ratio})`
      if (horizontalFillRef.current) horizontalFillRef.current.style.transform=`scaleX(${ratio})`
    }
    const schedule=()=>{if (!frame) frame=window.requestAnimationFrame(update)}
    update()
    window.addEventListener('scroll',schedule,{passive:true})
    window.addEventListener('resize',schedule,{passive:true})
    return ()=>{
      window.cancelAnimationFrame(frame)
      window.removeEventListener('scroll',schedule)
      window.removeEventListener('resize',schedule)
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
    <div ref={energyRef} className="energy" role="progressbar" aria-label="Page scroll progress" aria-valuemin={0} aria-valuemax={100} aria-valuenow={0}>
      <span ref={readoutRef} className="energy-readout">00%</span>
      <b className="energy-label">PROGRESS</b>
      <div className="energy-track"><i ref={verticalFillRef} className="energy-fill desktop"/><i ref={horizontalFillRef} className="energy-fill mobile"/></div>
      <small>LVL</small>
    </div>
  </>
}
