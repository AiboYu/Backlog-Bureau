import { Redacted } from '@/components/bureau/Redacted'
import { SectionHeading } from '@/components/bureau/SectionHeading'
import { StampBadge } from '@/components/bureau/StampBadge'

interface PlaceholderPageProps {
  eyebrow: string
  title: string
  description: string
  code: string
}

/** In-progress page shell for features that land in later phases. */
export function PlaceholderPage({ eyebrow, title, description, code }: PlaceholderPageProps) {
  return (
    <div>
      <SectionHeading eyebrow={eyebrow} title={title} description={description} />
      <div className="mt-10 rounded-md border border-border bg-card p-6">
        <div className="flex items-center justify-between">
          <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-muted-foreground">
            {code} · Under investigation
          </p>
          <StampBadge status="surveillance" label="Pending" />
        </div>
        <div className="mt-6">
          <Redacted lines={5} />
        </div>
      </div>
    </div>
  )
}
