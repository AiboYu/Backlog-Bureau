/** Format a numeric price as a compact USD string ("Free" when zero). */
export function formatPrice(value: number): string {
  if (value <= 0) return 'Free'
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(value)
}

/** Build a bureau case-file number from a raw identifier. */
export function buildFileNumber(id: string | number): string {
  return `CASE-${String(id).padStart(7, '0')}`
}

/** Format a savings percentage as a whole number ("70%"). */
export function formatSavings(value: number): string {
  return `${Math.round(value)}%`
}
