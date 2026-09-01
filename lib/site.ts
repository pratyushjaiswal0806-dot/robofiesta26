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
  contact: {
    email: 'info.rvitm@rvei.edu.in',
    phone: '08035095100',
    phoneLabel: '080-35095100',
    address: 'Chaithanya Layout, 8th Phase, JP Nagar, Bengaluru, Karnataka 560076',
    hours: 'Mon–Fri 09:00–17:00 · Sat 09:00–14:00',
  },
  startDate: '2026-10-16T09:00:00+05:30',
  endDate: '2026-10-18T18:00:00+05:30',
} as const
