'use client'
import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Menu, Volume2, VolumeX, X } from 'lucide-react'
import { PixelButton } from './PixelButton'
import { useSound } from './SoundSystem'
const links = [
  ['Home','/'],
  ['Events','/events'],
  ['Schedule','/#schedule'],
  ['Contact','/contact'],
] as const

export function Navbar() {
  const [open,setOpen]=useState(false)
  const pathname = usePathname()
  const { enabled, toggle } = useSound()
  const isActive = (href: string) => !href.includes('#') && pathname === href

  return <header className="nav-wrap"><nav className="navbar"><Link href="/" className="brand"><span className="mini-bot">● ●</span> ROBOFIESTA’26</Link><div className="nav-links">{links.map(([label,href])=><Link key={href} href={href} className={isActive(href)?'active':''} aria-current={isActive(href)?'page':undefined}>{label}</Link>)}</div><div className="nav-actions"><button onClick={toggle} aria-label={`${enabled?'Pause':'Play'} Für Elise 8-bit soundtrack`} title="Für Elise — 8-bit soundtrack" aria-pressed={enabled} className={`sound ${enabled?'is-on':''}`}>{enabled?<Volume2 size={16}/>:<VolumeX size={16}/>}<span>{enabled?'ON':'OFF'}</span></button><div className="reg"><PixelButton>Register Now</PixelButton></div><button aria-label={open?'Close menu':'Open menu'} aria-expanded={open} className="menu" onClick={()=>setOpen(!open)}>{open?<X/>:<Menu/>}</button></div></nav>{open&&<div className="mobile-menu">{links.map(([label,href])=><Link onClick={()=>setOpen(false)} key={href} href={href} className={isActive(href)?'active':''} aria-current={isActive(href)?'page':undefined}>{label}</Link>)}<PixelButton>Register Now</PixelButton></div>}</header>
}
