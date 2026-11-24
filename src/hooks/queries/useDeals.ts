import { useQuery } from '@tanstack/react-query'
import { getDeals, type DealParams } from '@/services/api/cheapshark'
import { queryKeys } from '@/services/api/queryKeys'

/** Fetch live deals with the given filters (`GET /deals`). */
export function useDeals(params: DealParams = {}) {
  return useQuery({
    queryKey: queryKeys.deals(params),
    queryFn: () => getDeals(params),
    staleTime: 1000 * 60 * 2,
  })
}
