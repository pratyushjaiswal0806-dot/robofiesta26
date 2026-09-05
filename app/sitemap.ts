import type { MetadataRoute } from 'next'
import { events } from '@/lib/data'
import { site } from '@/lib/site'

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: site.url, lastModified: new Date(), changeFrequency: 'weekly', priority: 1 },
    { url: `${site.url}/events`, lastModified: new Date(), changeFrequency: 'weekly', priority: .9 },
    ...events.map((event) => ({ url: `${site.url}/events/${event.slug}`, lastModified: new Date(), changeFrequency: 'weekly' as const, priority: .8 })),
    { url: `${site.url}/contact`, lastModified: new Date(), changeFrequency: 'monthly', priority: .7 },
  ]
}
