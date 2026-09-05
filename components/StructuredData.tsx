import { events, faqs } from '@/lib/data'
import { site } from '@/lib/site'

export function StructuredData() {
  const graph = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebSite',
        '@id': `${site.url}/#website`,
        url: site.url,
        name: site.name,
        alternateName: 'RoboFiesta 2026',
        description: site.description,
        inLanguage: 'en-IN',
        publisher: { '@id': `${site.url}/#organization` },
      },
      {
        '@type': 'Organization',
        '@id': `${site.url}/#organization`,
        name: site.organizer,
        url: site.url,
        location: {
          '@type': 'Place',
          name: `${site.venue}, ${site.city}`,
          address: {
            '@type': 'PostalAddress',
            addressLocality: site.city,
            addressRegion: site.region,
            addressCountry: site.country,
          },
        },
      },
      {
        '@type': 'Event',
        '@id': `${site.url}/#event`,
        name: site.name,
        alternateName: 'RoboFiesta 2026',
        description: site.description,
        startDate: site.startDate,
        endDate: site.endDate,
        eventAttendanceMode: 'https://schema.org/OfflineEventAttendanceMode',
        inLanguage: 'en-IN',
        image: `${site.url}/opengraph-image`,
        url: site.url,
        location: {
          '@type': 'Place',
          name: `${site.venue}, ${site.city}`,
          address: {
            '@type': 'PostalAddress',
            addressLocality: site.city,
            addressRegion: site.region,
            addressCountry: site.country,
          },
        },
        organizer: { '@id': `${site.url}/#organization` },
        audience: {
          '@type': 'EducationalAudience',
          educationalRole: 'student',
        },
        keywords: ['robotics festival', 'college robotics competition', 'student robotics', 'Robo Wars', 'Micromouse', 'drone racing', 'Bangalore'],
      },
      {
        '@type': 'ItemList',
        '@id': `${site.url}/#events`,
        name: 'RoboFiesta competition arenas',
        numberOfItems: events.length,
        itemListElement: events.map((event, index) => ({
          '@type': 'ListItem',
          position: index + 1,
          name: event.title,
          description: event.description,
          url: `${site.url}/events/${event.slug}`,
          identifier: `Level ${event.level}`,
        })),
      },
      {
        '@type': 'FAQPage',
        '@id': `${site.url}/#faq-schema`,
        mainEntity: faqs.map(({ question, answer }) => ({
          '@type': 'Question',
          name: question,
          acceptedAnswer: { '@type': 'Answer', text: answer },
        })),
      },
    ],
  }

  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(graph).replace(/</g, '\\u003c') }} />
}
