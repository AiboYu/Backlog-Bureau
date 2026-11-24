import { useQuery } from '@tanstack/react-query'
import { searchGames } from '@/services/api/cheapshark'
import { queryKeys } from '@/services/api/queryKeys'

/** Search the CheapShark catalog by title. Disabled for blank queries. */
export function useGameSearch(title: string, limit = 20) {
  return useQuery({
    queryKey: queryKeys.games(title, limit),
    queryFn: () => searchGames(title, limit),
    enabled: title.trim().length > 0,
    staleTime: 1000 * 60 * 5,
  })
}
