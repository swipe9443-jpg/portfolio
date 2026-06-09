import { forwardRef, type ReactNode, type ButtonHTMLAttributes } from 'react'

type Variant = 'primary' | 'secondary'
type Size    = 'sm' | 'md' | 'lg' | 'nav'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?:   Variant
  size?:      Size
  isLoading?: boolean
  leftIcon?:  ReactNode
  rightIcon?: ReactNode
}

/*
  Size scale — all heights on the 8px grid:
    sm  → h-10 (40px)  — compact / inline usage (success state reset, etc.)
    md  → h-12 (48px)  — card & form CTAs
    lg  → h-14 (56px)  — hero / section CTAs   ← primary call-to-action size
    nav → h-10 (40px)  — navbar CTA (constrained by 64px header — do not increase)
*/
const sizeClasses: Record<Size, string> = {
  sm:  'h-10 min-w-[108px] px-5 text-sm   rounded-[10px] gap-1.5',
  md:  'h-12 min-w-[128px] px-7 text-sm   rounded-[12px] gap-2',
  lg:  'h-14 min-w-[156px] px-8 text-base rounded-[14px] gap-2.5',
  nav: 'h-10 min-w-[128px] px-5 text-sm   rounded-[12px] gap-2',
}

/*
  Base classes shared by every variant/size.
  - inline-flex + items-center + justify-center → perfect vertical centering at every height
  - select-none whitespace-nowrap → prevents text reflow
  - transition-all duration-200 → smooth hover/active states
  - active:scale-[0.97] → tactile press feedback
  - focus-visible:ring-2 → keyboard accessibility
*/
const baseClasses = [
  'inline-flex items-center justify-center',
  'select-none whitespace-nowrap font-semibold',
  'cursor-pointer transition-all duration-200',
  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[rgba(0,229,255,0.6)] focus-visible:ring-offset-2 focus-visible:ring-offset-[#050816]',
  'active:scale-[0.97]',
].join(' ')

function getBaseStyle(variant: Variant, isDisabled: boolean): React.CSSProperties {
  const shared: React.CSSProperties = {
    opacity:     isDisabled ? 0.45 : 1,
    fontFamily:  "'Space Grotesk', 'Inter', system-ui, sans-serif",
    letterSpacing: '0.01em',
  }

  if (variant === 'primary') {
    return {
      ...shared,
      /* bg-accent-gradient class supplies the gradient background */
      color: '#050816',
      boxShadow: '0 0 0 1px rgba(0,229,255,0.18), 0 4px 20px rgba(0,229,255,0.12)',
    }
  }

  /* secondary — glass surface */
  return {
    ...shared,
    color:           'var(--text-primary)',
    border:          '1px solid rgba(255,255,255,0.10)',
    background:      'rgba(255,255,255,0.03)',
    backdropFilter:  'blur(8px)',
    WebkitBackdropFilter: 'blur(8px)',
  }
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant   = 'primary',
      size      = 'md',
      isLoading = false,
      leftIcon,
      rightIcon,
      children,
      className = '',
      disabled,
      style,
      ...props
    },
    ref,
  ) => {
    const isDisabled = disabled || isLoading

    return (
      <button
        ref={ref}
        disabled={isDisabled}
        className={[
          baseClasses,
          variant === 'primary' ? 'bg-accent-gradient' : '',
          sizeClasses[size],
          isDisabled ? 'pointer-events-none' : '',
          className,
        ].filter(Boolean).join(' ')}
        style={{ ...getBaseStyle(variant, isDisabled), ...style }}
        aria-disabled={isDisabled}
        onMouseEnter={e => {
          if (isDisabled) return
          const el = e.currentTarget
          if (variant === 'secondary') {
            el.style.borderColor = 'rgba(0,229,255,0.28)'
            el.style.color       = 'var(--accent)'
            el.style.background  = 'rgba(0,229,255,0.05)'
            el.style.boxShadow   = '0 0 0 1px rgba(0,229,255,0.10), 0 4px 16px rgba(0,229,255,0.08)'
          } else {
            el.style.filter    = 'brightness(1.08)'
            el.style.boxShadow = '0 0 0 1px rgba(0,229,255,0.32), 0 6px 28px rgba(0,229,255,0.22)'
          }
        }}
        onMouseLeave={e => {
          if (isDisabled) return
          const el = e.currentTarget
          if (variant === 'secondary') {
            el.style.borderColor = 'rgba(255,255,255,0.10)'
            el.style.color       = 'var(--text-primary)'
            el.style.background  = 'rgba(255,255,255,0.03)'
            el.style.boxShadow   = ''
          } else {
            el.style.filter    = ''
            el.style.boxShadow = '0 0 0 1px rgba(0,229,255,0.18), 0 4px 20px rgba(0,229,255,0.12)'
          }
        }}
        {...props}
      >
        {isLoading ? (
          <span
            className="inline-block w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin"
            aria-hidden="true"
          />
        ) : leftIcon}
        {children}
        {!isLoading && rightIcon}
      </button>
    )
  },
)

Button.displayName = 'Button'
export { Button }
export type { ButtonProps }
