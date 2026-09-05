import { NextResponse } from 'next/server'
import { site } from '@/lib/site'

type ContactPayload = {
  name?: unknown
  email?: unknown
  team?: unknown
  subject?: unknown
  message?: unknown
  event?: unknown
  website?: unknown
}

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

function value(input: unknown) {
  return typeof input === 'string' ? input.trim() : ''
}

function failure(message: string, status: number) {
  return NextResponse.json({ ok: false, message }, { status })
}

export async function POST(request: Request) {
  let payload: ContactPayload
  try {
    const body: unknown = await request.json()
    if (!body || typeof body !== 'object') return failure('Transmission payload not recognised.', 400)
    payload = body as ContactPayload
  } catch {
    return failure('Transmission payload not recognised.', 400)
  }

  // Bots fill this field; a real visitor never sees it.
  if (value(payload.website)) return NextResponse.json({ ok: true })

  const name = value(payload.name)
  const email = value(payload.email)
  const team = value(payload.team)
  const subject = value(payload.subject) || 'RoboFiesta enquiry'
  const message = value(payload.message)
  const event = value(payload.event)

  if (name.length < 2 || name.length > 80) return failure('Please enter a name between 2 and 80 characters.', 400)
  if (!emailPattern.test(email) || email.length > 160) return failure('Please enter a valid email address.', 400)
  if (message.length < 10 || message.length > 4000) return failure('Your transmission should be between 10 and 4000 characters.', 400)

  const apiKey = process.env.RESEND_API_KEY
  const from = process.env.CONTACT_FROM_EMAIL
  const to = process.env.CONTACT_TO_EMAIL || site.contact.email

  if (!apiKey || !from) {
    return failure('The transmission gateway is offline. Please try again once the comms channel is configured.', 503)
  }

  const safeSubject = subject.replace(/[\r\n]/g, ' ').slice(0, 120)
  const safeEvent = event.replace(/[\r\n]/g, ' ').slice(0, 120)
  const text = [
    `Name: ${name}`,
    `Email: ${email}`,
    `College / Team: ${team || 'Not supplied'}`,
    `Event: ${safeEvent || 'General enquiry'}`,
    '',
    message,
  ].join('\n')

  try {
    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: { Authorization: `Bearer ${apiKey}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({ from, to: [to], reply_to: email, subject: `[RoboFiesta'26] ${safeSubject}`, text }),
      cache: 'no-store',
    })

    if (!response.ok) return failure('The comms server rejected this transmission. Please try again.', 502)
  } catch {
    return failure('The comms server could not be reached. Please try again.', 502)
  }

  return NextResponse.json({ ok: true })
}
