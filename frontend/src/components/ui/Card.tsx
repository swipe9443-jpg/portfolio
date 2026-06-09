import type { HTMLAttributes } from 'react'

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  /** Content padding preset — follows the 8px grid */
  padding?: 'none' | 'sm' | 'md' | 'lg'
  /** Flat cards skip the hover lift — useful for inner/nested cards */
  flat?: boolean
}

const paddings: Record<NonNullable<CardProps['padding']>, string> = {
  none: '',
  sm:   'p-5',     /* 20px */
  md:   'p-7',     /* 28px */
  lg:   'p-8',     /* 32px */
}

export function Card({ children, padding = 'md', flat = false, className = '', ...props }: CardProps) {
  return (
    <div
      className={[
        'glass-card',
        paddings[padding],
        flat ? 'hover:transform-none hover:shadow-none' : '',
        className,
      ].filter(Boolean).join(' ')}
      {...props}
    >
      {children}
    </div>
  )
}
