'use client'

import { useSyncExternalStore } from 'react'
import { EGG_TOTAL, countedIds } from './eggManifest'
import { getEggServerSnapshot, getEggSnapshot, openEggVault, subscribeEggs } from './eggStore'

export function EggVaultButton() {
  const collection = useSyncExternalStore(subscribeEggs, getEggSnapshot, getEggServerSnapshot)
  const found = countedIds.filter((id) => collection[id]).length

  return <button type="button" className={`egg-vault-chip${found === EGG_TOTAL ? ' is-complete' : ''}`} onClick={openEggVault} aria-label={`Open egg vault: ${found} of ${EGG_TOTAL} secrets found`}>
    <i aria-hidden="true" />
    <span>SECRETS {found}/{EGG_TOTAL}</span>
  </button>
}
