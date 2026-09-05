export function PixelRobot({ className = '' }: { className?: string }) { return <div className={`robot ${className}`} aria-label="A friendly pixel robot" role="img"><i className="antenna"/><div className="robot-face"><b>●</b><b>●</b><em/></div><div className="robot-body">✦</div><span className="arm left"/><span className="arm right"/></div> }
export function PixelCloud({ className = '' }: { className?: string }) { return <div className={`cloud ${className}`}><i/><i/><i/></div> }
export function Sparkles() { return <div className="sparkles" aria-hidden="true">{['✦','·','✧','·','✦','✧','·','✦'].map((sparkle,index)=><span key={index} style={{animationDelay:`-${index*.47}s`}}>{sparkle}</span>)}</div> }
export function Vault() { return <div className="vault" aria-label="Open pixel prize vault" role="img"><div className="vault-lid">▦ ◇ ▦</div><div className="vault-box"><span>⚙</span><span>★</span><span>◈</span><span>⚙</span></div></div> }

export function PixelAvatar({ variant, tone }: { variant: string, tone: string }) {
  return <div className={`pixel-avatar avatar-${variant} tone-${tone}`} aria-hidden="true">
    <i className="avatar-hair"/><b className="avatar-face"><span/><span/></b><em className="avatar-body"/>
  </div>
}
