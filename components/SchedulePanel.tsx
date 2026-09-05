'use client'

import { useRef, useState, type KeyboardEvent } from 'react'
import { schedule } from '@/lib/data'

export function SchedulePanel() {
  const days = Object.keys(schedule) as Array<keyof typeof schedule>
  const [day, setDay] = useState(days[0])
  const tabRefs = useRef<Array<HTMLButtonElement | null>>([])
  const selectedIndex = days.indexOf(day)

  const selectDay = (index: number, moveFocus = false) => {
    const nextIndex = (index + days.length) % days.length
    setDay(days[nextIndex])
    if (moveFocus) window.requestAnimationFrame(() => tabRefs.current[nextIndex]?.focus())
  }

  const handleTabKeyDown = (event: KeyboardEvent<HTMLButtonElement>, index: number) => {
    if (event.key === 'ArrowRight' || event.key === 'ArrowDown') {
      event.preventDefault()
      selectDay(index + 1, true)
    } else if (event.key === 'ArrowLeft' || event.key === 'ArrowUp') {
      event.preventDefault()
      selectDay(index - 1, true)
    } else if (event.key === 'Home') {
      event.preventDefault()
      selectDay(0, true)
    } else if (event.key === 'End') {
      event.preventDefault()
      selectDay(days.length - 1, true)
    }
  }

  return <div className="schedule-panel">
    <div className="tabs" role="tablist" aria-label="Festival schedule days">
      {days.map((item, index) => <button type="button" role="tab" id={`schedule-tab-${index}`} aria-controls={`schedule-panel-${index}`} aria-selected={day === item} tabIndex={day === item ? 0 : -1} className={day === item ? 'active' : ''} onClick={() => selectDay(index)} onKeyDown={(event) => handleTabKeyDown(event, index)} ref={(node) => { tabRefs.current[index] = node }} key={item}>{item}</button>)}
    </div>
    <div className="agenda" id={`schedule-panel-${selectedIndex}`} role="tabpanel" aria-labelledby={`schedule-tab-${selectedIndex}`} tabIndex={0}>
      <div className="live"><i aria-hidden="true" /> LIVE STATUS <span>Systems nominal</span></div>
      {schedule[day].map(([time, item], index) => <div className="agenda-row" key={item}><b>{String(index + 1).padStart(2, '0')}</b><time>{time}</time><strong>{item}</strong><span aria-hidden="true">→</span></div>)}
    </div>
    <div className="schedule-actions"><button type="button">Add to Calendar</button><button type="button">Download Full Schedule</button></div>
  </div>
}
