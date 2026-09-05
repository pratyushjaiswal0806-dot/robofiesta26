import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { events } from '@/lib/data'
import { EventDetailPage } from '@/components/EventDetailPage'

type EventRouteProps = { params: { slug: string } }

export function generateStaticParams() {
  return events.map((event) => ({ slug: event.slug }))
}

export function generateMetadata({ params }: EventRouteProps): Metadata {
  const event = events.find((candidate) => candidate.slug === params.slug)
  if (!event) return { title: 'Event not found' }

  return {
    title: `${event.title} — Mission Brief`,
    description: `${event.description} View team size, timing, rules, prize information, and registration details for RoboFiesta’26.`,
    alternates: { canonical: `/events/${event.slug}` },
    openGraph: {
      title: `${event.title} — RoboFiesta’26`,
      description: event.description,
      url: `/events/${event.slug}`,
      images: [{ url: event.artwork, width: 768, height: 768, alt: `Pixel-art poster for ${event.title}` }],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${event.title} — RoboFiesta’26`,
      description: event.description,
      images: [event.artwork],
    },
  }
}

export default function EventRoute({ params }: EventRouteProps) {
  const event = events.find((candidate) => candidate.slug === params.slug)
  if (!event) notFound()
  return <EventDetailPage event={event} />
}
