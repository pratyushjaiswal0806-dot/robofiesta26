import type { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "RoboFiesta'26 — Where Circuits Come Alive",
    short_name: "RoboFiesta'26",
    description: "RVITM's student robotics festival in Bangalore.",
    start_url: '/',
    display: 'standalone',
    background_color: '#FFF9E6',
    theme_color: '#2A0B4F',
    icons: [{ src: '/icon.svg', sizes: 'any', type: 'image/svg+xml', purpose: 'any' }],
  }
}
