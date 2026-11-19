import { useNavigate } from 'react-router'
import { BureauButton } from '@/components/bureau/BureauButton'

export function CtaBand() {
  const navigate = useNavigate()

  return (
    <section className="relative overflow-hidden rounded-md border border-border bg-card p-8 text-center md:p-12">
      <div className="absolute inset-0 bg-grid opacity-30" aria-hidden />
      <div className="relative">
        <p className="font-mono text-xs font-medium uppercase tracking-[0.3em] text-primary">
          Begin your investigation
        </p>
        <h2 className="mt-3 font-display text-2xl font-bold tracking-tight md:text-3xl">
          Ready to open your first case?
        </h2>
        <p className="mx-auto mt-3 max-w-xl text-muted-foreground">
          Search the catalog, set a price target, and let the bureau watch the market for you.
        </p>
        <div className="mt-7 flex flex-wrap items-center justify-center gap-3">
          <BureauButton onClick={() => navigate('/discover')}>Search the Catalog</BureauButton>
          <BureauButton variant="outline" onClick={() => navigate('/watchlist')}>
            View Surveillance
          </BureauButton>
        </div>
      </div>
    </section>
  )
}
