import { Clock3, Mail, MapPin, Phone, Radio } from 'lucide-react'
import { Navbar } from '@/components/Navbar'
import { ContactForm } from '@/components/ContactForm'
import { PixelRobot, Sparkles } from '@/components/PixelArt'
import { SkyWorld } from '@/components/SkyWorld'
import { SiteFooter } from '@/components/SiteFooter'
import { site } from '@/lib/site'

export function ContactPage() {
  return <main className="game-world contact-world">
    <SkyWorld />
    <Navbar />

    <section className="contact-hero zone" aria-labelledby="contact-title">
      <Sparkles />
      <div className="contact-hero-copy">
        <p className="eyebrow">WORLD 03　·　COMMS BAY</p>
        <h1 id="contact-title">CONTACT<br /><span>US</span></h1>
        <p>Questions about events, registration, sponsorships, or getting your bot through the front gate? Open a transmission.</p>
      </div>
      <div className="contact-console" aria-label="Communications channel online">
        <div className="contact-screen"><Radio aria-hidden="true" /><PixelRobot /><span>CHANNEL ONLINE</span><i aria-hidden="true">● ● ● ● ●</i></div>
        <div className="console-readout"><span>FREQ</span><b>26.10 MHz</b></div>
        <div className="console-readout"><span>STATUS</span><b>READY</b></div>
      </div>
    </section>

    <div className="contact-transition" aria-hidden="true"><i /><span>↓</span><i /></div>

    <section className="contact-zone zone" aria-labelledby="contact-form-title">
      <div className="contact-details">
        <p className="eyebrow dark">DIRECT CHANNELS</p>
        <h2>REACH THE<br />BASE CAMP</h2>
        <div className="contact-cards">
          <a href={`mailto:${site.contact.email}`}><Mail aria-hidden="true" /><span><small>EMAIL</small><b>{site.contact.email}</b></span></a>
          <a href={`tel:${site.contact.phone}`}><Phone aria-hidden="true" /><span><small>PHONE</small><b>{site.contact.phoneLabel}</b></span></a>
          <div><MapPin aria-hidden="true" /><span><small>VENUE</small><b>{site.contact.address}</b></span></div>
          <div><Clock3 aria-hidden="true" /><span><small>OFFICE HOURS</small><b>{site.contact.hours}</b></span></div>
        </div>
      </div>

      <ContactForm />
    </section>

    <SiteFooter />
  </main>
}
