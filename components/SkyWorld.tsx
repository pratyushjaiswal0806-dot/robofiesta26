'use client'

import { motion, useMotionValueEvent, useScroll, useTransform } from 'framer-motion'
import { useState } from 'react'

const sparkles = [
  ['7%','3%','s1'],['86%','5%','s2'],['18%','10%','s3'],['74%','16%','s1'],
  ['9%','24%','s2'],['91%','31%','s3'],['14%','41%','s1'],['83%','49%','s2'],
  ['5%','61%','s3'],['92%','72%','s1'],['16%','82%','s2'],['78%','91%','s3'],
]

export function SkyWorld() {
  const { scrollYProgress } = useScroll()
  const [progress, setProgress] = useState(0)
  const backgroundPositionY = useTransform(scrollYProgress, [0, 1], ['0%', '100%'])
  const scaleY = useTransform(scrollYProgress, [0, 1], [0, 1])
  const scaleX = useTransform(scrollYProgress, [0, 1], [0, 1])
  useMotionValueEvent(scrollYProgress, 'change', latest => setProgress(Math.round(latest * 100)))

  return <>
    <motion.div className="sky-world" style={{ backgroundPositionY }} aria-hidden="true" />
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
    <div className="energy" role="progressbar" aria-label="Page scroll progress" aria-valuemin={0} aria-valuemax={100} aria-valuenow={progress}>
      <span className="energy-readout">{String(progress).padStart(2,'0')}%</span>
      <b className="energy-label">PROGRESS</b>
      <div className="energy-track"><motion.i className="energy-fill desktop" style={{scaleY}} /><motion.i className="energy-fill mobile" style={{scaleX}} /></div>
      <small>LVL</small>
    </div>
  </>
}
