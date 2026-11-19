import { NavLink } from 'react-router'
import { BureauLogo } from '@/components/bureau/BureauLogo'
import { navItems } from '@/config/navigation'
import { cn } from '@/lib/utils'

/** Primary navigation list (shared by desktop sidebar and mobile drawer). */
export function SidebarNav({ onNavigate }: { onNavigate?: () => void }) {
  return (
    <nav aria-label="Primary" className="flex flex-1 flex-col gap-1 px-3">
      {navItems.map((item) => {
        const Icon = item.icon
        return (
          <NavLink
            key={item.to}
            to={item.to}
            end={item.to === '/'}
            onClick={onNavigate}
            className={({ isActive }) =>
              cn(
                'group relative flex items-center gap-3 rounded-[3px] px-3 py-2.5 text-sm transition-colors before:absolute before:left-0 before:top-1/2 before:h-5 before:w-0.5 before:-translate-y-1/2 before:bg-primary before:transition-opacity focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring',
                isActive
                  ? 'bg-primary/10 text-primary before:opacity-100'
                  : 'text-muted-foreground before:opacity-0 hover:bg-muted hover:text-foreground',
              )
            }
          >
            <Icon className="h-4 w-4 shrink-0" aria-hidden />
            <span className="flex-1">{item.label}</span>
            <span className="font-mono text-[9px] uppercase tracking-[0.18em] text-muted-foreground/60">
              {item.code}
            </span>
          </NavLink>
        )
      })}
    </nav>
  )
}

/** Bureau status footer ("systems nominal"). */
export function SidebarFooter() {
  return (
    <div className="border-t border-border px-5 py-4">
      <div className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
        <span aria-hidden className="h-1.5 w-1.5 rounded-full bg-primary" />
        Systems nominal
      </div>
      <p className="mt-2 font-mono text-[9px] uppercase tracking-[0.18em] text-muted-foreground/50">
        Est. 2026 · Clearance Level 4
      </p>
    </div>
  )
}

/** Full sidebar (brand + nav + footer) for the desktop layout. */
export function Sidebar() {
  return (
    <div className="flex h-full flex-col">
      <div className="px-5 py-6">
        <BureauLogo />
      </div>
      <SidebarNav />
      <SidebarFooter />
    </div>
  )
}
