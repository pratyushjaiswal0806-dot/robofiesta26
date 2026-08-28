'use client'
import { motion } from 'framer-motion'

export function PixelRobot({ className = '' }: { className?: string }) { return <div className={`robot ${className}`} aria-label="A friendly pixel robot" role="img"><i className="antenna"/><div className="robot-face"><b>●</b><b>●</b><em/></div><div className="robot-body">✦</div><span className="arm left"/><span className="arm right"/></div> }
export function PixelCloud({ className = '' }: { className?: string }) { return <motion.div animate={{ x: [0, 18, 0] }} transition={{ duration: 8, repeat: Infinity, ease: 'linear' }} className={`cloud ${className}`}><i/><i/><i/></motion.div> }
export function Sparkles() { return <div className="sparkles" aria-hidden="true">{['✦','·','✧','·','✦','✧','·','✦'].map((sparkle,index)=><span key={index} style={{animationDelay:`-${index*.47}s`}}>{sparkle}</span>)}</div> }
export function Vault() { return <div className="vault" aria-label="Open pixel prize vault" role="img"><div className="vault-lid">▦ ◇ ▦</div><div className="vault-box"><span>⚙</span><span>★</span><span>◈</span><span>⚙</span></div></div> }
