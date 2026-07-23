import { describe, expect, it } from 'vitest'
import type { Concert } from '../types/concert'
import { sortByFollowedFirst } from './sortConcerts'

function makeConcert(id: string, artistId: string, date: string): Concert {
  return {
    id,
    name: id,
    artist: artistId,
    artistId,
    date,
    city: 'Madrid',
    venue: 'Sala X',
    genres: [],
    ticketUrl: 'https://example.com',
    isCancelled: false,
  }
}

describe('sortByFollowedFirst', () => {
  it('antepone los conciertos de artistas seguidos manteniendo el orden por fecha', () => {
    const concerts = [
      makeConcert('a', 'artist-1', '2026-01-01'),
      makeConcert('b', 'artist-2', '2026-01-02'),
      makeConcert('c', 'artist-3', '2026-01-03'),
    ]

    const sorted = sortByFollowedFirst(concerts, ['artist-3'])

    expect(sorted.map((c) => c.id)).toEqual(['c', 'a', 'b'])
  })

  it('no modifica el orden si no hay artistas seguidos', () => {
    const concerts = [makeConcert('a', 'artist-1', '2026-01-01'), makeConcert('b', 'artist-2', '2026-01-02')]
    expect(sortByFollowedFirst(concerts, [])).toEqual(concerts)
  })
})
