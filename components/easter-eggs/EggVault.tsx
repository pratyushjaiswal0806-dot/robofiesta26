'use client'

import { useEffect, useState } from 'react'
import { Lock, RotateCcw, X } from 'lucide-react'
import { EGG_TOTAL, countedIds, eggManifest, type EggId } from './eggManifest'
import { eggLabel, type EggContent, type EggHint } from './eggTypes'
import { EggCard } from './EggCard'
import { EggDialog } from './EggDialog'
import { fetchEggs, fetchHints } from './eggClient'
import type { EggCollection } from './eggStore'

type EggVaultProps = {
  collection: EggCollection
  onClose: () => void
  onSelect: (egg: EggContent) => void
  onReset: () => void
}

export function EggVault({ collection, onClose, onSelect, onReset }: EggVaultProps) {
  const [contents, setContents] = useState<Partial<Record<EggId, EggContent>>>({})
  const [hints, setHints] = useState<EggHint[]>([])
  const foundIds = eggManifest.filter((egg) => collection[egg.id]).map((egg) => egg.id)
  const foundKey = foundIds.join(',')
  const foundCount = countedIds.filter((id) => collection[id]).length
  const complete = foundCount === EGG_TOTAL
  const anyFound = foundIds.length > 0

  useEffect(() => {
    let cancelled = false
    void fetchHints().then((list) => { if (!cancelled) setHints(list) })
    void fetchEggs(foundKey ? foundKey.split(',') as EggId[] : []).then((list) => {
      if (!cancelled) setContents(Object.fromEntries(list.map((egg) => [egg.id, egg])))
    })
    return () => { cancelled = true }
  }, [foundKey])

  function reset() {
    if (window.confirm('Reset the egg vault? Every collected card on this device will be locked again.')) onReset()
  }

  return <EggDialog label="Egg vault" className="egg-vault" onClose={onClose}>
    <div className="egg-vault-panel">
      <button type="button" className="egg-close" onClick={onClose} aria-label="Close egg vault" data-autofocus><X aria-hidden="true" /></button>
      <header className="egg-vault-head">
        <p className="eyebrow dark">SECRET ARCHIVE</p>
        <h2>EGG VAULT</h2>
        <p>{complete ? 'Every secret in the arena is yours. Master hunter status confirmed.' : `${EGG_TOTAL} secrets are hidden across the site. Find them, collect the cards, and download them to show off.`}</p>
        <div className="egg-vault-meter" role="progressbar" aria-valuemin={0} aria-valuemax={EGG_TOTAL} aria-valuenow={foundCount} aria-label="Secrets found">
          {countedIds.map((id) => <i key={id} className={collection[id] ? 'is-found' : ''} />)}
          <b>{foundCount}/{EGG_TOTAL}</b>
        </div>
      </header>

      <ul className="egg-vault-grid">
        {eggManifest.map((egg) => {
          const record = collection[egg.id]
          const content = contents[egg.id]
          return <li key={egg.id} className={`egg-slot${record ? ' is-found' : ''}${egg.counted ? '' : ' is-training'}`}>
            {record && content ? <button type="button" onClick={() => onSelect(content)} aria-label={`Open ${content.title} card`}>
              <EggCard egg={content} record={record} resolution={.75} />
              <span className="egg-slot-label"><small>{eggLabel(egg)}</small><b>{content.title}</b></span>
            </button> : <div className="egg-slot-locked">
              <span className="egg-slot-mystery" aria-hidden="true"><Lock /><b>?</b></span>
              <span className="egg-slot-label"><small>{eggLabel(egg)}</small><b>{record ? 'LOADING…' : egg.counted ? 'LOCKED' : 'TRAINING EGG'}</b></span>
              {!record && <p><span className="sr-only">Hint: </span>{hints.find((item) => item.id === egg.id)?.hint}</p>}
            </div>}
          </li>
        })}
      </ul>

      <div className="egg-vault-foot">
        <p><b>DEMO TIP</b> Tap the robot on the home screen three times to trigger the training egg.</p>
        {anyFound && <button type="button" onClick={reset}><RotateCcw aria-hidden="true" /> Reset vault</button>}
      </div>
    </div>
  </EggDialog>
}
