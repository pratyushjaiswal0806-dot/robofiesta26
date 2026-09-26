'use client'

import dynamic from 'next/dynamic'

const EventCoverflow = dynamic(() => import('@/components/EventCoverflow'), {
  ssr: false,
  loading: () => <div className="event-coverflow-loading mb-20 w-full overflow-hidden py-6 shadow-[0_7px_0_0_#2A1454]" aria-hidden="true" />,
})

export function DeferredEventCoverflow() {
  return <EventCoverflow />
}
