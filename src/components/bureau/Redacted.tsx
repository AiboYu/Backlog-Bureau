import { cn } from '@/lib/utils'

const widthPattern = [100, 84, 62, 92, 70]

interface RedactedProps {
  className?: string
  /** Number of stacked "redacted" bars to render. */
  lines?: number
}

/** Redacted-text loading placeholder — bars that shimmer like declassified ink. */
export function Redacted({ className, lines = 3 }: RedactedProps) {
  return (
    <div className={cn('space-y-2', className)} aria-hidden="true">
      {Array.from({ length: lines }).map((_, i) => (
        <div
          key={i}
          className="redacted h-3"
          style={{ width: `${widthPattern[i % widthPattern.length]}%` }}
        />
      ))}
    </div>
  )
}
