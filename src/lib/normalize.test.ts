import { describe, expect, it } from 'vitest'
import type {
  CheapSharkDeal,
  CheapSharkGameDetail,
  CheapSharkSearchResult,
  CheapSharkStore,
} from '@/types/cheapshark'
import {
  decodeDealId,
  normalizeAssetUrl,
  normalizeDeal,
  normalizeGameDetail,
  normalizeSearchResult,
  normalizeStore,
  parseNumber,
  toBoolean,
} from './normalize'

describe('parseNumber', () => {
  it('parses decimal strings', () => {
    expect(parseNumber('17.99')).toBe(17.99)
    expect(parseNumber('0')).toBe(0)
  })

  it('falls back on invalid or missing input', () => {
    expect(parseNumber(undefined)).toBe(0)
    expect(parseNumber('')).toBe(0)
    expect(parseNumber('not-a-number')).toBe(0)
    expect(parseNumber(undefined, -1)).toBe(-1)
  })
})

describe('toBoolean', () => {
  it('maps "1" and 1 to true', () => {
    expect(toBoolean('1')).toBe(true)
    expect(toBoolean(1)).toBe(true)
  })

  it('maps "0", 0, and undefined to false', () => {
    expect(toBoolean('0')).toBe(false)
    expect(toBoolean(0)).toBe(false)
    expect(toBoolean(undefined)).toBe(false)
  })
})

describe('decodeDealId', () => {
  it('decodes a URL-encoded id exactly once', () => {
    expect(decodeDealId('abc%3D')).toBe('abc=')
  })

  it('is idempotent on already-decoded input', () => {
    expect(decodeDealId('abc=')).toBe('abc=')
  })

  it('returns the input unchanged on malformed sequences', () => {
    expect(decodeDealId('%E0%A4%A')).toBe('%E0%A4%A')
  })
})

describe('normalizeAssetUrl', () => {
  it('prefixes relative paths with the store base', () => {
    expect(normalizeAssetUrl('/img/stores/0.png')).toBe(
      'https://www.cheapshark.com/img/stores/0.png',
    )
  })

  it('passes through absolute URLs', () => {
    expect(normalizeAssetUrl('https://cdn.example.com/x.png')).toBe('https://cdn.example.com/x.png')
  })

  it('returns an empty string for undefined', () => {
    expect(normalizeAssetUrl(undefined)).toBe('')
  })
})

describe('normalizeDeal', () => {
  const raw: CheapSharkDeal = {
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
    steamRatingPercent: '79',
    steamRatingCount: '551234',
    dealRating: '10.0',
    thumb: 'https://cdn.example.com/thumb.jpg',
  }

  it('parses numeric strings and flags', () => {
    expect(normalizeDeal(raw)).toMatchObject({
      salePrice: 17.99,
      normalPrice: 59.99,
      isOnSale: true,
      savingsPercent: 70,
      metacriticScore: 86,
      steamRatingPercent: 79,
      steamRatingCount: 551234,
      dealRating: 10,
      gameID: '202350',
      storeID: '1',
    })
  })

  it('leaves optional numeric fields undefined when absent', () => {
    const deal = normalizeDeal({ ...raw, metacriticScore: undefined, steamRatingPercent: undefined })
    expect(deal.metacriticScore).toBeUndefined()
    expect(deal.steamRatingPercent).toBeUndefined()
  })
})

describe('normalizeSearchResult', () => {
  it('maps external → title and parses cheapest', () => {
    const raw: CheapSharkSearchResult = {
      gameID: '202350',
      steamAppID: '1091500',
      cheapest: '17.99',
      external: 'Cyberpunk 2077',
      internalName: 'CYBERPUNK2077',
      thumb: 'https://cdn.example.com/thumb.jpg',
    }
    expect(normalizeSearchResult(raw)).toMatchObject({
      gameID: '202350',
      steamAppID: '1091500',
      cheapest: 17.99,
      title: 'Cyberpunk 2077',
    })
  })
})

describe('normalizeStore', () => {
  it('resolves image paths and parses isActive', () => {
    const raw: CheapSharkStore = {
      storeID: '1',
      storeName: 'Steam',
      isActive: 1,
      images: {
        banner: '/img/stores/banners/0.png',
        logo: '/img/stores/logos/0.png',
        icon: '/img/stores/icons/0.png',
      },
    }
    expect(normalizeStore(raw)).toMatchObject({
      storeID: '1',
      storeName: 'Steam',
      isActive: true,
      images: {
        banner: 'https://www.cheapshark.com/img/stores/banners/0.png',
        logo: 'https://www.cheapshark.com/img/stores/logos/0.png',
        icon: 'https://www.cheapshark.com/img/stores/icons/0.png',
      },
    })
  })
})

describe('normalizeGameDetail', () => {
  it('parses cheapest price and per-store deals', () => {
    const raw: CheapSharkGameDetail = {
      info: { title: 'Cyberpunk 2077', steamAppID: '1091500', thumb: 'https://cdn.example.com/t.jpg' },
      cheapestPriceEver: { price: '17.99', date: 1781701951 },
      deals: [{ storeID: '1', dealID: 'x%3D', price: '59.99', retailPrice: '59.99', savings: '0.000000' }],
    }
    const detail = normalizeGameDetail(raw)
    expect(detail.info.title).toBe('Cyberpunk 2077')
    expect(detail.cheapestPriceEver.price).toBe(17.99)
    expect(detail.deals[0]).toMatchObject({ price: 59.99, retailPrice: 59.99, savingsPercent: 0 })
  })
})
