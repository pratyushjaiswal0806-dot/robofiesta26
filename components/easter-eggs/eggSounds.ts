'use client'

let context: AudioContext | null = null

function getContext() {
  try {
    context ??= new AudioContext()
    if (context.state === 'suspended') void context.resume().catch(() => undefined)
    return context
  } catch {
    return null
  }
}

function tone(audio: AudioContext, frequency: number, start: number, duration: number, type: OscillatorType = 'square', volume = .07) {
  const oscillator = audio.createOscillator()
  const envelope = audio.createGain()
  const at = audio.currentTime + start
  oscillator.type = type
  oscillator.frequency.setValueAtTime(frequency, at)
  envelope.gain.setValueAtTime(.0001, at)
  envelope.gain.exponentialRampToValueAtTime(volume, at + .01)
  envelope.gain.exponentialRampToValueAtTime(.0001, at + duration)
  oscillator.connect(envelope).connect(audio.destination)
  oscillator.start(at)
  oscillator.stop(at + duration + .02)
}

/** A rising blip per knock, so hunters can hear they are on to something. */
export function playEggPoke(step: number) {
  const audio = getContext()
  if (!audio) return
  tone(audio, 440 * 2 ** (step * 2 / 12), 0, .08, 'square', .05)
}
