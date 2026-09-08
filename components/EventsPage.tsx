import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import type { EventRecord } from '@/lib/data'
import { events } from '@/lib/data'
import { Navbar } from '@/components/Navbar'
import { PixelButton } from '@/components/PixelButton'
import { SkyWorld } from '@/components/SkyWorld'
import { SiteFooter } from '@/components/SiteFooter'

export function EventsPage() {
  return <main className="game-world events-world">
    <SkyWorld />
    <Navbar />

    <section id="event-list" className="poster-page zone" aria-labelledby="events-page-title">
      <header className="poster-page-head">
        <p className="eyebrow dark">WORLD 02　·　POSTER WALL</p>
        <h1 id="events-page-title">EVENTS</h1>
        <p>Six arenas. Six ways to make the machine prove itself. Select a poster to load the full mission brief.</p>
      </header>

      <div className="poster-grid">
        {events.map((event) => <EventPoster event={event} key={event.slug} />)}
      </div>

      <div className="events-page-cta"><PixelButton href="/contact?subject=Registration%20support#transmission">Need a squad briefing?</PixelButton><Link href="/#schedule">View mission timeline →</Link></div>
    </section>

    <SiteFooter />
  </main>
}

function EventPoster({ event }: { event: EventRecord }) {
  return <article className="poster-entry">
    <Link className="poster-link" href={`/events/${event.slug}`} aria-label={`Open ${event.title} mission brief`}>
      <div className="poster-frame">
        <div className="poster-sheet">
          <Image src={event.artwork} alt={`Pixel-art poster for ${event.title}`} width={event.artworkWidth} height={event.artworkHeight} />
        </div>
      </div>
      <h2>{event.title}</h2>
      <dl className="poster-meta">
        <div><dt>TEAM</dt><dd>{event.teamSize}</dd></div>
        <div><dt>LEVEL</dt><dd>{event.difficulty}</dd></div>
        <div><dt>PRIZE</dt><dd>{event.prizePool}</dd></div>
      </dl>
      <span className="poster-cta">OPEN MISSION <ArrowRight size={15} aria-hidden="true" /></span>
    </Link>
  </article>
}
