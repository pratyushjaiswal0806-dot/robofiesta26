import { NextResponse } from 'next/server'
import { eggSources, getEggSource } from '@/lib/eggContent'

export const dynamic = 'force-dynamic'

const headers = { 'Cache-Control': 'no-store' }

export function GET(request: Request) {
  const params = new URL(request.url).searchParams

  if (params.get('hints')) {
    return NextResponse.json({ hints: eggSources.map(({ id, hint }) => ({ id, hint })) }, { headers })
  }

  const ids = (params.get('ids') ?? '').split(',').slice(0, eggSources.length)
  const eggs = ids.flatMap((id) => {
    const source = getEggSource(id)
    if (!source) return []
    const { hint: _hint, ...content } = source
    return [content]
  })
  return NextResponse.json({ eggs }, { headers })
}
