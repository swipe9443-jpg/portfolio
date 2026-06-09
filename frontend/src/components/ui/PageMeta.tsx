import { useEffect } from 'react'

interface PageMetaProps {
  title:        string
  description:  string
  ogTitle?:     string
  ogDescription?: string
}

/**
 * Sets page <title>, <meta name="description">, and Open Graph tags
 * without any runtime dependency — pure DOM manipulation.
 */
export function PageMeta({ title, description, ogTitle, ogDescription }: PageMetaProps) {
  useEffect(() => {
    // Title
    document.title = title

    // Description
    let descEl = document.querySelector<HTMLMetaElement>('meta[name="description"]')
    if (!descEl) {
      descEl = document.createElement('meta')
      descEl.name = 'description'
      document.head.appendChild(descEl)
    }
    descEl.content = description

    // OG title
    let ogTitleEl = document.querySelector<HTMLMetaElement>('meta[property="og:title"]')
    if (!ogTitleEl) {
      ogTitleEl = document.createElement('meta')
      ogTitleEl.setAttribute('property', 'og:title')
      document.head.appendChild(ogTitleEl)
    }
    ogTitleEl.content = ogTitle ?? title

    // OG description
    let ogDescEl = document.querySelector<HTMLMetaElement>('meta[property="og:description"]')
    if (!ogDescEl) {
      ogDescEl = document.createElement('meta')
      ogDescEl.setAttribute('property', 'og:description')
      document.head.appendChild(ogDescEl)
    }
    ogDescEl.content = ogDescription ?? description
  }, [title, description, ogTitle, ogDescription])

  return null
}
