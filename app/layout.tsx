import './globals.css'
import { SoundProvider } from '@/components/SoundSystem'

export const metadata = { title: "RoboFiesta'26 | Where Circuits Come Alive", description: 'India’s student robotics arena for builders, coders, creators, and chaos engineers.' }
export default function RootLayout({ children }: { children: React.ReactNode }) { return <html lang="en"><body><SoundProvider>{children}</SoundProvider></body></html> }
