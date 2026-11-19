import { motion } from 'motion/react'
import { useNavigate } from 'react-router'
import { BureauButton } from '@/components/bureau/BureauButton'

export function Hero() {
  const navigate = useNavigate()

  return (
    <section className="relative overflow-hidden rounded-lg border border-border bg-card">
      <div className="absolute inset-0 bg-grid opacity-40" aria-hidden />
      <div className="absolute inset-0 bg-scanlines" aria-hidden />
      <div
        className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent"
        aria-hidden
      />
      <div
        aria-hidden
        className="pointer-events-none absolute right-5 top-5 rotate-6 border-2 border-destructive/30 px-3 py-1 font-mono text-xs font-bold uppercase tracking-[0.3em] text-destructive/40"
      >
        Classified
      </div>

      <div className="relative px-6 py-16 sm:px-10 md:py-24">
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="font-mono text-xs font-medium uppercase tracking-[0.3em] text-primary"
        >
          Digital Game Investigation Bureau
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.08 }}
          className="mt-5 max-w-3xl font-display text-4xl font-bold leading-[1.04] tracking-tight text-foreground sm:text-5xl md:text-6xl"
        >
          Backlog <span className="text-primary">Bureau</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.16 }}
          className="mt-5 max-w-2xl text-lg text-muted-foreground"
        >
          Every game is an open case. We track the price, read the discount, and close the deal —
          within your budget.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.24 }}
          className="mt-8 flex flex-wrap items-center gap-3"
        >
          <BureauButton onClick={() => navigate('/discover')}>Begin Investigation</BureauButton>
          <BureauButton variant="outline" onClick={() => navigate('/deals')}>
            View Live Deals
          </BureauButton>
        </motion.div>
      </div>
    </section>
  )
}
