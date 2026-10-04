import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { site } from './src/config/site.js'

const esc = (s) =>
  String(s).replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;')

const abs = (path) => (site.siteUrl ? new URL(path, site.siteUrl).href : path)

/** Restaurant structured data built ONLY from verified (non-null) config fields. */
function structuredData() {
  const a = site.contact.addressParts
  const hasAddress = a.streetAddress && a.addressLocality
  const data = {
    '@context': 'https://schema.org',
    '@type': 'Restaurant',
    name: `${site.name} — ${site.tagline}`,
    hasMap: site.maps.url,
    sameAs: [site.social.instagram?.url, site.social.facebook?.url].filter(Boolean),
    ...(site.siteUrl && { url: site.siteUrl }),
    ...(site.logo && site.siteUrl && { logo: abs(site.logo) }),
    ...(site.siteUrl && site.images.ogImage && { image: abs(site.images.ogImage) }),
    ...(site.contact.phone && { telephone: site.contact.phone }),
    ...(hasAddress && {
      address: {
        '@type': 'PostalAddress',
        ...Object.fromEntries(Object.entries(a).filter(([, v]) => v)),
      },
    }),
    ...(site.schemaHours.length && { openingHours: site.schemaHours }),
    ...(site.features.menuFile && site.siteUrl && { hasMenu: abs(site.features.menuFile.href) }),
    ...(site.features.reservations.enabled &&
      site.features.reservations.whatsappNumber && { acceptsReservations: true }),
  }
  return JSON.stringify(data, null, 2).replace(/</g, '\\u003c')
}

function seoTags() {
  const img = abs(site.images.ogImage)
  return [
    `<title>${esc(site.pageTitle)}</title>`,
    `<meta name="description" content="${esc(site.description)}" />`,
    site.siteUrl && `<link rel="canonical" href="${esc(site.siteUrl)}" />`,
    `<meta property="og:type" content="restaurant" />`,
    `<meta property="og:site_name" content="${esc(site.name)}" />`,
    `<meta property="og:title" content="${esc(site.pageTitle)}" />`,
    `<meta property="og:description" content="${esc(site.description)}" />`,
    `<meta property="og:image" content="${esc(img)}" />`,
    `<meta property="og:image:width" content="1200" />`,
    `<meta property="og:image:height" content="630" />`,
    `<meta property="og:image:alt" content="${esc(`${site.name} — ${site.tagline}`)}" />`,
    `<meta property="og:locale" content="en_IN" />`,
    site.siteUrl && `<meta property="og:url" content="${esc(site.siteUrl)}" />`,
    `<meta name="twitter:card" content="summary_large_image" />`,
    `<meta name="twitter:title" content="${esc(site.pageTitle)}" />`,
    `<meta name="twitter:description" content="${esc(site.description)}" />`,
    `<meta name="twitter:image" content="${esc(img)}" />`,
    `<script type="application/ld+json">\n${structuredData()}\n</script>`,
  ]
    .filter(Boolean)
    .join('\n    ')
}

const seoPlugin = () => ({
  name: 'khao-moo-seo',
  transformIndexHtml: (html) => html.replace('<!--SEO-->', seoTags()),
})

export default defineConfig({
  plugins: [react(), tailwindcss(), seoPlugin()],
})
