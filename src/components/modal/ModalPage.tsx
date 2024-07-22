import { ReactNode } from 'react'
import { cn } from '@/lib/utils'

export type ModalPageGenericProps<T = unknown> = {
  children: ReactNode;
  className?: string;
} & T

export function ModalPage({ className, children }: ModalPageGenericProps) {
    return (
      <div className={cn('fixed inset-0 bg-black/60 flex items-center justify-center', className)}>
        {children}
      </div>
    )
}

export function ModalContainer({ className, children }: ModalPageGenericProps) {
  return (
    <div className={cn('w-[640px] rounded-xl py-5 px-6 bg-popover space-y-5', className)}>
      {children}
    </div>
  )
}

export function ModalHeader({ className, children }: ModalPageGenericProps) {
  return <div className={cn('flex items-center justify-between space-y-1', className)}>{children}</div>
}

export function ModalTitle({ className, children }: ModalPageGenericProps) {
  return <h1 className={cn('text-2xl font-bold', className)}>{children}</h1>
}

export function ModalDescription({ className, children }: ModalPageGenericProps) {
  return (
    <p className={cn('text-muted-foreground dark:text-gray-400', className)}>
      {children}
    </p>
  )
}