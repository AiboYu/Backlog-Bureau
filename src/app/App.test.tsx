import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { App } from './App'

describe('App', () => {
  it('renders the bureau shell', () => {
    render(<App />)
    expect(screen.getByRole('heading', { name: /backlog bureau/i })).toBeInTheDocument()
  })
})
