'use client'

import type { FormEvent } from 'react'
import { Clock3, Mail, MapPin, Phone, Radio, Send } from 'lucide-react'
import { Navbar } from '@/components/Navbar'
import { PixelRobot, Sparkles } from '@/components/PixelArt'
import { SkyWorld } from '@/components/SkyWorld'
import { SiteFooter } from '@/components/SiteFooter'
import { site } from '@/lib/site'

export function ContactPage() {
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const form = new FormData(event.currentTarget)
    const subject = String(form.get('subject') || 'RoboFiesta enquiry')
    const body = [
      `Name: ${String(form.get('name') || '')}`,
      `Email: ${String(form.get('email') || '')}`,
      `College / Team: ${String(form.get('team') || '')}`,
      '',
      String(form.get('message') || ''),
    ].join('\n')
    window.location.href = `mailto:${site.contact.email}?subject=${encodeURIComponent(`[RoboFiesta'26] ${subject}`)}&body=${encodeURIComponent(body)}`
  }

  return <main className="game-world contact-world">
    <SkyWorld/>
    <Navbar/>

    <section className="contact-hero zone">
      <Sparkles/>
      <div className="contact-hero-copy">
        <p className="eyebrow">WORLD 03　·　COMMS BAY</p>
        <h1>CONTACT<br/><span>US</span></h1>
        <p>Questions about events, registration, sponsorships, or getting your bot through the front gate? Open a transmission.</p>
      </div>
      <div className="contact-console" aria-label="Communications channel online">
        <div className="contact-screen"><Radio/><PixelRobot/><span>CHANNEL ONLINE</span><i>● ● ● ● ●</i></div>
        <div className="console-readout"><span>FREQ</span><b>26.10 MHz</b></div>
        <div className="console-readout"><span>STATUS</span><b>READY</b></div>
      </div>
    </section>

    <div className="contact-transition" aria-hidden="true"><i/><span>↓</span><i/></div>

    <section className="contact-zone zone">
      <div className="contact-details">
        <p className="eyebrow dark">DIRECT CHANNELS</p>
        <h2>REACH THE<br/>BASE CAMP</h2>
        <div className="contact-cards">
          <a href={`mailto:${site.contact.email}`}><Mail/><span><small>EMAIL</small><b>{site.contact.email}</b></span></a>
          <a href={`tel:${site.contact.phone}`}><Phone/><span><small>PHONE</small><b>{site.contact.phoneLabel}</b></span></a>
          <div><MapPin/><span><small>VENUE</small><b>{site.contact.address}</b></span></div>
          <div><Clock3/><span><small>OFFICE HOURS</small><b>{site.contact.hours}</b></span></div>
        </div>
      </div>

      <form className="contact-form" onSubmit={handleSubmit}>
        <div className="form-title"><span>NEW TRANSMISSION</span><i>REC ●</i></div>
        <div className="form-grid">
          <label><span>YOUR NAME</span><input name="name" autoComplete="name" required placeholder="Player one"/></label>
          <label><span>EMAIL ID</span><input name="email" type="email" autoComplete="email" required placeholder="you@example.com"/></label>
        </div>
        <label><span>COLLEGE / TEAM</span><input name="team" autoComplete="organization" placeholder="Your crew or institution"/></label>
        <label><span>SUBJECT</span><select name="subject" defaultValue="Event enquiry"><option>Event enquiry</option><option>Registration support</option><option>Sponsorship</option><option>Venue and travel</option><option>Other</option></select></label>
        <label><span>MESSAGE</span><textarea name="message" rows={6} required placeholder="Type your transmission here..."/></label>
        <button type="submit" className="contact-submit">SEND TRANSMISSION <Send/></button>
        <p className="form-note">This opens your default email app with the transmission prefilled.</p>
      </form>
    </section>

    <SiteFooter/>
  </main>
}
