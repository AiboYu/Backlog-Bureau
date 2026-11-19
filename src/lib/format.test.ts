import { describe, expect, it } from 'vitest'
import { buildFileNumber, formatPrice, formatSavings } from './format'

describe('formatPrice', () => {
  it('formats a positive price as USD', () => {
    expect(formatPrice(17.99)).toBe('$17.99')
  })

  it('returns "Free" for zero', () => {
    expect(formatPrice(0)).toBe('Free')
  })
})

describe('buildFileNumber', () => {
  it('prepends CASE- and pads to 7 digits', () => {
    expect(buildFileNumber('123')).toBe('CASE-0000123')
  })
})

describe('formatSavings', () => {
  it('rounds to a whole percentage', () => {
    expect(formatSavings(70.4)).toBe('70%')
  })
})
