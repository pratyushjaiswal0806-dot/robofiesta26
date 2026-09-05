'use client'
import { ArrowUpRight } from 'lucide-react'
import type { EventRecord } from '@/lib/data'

export function EventLevel({ event, onOpen }: { event: EventRecord, onOpen: ()=>void }) {
  return <article className="event-card motion-card">
    <div className="event-top"><span>LEVEL {event.level}</span><span className="event-icon">{event.icon}</span></div>
    <h3>{event.title}</h3>
    <p>{event.description}</p>
    <div className="badges"><b>{event.teamSize}</b><b>{event.difficulty}</b></div>
    <div className="event-bottom"><small>PRIZE: {event.prizePool}</small><button type="button" onClick={onOpen} aria-label={`View ${event.title} challenge`}>View challenge <ArrowUpRight size={15}/></button></div>
  </article>
}
