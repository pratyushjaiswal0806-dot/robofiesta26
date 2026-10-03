'use client'

import type { EggId } from './eggManifest'
import type { EggContent, EggHint } from './eggTypes'

const contentCache = new Map<EggId, EggContent>()
let hintCache: EggHint[] | null = null

async function request<T>(query: string): Promise<T | null> {
  try {
    const response = await fetch(`/api/egg?${query}`, { cache: 'no-store' })
    return response.ok ? await response.json() as T : null
  } catch {
    return null
  }
}

export async function fetchEggs(ids: readonly EggId[]) {
  const missing = ids.filter((id) => !contentCache.has(id))
  if (missing.length) {
    const result = await request<{ eggs: EggContent[] }>(`ids=${missing.join(',')}`)
    result?.eggs.forEach((egg) => contentCache.set(egg.id, egg))
  }
  return ids.map((id) => contentCache.get(id)).filter((egg): egg is EggContent => Boolean(egg))
}

export async function fetchHints() {
  hintCache ??= (await request<{ hints: EggHint[] }>('hints=1'))?.hints ?? null
  return hintCache ?? []
}
