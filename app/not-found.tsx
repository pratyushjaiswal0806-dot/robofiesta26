import type { Metadata } from 'next'
import { Navbar } from '@/components/Navbar'
import { PixelButton } from '@/components/PixelButton'
import { PixelRobot, Sparkles } from '@/components/PixelArt'
import { SiteFooter } from '@/components/SiteFooter'
import { SkyWorld } from '@/components/SkyWorld'

export const metadata: Metadata = {
  title: '404 — Signal Lost',
  description: 'This RoboFiesta transmission could not be found.',
  robots: { index: false, follow: true },
}

export default function NotFound() {
  return <main className="game-world not-found-world">
    <SkyWorld/>
    <Navbar/>
    <section className="not-found-zone zone">
      <Sparkles/>
      <div className="not-found-copy">
        <p className="eyebrow">ERROR WORLD　·　SIGNAL LOST</p>
        <div className="error-code" aria-label="Error 404"><span>4</span><PixelRobot/><span>4</span></div>
        <h1>PAGE NOT FOUND</h1>
        <p>The coordinates point to empty space. This page may have moved, powered down, or never entered the arena.</p>
        <div className="not-found-actions"><PixelButton href="/">Return Home</PixelButton><PixelButton href="/events" secondary>Explore Events</PixelButton></div>
      </div>
      <div className="not-found-console" aria-hidden="true">
        <div className="lost-screen"><i className="radar-ring one"/><i className="radar-ring two"/><i className="radar-sweep"/><b className="lost-blip"/><span>NO SIGNAL</span></div>
        <div className="lost-readout"><span>SECTOR</span><b>404</b></div>
        <div className="lost-readout"><span>STATUS</span><b>OFFLINE</b></div>
      </div>
    </section>
    <SiteFooter/>
  </main>
}
