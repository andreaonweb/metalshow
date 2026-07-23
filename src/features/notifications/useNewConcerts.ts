import { useMemo } from 'react'
import type { Concert } from '../../types/concert'
import { useFollowedArtistConcerts } from '../artists/useFollowedArtistConcerts'
import { useSeenConcertsStore } from './store'

/** Conciertos de artistas seguidos que aún no se le han mostrado al usuario. */
export function useNewConcerts(): { newConcerts: Concert[]; isLoading: boolean } {
  const { data: concerts, isPending } = useFollowedArtistConcerts()
  const seenIds = useSeenConcertsStore((state) => state.seenIds)

  const newConcerts = useMemo(() => {
    if (!concerts) return []
    return concerts.filter((concert) => !seenIds[concert.id])
  }, [concerts, seenIds])

  return { newConcerts, isLoading: isPending }
}
