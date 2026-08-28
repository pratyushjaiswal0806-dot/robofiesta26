import { ReactNode } from 'react'
export function PixelButton({ children, href = '#register', secondary = false, ariaLabel }: { children: ReactNode, href?: string, secondary?: boolean, ariaLabel?: string }) { return <a href={href} aria-label={ariaLabel} className={`pixel-button ${secondary ? 'secondary' : ''}`}>{children}<i>✦</i></a> }
