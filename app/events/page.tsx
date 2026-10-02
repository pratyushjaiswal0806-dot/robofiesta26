import type { Metadata } from 'next'
import { EventsPage } from '@/components/EventsPage'

export const metadata: Metadata = {
  title: 'Events — Choose Your Arena',
  description: 'Explore all 17 RoboFiesta 2026 event posters and mission briefs.',
  alternates: { canonical: '/events' },
  openGraph: {
    title: "RoboFiesta'26 Events — Choose Your Arena",
    description: 'Seventeen events and one student festival arena at RVITM Bangalore.',
    url: '/events',
    images: [{ url: '/opengraph-image', width: 1200, height: 630, alt: "RoboFiesta'26 event arenas" }],
  },
  twitter: {
    card: 'summary_large_image',
    title: "RoboFiesta'26 Events — Choose Your Arena",
    description: 'Explore 17 events at RoboFiesta’26.',
    images: ['/opengraph-image'],
  },
}

type EventsRouteProps = {
  searchParams?: { search?: string | string[] }
}

export default function Events({ searchParams }: EventsRouteProps) {
  const searchQuery = typeof searchParams?.search === 'string' ? searchParams.search : ''

  return <EventsPage searchQuery={searchQuery}/>
}
