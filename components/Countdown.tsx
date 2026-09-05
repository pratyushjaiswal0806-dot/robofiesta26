'use client'

import { useEffect, useState } from 'react'
import { fest } from '@/lib/data'

type CountdownValue = readonly [days: number, hours: number, minutes: number, seconds: number]

function getTimeRemaining() {
  const milliseconds = Math.max(0, new Date(fest.registrationDeadline).getTime() - Date.now())
  return [
    Math.floor(milliseconds / 86_400_000),
    Math.floor(milliseconds / 3_600_000) % 24,
    Math.floor(milliseconds / 60_000) % 60,
    Math.floor(milliseconds / 1_000) % 60,
  ] as CountdownValue
}

export function Countdown() {
  const [time, setTime] = useState<CountdownValue | null>(null)

  useEffect(() => {
    const update = () => setTime(getTimeRemaining())
    update()
    const timer = window.setInterval(update, 1000)
    return () => window.clearInterval(timer)
  }, [])

  const labels = ['Days', 'Hours', 'Mins', 'Secs'] as const
  const accessibleValue = time ? `${time[0]} days, ${time[1]} hours, ${time[2]} minutes, ${time[3]} seconds` : 'Countdown loading'

  return <div className="countdown" role="timer" aria-live="polite" aria-label={`Team registration closes in ${accessibleValue}`}>
    {labels.map((label, index) => <div key={label}><b>{time ? String(time[index]).padStart(2, '0') : '--'}</b><small>{label}</small></div>)}
  </div>
}
