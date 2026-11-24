import { afterEach, describe, expect, it, vi } from 'vitest'
import { jsonResponse } from '@/test/utils'
import { buildDealRedirectUrl, getDeals, searchGames } from './cheapshark'

afterEach(() => {
  vi.unstubAllGlobals()
})

describe('searchGames', () => {
  it('normalizes search results', async () => {
    vi.stubGlobal(
      'fetch',
      vi.fn().mockResolvedValue(
        jsonResponse([
          {
            gameID: '202350',
            steamAppID: '1091500',
            cheapest: '17.99',
            external: 'Cyberpunk 2077',
            internalName: 'CYBERPUNK2077',
            thumb: 'https://cdn.example.com/t.jpg',
          },
        ]),
      ),
    )
    const results = await searchGames('cyberpunk')
    expect(results).toHaveLength(1)
    expect(results[0]).toMatchObject({ gameID: '202350', cheapest: 17.99, title: 'Cyberpunk 2077' })
  })
})

describe('getDeals', () => {
  it('serializes onSale/desc flags to 1/0 and normalizes', async () => {
    const fetchMock = vi.fn().mockResolvedValue(
      jsonResponse([
        {
          internalName: 'A',
          title: 'Game A',
          dealID: 'd%3D',
          storeID: '1',
          gameID: '1',
          salePrice: '9.99',
          normalPrice: '19.99',
          isOnSale: '1',
          savings: '50.000000',
          dealRating: '9.5',
          thumb: 'https://cdn.example.com/t.jpg',
        },
      ]),
    )
    vi.stubGlobal('fetch', fetchMock)
    const deals = await getDeals({ onSale: true, upperPrice: 20, sortBy: 'Deal Rating', desc: true })
    const url = fetchMock.mock.calls[0][0] as string
    expect(url).toContain('onSale=1')
    expect(url).toContain('desc=1')
    expect(url).toContain('upperPrice=20')
    expect(deals[0]).toMatchObject({ salePrice: 9.99, isOnSale: true, savingsPercent: 50 })
  })
})

describe('buildDealRedirectUrl', () => {
  it('decodes the deal id exactly once', () => {
    expect(buildDealRedirectUrl('abc%3D')).toBe('https://www.cheapshark.com/redirect?dealID=abc=')
  })
})
