import { useQuery } from '@tanstack/react-query'
import { fetchConcertById } from '../../../api/ticketmaster'

export function useConcert(id: string | undefined) {
  return useQuery({
    queryKey: ['concert', id],
    queryFn: () => fetchConcertById(id as string),
    enabled: Boolean(id),
    staleTime: 5 * 60 * 1000,
  })
}
