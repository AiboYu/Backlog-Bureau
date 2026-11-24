import { site } from '@/config/site'
import {
  decodeDealId,
  normalizeDeal,
  normalizeGameDetail,
  normalizeSearchResult,
  normalizeStore,
} from '@/lib/normalize'
import type {
  CheapSharkDeal,
  CheapSharkGameDetail,
  CheapSharkSearchResult,
  CheapSharkStore,
  Deal,
  GameDetail,
  GameSearchResult,
  Store,
} from '@/types/cheapshark'
import { request } from './client'

/** Sort options accepted by `GET /deals` (`sortBy`). */
export type DealSort =
  | 'Deal Rating'
  | 'Title'
  | 'Savings'
  | 'Price'
  | 'Metacritic'
  | 'Reviews'
  | 'Release Date'
  | 'Recent'

/** Filters accepted by `GET /deals`. */
export interface DealParams {
  storeID?: string
  upperPrice?: number
  lowerPrice?: number
  pageNumber?: number
  pageSize?: number
  onSale?: boolean
  metacritic?: number
  sortBy?: DealSort
  desc?: boolean
  title?: string
}

/** Search the catalog by title (`GET /games?title=&limit=`). */
export async function searchGames(title: string, limit = 20): Promise<GameSearchResult[]> {
  const raw = await request<CheapSharkSearchResult[]>('/games', {
    params: { title, limit },
  })
  return raw.map(normalizeSearchResult)
}

/** Fetch a single game dossier (`GET /games?id=`). */
export async function getGame(gameId: string): Promise<GameDetail> {
  const raw = await request<CheapSharkGameDetail>('/games', { params: { id: gameId } })
  return normalizeGameDetail(raw)
}

/** Fetch live deals (`GET /deals`). */
export async function getDeals(params: DealParams = {}): Promise<Deal[]> {
  const query: Record<string, string | number | undefined> = {
    storeID: params.storeID,
    upperPrice: params.upperPrice,
    lowerPrice: params.lowerPrice,
    pageNumber: params.pageNumber,
    pageSize: params.pageSize,
    metacritic: params.metacritic,
    title: params.title,
    sortBy: params.sortBy,
  }
  if (params.onSale !== undefined) query.onSale = params.onSale ? 1 : 0
  if (params.desc !== undefined) query.desc = params.desc ? 1 : 0

  const raw = await request<CheapSharkDeal[]>('/deals', { params: query })
  return raw.map(normalizeDeal)
}

/** Fetch all storefronts (`GET /stores`). */
export async function getStores(): Promise<Store[]> {
  const raw = await request<CheapSharkStore[]>('/stores')
  return raw.map(normalizeStore)
}

/** Build a purchase redirect URL from a raw (URL-encoded) deal id. */
export function buildDealRedirectUrl(dealId: string): string {
  return `${site.storeAssetBaseUrl.replace(/\/$/, '')}/redirect?dealID=${decodeDealId(dealId)}`
}
