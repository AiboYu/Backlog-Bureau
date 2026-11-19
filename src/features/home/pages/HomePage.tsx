import { ActiveCases } from '../components/ActiveCases'
import { Capabilities } from '../components/Capabilities'
import { CtaBand } from '../components/CtaBand'
import { Hero } from '../components/Hero'
import { IntelTicker } from '../components/IntelTicker'

export function HomePage() {
  return (
    <div className="space-y-16">
      <Hero />
      <IntelTicker />
      <Capabilities />
      <ActiveCases />
      <CtaBand />
    </div>
  )
}
