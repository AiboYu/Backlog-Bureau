import { renderHook, waitFor } from '@testing-library/react'
import { afterEach, describe, expect, it, vi } from 'vitest'
import { createWrapper, jsonResponse } from '@/test/utils'
import { useDeals } from './useDeals'
import { useGame } from './useGame'
import { useGameSearch } from './useGameSearch'
import { useStores } from './useStores'

afterEach(() => {
  vi.unstubAllGlobals()
})

const dealPayload = [
  {
    internalName: 'CYBERPUNK2077',
    title: 'Cyberpunk 2077',
    dealID: 'abc%3D',
    storeID: '1',
    gameID: '202350',
    salePrice: '17.99',
    normalPrice: '59.99',
    isOnSale: '1',
    savings: '70.000000',
    metacriticScore: '86',
    dealRating: '10.0',
    thumb: 'https://example.com/t.jpg',
  },
]

describe('useDeals', () => {
  it('fetches and normalizes deals', async () => {
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue(jsonResponse(dealPayload)))
    const { result } = renderHook(() => useDeals(), { wrapper: createWrapper() })
    await waitFor(() => expect(result.current.isSuccess).toBe(true))
    expect(result.current.data).toHaveLength(1)
    expect(result.current.data?.[0]).toMatchObject({
      title: 'Cyberpunk 2077',
      salePrice: 17.99,
      savingsPercent: 70,
      isOnSale: true,
    })
  })
})

describe('useGameSearch', () => {
  it('does not fetch when the title is blank', () => {
    const fetchMock = vi.fn()
    vi.stubGlobal('fetch', fetchMock)
    renderHook(() => useGameSearch('   '), { wrapper: createWrapper() })
    expect(fetchMock).not.toHaveBeenCalled()
  })

  it('fetches search results when a title is provided', async () => {
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
            thumb: 'https://example.com/t.jpg',
          },
        ]),
      ),
    )
    const { result } = renderHook(() => useGameSearch('cyberpunk'), { wrapper: createWrapper() })
    await waitFor(() => expect(result.current.isSuccess).toBe(true))
    expect(result.current.data?.[0]).toMatchObject({ gameID: '202350', cheapest: 17.99 })
  })
})

describe('useGame', () => {
  it('does not fetch when no id is provided', () => {
    const fetchMock = vi.fn()
    vi.stubGlobal('fetch', fetchMock)
    renderHook(() => useGame(undefined), { wrapper: createWrapper() })
    expect(fetchMock).not.toHaveBeenCalled()
  })

  it('fetches a game dossier by id', async () => {
    vi.stubGlobal(
      'fetch',
      vi.fn().mockResolvedValue(
        jsonResponse({
          info: { title: 'Cyberpunk 2077', steamAppID: '1091500', thumb: 'https://example.com/t.jpg' },
          cheapestPriceEver: { price: '17.99', date: 1781701951 },
          deals: [{ storeID: '1', dealID: 'x%3D', price: '59.99', retailPrice: '59.99', savings: '0.000000' }],
        }),
      ),
    )
    const { result } = renderHook(() => useGame('202350'), { wrapper: createWrapper() })
    await waitFor(() => expect(result.current.isSuccess).toBe(true))
    expect(result.current.data?.info.title).toBe('Cyberpunk 2077')
    expect(result.current.data?.cheapestPriceEver.price).toBe(17.99)
  })
})

describe('useStores', () => {
  it('fetches and normalizes stores', async () => {
    vi.stubGlobal(
      'fetch',
      vi.fn().mockResolvedValue(
        jsonResponse([
          {
            storeID: '1',
            storeName: 'Steam',
            isActive: 1,
            images: {
              banner: '/img/stores/banners/0.png',
              logo: '/img/stores/logos/0.png',
              icon: '/img/stores/icons/0.png',
            },
          },
        ]),
      ),
    )
    const { result } = renderHook(() => useStores(), { wrapper: createWrapper() })
    await waitFor(() => expect(result.current.isSuccess).toBe(true))
    expect(result.current.data?.[0]).toMatchObject({ storeID: '1', storeName: 'Steam', isActive: true })
  })
})
