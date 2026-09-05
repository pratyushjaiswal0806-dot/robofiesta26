import { Instagram, Linkedin, Mail, Youtube } from 'lucide-react'
import Link from 'next/link'

export function SiteFooter() {
  return <footer id="contact"><div className="footer-console"><i className="footer-bolt tl"/><i className="footer-bolt tr"/><div className="footer-brand"><span className="mini-bot" aria-hidden="true">● ●</span> ROBOFIESTA’26</div><p>© 2026 RoboFiesta. Built by the RVITM Robotics Community.</p><div className="footer-controls"><span className="footer-game-button footer-link-pending" role="img" aria-label="Instagram profile link coming soon"><Instagram aria-hidden="true"/><span>IG</span></span><span className="footer-game-button footer-link-pending" role="img" aria-label="LinkedIn profile link coming soon"><Linkedin aria-hidden="true"/><span>IN</span></span><span className="footer-game-button footer-link-pending" role="img" aria-label="YouTube profile link coming soon"><Youtube aria-hidden="true"/><span>YT</span></span><Link href="/contact" className="footer-game-button" aria-label="Contact RoboFiesta"><Mail aria-hidden="true"/><span>MAIL</span></Link></div><b className="maker-badge"><i aria-hidden="true"/>MADE FOR MAKERS</b></div></footer>
}
