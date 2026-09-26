import { ReactNode } from 'react'
import Link from 'next/link'
export function PixelButton({ children, href = '/#register', secondary = false, ariaLabel }: { children: ReactNode, href?: string, secondary?: boolean, ariaLabel?: string }) { return <Link href={href} prefetch={false} aria-label={ariaLabel} className={`pixel-button ${secondary ? 'secondary' : ''}`}>{children}<i>✦</i></Link> }
