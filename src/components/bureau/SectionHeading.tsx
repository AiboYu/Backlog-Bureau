import type { ReactNode } from 'react'
import { cn } from '@/lib/utils'

interface SectionHeadingProps {
  eyebrow: string
  title: string
  description?: ReactNode
  className?: string
}

/** Section heading: mono eyebrow + display title + optional description. */
export function SectionHeading({ eyebrow, title, description, className }: SectionHeadingProps) {
  return (
    <div className={cn('max-w-2xl', className)}>
      <p className="font-mono text-xs font-medium uppercase tracking-[0.3em] text-primary">
        {eyebrow}
      </p>
      <h2 className="mt-3 font-display text-3xl font-bold tracking-tight text-foreground md:text-4xl">
        {title}
      </h2>
      {description ? <p className="mt-4 text-muted-foreground">{description}</p> : null}
    </div>
  )
}
