import { site } from '@/config/site'
import type {
  CheapSharkDeal,
  CheapSharkGameDeal,
  CheapSharkGameDetail,
  CheapSharkSearchResult,
  CheapSharkStore,
  Deal,
  GameDeal,
  GameDetail,
  GameSearchResult,
  Store,
} from '@/types/cheapshark'

/** Parse a numeric string into a number; falls back to `fallback` (default 0). */
export function parseNumber(value: string | undefined, fallback = 0): number {
  if (value === undefined || value === '') return fallback
  const parsed = Number(value)
  return Number.isFinite(parsed) ? parsed : fallback
}

/** Parse a numeric string into a number or `undefined` when absent/blank. */
function optionalNumber(value: string | undefined): number | undefined {
  return value === undefined || value === '' ? undefined : parseNumber(value)
}

/** Convert CheapShark's `"0"`/`"1"` (or numeric `0`/`1`) flags to booleans. */
export function toBoolean(value: string | number | undefined): boolean {
  return value === '1' || value === 1
}

/** Decode a URL-encoded deal id exactly once (avoids double-encoding). */
export function decodeDealId(dealId: string): string {
  try {
    return decodeURIComponent(dealId)
  } catch {
    return dealId
  }
}

/** Resolve a relative CheapShark asset path into an absolute URL. */
export function normalizeAssetUrl(path: string | undefined): string {
  if (!path) return ''
  if (/^https?:\/\//i.test(path)) return path
  const prefix = site.storeAssetBaseUrl.replace(/\/$/, '')
  return `${prefix}/${path.replace(/^\//, '')}`
}

export function normalizeSearchResult(raw: CheapSharkSearchResult): GameSearchResult {
  return {
    gameID: raw.gameID,
    steamAppID: raw.steamAppID,
    cheapest: parseNumber(raw.cheapest),
    cheapestDealID: raw.cheapestDealID,
    title: raw.external,
    internalName: raw.internalName,
    thumb: raw.thumb,
  }
}

export function normalizeDeal(raw: CheapSharkDeal): Deal {
  return {
    internalName: raw.internalName,
    title: raw.title,
    metacriticLink: raw.metacriticLink,
    dealID: raw.dealID,
    storeID: raw.storeID,
    gameID: raw.gameID,
    salePrice: parseNumber(raw.salePrice),
    normalPrice: parseNumber(raw.normalPrice),
    isOnSale: toBoolean(raw.isOnSale),
    savingsPercent: parseNumber(raw.savings),
    metacriticScore: optionalNumber(raw.metacriticScore),
    steamRatingText: raw.steamRatingText,
    steamRatingPercent: optionalNumber(raw.steamRatingPercent),
    steamRatingCount: optionalNumber(raw.steamRatingCount),
    steamAppID: raw.steamAppID,
    releaseDate: raw.releaseDate,
    lastChange: raw.lastChange,
    dealRating: parseNumber(raw.dealRating),
    thumb: raw.thumb,
  }
}

export function normalizeStore(raw: CheapSharkStore): Store {
  return {
    storeID: raw.storeID,
    storeName: raw.storeName,
    isActive: toBoolean(raw.isActive),
    images: {
      banner: normalizeAssetUrl(raw.images.banner),
      logo: normalizeAssetUrl(raw.images.logo),
      icon: normalizeAssetUrl(raw.images.icon),
    },
  }
}

export function normalizeGameDeal(raw: CheapSharkGameDeal): GameDeal {
  return {
    storeID: raw.storeID,
    dealID: raw.dealID,
    price: parseNumber(raw.price),
    retailPrice: parseNumber(raw.retailPrice),
    savingsPercent: parseNumber(raw.savings),
  }
}

export function normalizeGameDetail(raw: CheapSharkGameDetail): GameDetail {
  return {
    info: {
      title: raw.info.title,
      steamAppID: raw.info.steamAppID,
      thumb: raw.info.thumb,
    },
    cheapestPriceEver: {
      price: parseNumber(raw.cheapestPriceEver.price),
      date: raw.cheapestPriceEver.date,
    },
    deals: raw.deals.map(normalizeGameDeal),
  }
}
