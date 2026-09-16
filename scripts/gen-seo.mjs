/**
 * SEO GENERATOR
 *
 * Writes the three things that must never drift from the site's own data:
 *
 *   index.html  the JSON-LD block, between the SEO:JSONLD markers
 *   public/sitemap.xml
 *   public/robots.txt
 *
 * Everything is derived from src/config/site.js, src/data/services.js and
 * src/data/faq.js. Hand-writing structured data is how a site ends up
 * advertising a service it removed, or answering an FAQ it no longer shows —
 * Google reads the markup, not the page.
 *
 * Run with `npm run seo`. It also runs automatically before every build.
 */
import { readFile, writeFile } from 'node:fs/promises'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

import { seo, site, contact } from '../src/config/site.js'
import { services } from '../src/data/services.js'
import { faqs } from '../src/data/faq.js'
import { routes } from '../src/data/nav.js'

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const origin = site.url.replace(/\/$/, '')

/* --------------------------------------------------------------------------
   JSON-LD
   Two top-level nodes in one @graph, which is what lets them cross-reference:

     Person             the human, for a name search
     ProfessionalService the business, carrying the service catalogue
     FAQPage            the questions, eligible for the FAQ rich result

   `@id` anchors let the service point back at the person as its provider
   instead of duplicating the identity.
   -------------------------------------------------------------------------- */
function buildJsonLd() {
  const personId = `${origin}/#person`
  const serviceId = `${origin}/#service`

  const graph = [
    {
      '@type': 'Person',
      '@id': personId,
      name: site.name,
      jobTitle: site.role,
      description: seo.description,
      url: `${origin}/`,
      email: contact.emailHref,
      telephone: contact.phone,
      address: {
        '@type': 'PostalAddress',
        addressLocality: 'Jaipur',
        addressRegion: 'Rajasthan',
        addressCountry: 'IN',
      },
      sameAs: [contact.linkedin, contact.github],
      knowsAbout: seo.keywords,
    },
    {
      '@type': 'ProfessionalService',
      '@id': serviceId,
      name: `${site.name} — ${site.role}`,
      description: seo.description,
      url: `${origin}/`,
      provider: { '@id': personId },
      /* Remote-friendly: the work is delivered from Jaipur to clients anywhere,
         so the area served is worldwide and the address is the base, not a
         catchment. */
      areaServed: 'Worldwide',
      availableLanguage: ['en'],
      address: {
        '@type': 'PostalAddress',
        addressLocality: 'Jaipur',
        addressRegion: 'Rajasthan',
        addressCountry: 'IN',
      },
      hasOfferCatalog: {
        '@type': 'OfferCatalog',
        name: 'Development services',
        itemListElement: services.map((service) => ({
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: service.title,
            description: service.desc,
            serviceType: service.title,
          },
        })),
      },
    },
    {
      '@type': 'FAQPage',
      '@id': `${origin}/#faq`,
      mainEntity: faqs.map((faq) => ({
        '@type': 'Question',
        name: faq.q,
        acceptedAnswer: { '@type': 'Answer', text: faq.a },
      })),
    },
  ]

  return { '@context': 'https://schema.org', '@graph': graph }
}

/* --------------------------------------------------------------------------
   Sitemap
   One entry per real route. The site is a genuine multi-page application now —
   each of these is its own URL with its own <h1> and its own content, so each
   is indexable in its own right. Read from the same `routes` manifest the
   navigation uses, so adding a page cannot leave the sitemap behind.

   `/home` is deliberately absent: it redirects to `/`, and listing both would
   put two URLs in the index for one page.
   -------------------------------------------------------------------------- */
const SITEMAP_PRIORITY = {
  '/': '1.0',
  '/projects': '0.9',
  '/about': '0.8',
  '/services': '0.8',
  '/contact': '0.8',
  '/skills': '0.7',
  '/experience': '0.7',
  '/blogs': '0.7',
  '/resume': '0.6',
}

function buildSitemap(lastmod) {
  const entries = routes
    .map((route) => {
      const loc = route.path === '/' ? `${origin}/` : `${origin}${route.path}`
      const priority = SITEMAP_PRIORITY[route.path] ?? '0.5'
      return `  <url>
    <loc>${loc}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>${priority}</priority>
  </url>`
    })
    .join('\n')

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${entries}
</urlset>
`
}

function buildRobots() {
  return `# ${site.name} — ${site.role}
# ${origin}

User-agent: *
Allow: /

Sitemap: ${origin}/sitemap.xml
`
}

async function injectJsonLd(json) {
  const file = resolve(root, 'index.html')
  const html = await readFile(file, 'utf8')

  const START = '<!-- SEO:JSONLD:START -->'
  const END = '<!-- SEO:JSONLD:END -->'
  const from = html.indexOf(START)
  const to = html.indexOf(END)
  if (from === -1 || to === -1) {
    throw new Error(`index.html is missing the ${START} / ${END} markers — cannot inject structured data.`)
  }

  /* Indented to sit with the surrounding head, and the closing script tag is
     escaped so the JSON can never terminate the block early. */
  const block = `${START}
    <script type="application/ld+json">
${JSON.stringify(json, null, 2).replace(/</g, '\\u003c').replace(/^/gm, '      ')}
    </script>
    `
  const next = html.slice(0, from) + block + html.slice(to)
  await writeFile(file, next)
  return file
}

const lastmod = new Date().toISOString().slice(0, 10)

const written = [
  await injectJsonLd(buildJsonLd()),
  await writeFile(resolve(root, 'public/sitemap.xml'), buildSitemap(lastmod)).then(
    () => 'public/sitemap.xml',
  ),
  await writeFile(resolve(root, 'public/robots.txt'), buildRobots()).then(() => 'public/robots.txt'),
]

console.log(`SEO generated (${lastmod}):`)
for (const file of written) console.log(`  ${file}`)
console.log(`  ${services.length} services, ${faqs.length} FAQ entries`)
