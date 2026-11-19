import { DossierCard } from '@/components/bureau/DossierCard'
import { SectionHeading } from '@/components/bureau/SectionHeading'
import { sampleDossiers } from '../data'

export function ActiveCases() {
  return (
    <section>
      <SectionHeading
        eyebrow="Active Case Files"
        title="Cases under review"
        description="A sample of dossiers the bureau is currently tracking."
      />
      <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {sampleDossiers.map((dossier, i) => (
          <DossierCard key={dossier.id} dossier={dossier} index={i} />
        ))}
      </div>
    </section>
  )
}
