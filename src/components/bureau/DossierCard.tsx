import { BookmarkPlus } from 'lucide-react'
import { motion } from 'motion/react'
import type { Dossier } from '@/types/domain'
import { formatPrice, formatSavings } from '@/lib/format'
import { cn } from '@/lib/utils'
import { BureauButton } from './BureauButton'
import { FileNumber } from './FileNumber'
import { StampBadge } from './StampBadge'

interface DossierCardProps {
  dossier: Dossier
  /** Stagger index for the entrance animation. */
  index?: number
  className?: string
}

/** Evidence-photo area — real thumbnail, or a textured "on file" placeholder. */
function EvidencePhoto({ dossier }: { dossier: Dossier }) {
  return (
    <div className="relative h-full w-full overflow-hidden bg-card">
      {dossier.thumb ? (
        <img
          src={dossier.thumb}
          alt={`${dossier.title} evidence`}
          className="h-full w-full object-cover"
        />
      ) : (
        <>
          <div className="absolute inset-0 bg-gradient-to-br from-muted to-card" />
          <div className="absolute inset-0 bg-grid-faint opacity-50" />
          <div className="absolute inset-0 bg-scanlines" />
          <span className="absolute inset-0 grid place-items-center font-display text-6xl font-bold text-foreground/10">
            {dossier.title.charAt(0)}
          </span>
        </>
      )}
      <div className="absolute left-2 top-2 bg-background/70 px-1.5 py-0.5 font-mono text-[9px] uppercase tracking-[0.2em] text-muted-foreground">
        Case Photo
      </div>
    </div>
  )
}

/** A game "case file" card: file number, status stamp, evidence, stats, actions. */
export function DossierCard({ dossier, index = 0, className }: DossierCardProps) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.45, delay: index * 0.08, ease: 'easeOut' }}
      className={cn(
        'group relative flex flex-col overflow-hidden rounded-md border border-border bg-card transition-colors hover:border-primary/40',
        className,
      )}
    >
      <span aria-hidden className="corner-bracket left-0 top-0 border-l border-t" />
      <span aria-hidden className="corner-bracket right-0 top-0 border-r border-t" />
      <span aria-hidden className="corner-bracket bottom-0 left-0 border-b border-l" />
      <span aria-hidden className="corner-bracket bottom-0 right-0 border-b border-r" />

      <div className="flex items-center justify-between gap-2 border-b border-border px-4 py-3">
        <FileNumber id={dossier.id} />
        <StampBadge status={dossier.status} />
      </div>

      <div className="relative aspect-[16/9] border-b border-border">
        <EvidencePhoto dossier={dossier} />
      </div>

      <div className="flex flex-1 flex-col p-4">
        <h3 className="font-display text-lg font-semibold leading-snug text-foreground">
          {dossier.title}
        </h3>
        <p className="mt-1.5 line-clamp-2 text-sm text-muted-foreground">{dossier.synopsis}</p>

        <dl className="mt-4 grid grid-cols-3 gap-2 border-t border-border pt-4">
          <div>
            <dt className="font-mono text-[9px] uppercase tracking-[0.18em] text-muted-foreground">
              Price
            </dt>
            <dd className="mt-1 font-mono text-sm font-semibold text-foreground">
              {formatPrice(dossier.price)}
            </dd>
          </div>
          <div>
            <dt className="font-mono text-[9px] uppercase tracking-[0.18em] text-muted-foreground">
              Savings
            </dt>
            <dd
              className={cn(
                'mt-1 font-mono text-sm font-semibold',
                dossier.savingsPercent > 0 ? 'text-secondary' : 'text-muted-foreground',
              )}
            >
              {formatSavings(dossier.savingsPercent)}
            </dd>
          </div>
          <div>
            <dt className="font-mono text-[9px] uppercase tracking-[0.18em] text-muted-foreground">
              Rating
            </dt>
            <dd className="mt-1 font-mono text-sm font-semibold text-foreground">
              {dossier.rating}
            </dd>
          </div>
        </dl>
      </div>

      <div className="flex items-center gap-2 border-t border-border p-4">
        <BureauButton variant="outline" size="sm" className="flex-1">
          Open Case File
        </BureauButton>
        <button
          type="button"
          aria-label={`Save ${dossier.title} to surveillance`}
          className="grid h-8 w-8 place-items-center rounded-[3px] border border-border text-muted-foreground transition-colors hover:border-primary/40 hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        >
          <BookmarkPlus className="h-4 w-4" aria-hidden />
        </button>
      </div>
    </motion.article>
  )
}
