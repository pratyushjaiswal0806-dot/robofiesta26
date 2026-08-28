const configuredUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'

export const site = {
  url: configuredUrl.replace(/\/$/, ''),
  name: "RoboFiesta'26",
  title: "RoboFiesta'26 — Where Circuits Come Alive",
  description: "India's student robotics arena for builders, coders, creators, and chaos engineers, hosted at RVITM in Bangalore.",
  organizer: 'RVITM Robotics Community',
  venue: 'RVITM',
  city: 'Bangalore',
  region: 'Karnataka',
  country: 'IN',
  startDate: '2026-10-16T09:00:00+05:30',
  endDate: '2026-10-18T18:00:00+05:30',
} as const
