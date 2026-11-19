import { describe, expect, it } from 'vitest'
import { cn } from './utils'

describe('cn', () => {
  it('merges conflicting Tailwind classes', () => {
    expect(cn('px-2 py-1', 'py-2')).toBe('px-2 py-2')
  })

  it('passes through non-conflicting classes', () => {
    expect(cn('font-mono', 'text-primary')).toBe('font-mono text-primary')
  })
})
