'use client'
import { useState } from 'react'
import { Menu, Volume2, VolumeX, X } from 'lucide-react'
import { PixelButton } from './PixelButton'
import { useSound } from './SoundSystem'
const links = [['Home','home'],['Events','events'],['Schedule','schedule'],['Prizes','prizes'],['Sponsors','sponsors'],['FAQ','faq']]
export function Navbar() { const [open,setOpen]=useState(false); const { enabled, toggle } = useSound(); return <header className="nav-wrap"><nav className="navbar"><a href="#home" className="brand"><span className="mini-bot">● ●</span> ROBOFIESTA’26</a><div className="nav-links">{links.map(([x,id])=><a key={id} href={`#${id}`}>{x}</a>)}</div><div className="nav-actions"><button onClick={toggle} aria-label={`${enabled?'Turn off':'Turn on'} background music`} aria-pressed={enabled} className={`sound ${enabled?'is-on':''}`}>{enabled?<Volume2 size={16}/>:<VolumeX size={16}/>}<span>{enabled?'ON':'OFF'}</span></button><div className="reg"><PixelButton>Register Now</PixelButton></div><button aria-label="Open menu" className="menu" onClick={()=>setOpen(!open)}>{open?<X/>:<Menu/>}</button></div></nav>{open&&<div className="mobile-menu">{links.map(([x,id])=><a onClick={()=>setOpen(false)} key={id} href={`#${id}`}>{x}</a>)}<PixelButton>Register Now</PixelButton></div>}</header> }
