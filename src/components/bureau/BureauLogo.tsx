import { Crosshair } from 'lucide-react'
import { cn } from '@/lib/utils'

interface BureauLogoProps {
  className?: string
  /** Hide the wordmark (used in tight contexts). */
  compact?: boolean
}

/** The Backlog Bureau logomark + wordmark. */
export function BureauLogo({ className, compact = false }: BureauLogoProps) {
  return (
    <div className={cn('flex items-center gap-3', className)}>
      <div className="relative grid h-9 w-9 shrink-0 place-items-center border border-primary/50 bg-primary/5">
        <Crosshair className="h-5 w-5 text-primary" aria-hidden />
        <span
          aria-hidden
          className="absolute -left-px -top-px h-1.5 w-1.5 border-l border-t border-primary"
        />
        <span
          aria-hidden
          className="absolute -bottom-px -right-px h-1.5 w-1.5 border-b border-r border-primary"
        />
      </div>
      {!compact ? (
        <div className="leading-tight">
          <div className="font-display text-sm font-bold uppercase tracking-[0.18em] text-foreground">
            Backlog Bureau
          </div>
          <div className="mt-0.5 font-mono text-[10px] uppercase tracking-[0.28em] text-muted-foreground">
            Game Investigation
          </div>
        </div>
      ) : null}
    </div>
  )
}
