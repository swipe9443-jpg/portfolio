/**
 * Resume configuration — single source of truth.
 *
 * To update the resume:
 *   1. Replace the PDF file inside public/resume/
 *   2. Keep the same filename, OR update RESUME_FILENAME below.
 *   No component code needs to change.
 */

export const RESUME_FILENAME = 'Josh-Valeri-Fallarcuna-Resume.pdf'

/** Absolute public path — served by Vite/Vercel as a static asset */
export const RESUME_PATH = `/resume/${RESUME_FILENAME}`

/** Opens the PDF in a new browser tab */
export function viewResume() {
  window.open(RESUME_PATH, '_blank', 'noopener,noreferrer')
}

/** Triggers a native browser download of the PDF */
export function downloadResume() {
  const link = document.createElement('a')
  link.href = RESUME_PATH
  link.download = RESUME_FILENAME
  link.rel = 'noopener'
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
}
