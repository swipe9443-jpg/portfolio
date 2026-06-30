import { memo, type HTMLAttributes } from 'react'

// Memoized — a pure layout wrapper that never needs to re-render on its own
export const Container = memo(function Container({ children, className = '', ...props }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={['container-main', className].join(' ')} {...props}>
      {children}
    </div>
  )
})
