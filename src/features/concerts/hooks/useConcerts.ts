import { keepPreviousData, useQuery } from '@tanstack/react-query'
import { fetchConcerts } from '../../../api/ticketmaster'
import type { ConcertFilters } from '../../../types/concert'

export function useConcerts(filters: ConcertFilters) {
  return useQuery({
    queryKey: ['concerts', filters],
    queryFn: () => fetchConcerts(filters),
    staleTime: 5 * 60 * 1000,
    placeholderData: keepPreviousData,
    retry: 1,
  })
}
