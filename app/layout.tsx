import type { Metadata, Viewport } from 'next'
import './globals.css'
import { SoundProvider } from '@/components/SoundSystem'
import { StructuredData } from '@/components/StructuredData'
import { MotionDirector } from '@/components/MotionDirector'
import { SiteLoader } from '@/components/SiteLoader'
import { site } from '@/lib/site'

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: site.title, template: `%s | ${site.name}` },
  description: site.description,
  applicationName: site.name,
  authors: [{ name: site.organizer }],
  creator: site.organizer,
  publisher: site.organizer,
  category: 'Education and Robotics',
  icons: {
    icon: [{ url: '/icon.svg', type: 'image/svg+xml' }],
    shortcut: ['/icon.svg'],
  },
  keywords: ['RoboFiesta 2026', 'RVITM robotics fest', 'robotics competition Bangalore', 'college robotics festival India', 'Robo Wars', 'Micromouse Maze', 'Autonomous Rover', 'Drone Dash', 'Line Follower', 'Innovation Expo'],
  alternates: { canonical: '/' },
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    url: '/',
    siteName: site.name,
    title: site.title,
    description: site.description,
    images: [{ url: '/opengraph-image', width: 1200, height: 630, alt: `${site.name} — Where Circuits Come Alive` }],
  },
  twitter: {
    card: 'summary_large_image',
    title: site.title,
    description: site.description,
    images: ['/opengraph-image'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-image-preview': 'large', 'max-snippet': -1, 'max-video-preview': -1 },
  },
}

export const viewport: Viewport = { width: 'device-width', initialScale: 1, colorScheme: 'light', themeColor: '#2A0B4F' }

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return <html lang="en-IN"><body><StructuredData/><SoundProvider><SiteLoader/><MotionDirector/>{children}</SoundProvider></body></html>
}
