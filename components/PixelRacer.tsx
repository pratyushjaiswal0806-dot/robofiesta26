'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import { ChevronLeft, ChevronRight, Play, RotateCcw, Zap } from 'lucide-react'

type Obstacle = { id: number; lane: number; y: number; kind: number }
type Pickup = { id: number; lane: number; y: number }
type GamePhase = 'idle' | 'countdown' | 'running' | 'crashed'

export function PixelRacer() {
  const [lane,setLane]=useState(1)
  const [obstacles,setObstacles]=useState<Obstacle[]>([])
  const [pickups,setPickups]=useState<Pickup[]>([])
  const [score,setScore]=useState(0)
  const [best,setBest]=useState(0)
  const [phase,setPhase]=useState<GamePhase>('idle')
  const [countdown,setCountdown]=useState(3)
  const laneRef=useRef(1)
  const scoreRef=useRef(0)
  const idRef=useRef(0)
  const pointerRef=useRef<number|null>(null)
  const running=phase==='running'
  const crashed=phase==='crashed'
  const speed=Math.min(299,84+Math.floor(score*1.35))

  const move=useCallback((direction: -1 | 1) => {
    if (!running) return
    setLane(current => {
      const next=Math.max(0,Math.min(2,current+direction))
      laneRef.current=next
      return next
    })
  },[running])

  const start=useCallback(() => {
    laneRef.current=1
    scoreRef.current=0
    setLane(1)
    setObstacles([])
    setPickups([])
    setScore(0)
    setCountdown(3)
    setPhase('countdown')
  },[])

  useEffect(() => {
    const saved=Number(window.localStorage.getItem('robofiesta-circuit-dash-best')||0)
    if (Number.isFinite(saved)) setBest(saved)
  },[])

  useEffect(() => {
    if (phase!=='countdown') return
    const timer=window.setTimeout(() => {
      if (countdown>1) setCountdown(current=>current-1)
      else setPhase('running')
    },620)
    return ()=>window.clearTimeout(timer)
  },[countdown,phase])

  useEffect(() => {
    if (!running) return
    let tick=0
    const timer=window.setInterval(() => {
      tick+=1
      const pace=2.1+Math.min(tick/280,1.8)
      setScore(current => {
        const next=current+1
        scoreRef.current=next
        return next
      })
      setObstacles(current => {
        const next=current.map(item=>({...item,y:item.y+pace})).filter(item=>item.y<112)
        const spawnEvery=Math.max(11,19-Math.floor(tick/170))
        if (tick%spawnEvery===0) next.push({id:++idRef.current,lane:Math.floor(Math.random()*3),y:-18,kind:idRef.current%3})
        if (next.some(item=>item.lane===laneRef.current&&item.y>72&&item.y<92)) {
          const finalScore=scoreRef.current
          setPhase('crashed')
          setBest(currentBest => {
            const nextBest=Math.max(currentBest,finalScore)
            window.localStorage.setItem('robofiesta-circuit-dash-best',String(nextBest))
            return nextBest
          })
        }
        return next
      })
      setPickups(current => {
        let next=current.map(item=>({...item,y:item.y+pace})).filter(item=>item.y<108)
        if (tick%43===0) next.push({id:++idRef.current,lane:Math.floor(Math.random()*3),y:-10})
        const collected=next.some(item=>item.lane===laneRef.current&&item.y>72&&item.y<93)
        if (collected) {
          setScore(currentScore => {
            const boosted=currentScore+25
            scoreRef.current=boosted
            return boosted
          })
          next=next.filter(item=>!(item.lane===laneRef.current&&item.y>72&&item.y<93))
        }
        return next
      })
    },60)
    return ()=>window.clearInterval(timer)
  },[running])

  useEffect(() => {
    const handleKey=(event: KeyboardEvent) => {
      if (event.key==='ArrowLeft'||event.key.toLowerCase()==='a') { event.preventDefault(); move(-1) }
      if (event.key==='ArrowRight'||event.key.toLowerCase()==='d') { event.preventDefault(); move(1) }
    }
    window.addEventListener('keydown',handleKey)
    return ()=>window.removeEventListener('keydown',handleKey)
  },[move])

  const endSwipe=(event: React.PointerEvent<HTMLDivElement>) => {
    if (pointerRef.current===null) return
    const distance=event.clientX-pointerRef.current
    if (Math.abs(distance)>24) move(distance>0?1:-1)
    pointerRef.current=null
  }

  return <section className="racer-console" aria-label="Circuit Dash mini game">
    <div className="racer-topbar"><span>CIRCUIT DASH <small>// SECTOR 07</small></span><div><b>SCORE {String(score).padStart(4,'0')}</b><b>BEST {String(best).padStart(4,'0')}</b><b>SPD {speed}</b></div></div>
    <div className={`racer-screen ${running?'is-running':''} ${crashed?'is-crashed':''}`} onPointerDown={event=>{pointerRef.current=event.clientX}} onPointerUp={endSwipe} onPointerCancel={()=>{pointerRef.current=null}}>
      <div className="racer-scanlines"/>
      <div className="speed-particles">{Array.from({length:12}).map((_,index)=><i key={index} style={{left:`${8+(index*23)%87}%`,animationDelay:`-${index*.17}s`}}/>)}</div>
      <div className="track-banner"><i/>CHECKPOINT 26<i/></div>
      <div className="road-edge left"/><div className="road-edge right"/>
      <div className="lane-line one"/><div className="lane-line two"/>
      <div className="track-sign pit">PIT</div><div className="track-sign rv">RV</div>
      {pickups.map(item=><div key={item.id} className="energy-pickup" style={{left:`calc(${item.lane*33.333+16.666}% - 13px)`,top:`${item.y}%`}}><Zap/></div>)}
      {obstacles.map(item=><div key={item.id} className={`racer-obstacle kind-${item.kind}`} style={{left:`calc(${item.lane*33.333+16.666}% - 18px)`,top:`${item.y}%`}}><i/><b/><span/></div>)}
      <div className="player-car" style={{left:`calc(${lane*33.333+16.666}% - 22px)`}} aria-label={`Player car in lane ${lane+1}`}><i/><i/><b/><span/><em/><u/></div>
      {phase==='countdown'&&<div className="countdown-overlay"><small>IGNITION SEQUENCE</small><strong key={countdown}>{countdown}</strong><p>GET READY</p></div>}
      {(phase==='idle'||crashed)&&<div className="racer-overlay"><small>{crashed?'SYSTEM CRASH // RUN ENDED':'MINI GAME // 01'}</small><strong>{crashed?'REBOOT & RACE':'DODGE. COLLECT. SURVIVE.'}</strong><p>{crashed?`Distance score: ${score}`:'Steer through traffic and collect energy cells'}</p><button type="button" onClick={start}>{crashed?<RotateCcw/>:<Play/>}{crashed?'Restart Engine':'Click To Play'}</button></div>}
    </div>
    <div className="racer-telemetry"><span>BOOST</span><div><i style={{width:`${Math.max(8,score%101)}%`}}/></div><b>{running?`${speed} KM/H`:phase==='countdown'?'IGNITION':'ENGINE READY'}</b></div>
    <div className="racer-controls"><button type="button" onClick={()=>move(-1)} disabled={!running} aria-label="Move car left"><ChevronLeft/> LEFT</button><span>{running?'RACE LIVE':crashed?'CRASHED':'READY'}</span><button type="button" onClick={()=>move(1)} disabled={!running} aria-label="Move car right">RIGHT <ChevronRight/></button></div>
  </section>
}
