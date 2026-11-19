/** Status vocabulary used by the bureau stamp badges. */
export type StampStatus = 'verified' | 'on-sale' | 'surveillance' | 'cleared' | 'flag'

/** A minimal "case file" summary used to render a dossier card. */
export interface Dossier {
  /** Stable identifier used to build the case-file number (e.g. "1091500"). */
  id: string
  title: string
  synopsis: string
  /** Optional evidence-photo URL. When absent, a styled placeholder is shown. */
  thumb?: string
  price: number
  savingsPercent: number
  rating: number
  status: StampStatus
}
