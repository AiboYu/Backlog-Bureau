import type { DealParams } from './cheapshark'

/** Centralized TanStack Query key factories for the CheapShark API. */
export const queryKeys = {
  all: ['cheapshark'] as const,
  games: (title: string, limit = 20) => [...queryKeys.all, 'games', { title, limit }] as const,
  game: (gameId: string) => [...queryKeys.all, 'game', gameId] as const,
  deals: (params: DealParams = {}) => [...queryKeys.all, 'deals', params] as const,
  stores: () => [...queryKeys.all, 'stores'] as const,
}
