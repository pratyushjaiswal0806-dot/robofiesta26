import type { Metadata } from 'next'
import { ContactPage } from '@/components/ContactPage'

export const metadata: Metadata = {
  title: 'Contact Us',
  description: 'Contact the RoboFiesta 2026 team at RVITM for event, registration, sponsorship, and venue enquiries.',
  alternates: { canonical: '/contact' },
  openGraph: {
    title: "Contact RoboFiesta'26",
    description: 'Open a transmission to the RoboFiesta team at RVITM, Bangalore.',
    url: '/contact',
    images: [{ url: '/opengraph-image', width: 1200, height: 630, alt: "RoboFiesta'26 communications bay" }],
  },
  twitter: {
    card: 'summary_large_image',
    title: "Contact RoboFiesta'26",
    description: 'Open a transmission to the RoboFiesta team at RVITM, Bangalore.',
    images: ['/opengraph-image'],
  },
}

export default function Contact() {
  return <ContactPage/>
}
