'use client'
import { useState } from 'react'
import { schedule } from '@/lib/data'
export function SchedulePanel(){const days=Object.keys(schedule) as Array<keyof typeof schedule>;const [day,setDay]=useState(days[0]);return <div className="schedule-panel"><div className="tabs">{days.map(d=><button className={day===d?'active':''} onClick={()=>setDay(d)} key={d}>{d}</button>)}</div><div className="agenda"><div className="live"><i/> LIVE STATUS <span>Systems nominal</span></div>{schedule[day].map(([time,item],i)=><div className="agenda-row" key={item}><b>{String(i+1).padStart(2,'0')}</b><time>{time}</time><strong>{item}</strong><span>→</span></div>)}</div><div className="schedule-actions"><button>Add to Calendar</button><button>Download Full Schedule</button></div></div>}
