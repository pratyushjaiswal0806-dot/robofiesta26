'use client'

import { useState, type ReactNode } from 'react'
import { ChevronDown, Cpu, Medal, Trophy } from 'lucide-react'
import { fest, faqs, prizeCategories, sponsors, teamPlaceholders } from '@/lib/data'
import { Navbar } from '@/components/Navbar'
import { PixelButton } from '@/components/PixelButton'
import { Countdown } from '@/components/Countdown'
import { PixelAvatar, PixelCloud, PixelRobot, Sparkles, Vault } from '@/components/PixelArt'
import { SchedulePanel } from '@/components/SchedulePanel'
import { SkyWorld } from '@/components/SkyWorld'
import EventCoverflow from '@/components/EventCoverflow'
import { SiteFooter } from '@/components/SiteFooter'

const Reveal = ({ children }: { children: ReactNode }) => <div className="reveal-block">{children}</div>

const prizeIcons = { champion: Trophy, 'runner-up': Medal, 'special-awards': Cpu }

const featureCards = [
  ['⌁', 'Build', 'Hands-on workshops, mentor sessions, and open build zones.'],
  ['⚙', 'Battle', 'High-energy robotics competitions across skill levels.'],
  ['◎', 'Meet', 'Connect with builders, alumni, experts, and campus communities.'],
  ['↗', 'Launch', 'Showcase projects, find collaborators, and build your portfolio.'],
] as const

export default function Page() {
  const [faq, setFaq] = useState<number | null>(null)

  return <main className="game-world">
    <SkyWorld />
    <Navbar />

    <section id="home" className="hero zone" aria-labelledby="home-title">
      <div className="pixel-moon" aria-hidden="true"><i /><b /><span /></div>
      <PixelCloud className="hero-cloud one" />
      <PixelCloud className="hero-cloud two" />
      <Sparkles />
      <div className="satellite" aria-hidden="true">◉<i>⌁</i></div>
      <div className="hero-content">
        <div className="eyebrow hero-intro">LEVEL 01　·　ANNUAL COLLEGE ROBOTICS FEST</div>
        <div className="mascot-float"><PixelRobot className="hero-robot" /></div>
        <div className="hero-title-parallax"><h1 id="home-title"><span data-title="ROBO">ROBO</span><span data-title="FIESTA">FIESTA</span><em data-title="’26">’26</em></h1></div>
        <div className="hero-copy-parallax">
          <p className="tagline">Where Circuits Come Alive.</p>
          <p className="hero-meta">{fest.date}　•　{fest.venue}</p>
          <div className="hero-actions">
            <PixelButton href="/contact?subject=Registration%20support#transmission">Register Your Team</PixelButton>
            <PixelButton href="/events" secondary>Explore Events</PixelButton>
          </div>
        </div>
      </div>
      <a href="#sponsors" className="scroll-hint">SCROLL TO ENTER THE ARENA <b aria-hidden="true">↓</b></a>
    </section>

    <section id="sponsors" className="sponsors zone" aria-labelledby="sponsors-title">
      <div className="section-head">
        <p className="eyebrow dark">PIT CREW</p>
        <h2 id="sponsors-title">POWERING THE BUILDERS</h2>
        <p>RoboFiesta’26 is made possible by organizations that believe in the next generation of engineers.</p>
      </div>
      {sponsors.map((tier) => <div className="sponsor-row" key={tier.tier}>
        <h3>{tier.tier}</h3>
        <div className="sponsor-slots">
          {tier.partners.map((partner) => <span className="sponsor-slot" key={partner.name}>
            {partner.logoSrc ? <img src={partner.logoSrc} alt={partner.alt} /> : <><strong>LOGO SLOT</strong><small>{partner.name}</small></>}
          </span>)}
        </div>
      </div>)}
      <div className="sponsor-cta">
        <PixelButton href="/contact?subject=Sponsorship#transmission">Partner With Us</PixelButton>
        <a href="/contact?subject=Sponsorship#transmission">Request sponsor pack ↗</a>
      </div>
    </section>

    <section id="mission" className="mission zone" aria-labelledby="mission-title">
      <Reveal><div className="transmission">
        <span className="status-dot" aria-hidden="true" />
        <div className="chip-arm" aria-hidden="true">╚═◈═╗</div>
        <p className="eyebrow dark">TRANSMISSION RECEIVED</p>
        <h2 id="mission-title">THE ARENA IS OPEN.</h2>
        <p>RoboFiesta’26 brings together the sharpest student builders for three days of robotics, innovation, competition, workshops, and high-voltage ideas.</p>
        <div className="stat-row">
          {[
            ['⚙', '06 Arena Challenges'],
            ['♛', 'Prize Pool TBA'],
            ['▦', '3 Days of Innovation'],
            ['⌘', '1000+ Participants'],
          ].map(([icon, label]) => <b key={label}><i aria-hidden="true">{icon}</i>{label}</b>)}
        </div>
        <p className="count-label">TEAM REGISTRATION CLOSES IN</p>
        <Countdown />
        <div className="mission-ctas">
          <PixelButton href="/contact?subject=Registration%20support#transmission">Start Registration</PixelButton>
          <a href="/events">Open event rulebooks →</a>
        </div>
      </div></Reveal>
    </section>

    <section id="events" className="events events-preview zone" aria-labelledby="events-title">
      <div className="section-head">
        <p className="eyebrow dark">LEVEL SELECT</p>
        <h2 id="events-title">CHOOSE YOUR ARENA</h2>
        <p>Pick a challenge. Assemble your crew. Let the machines do the talking.</p>
      </div>
      <EventCoverflow />
      <div className="events-preview-action"><PixelButton href="/events">Enter Events Page</PixelButton><p>06 challenges online　·　rulebooks incoming</p></div>
    </section>

    <section id="schedule" className="schedule zone" aria-labelledby="schedule-title">
      <Reveal><div className="section-head"><p className="eyebrow dark">COMMAND CENTER</p><h2 id="schedule-title">MISSION TIMELINE</h2></div><SchedulePanel /></Reveal>
    </section>

    <section id="prizes" className="prizes zone" aria-labelledby="prizes-title">
      <Reveal><div className="prize-copy">
        <p className="eyebrow dark">LEVEL REWARD</p>
        <h2 id="prizes-title">UNLOCK THE<br />PRIZE VAULT</h2>
        <p>Bring the best build, the smartest code, and the boldest idea. The arena rewards teams that push beyond the expected.</p>
        <PixelButton href="#prizes">View Prize Categories</PixelButton>
      </div></Reveal>
      <div className="vault-stage"><Sparkles /><Vault /></div>
      <div className="prize-cards">
        {prizeCategories.map((prize) => {
          const Icon = prizeIcons[prize.id]; return <article className="prize-card" key={prize.id}>
            <Icon aria-hidden="true" />
            <h3>{prize.label}</h3>
            <p>{prize.summary}</p>
            <small>{prize.detail}</small>
          </article>
        })}
      </div>
    </section>

    <section className="experience zone" aria-labelledby="experience-title">
      <div className="section-head"><p className="eyebrow dark">XP UNLOCKED</p><h2 id="experience-title">MORE THAN A COMPETITION</h2></div>
      <div className="feature-grid">{featureCards.map(([icon, title, description]) => <Reveal key={title}><article className="feature"><i aria-hidden="true">{icon}</i><h3>{title}</h3><p>{description}</p></article></Reveal>)}</div>
    </section>

    <section id="faq" className="faq zone" aria-labelledby="faq-title">
      <div className="section-head"><p className="eyebrow dark">HELP DESK</p><h2 id="faq-title">SYSTEM DIAGNOSTICS</h2></div>
      <div className="faq-list">
        {faqs.map((item, index) => {
          const answerId = `faq-answer-${index + 1}`; const isOpen = faq === index; return <div className="faq-item" key={item.question}>
            <button type="button" onClick={() => setFaq(isOpen ? null : index)} aria-expanded={isOpen} aria-controls={answerId}>
              <span aria-hidden="true">{String(index + 1).padStart(2, '0')}</span>{item.question}<ChevronDown className={isOpen ? 'flip' : ''} aria-hidden="true" />
            </button>
            {isOpen && <p id={answerId} className="faq-answer">{item.answer}</p>}
          </div>
        })}
      </div>
    </section>

    <section className="credits zone" aria-labelledby="credits-title">
      <div className="section-head"><p className="eyebrow dark">CREDITS ROLL</p><h2 id="credits-title">THE PEOPLE BEHIND<br />THE MACHINES</h2><p className="team-intro">Roster signals are staged while names, photos, and socials are verified by the organising crew.</p></div>
      <div className="team-status-panel"><span className="status-dot" aria-hidden="true" /><strong>TEAM REVEAL COMING SOON</strong><span>12 encrypted profile slots ready</span></div>
      <div className="people-grid">
        {teamPlaceholders.map((member, index) => <article className="person" key={member.id} aria-label={`${member.role} profile placeholder ${index + 1}`}>
          <PixelAvatar variant={member.avatar} tone={member.tone} />
          <small>{member.role}</small>
          <b>REVEAL SOON</b>
        </article>)}
      </div>
      <p>Made with caffeine, curiosity, and an unreasonable number of zip ties.</p>
    </section>

    <section id="register" className="final zone" aria-labelledby="final-title">
      <PixelCloud className="final-cloud one" /><PixelCloud className="final-cloud two" />
      <div className="flyer"><div className="pixel-drone" aria-hidden="true"><i /><i /><b /></div><strong>READY TO BUILD?</strong></div>
      <div className="final-content"><p className="eyebrow dark">FINAL LEVEL</p><h2 id="final-title">YOUR NEXT BUILD<br />STARTS HERE.</h2><p>Bring your team, your tools, and your wildest idea to RoboFiesta’26.</p><PixelButton href="/contact?subject=Registration%20support#transmission">Register Now</PixelButton><PixelButton href="/contact" secondary>Contact Organizers</PixelButton></div>
      <div className="ground" aria-hidden="true"><i className="buried-gear">⚙</i><i className="buried-board">▦</i></div>
    </section>

    <SiteFooter />
  </main>
}
