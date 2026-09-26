import Image from 'next/image'
import Link from 'next/link'
import { ArrowLeft, CalendarDays, Clock3, Trophy, Users } from 'lucide-react'
import type { EventRecord } from '@/lib/data'
import { Navbar } from '@/components/Navbar'
import { PixelButton } from '@/components/PixelButton'
import { SkyWorld } from '@/components/SkyWorld'
import { SiteFooter } from '@/components/SiteFooter'

export function EventDetailPage({ event }: { event: EventRecord }) {
  const registrationHref = `/contact?subject=${encodeURIComponent(`Registration support — ${event.title}`)}&event=${encodeURIComponent(event.title)}#transmission`

  return <main className="game-world events-world">
    <SkyWorld />
    <Navbar />

    <section className="event-detail-page zone" aria-labelledby="event-detail-title">
      <div className="event-detail-head">
        <Link href="/events" prefetch={false} className="back-link"><ArrowLeft size={16} aria-hidden="true" /> Back to poster wall</Link>
        <p className="eyebrow dark">WORLD 02　·　LEVEL {event.level}</p>
        <h1 id="event-detail-title">{event.title}</h1>
        <p className="event-detail-lede">{event.description}</p>
      </div>

      <div className="event-detail-layout">
        <div className="event-detail-art">
          <Image src={event.artwork} alt={`Pixel-art poster for ${event.title}`} width={event.artworkWidth} height={event.artworkHeight} sizes="(max-width: 760px) 100vw, 50vw" quality={90} priority />
          <span className="event-detail-icon" aria-hidden="true">{event.icon}</span>
        </div>

        <div className="event-detail-copy">
          <div className="event-detail-chips"><span>{event.teamSize}</span><span>{event.difficulty}</span></div>
          <dl className="event-specs">
            <div><dt><CalendarDays size={17} aria-hidden="true" /> TIMING</dt><dd>{event.timing}</dd></div>
            <div><dt><Clock3 size={17} aria-hidden="true" /> FORMAT</dt><dd>{event.format}</dd></div>
            <div><dt><Users size={17} aria-hidden="true" /> TEAM SIZE</dt><dd>{event.teamSize}</dd></div>
            <div><dt><Trophy size={17} aria-hidden="true" /> PRIZE INFO</dt><dd>{event.prizePool}</dd></div>
          </dl>
          <div className="event-detail-action"><PixelButton href={registrationHref}>Register for this event</PixelButton><span>Registration gateway →</span></div>
        </div>
      </div>

      <div className="event-rules-layout">
        <section className="event-rules" aria-labelledby="rules-title">
          <p className="eyebrow dark">MISSION PROTOCOL</p>
          <h2 id="rules-title">HOW TO PLAY</h2>
          <ol>{event.rules.map((rule, index) => <li key={rule}><b>{String(index + 1).padStart(2, '0')}</b><span>{rule}</span></li>)}</ol>
        </section>
        <aside className="rulebook-note"><span className="status-dot" aria-hidden="true" /><strong>RULEBOOK SIGNAL</strong><p>Preview brief loaded. Official specifications, fees, judging, and safety checks will be added here when the organiser release is locked.</p><Link href="/contact?subject=Rulebook%20question#transmission" prefetch={false}>Ask the comms bay →</Link></aside>
      </div>
    </section>

    <SiteFooter />
  </main>
}
