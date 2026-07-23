import type { Concert } from '../types/concert'

/** Antepone los conciertos de artistas seguidos, sin alterar el orden por fecha dentro de cada grupo. */
export function sortByFollowedFirst(concerts: Concert[], followedArtistIds: string[]): Concert[] {
  if (followedArtistIds.length === 0) return concerts

  const followed = new Set(followedArtistIds)
  const priority: Concert[] = []
  const rest: Concert[] = []

  for (const concert of concerts) {
    if (concert.artistId && followed.has(concert.artistId)) {
      priority.push(concert)
    } else {
      rest.push(concert)
    }
  }

  return [...priority, ...rest]
}
