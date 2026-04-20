/** Tailwind breakpoint values (px) — keep in sync with @theme in main.css */
const screens = {
  'sm': 640,
  'md': 768,
  'lg': 1024,
  'xl': 1280,
  '3xl': 1920,
} as const

/** Media query strings for `<source media>` attributes (max-width: breakpoint − 1) */
export const below = {
  /** 639px */
  sm: `(max-width: ${screens.sm - 1}px)`,
  /** 767px */
  md: `(max-width: ${screens.md - 1}px)`,
  /** 1023px */
  lg: `(max-width: ${screens.lg - 1}px)`,
  /** 1279px */
  xl: `(max-width: ${screens.xl - 1}px)`,
} as const

export interface ISbImage {
  alt: string
  filename: string
  title: string
}

export function getSrcset(image: ISbImage, width: number, height = 0) {
  const url = `${image.filename}/m/`

  return `
        ${url}${width * 2}x${height * 2} 2x,
        ${url}${width}x${height}
    `
}

interface ISbLink {
  cached_url: string
  target?: string
}

export function formatLink(link: ISbLink) {
  const href = link.cached_url.startsWith('http')
    ? link.cached_url
    : `/${link.cached_url === 'home' ? '' : link.cached_url}`

  const target = link.target || '_self'

  return {
    href,
    target,
  }
}
