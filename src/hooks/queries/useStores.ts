import { useQuery } from '@tanstack/react-query'
import { getStores } from '@/services/api/cheapshark'
import { queryKeys } from '@/services/api/queryKeys'

/** Fetch the storefront list (`GET /stores`). Rarely changes, so never stale. */
export function useStores() {
  return useQuery({
    queryKey: queryKeys.stores(),
    queryFn: getStores,
    staleTime: Number.POSITIVE_INFINITY,
  })
}
