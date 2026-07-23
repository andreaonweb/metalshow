import { useQuery } from '@tanstack/react-query'
import { fetchConcertsByArtists } from '../../api/ticketmaster'

/** Próximos conciertos en España de una lista concreta de artistas (sin depender de a quién sigues). */
export function useArtistConcerts(artistIds: string[]) {
  return useQuery({
    queryKey: ['artist-concerts', artistIds],
    queryFn: () => fetchConcertsByArtists(artistIds),
    enabled: artistIds.length > 0,
    staleTime: 2 * 60 * 1000,
  })
}
