'use client'

import { useEffect, useState, type FormEvent } from 'react'
import { Send } from 'lucide-react'

type FormStatus = { state: 'idle' | 'submitting' | 'success' | 'error', message?: string }
type FieldErrors = Record<string, string>

const subjects = ['Event enquiry', 'Registration support', 'Sponsorship', 'Venue and travel', 'Rulebook question', 'Other'] as const
const emailPattern=/^[^\s@]+@[^\s@]+\.[^\s@]+$/

function isRecord(value: unknown): value is Record<string, unknown> {
  return Boolean(value) && typeof value === 'object'
}

function validate(name: string, email: string, message: string): FieldErrors {
  const errors: FieldErrors = {}
  if (name.trim().length < 2) errors.name = 'Enter at least 2 characters.'
  if (!emailPattern.test(email.trim())) errors.email = 'Enter a valid email ID.'
  if (message.trim().length < 10) errors.message = 'Give the comms bay at least 10 characters.'
  return errors
}

export function ContactForm() {
  const [subject, setSubject] = useState<string>('Event enquiry')
  const [eventContext, setEventContext] = useState('')
  const [status, setStatus] = useState<FormStatus>({ state: 'idle' })
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({})

  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    const requestedSubject = params.get('subject') || ''
    const requestedEvent = params.get('event') || ''
    const matchingSubject = subjects.find((option) => requestedSubject.toLowerCase().startsWith(option.toLowerCase()))
    if (matchingSubject) setSubject(matchingSubject)
    else if (requestedSubject) setSubject('Other')
    if (requestedEvent) setEventContext(requestedEvent)
  }, [])

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const form = event.currentTarget
    const formData = new FormData(form)
    const name = String(formData.get('name') || '')
    const email = String(formData.get('email') || '')
    const message = String(formData.get('message') || '')
    const errors = validate(name, email, message)
    setFieldErrors(errors)
    if (Object.keys(errors).length > 0) {
      form.querySelector<HTMLElement>('[aria-invalid="true"]')?.focus()
      setStatus({ state: 'idle' })
      return
    }

    setStatus({ state: 'submitting' })
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name,
          email,
          team: String(formData.get('team') || ''),
          subject,
          event: eventContext,
          message,
          website: String(formData.get('website') || ''),
        }),
      })
      const responseBody: unknown = await response.json().catch(() => null)
      const responseMessage = isRecord(responseBody) && typeof responseBody.message === 'string' ? responseBody.message : ''
      if (!response.ok) throw new Error(responseMessage || 'The comms server rejected this transmission.')
      form.reset()
      setSubject('Event enquiry')
      setFieldErrors({})
      setStatus({ state: 'success', message: 'Transmission received. The RoboFiesta comms crew will reply soon.' })
    } catch (error) {
      setStatus({ state: 'error', message: error instanceof Error ? error.message : 'The comms server could not be reached. Please try again.' })
    }
  }

  return <form id="transmission" className="contact-form" onSubmit={handleSubmit} noValidate>
    <div className="form-title"><span id="contact-form-title">NEW TRANSMISSION</span><i aria-hidden="true">REC ●</i></div>
    {eventContext && <p className="event-context"><strong>EVENT CHANNEL:</strong> {eventContext}</p>}
    {status.state === 'success' && <div className="form-status form-status-success" role="status"><strong>TRANSMISSION SENT</strong><span>{status.message}</span></div>}
    {status.state === 'error' && <div className="form-status form-status-error" role="alert"><strong>TRANSMISSION FAILED</strong><span>{status.message}</span></div>}
    <div className="form-grid">
      <label><span>YOUR NAME</span><input name="name" autoComplete="name" required minLength={2} maxLength={80} placeholder="Player one" aria-invalid={Boolean(fieldErrors.name)} aria-describedby={fieldErrors.name ? 'name-error' : undefined} />{fieldErrors.name && <small id="name-error" className="form-error">{fieldErrors.name}</small>}</label>
      <label><span>EMAIL ID</span><input name="email" type="email" autoComplete="email" required placeholder="you@example.com" aria-invalid={Boolean(fieldErrors.email)} aria-describedby={fieldErrors.email ? 'email-error' : undefined} />{fieldErrors.email && <small id="email-error" className="form-error">{fieldErrors.email}</small>}</label>
    </div>
    <label><span>COLLEGE / TEAM</span><input name="team" autoComplete="organization" maxLength={120} placeholder="Your crew or institution" /></label>
    <label><span>SUBJECT</span><select name="subject" value={subject} onChange={(event) => setSubject(event.target.value)}>{subjects.map((option) => <option key={option}>{option}</option>)}</select></label>
    <label><span>MESSAGE</span><textarea name="message" rows={6} minLength={10} maxLength={4000} required placeholder="Type your transmission here..." aria-invalid={Boolean(fieldErrors.message)} aria-describedby={fieldErrors.message ? 'message-error' : undefined} />{fieldErrors.message && <small id="message-error" className="form-error">{fieldErrors.message}</small>}</label>
    <div className="honeypot" aria-hidden="true"><label>Leave this field empty<input name="website" tabIndex={-1} autoComplete="off" /></label></div>
    <button type="submit" className="contact-submit" disabled={status.state === 'submitting'}>{status.state === 'submitting' ? 'TRANSMITTING…' : 'SEND TRANSMISSION'} <Send aria-hidden="true" /></button>
    <p className="form-note">Messages travel through the secure comms gateway. Fields marked required must be completed.</p>
  </form>
}
