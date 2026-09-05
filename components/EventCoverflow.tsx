"use client"

import { CoverflowCarousel, type CoverflowSlide } from '@/components/ui/coverflow-carousel'
import { events } from '@/lib/data'

const slides: CoverflowSlide[] = events.map((event) => ({
  src: event.artwork,
  alt: `Pixel-art poster for the ${event.title} event`,
  title: event.title,
  subtitle: `Level ${event.level} · ${event.description}`,
  href: `/events/${event.slug}`,
  meta: [
    { label: 'Team', value: event.teamSize },
    { label: 'Level', value: event.difficulty },
    { label: 'Prize Pool', value: event.prizePool },
  ],
}))

export default function EventCoverflow() {
  return (
    <div className="mb-20 w-full overflow-hidden border-y-4 border-[#2A1454] bg-[#FFF6DC]/90 py-6 shadow-[0_7px_0_0_#2A1454] [background-image:radial-gradient(#2A145433_1px,transparent_1px)] [background-size:16px_16px]">
      <CoverflowCarousel slides={slides} />
    </div>
  )
}
