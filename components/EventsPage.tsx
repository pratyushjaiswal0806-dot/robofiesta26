import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import type { CSSProperties } from 'react'
import type { EventRecord } from '@/lib/data'
import { events } from '@/lib/data'
import { Navbar } from '@/components/Navbar'
import { PixelButton } from '@/components/PixelButton'
import { SkyWorld } from '@/components/SkyWorld'
import { SiteFooter } from '@/components/SiteFooter'

type EventsPageProps = {
  searchQuery?: string
}

export function EventsPage({ searchQuery = '' }: EventsPageProps) {
  const normalizedQuery = searchQuery.trim().toLocaleLowerCase()
  const matchingEvents = normalizedQuery
    ? events.filter((event) => `${event.title} ${event.slug.replaceAll('-', ' ')} ${event.description}`.toLocaleLowerCase().includes(normalizedQuery))
    : events

  return <main className="game-world events-world">
    <SkyWorld showProgress={false} />
    <Navbar />

    <section id="event-list" className="poster-page zone" aria-labelledby="events-page-title">
      <header className="poster-page-head">
        <p className="eyebrow dark">WORLD 02　·　POSTER WALL</p>
        <h1 id="events-page-title">EVENTS</h1>
        <p>Seventeen arenas. Seventeen ways to play. Select a poster to load the full mission brief.</p>
      </header>

      {normalizedQuery && <p className="poster-search-result" role="status">{matchingEvents.length} {matchingEvents.length === 1 ? 'arena' : 'arenas'} found for “{searchQuery}”</p>}

      {matchingEvents.length > 0 ? <div className="poster-grid">
        {matchingEvents.map((event) => <EventPoster event={event} key={event.slug} />)}
      </div> : <p className="poster-search-empty" role="status">No arena matches “{searchQuery}”.</p>}

      <div className="events-page-cta"><PixelButton href="/contact?subject=Registration%20support#transmission">Need a squad briefing?</PixelButton><Link href="/#schedule">View mission timeline →</Link></div>
    </section>

    <SiteFooter />
  </main>
}

function EventPoster({ event }: { event: EventRecord }) {
  const style = { '--poster-frame-color': event.frameColor } as CSSProperties

  return <article className="poster-entry" style={style}>
    <Link className="poster-link" href={`/events/${event.slug}`} prefetch={false} aria-label={`Open ${event.title} mission brief`}>
      <div className="poster-frame">
        <div className="poster-sheet">
          <Image src={event.artwork} alt={`Pixel-art poster for ${event.title}`} width={event.artworkWidth} height={event.artworkHeight} sizes="(max-width: 700px) 100vw, (max-width: 1200px) 50vw, 25vw" quality={85} />
        </div>
      </div>
      <h2>{event.title}</h2>
      <span className="poster-cta">OPEN MISSION <ArrowRight size={15} aria-hidden="true" /></span>
    </Link>
  </article>
}
