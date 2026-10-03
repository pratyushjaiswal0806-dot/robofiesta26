'use client'

import { type FormEvent, useEffect, useState } from 'react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { Menu, Search, Volume2, VolumeX, X } from 'lucide-react'
import { useSound } from './SoundSystem'

const links = [
  ['Home', '/'],
  ['Events', '/events'],
  ['Schedule', '/#schedule'],
  ['Contact', '/contact'],
] as const

export function Navbar() {
  const [open, setOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const pathname = usePathname()
  const router = useRouter()
  const { enabled, toggle, trackTitle } = useSound()
  const isActive = (href: string) => !href.includes('#') && pathname === href

  useEffect(() => {
    setOpen(false)
    setSearchOpen(false)
  }, [pathname])

  function submitEventSearch(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const query = searchQuery.trim()
    setSearchOpen(false)
    router.push(query ? `/events?search=${encodeURIComponent(query)}` : '/events')
  }

  return <header className="nav-wrap">
    <nav className="navbar" aria-label="Primary navigation">
      <Link href="/" prefetch={false} className="brand"><span className="mini-bot" aria-hidden="true">● ●</span> ROBOFIESTA’26</Link>
      <div className="nav-links">{links.map(([label, href]) => <Link key={href} href={href} prefetch={false} className={isActive(href) ? 'active' : ''} aria-current={isActive(href) ? 'page' : undefined}>{label}</Link>)}</div>
      <div className="nav-actions">
        <button type="button" onClick={toggle} aria-label={`${enabled ? 'Pause' : 'Play'} 8-bit music: ${trackTitle}`} title={`8-bit music: ${trackTitle}`} aria-pressed={enabled} className={`sound ${enabled ? 'is-on' : ''}`}>{enabled ? <Volume2 size={16} aria-hidden="true" /> : <VolumeX size={16} aria-hidden="true" />}<span>{enabled ? 'ON' : 'OFF'}</span></button>
        <div className="nav-search-control">
          <button type="button" className="nav-search" aria-label="Search events" aria-expanded={searchOpen} aria-controls="event-search-popover" onClick={() => setSearchOpen((value) => !value)}><Search size={16} aria-hidden="true" /><span>SEARCH</span></button>
          {searchOpen && <form id="event-search-popover" className="nav-search-popover" role="search" onSubmit={submitEventSearch}>
            <label htmlFor="nav-event-search">SEARCH EVENTS</label>
            <div className="nav-search-field">
              <input id="nav-event-search" type="search" value={searchQuery} onChange={(event) => setSearchQuery(event.target.value)} onKeyDown={(event) => { if (event.key === 'Escape') setSearchOpen(false) }} placeholder="Search an arena" autoComplete="off" autoFocus />
              <button type="submit" aria-label="Submit event search"><Search size={16} aria-hidden="true" /></button>
            </div>
          </form>}
        </div>
        <button type="button" aria-label={open ? 'Close menu' : 'Open menu'} aria-expanded={open} aria-controls="mobile-navigation" className="menu" onClick={() => setOpen((value) => !value)}>{open ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}</button>
      </div>
    </nav>
    {open && <div id="mobile-navigation" className="mobile-menu" aria-label="Mobile navigation">{links.map(([label, href]) => <Link onClick={() => setOpen(false)} key={href} href={href} prefetch={false} className={isActive(href) ? 'active' : ''} aria-current={isActive(href) ? 'page' : undefined}>{label}</Link>)}</div>}
  </header>
}
