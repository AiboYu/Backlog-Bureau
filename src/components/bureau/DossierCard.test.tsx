import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import type { Dossier } from '@/types/domain'
import { DossierCard } from './DossierCard'

const dossier: Dossier = {
  id: '1091500',
  title: 'Cyberpunk 2077',
  synopsis: 'A test synopsis.',
  price: 17.99,
  savingsPercent: 70,
  rating: 86,
  status: 'on-sale',
}

describe('DossierCard', () => {
  it('renders the case file number, title, price, and status', () => {
    render(<DossierCard dossier={dossier} />)

    expect(screen.getByText(/CASE-1091500/i)).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: /cyberpunk 2077/i })).toBeInTheDocument()
    expect(screen.getByText('$17.99')).toBeInTheDocument()
    expect(screen.getByText('On Sale')).toBeInTheDocument()
  })
})
