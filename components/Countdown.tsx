'use client'
import { useEffect, useState } from 'react'
import { fest } from '@/lib/data'
export function Countdown() { const getTime=()=>{ const n=Math.max(0,new Date(fest.registrationDeadline).getTime()-Date.now()); return [Math.floor(n/86400000),Math.floor(n/3600000)%24,Math.floor(n/60000)%60,Math.floor(n/1000)%60] }; const [time,setTime]=useState<number[]|null>(null); useEffect(()=>{setTime(getTime());const id=setInterval(()=>setTime(getTime()),1000);return()=>clearInterval(id)},[]); return <div className="countdown">{['Days','Hours','Mins','Secs'].map((n,i)=><div key={n}><b>{time ? String(time[i]).padStart(2,'0') : '--'}</b><small>{n}</small></div>)}</div> }
