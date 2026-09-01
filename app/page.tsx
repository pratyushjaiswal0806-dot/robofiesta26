'use client'
import { useState } from 'react'
import { ChevronDown, Trophy, Medal, Cpu } from 'lucide-react'
import { fest, faqs } from '@/lib/data'
import { Navbar } from '@/components/Navbar'
import { PixelButton } from '@/components/PixelButton'
import { Countdown } from '@/components/Countdown'
import { PixelCloud, PixelRobot, Sparkles, Vault } from '@/components/PixelArt'
import { SchedulePanel } from '@/components/SchedulePanel'
import { SkyWorld } from '@/components/SkyWorld'
import EventCoverflow from '@/components/EventCoverflow'
import { SiteFooter } from '@/components/SiteFooter'
import { PixelRacer } from '@/components/PixelRacer'

const Reveal=({children}:{children:React.ReactNode})=><div className="reveal-block">{children}</div>
export default function Page(){const [faq,setFaq]=useState<number|null>(null);return <main className="game-world"><SkyWorld/><Navbar/><section id="home" className="hero zone"><div className="pixel-moon"><i/><b/><span/></div><PixelCloud className="hero-cloud one"/><PixelCloud className="hero-cloud two"/><Sparkles/><div className="satellite">◉<i>⌁</i></div><div className="hero-content"><div className="eyebrow hero-intro">LEVEL 01　·　ANNUAL COLLEGE ROBOTICS FEST</div><div className="mascot-float"><PixelRobot className="hero-robot"/></div><div className="hero-title-parallax"><h1><span data-title="ROBO">ROBO</span><span data-title="FIESTA">FIESTA</span><em data-title="’26">’26</em></h1></div><div className="hero-copy-parallax"><p className="tagline">Where Circuits Come Alive.</p><p className="hero-meta">{fest.date}　•　{fest.venue}</p><div className="hero-actions"><PixelButton>Register Your Team</PixelButton><PixelButton href="/events" secondary>Explore Events</PixelButton></div></div></div><a href="#sponsors" className="scroll-hint">SCROLL TO ENTER THE ARENA <b>↓</b></a></section>

<section id="sponsors" className="sponsors zone"><div className="section-head"><p className="eyebrow dark">PIT CREW</p><h2>POWERING THE BUILDERS</h2><p>RoboFiesta’26 is made possible by organizations that believe in the next generation of engineers.</p></div>{['Title Sponsor','Gold Partners','Community Partners','Media Partners'].map((tier,i)=><div className="sponsor-row" key={tier}><h3>{tier}</h3><div>{Array.from({length:i===0?1:i===1?3:4}).map((_,x)=><span key={x}>YOUR<br/>LOGO HERE</span>)}</div></div>)}<div className="sponsor-cta"><PixelButton>Partner With Us</PixelButton><a href="/contact">Sponsor brochure ↗</a></div></section>

<section id="mission" className="mission zone"><Reveal><div className="transmission"><span className="status-dot"/><div className="chip-arm">╚═◈═╗</div><p className="eyebrow dark">TRANSMISSION RECEIVED</p><h2>THE ARENA IS OPEN.</h2><p>RoboFiesta’26 brings together the sharpest student builders for three days of robotics, innovation, competition, workshops, and high-voltage ideas.</p><div className="stat-row">{[['⚙','20+ Events'],['♛','₹X Lakhs in Prizes'],['▦','3 Days of Innovation'],['⌘','1000+ Participants']].map(([icon,x])=><b key={x}><i aria-hidden="true">{icon}</i>{x}</b>)}</div><p className="count-label">TEAM REGISTRATION CLOSES IN</p><Countdown/><div className="mission-ctas"><PixelButton>Start Registration</PixelButton><a href="/events#event-list">Download Rulebook →</a></div></div></Reveal></section>

<section id="events" className="events events-preview zone"><div className="section-head"><p className="eyebrow dark">LEVEL SELECT</p><h2>CHOOSE YOUR ARENA</h2><p>Pick a challenge. Assemble your crew. Let the machines do the talking.</p></div><EventCoverflow/><div className="events-preview-action"><PixelButton href="/events">Enter Events Page</PixelButton><p>06 challenges online　·　rulebooks incoming</p></div></section>

<section id="schedule" className="schedule zone"><Reveal><div className="section-head"><p className="eyebrow dark">COMMAND CENTER</p><h2>MISSION TIMELINE</h2></div><SchedulePanel/></Reveal></section>

<section id="prizes" className="prizes zone"><Reveal><div className="prize-copy"><p className="eyebrow dark">LEVEL REWARD</p><h2>UNLOCK THE<br/>PRIZE VAULT</h2><p>Bring the best build, the smartest code, and the boldest idea. The arena rewards teams that push beyond the expected.</p><PixelButton>View Prize Categories</PixelButton></div></Reveal><div className="vault-stage"><Sparkles/><Vault/></div><div className="prize-cards">{[[Trophy,'Champion','Cash Prize + Trophy'],[Medal,'Runner-Up','Cash Prize + Trophy'],[Cpu,'Special Awards','Best Design, Best Innovation, Crowd Favorite']].map(([Icon,title,copy])=>{const I=Icon as typeof Trophy;return <div className="prize-card" key={String(title)}><I/><h3>{String(title)}</h3><p>{String(copy)}</p><small>DETAILS TBA</small></div>})}</div></section>

<section className="experience zone"><div className="section-head"><p className="eyebrow dark">XP UNLOCKED</p><h2>MORE THAN A COMPETITION</h2></div><div className="feature-grid">{[['⌁','Build','Hands-on workshops, mentor sessions, and open build zones.'],['⚙','Battle','High-energy robotics competitions across skill levels.'],['◎','Meet','Connect with builders, alumni, experts, and campus communities.'],['↗','Launch','Showcase projects, find collaborators, and build your portfolio.']].map(([icon,t,d])=><Reveal key={t}><article className="feature"><i>{icon}</i><h3>{t}</h3><p>{d}</p></article></Reveal>)}</div></section>

<section id="faq" className="faq zone"><div className="section-head"><p className="eyebrow dark">HELP DESK</p><h2>SYSTEM DIAGNOSTICS</h2></div><div className="faq-list">{faqs.map(([q,a],i)=><div className="faq-item" key={q}><button onClick={()=>setFaq(faq===i?null:i)} aria-expanded={faq===i}><span>0{i+1}</span>{q}<ChevronDown className={faq===i?'flip':''}/></button>{faq===i&&<p className="faq-answer">{a}</p>}</div>)}</div></section>

<section className="credits zone"><div className="section-head"><p className="eyebrow dark">CREDITS ROLL</p><h2>THE PEOPLE BEHIND<br/>THE MACHINES</h2></div><div className="people-grid">{Array.from({length:18}).map((_,i)=><div className="person" key={i}><div>◉<br/>▰</div><small>{['FACULTY','CORE TEAM','TECH TEAM','MEDIA'][i%4]}</small><b>Team Member</b></div>)}</div><p>Made with caffeine, curiosity, and an unreasonable number of zip ties.</p></section>

<section id="register" className="final game-final zone"><PixelCloud className="final-cloud one"/><PixelCloud className="final-cloud two"/><div className="flyer"><div className="pixel-drone"><i/><i/><b/></div><strong>READY TO BUILD?</strong></div><div className="final-layout"><div className="final-content"><p className="eyebrow dark">FINAL LEVEL</p><h2>YOUR NEXT BUILD<br/>STARTS HERE.</h2><p>Bring your team, your tools, and your wildest idea to RoboFiesta’26.</p><PixelButton>Register Now</PixelButton><PixelButton href="/contact" secondary>Contact Organizers</PixelButton></div><PixelRacer/></div><div className="ground"><i className="buried-gear">⚙</i><i className="buried-board">▦</i></div></section>

<SiteFooter/></main>}
