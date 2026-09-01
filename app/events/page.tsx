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
  },
}

export default function Events() {
  return <EventsPage/>
}
