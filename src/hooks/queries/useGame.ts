import { useQuery } from '@tanstack/react-query'
import { getGame } from '@/services/api/cheapshark'
import { queryKeys } from '@/services/api/queryKeys'

/** Fetch a single game dossier by CheapShark `gameID`. */
export function useGame(gameId: string | undefined) {
  return useQuery({
    queryKey: queryKeys.game(gameId ?? ''),
    queryFn: () => {
      if (!gameId) throw new Error('gameId is required')
      return getGame(gameId)
    },
    enabled: Boolean(gameId),
    staleTime: 1000 * 60 * 5,
  })
}
