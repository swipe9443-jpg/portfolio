import type { HTMLAttributes } from 'react'

export function Container({ children, className = '', ...props }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={['container-main', className].join(' ')} {...props}>
      {children}
    </div>
  )
}
