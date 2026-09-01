import Image from 'next/image'
import { events } from '@/lib/data'
import { Navbar } from '@/components/Navbar'
import { SkyWorld } from '@/components/SkyWorld'
import { SiteFooter } from '@/components/SiteFooter'

const posterPlaceholders = [
  '/events/robo-wars.png',
  '/events/micromouse-maze.png',
  '/events/autonomous-rover.png',
  '/events/drone-dash.png',
  '/events/line-follower-x.png',
  '/events/innovation-expo.png',
] as const

export function EventsPage() {
  return <main className="game-world events-world">
    <SkyWorld/>
    <Navbar/>

    <section className="poster-page zone">
      <header className="poster-page-head">
        <p className="eyebrow dark">WORLD 02　·　POSTER WALL</p>
        <h1>EVENTS</h1>
      </header>

      <div className="poster-grid">
        {events.map((event,index)=><article className="poster-entry" key={event[0]}>
          <div className="poster-frame">
            <div className="poster-sheet">
              <Image src={posterPlaceholders[index % posterPlaceholders.length]} alt={`${event[1]} poster placeholder`} width={768} height={768} priority={index < 4}/>
            </div>
          </div>
          <h2>{event[1]}</h2>
        </article>)}
      </div>
    </section>

    <SiteFooter/>
  </main>
}
