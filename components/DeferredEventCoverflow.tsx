'use client'

import dynamic from 'next/dynamic'
import { useEffect, useRef, useState } from 'react'

const loadingClassName='event-coverflow-loading mb-20 w-full overflow-hidden py-6 shadow-[0_7px_0_0_#2A1454]'

function EventCoverflowLoading({ containerRef }: { containerRef: (node: HTMLDivElement | null) => void }) {
  return <div ref={containerRef} className={loadingClassName} aria-hidden="true" />
}

const EventCoverflow = dynamic(() => import('@/components/EventCoverflow'), {
  ssr: false,
  loading: () => <div className={loadingClassName} aria-hidden="true" />,
})

export function DeferredEventCoverflow() {
  const [shouldLoad,setShouldLoad]=useState(false)
  const placeholderRef=useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    const placeholder=placeholderRef.current
    if (!placeholder) return
    if (typeof IntersectionObserver === 'undefined') {
      setShouldLoad(true)
      return
    }
    const observer=new IntersectionObserver(([entry]) => {
      if (!entry?.isIntersecting) return
      setShouldLoad(true)
      observer.disconnect()
    },{rootMargin:'600px 0px'})
    observer.observe(placeholder)
    return ()=>observer.disconnect()
  },[])

  return shouldLoad ? <EventCoverflow /> : <EventCoverflowLoading containerRef={(node) => { placeholderRef.current=node }} />
}
