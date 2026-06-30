/**
 * Shared image path constants.
 *
 * Use stable public-folder paths (not ES imports) so the browser reuses the
 * preloaded response from the <link rel="preload"> in index.html.
 * These paths are served by Vite in dev and copied to dist root in production.
 */

/** Hero / profile photo — WebP (primary, ~60% smaller than PNG) */
export const PROFILE_PHOTO_WEBP = '/profile.webp'

/** Hero / profile photo — PNG fallback for browsers without WebP support */
export const PROFILE_PHOTO_PNG  = '/profile.png'
