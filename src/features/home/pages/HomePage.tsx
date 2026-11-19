import { site } from '@/config/site'

export function HomePage() {
  return (
    <section>
      <p className="font-mono text-xs uppercase tracking-[0.25em] text-primary">
        Case File 001 — Briefing
      </p>
      <h1 className="mt-3 text-4xl font-bold tracking-tight">{site.name}</h1>
      <p className="mt-3 max-w-2xl text-muted-foreground">
        A digital game investigation bureau. Discover games, compare prices, and plan purchases
        within a budget.
      </p>
    </section>
  )
}
