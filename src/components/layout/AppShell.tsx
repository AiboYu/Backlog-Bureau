import { Outlet } from 'react-router'
import { site } from '@/config/site'

export function AppShell() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="border-b border-border px-6 py-4">
        <div className="mx-auto flex max-w-6xl items-center justify-between">
          <span className="font-mono text-sm uppercase tracking-[0.25em] text-primary">
            {site.name}
          </span>
          <span className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
            Classified
          </span>
        </div>
      </header>
      <main className="mx-auto max-w-6xl px-6 py-10">
        <Outlet />
      </main>
    </div>
  )
}
