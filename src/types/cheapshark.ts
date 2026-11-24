/**
 * CheapShark API shapes (https://www.cheapshark.com/api/1.0).
 *
 * CheapShark returns most numerics as decimal strings and several flags as
 * `"0"`/`"1"` (or numeric `0`/`1`). The `CheapShark*` types mirror the wire
 * format exactly; `src/lib/normalize.ts` converts them into the strongly-typed
 * normalized shapes (numeric strings → number, flags → boolean, asset paths →
 * absolute URLs) exported below.
 */

/* ------------------------------- Raw shapes ------------------------------ */

/** A single result from `GET /games?title=&limit=`. */
export interface CheapSharkSearchResult {
  /** CheapShark's canonical game id — the source of the case-file number. */
  gameID: string
  /** Optional Steam app id, when known. */
  steamAppID?: string
  /** Current cheapest price as a decimal string. */
  cheapest: string
  /** URL-encoded deal id of the current cheapest deal. */
  cheapestDealID?: string
  /** Display title as listed on the storefront. */
  external: string
  /** Slug-style internal name. */
  internalName: string
  /** Full thumbnail URL (Steam CDN). */
  thumb: string
}

/** A live deal from `GET /deals`. */
export interface CheapSharkDeal {
  internalName: string
  title: string
  metacriticLink?: string
  /** URL-encoded deal id. */
  dealID: string
  storeID: string
  gameID: string
  salePrice: string
  normalPrice: string
  isOnSale: '0' | '1'
  savings: string
  metacriticScore?: string
  steamRatingText?: string
  steamRatingPercent?: string
  steamRatingCount?: string
  steamAppID?: string
  /** Unix timestamp (seconds). */
  releaseDate?: number
  /** Unix timestamp (seconds). */
  lastChange?: number
  dealRating: string
  thumb: string
}

/** A storefront from `GET /stores`. */
export interface CheapSharkStore {
  storeID: string
  storeName: string
  isActive: 0 | 1
  images: {
    /** Relative path under https://www.cheapshark.com, e.g. `/img/stores/...`. */
    banner: string
    logo: string
    icon: string
  }
}

/** The `info` object inside a `GET /games?id=` response. */
export interface CheapSharkGameInfo {
  title: string
  steamAppID?: string
  thumb?: string
}

/** A per-store price inside a `GET /games?id=` response. */
export interface CheapSharkGameDeal {
  storeID: string
  /** URL-encoded deal id. */
  dealID: string
  price: string
  retailPrice: string
  savings: string
}

/** Full response from `GET /games?id=`. */
export interface CheapSharkGameDetail {
  info: CheapSharkGameInfo
  cheapestPriceEver: {
    price: string
    /** Unix timestamp (seconds). */
    date?: number
  }
  deals: CheapSharkGameDeal[]
}

/* --------------------------- Normalized shapes --------------------------- */

/** A game search result with parsed numerics. */
export interface GameSearchResult {
  gameID: string
  steamAppID?: string
  cheapest: number
  cheapestDealID?: string
  title: string
  internalName: string
  thumb: string
}

/** A live deal with parsed numerics and flags. */
export interface Deal {
  internalName: string
  title: string
  metacriticLink?: string
  /** Raw (still URL-encoded) id — decode via `decodeDealId` before redirect. */
  dealID: string
  storeID: string
  gameID: string
  salePrice: number
  normalPrice: number
  isOnSale: boolean
  /** Whole-percent discount (e.g. `70` = 70% off). */
  savingsPercent: number
  metacriticScore?: number
  steamRatingText?: string
  steamRatingPercent?: number
  steamRatingCount?: number
  steamAppID?: string
  releaseDate?: number
  lastChange?: number
  dealRating: number
  thumb: string
}

/** A storefront with resolved image URLs and a boolean active flag. */
export interface Store {
  storeID: string
  storeName: string
  isActive: boolean
  images: {
    banner: string
    logo: string
    icon: string
  }
}

/** A per-store price in a game detail, with parsed numerics. */
export interface GameDeal {
  storeID: string
  dealID: string
  price: number
  retailPrice: number
  savingsPercent: number
}

/** A full game dossier with parsed numerics. */
export interface GameDetail {
  info: {
    title: string
    steamAppID?: string
    thumb?: string
  }
  cheapestPriceEver: {
    price: number
    date?: number
  }
  deals: GameDeal[]
}
