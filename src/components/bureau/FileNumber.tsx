import { buildFileNumber } from '@/lib/format'
import { cn } from '@/lib/utils'

interface FileNumberProps {
  id: string | number
  className?: string
}

/** A "CASE-XXXXXXX" case-file identifier, monospace with a signal bullet. */
export function FileNumber({ id, className }: FileNumberProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center font-mono text-[10px] font-medium uppercase tracking-[0.2em] text-muted-foreground',
        className,
      )}
    >
      <span aria-hidden className="mr-1.5 inline-block h-1.5 w-1.5 bg-primary/70" />
      {buildFileNumber(id)}
    </span>
  )
}
