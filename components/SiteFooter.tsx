import { Instagram, Linkedin, Mail, Youtube } from 'lucide-react'
import Link from 'next/link'

export function SiteFooter() {
  return <footer id="contact"><div className="footer-console"><i className="footer-bolt tl"/><i className="footer-bolt tr"/><div className="footer-brand"><span className="mini-bot">● ●</span> ROBOFIESTA’26</div><p>© 2026 RoboFiesta. Built by the RVITM Robotics Community.</p><div className="footer-controls"><a className="footer-game-button" aria-label="Instagram"><Instagram/><span>IG</span></a><a className="footer-game-button" aria-label="LinkedIn"><Linkedin/><span>IN</span></a><a className="footer-game-button" aria-label="YouTube"><Youtube/><span>YT</span></a><Link href="/contact" className="footer-game-button" aria-label="Contact RoboFiesta"><Mail/><span>MAIL</span></Link></div><b className="maker-badge"><i/>MADE FOR MAKERS</b></div></footer>
}
