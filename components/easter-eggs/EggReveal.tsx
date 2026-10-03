'use client'

import { type CSSProperties, useEffect, useMemo, useState } from 'react'
import { Archive, Download, Share2, X } from 'lucide-react'
import { EGG_TOTAL, countedIds } from './eggManifest'
import { eggLabel, type EggContent } from './eggTypes'
import { EggCard } from './EggCard'
import { EggDialog } from './EggDialog'
import { eggCardBlob, eggCardFileName } from './eggCardArt'
import type { EggCollection, EggRecord } from './eggStore'

export type RevealSource = 'hunt' | 'vault'

type EggRevealProps = {
  egg: EggContent
  record: EggRecord | undefined
  collection: EggCollection
  isNew: boolean
  source: RevealSource
  onClose: () => void
  onOpenVault: () => void
}

const confettiColors = ['#f4c63f', '#ff5f6d', '#9be7ff', '#68c44a', '#f4dfff', '#fffdf4', '#ff8b78']

export function EggReveal({ egg, record, collection, isNew, source, onClose, onOpenVault }: EggRevealProps) {
  const [status, setStatus] = useState('')
  const [canShare, setCanShare] = useState(false)
  const foundCount = countedIds.filter((id) => collection[id]).length
  const completedHunt = isNew && egg.counted && foundCount === EGG_TOTAL

  const banner = source === 'vault' ? 'FROM YOUR VAULT'
    : !isNew ? 'ALREADY IN YOUR VAULT'
    : completedHunt ? 'ALL SECRETS FOUND!'
    : egg.counted ? 'SECRET UNLOCKED!'
    : 'TRAINING COMPLETE!'

  const confetti = useMemo(() => Array.from({ length: source === 'hunt' ? 48 : 0 }, (_, index) => ({
    '--confetti-x': `${Math.round(Math.random() * 100)}vw`,
    '--confetti-drift': `${Math.round((Math.random() - .5) * 160)}px`,
    '--confetti-delay': `${Math.round(Math.random() * 700)}ms`,
    '--confetti-duration': `${1800 + Math.round(Math.random() * 1600)}ms`,
    '--confetti-size': `${index % 3 === 0 ? 12 : 8}px`,
    '--confetti-color': confettiColors[index % confettiColors.length],
  }) as CSSProperties), [source])

  useEffect(() => {
    try {
      setCanShare(Boolean(navigator.canShare?.({ files: [new File([''], 'card.png', { type: 'image/png' })] })))
    } catch {
      setCanShare(false)
    }
  }, [])

  async function cardFile() {
    const blob = await eggCardBlob(egg, record)
    return blob ? new File([blob], eggCardFileName(egg), { type: 'image/png' }) : null
  }

  async function download() {
    setStatus('Printing your card…')
    const file = await cardFile()
    if (!file) { setStatus('Could not render the card. Try again.'); return }
    const url = URL.createObjectURL(file)
    const link = document.createElement('a')
    link.href = url
    link.download = file.name
    link.dataset.noTransition = ''
    document.body.appendChild(link)
    link.click()
    link.remove()
    window.setTimeout(() => URL.revokeObjectURL(url), 2000)
    setStatus('Card saved to your downloads.')
  }

  async function share() {
    const file = await cardFile()
    if (!file) return
    try {
      await navigator.share({ files: [file], title: `${egg.title} — RoboFiesta’26`, text: `I found a hidden secret at RoboFiesta’26: ${egg.title}. Can you find all ${EGG_TOTAL}?` })
    } catch {
      /* Closing the share sheet is not an error worth surfacing. */
    }
  }

  return <EggDialog label={`${banner} ${egg.title} card`} className={`egg-reveal from-${source}`} onClose={onClose}>
    <div className="egg-reveal-rays" aria-hidden="true" />
    {confetti.length > 0 && <div className="egg-confetti" aria-hidden="true">{confetti.map((style, index) => <i key={index} style={style} />)}</div>}

    <button type="button" className="egg-close" onClick={onClose} aria-label="Close secret card"><X aria-hidden="true" /></button>

    <div className="egg-reveal-stage">
      <header className="egg-reveal-head">
        <p className="egg-reveal-kicker">{eggLabel(egg)}</p>
        <h2 className="egg-reveal-banner">{banner}</h2>
      </header>

      <div className="egg-flip">
        <div className="egg-flip-inner">
          <div className="egg-card-back" aria-hidden="true"><b>?</b><span>ROBOFIESTA’26</span><small>SECRET FILE</small></div>
          <div className="egg-card-front"><EggCard egg={egg} record={record} tilt /></div>
        </div>
      </div>

      <div className="egg-reveal-info">
        <p className="egg-reveal-how">{egg.howFound}</p>
        {egg.counted ? <div className="egg-progress" aria-label={`${foundCount} of ${EGG_TOTAL} secrets found`}>
          <span className="egg-pips" aria-hidden="true">{countedIds.map((id) => <i key={id} className={collection[id] ? 'is-found' : ''} />)}</span>
          <b>{foundCount} / {EGG_TOTAL} SECRETS FOUND</b>
        </div> : <div className="egg-progress is-training"><b>TRAINING CARD · {EGG_TOTAL} REAL SECRETS ARE HIDDEN IN THE ARENA</b></div>}

        <div className="egg-actions">
          <button type="button" className="egg-action primary" onClick={download} data-autofocus><Download aria-hidden="true" /> Download card</button>
          {canShare && <button type="button" className="egg-action" onClick={share}><Share2 aria-hidden="true" /> Share</button>}
          <button type="button" className="egg-action" onClick={onOpenVault}><Archive aria-hidden="true" /> Egg vault</button>
        </div>
        <p className="egg-status" role="status" aria-live="polite">{status}</p>
      </div>
    </div>
  </EggDialog>
}
