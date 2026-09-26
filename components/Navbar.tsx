'use client'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Menu, Volume2, VolumeX, X } from 'lucide-react'
import { PixelButton } from './PixelButton'
import { useSound } from './SoundSystem'
const links = [
  ['Home', '/'],
  ['Events', '/events'],
  ['Schedule', '/#schedule'],
  ['Contact', '/contact'],
] as const

export function Navbar() {
  const [open, setOpen] = useState(false)
  const pathname = usePathname()
  const { enabled, toggle } = useSound()
  const isActive = (href: string) => !href.includes('#') && pathname === href

  useEffect(() => setOpen(false), [pathname])

  return <header className="nav-wrap"><nav className="navbar" aria-label="Primary navigation"><Link href="/" prefetch={false} className="brand"><span className="mini-bot" aria-hidden="true">● ●</span> ROBOFIESTA’26</Link><div className="nav-links">{links.map(([label, href]) => <Link key={href} href={href} prefetch={false} className={isActive(href) ? 'active' : ''} aria-current={isActive(href) ? 'page' : undefined}>{label}</Link>)}</div><div className="nav-actions"><button type="button" onClick={toggle} aria-label={`${enabled ? 'Pause' : 'Play'} Für Elise 8-bit soundtrack`} title="Für Elise — 8-bit soundtrack" aria-pressed={enabled} className={`sound ${enabled ? 'is-on' : ''}`}>{enabled ? <Volume2 size={16} aria-hidden="true" /> : <VolumeX size={16} aria-hidden="true" />}<span>{enabled ? 'ON' : 'OFF'}</span></button><div className="reg"><PixelButton href="/contact?subject=Registration%20support#transmission">Register Now</PixelButton></div><button type="button" aria-label={open ? 'Close menu' : 'Open menu'} aria-expanded={open} aria-controls="mobile-navigation" className="menu" onClick={() => setOpen(!open)}>{open ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}</button></div></nav>{open && <div id="mobile-navigation" className="mobile-menu" aria-label="Mobile navigation">{links.map(([label, href]) => <Link onClick={() => setOpen(false)} key={href} href={href} prefetch={false} className={isActive(href) ? 'active' : ''} aria-current={isActive(href) ? 'page' : undefined}>{label}</Link>)}<PixelButton href="/contact?subject=Registration%20support#transmission">Register Now</PixelButton></div>}</header>
}
