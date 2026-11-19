import { motion } from 'motion/react'
import type { StampStatus } from '@/types/domain'
import { cn } from '@/lib/utils'

const toneClasses: Record<StampStatus, string> = {
  verified: 'text-primary',
  'on-sale': 'text-secondary',
  surveillance: 'text-muted-foreground',
  cleared: 'text-chart-4',
  flag: 'text-destructive',
}

const defaultLabel: Record<StampStatus, string> = {
  verified: 'Verified',
  'on-sale': 'On Sale',
  surveillance: 'Surveillance',
  cleared: 'Cleared',
  flag: 'Flagged',
}

interface StampBadgeProps {
  status: StampStatus
  /** Optional override label; defaults to the status vocabulary. */
  label?: string
  className?: string
}

/** A rubber-stamp status badge with a "stamp slam" entrance. */
export function StampBadge({ status, label, className }: StampBadgeProps) {
  return (
    <motion.span
      initial={{ scale: 1.6, opacity: 0, rotate: -16 }}
      animate={{ scale: 1, opacity: 1, rotate: -3 }}
      transition={{ type: 'spring', stiffness: 380, damping: 15 }}
      className={cn(
        'stamp-frame inline-flex select-none items-center border-2 px-2 py-0.5 font-mono text-[10px] font-semibold uppercase tracking-[0.22em]',
        toneClasses[status],
        className,
      )}
    >
      {label ?? defaultLabel[status]}
    </motion.span>
  )
}
