import type { Metadata } from 'next'
import { EventsPage } from '@/components/EventsPage'

export const metadata: Metadata = {
  title: 'Events — Choose Your Arena',
  description: 'Explore all six RoboFiesta 2026 robotics events, from Robo Wars and Micromouse Maze to Drone Dash and Innovation Expo.',
  alternates: { canonical: '/events' },
  openGraph: {
    title: "RoboFiesta'26 Events — Choose Your Arena",
    description: 'Six machines, six missions, and one student robotics arena at RVITM Bangalore.',
    url: '/events',
    images: [{ url: '/opengraph-image', width: 1200, height: 630, alt: "RoboFiesta'26 event arenas" }],
  },
  twitter: {
    card: 'summary_large_image',
    title: "RoboFiesta'26 Events — Choose Your Arena",
    description: 'Explore six robotics challenges at RoboFiesta’26.',
    images: ['/opengraph-image'],
  },
}

export default function Events() {
  return <EventsPage/>
}
