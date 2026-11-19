import { motion } from 'motion/react'
import { Eye, Radar, Search, Wallet, type LucideIcon } from 'lucide-react'
import { SectionHeading } from '@/components/bureau/SectionHeading'

interface Capability {
  code: string
  title: string
  description: string
  icon: LucideIcon
}

const capabilities: Capability[] = [
  {
    code: 'CASE',
    title: 'Discover',
    description: 'Search the catalog and file new cases on any game.',
    icon: Search,
  },
  {
    code: 'RADAR',
    title: 'Compare',
    description: 'Read prices and discounts across every storefront.',
    icon: Radar,
  },
  {
    code: 'WATCH',
    title: 'Surveil',
    description: 'Track targets and get flagged when prices drop.',
    icon: Eye,
  },
  {
    code: 'BUDGET',
    title: 'Plan',
    description: 'Close the deal without blowing the field budget.',
    icon: Wallet,
  },
]

export function Capabilities() {
  return (
    <section>
      <SectionHeading
        eyebrow="Bureau Capabilities"
        title="What the bureau does"
        description="Four desks, one mission: get you the game at the right price."
      />
      <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {capabilities.map((cap, i) => {
          const Icon = cap.icon
          return (
            <motion.div
              key={cap.code}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.4, delay: i * 0.06 }}
              className="rounded-md border border-border bg-card p-5 transition-colors hover:border-primary/40"
            >
              <div className="flex items-start justify-between">
                <div className="grid h-10 w-10 place-items-center border border-primary/30 bg-primary/5">
                  <Icon className="h-5 w-5 text-primary" aria-hidden />
                </div>
                <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-muted-foreground/60">
                  {cap.code}
                </span>
              </div>
              <h3 className="mt-4 font-display text-base font-semibold text-foreground">
                {cap.title}
              </h3>
              <p className="mt-1.5 text-sm text-muted-foreground">{cap.description}</p>
            </motion.div>
          )
        })}
      </div>
    </section>
  )
}
