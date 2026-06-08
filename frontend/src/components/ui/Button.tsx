import { forwardRef, type ReactNode, type ButtonHTMLAttributes } from 'react'

type Variant = 'primary' | 'secondary'
type Size    = 'sm' | 'md' | 'lg'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?:   Variant
  size?:      Size
  isLoading?: boolean
  leftIcon?:  ReactNode
  rightIcon?: ReactNode
}

const base = [
  'inline-flex items-center justify-center gap-2',
  'select-none whitespace-nowrap font-semibold',
  'cursor-pointer transition-all duration-200',
  'focus-visible:outline-none active:scale-[0.97]',
].join(' ')

// rounded-[14px] per branding doc §6
const sizeClasses: Record<Size, string> = {
  sm: 'px-4 py-2 text-sm rounded-[10px]',
  md: 'px-5 py-2.5 text-sm rounded-[12px]',
  lg: 'px-7 py-3 text-base rounded-[14px]',
}

function getInlineStyle(variant: Variant, isDisabled: boolean): React.CSSProperties {
  const base: React.CSSProperties = { opacity: isDisabled ? 0.45 : 1 }

  if (variant === 'primary') {
    return {
      ...base,
      // Gradient applied via .bg-accent-gradient class — deep blue → cyan
      // Dark text (#050816) for contrast on light cyan — set inline to override anything
      color: '#050816',
      boxShadow: '0 0 0 1px rgba(0,229,255,0.20), 0 4px 20px rgba(0,229,255,0.15)',
    }
  }
  // Secondary — glass surface
  return {
    ...base,
    color: 'var(--text-primary)',
    border: '1px solid rgba(255,255,255,0.10)',
    background: 'rgba(255,255,255,0.03)',
    backdropFilter: 'blur(8px)',
  }
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = 'primary',
      size = 'md',
      isLoading = false,
      leftIcon,
      rightIcon,
      children,
      className = '',
      disabled,
      style,
      ...props
    },
    ref
  ) => {
    const isDisabled = disabled || isLoading

    return (
      <button
        ref={ref}
        disabled={isDisabled}
        className={[
          base,
          // bg-accent-gradient supplies the cyan gradient background + base color
          variant === 'primary' ? 'bg-accent-gradient' : '',
          sizeClasses[size],
          isDisabled ? 'pointer-events-none' : '',
          className,
        ].join(' ')}
        style={{ ...getInlineStyle(variant, isDisabled), ...style }}
        aria-disabled={isDisabled}
        onMouseEnter={e => {
          const el = e.currentTarget
          if (variant === 'secondary') {
            el.style.borderColor = 'rgba(0,229,255,0.30)'
            el.style.color = 'var(--accent)'
            el.style.background = 'rgba(0,229,255,0.04)'
          } else {
            el.style.filter = 'brightness(1.08)'
            el.style.boxShadow = '0 0 0 1px rgba(0,229,255,0.35), 0 6px 28px rgba(0,229,255,0.25)'
          }
        }}
        onMouseLeave={e => {
          const el = e.currentTarget
          if (variant === 'secondary') {
            el.style.borderColor = 'rgba(255,255,255,0.10)'
            el.style.color = 'var(--text-primary)'
            el.style.background = 'rgba(255,255,255,0.03)'
          } else {
            el.style.filter = ''
            el.style.boxShadow = '0 0 0 1px rgba(0,229,255,0.20), 0 4px 20px rgba(0,229,255,0.15)'
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
  }
)

Button.displayName = 'Button'
export { Button }
export type { ButtonProps }
