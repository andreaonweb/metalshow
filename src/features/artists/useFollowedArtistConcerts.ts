import { useQuery } from '@tanstack/react-query'
import { useMemo } from 'react'
import { fetchConcertsByArtists } from '../../api/ticketmaster'
import { useFollowedArtistsStore } from './store'

/** IDs de los artistas seguidos, con referencia estable mientras no cambien. */
export function useFollowedArtistIds(): string[] {
  const artistsMap = useFollowedArtistsStore((state) => state.artists)
  return useMemo(() => Object.keys(artistsMap), [artistsMap])
}

/** Próximos conciertos de los artistas seguidos, revisados periódicamente mientras la app está abierta. */
export function useFollowedArtistConcerts() {
  const artistIds = useFollowedArtistIds()

  return useQuery({
    queryKey: ['artist-concerts', artistIds],
    queryFn: () => fetchConcertsByArtists(artistIds),
    enabled: artistIds.length > 0,
    staleTime: 2 * 60 * 1000,
    refetchInterval: 5 * 60 * 1000,
  })
}
