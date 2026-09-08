import { Instagram, Linkedin, Mail, Youtube } from 'lucide-react'
import Link from 'next/link'

export function SiteFooter() {
  return <footer id="contact" className="site-footer">
    <div className="footer-console">
      <i className="footer-bolt tl" aria-hidden="true" />
      <i className="footer-bolt tr" aria-hidden="true" />

      <div className="footer-console-header">
        <span className="footer-console-title"><i aria-hidden="true" /> ROBOFIESTA NETWORK // RF-26</span>
        <span className="footer-console-status"><i aria-hidden="true" /> SIGNAL ONLINE</span>
      </div>

      <div className="footer-main">
        <div className="footer-copy">
          <p className="footer-kicker">END OF TRANSMISSION</p>
          <Link href="/" className="footer-brand" aria-label="RoboFiesta home">
            <span className="mini-bot" aria-hidden="true">● ●</span>
            <span>ROBOFIESTA<span className="footer-brand-year">’26</span></span>
          </Link>
          <p className="footer-description">A student-built robotics festival for curious minds, fearless builds, and the next generation of makers.</p>
          <nav className="footer-links" aria-label="Footer navigation">
            <Link href="/">Home</Link>
            <Link href="/events">Events</Link>
            <Link href="/contact">Contact</Link>
            <Link href="/contact?subject=Registration%20support#transmission">Register</Link>
          </nav>
        </div>

        <div className="footer-channel-panel">
          <div className="footer-channel-heading">
            <div><p>OPEN CHANNELS</p><span>Social signals incoming</span></div>
            <b>04 CHANNELS</b>
          </div>
          <div className="footer-controls">
            <span className="footer-game-button footer-link-pending" role="img" aria-label="Instagram profile link coming soon"><Instagram aria-hidden="true"/><span>IG</span></span>
            <span className="footer-game-button footer-link-pending" role="img" aria-label="LinkedIn profile link coming soon"><Linkedin aria-hidden="true"/><span>IN</span></span>
            <span className="footer-game-button footer-link-pending" role="img" aria-label="YouTube profile link coming soon"><Youtube aria-hidden="true"/><span>YT</span></span>
            <Link href="/contact" className="footer-game-button" aria-label="Contact RoboFiesta"><Mail aria-hidden="true"/><span>MAIL</span></Link>
          </div>
        </div>
      </div>

      <div className="footer-console-bottom">
        <b className="maker-badge"><i aria-hidden="true"/>MADE FOR MAKERS</b>
        <span className="footer-location">RVITM ROBOTICS COMMUNITY <i aria-hidden="true">///</i> BANGALORE, INDIA</span>
        <span className="footer-copyright">© 2026 ROBOFIESTA</span>
      </div>
    </div>
  </footer>
}
