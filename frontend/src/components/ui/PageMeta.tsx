import { memo, useEffect } from 'react'

interface PageMetaProps {
  title:          string
  description:    string
  ogTitle?:       string
  ogDescription?: string
}

// Cached element references — avoids repeated querySelector calls
let descEl:    HTMLMetaElement | null = null
let ogTitleEl: HTMLMetaElement | null = null
let ogDescEl:  HTMLMetaElement | null = null

function getOrCreate(selector: string, attrs: Record<string, string>): HTMLMetaElement {
  let el = document.querySelector<HTMLMetaElement>(selector)
  if (!el) {
    el = document.createElement('meta')
    for (const [k, v] of Object.entries(attrs)) el.setAttribute(k, v)
    document.head.appendChild(el)
  }
  return el
}

/**
 * Sets page <title>, <meta name="description">, and Open Graph tags
 * without any runtime dependency — pure DOM manipulation.
 * Memoized: only re-runs when props actually change.
 */
export const PageMeta = memo(function PageMeta({ title, description, ogTitle, ogDescription }: PageMetaProps) {
  useEffect(() => {
    document.title = title

    descEl    = descEl    ?? getOrCreate('meta[name="description"]',       { name: 'description' })
    ogTitleEl = ogTitleEl ?? getOrCreate('meta[property="og:title"]',      { property: 'og:title' })
    ogDescEl  = ogDescEl  ?? getOrCreate('meta[property="og:description"]', { property: 'og:description' })

    descEl.content    = description
    ogTitleEl.content = ogTitle ?? title
    ogDescEl.content  = ogDescription ?? description
  }, [title, description, ogTitle, ogDescription])

  return null
})
