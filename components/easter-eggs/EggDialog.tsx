'use client'

import { type ReactNode, useEffect, useRef } from 'react'

const focusableSelector = 'button:not([disabled]), a[href], [tabindex]:not([tabindex="-1"])'

type EggDialogProps = {
  label: string
  className: string
  onClose: () => void
  children: ReactNode
}

/** Modal shell shared by the reveal and the vault: focus trap, Escape, scroll lock, focus return. */
export function EggDialog({ label, className, onClose, children }: EggDialogProps) {
  const panelRef = useRef<HTMLDivElement>(null)
  const closeRef = useRef(onClose)
  closeRef.current = onClose

  useEffect(() => {
    const previous = document.activeElement instanceof HTMLElement ? document.activeElement : null
    const panel = panelRef.current
    document.documentElement.classList.add('egg-dialog-open')
    const initial = panel?.querySelector<HTMLElement>('[data-autofocus]') ?? panel
    initial?.focus({ preventScroll: true })

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault()
        closeRef.current()
        return
      }
      if (event.key !== 'Tab' || !panel) return
      const items = Array.from(panel.querySelectorAll<HTMLElement>(focusableSelector))
      if (!items.length) return
      const first = items[0]
      const last = items[items.length - 1]
      if (event.shiftKey && (document.activeElement === first || document.activeElement === panel)) {
        event.preventDefault()
        last.focus()
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault()
        first.focus()
      }
    }
    document.addEventListener('keydown', handleKeyDown)
    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      document.documentElement.classList.remove('egg-dialog-open')
      previous?.focus({ preventScroll: true })
    }
  }, [])

  return <div className={`egg-overlay ${className}`} onClick={(event) => { if (event.target === event.currentTarget) onClose() }}>
    <div ref={panelRef} className="egg-dialog" role="dialog" aria-modal="true" aria-label={label} tabIndex={-1}>
      {children}
    </div>
  </div>
}
