import { useState } from 'react'
import { fetchConcertsByArtists, searchArtists } from '../../api/ticketmaster'
import type { Artist } from '../../types/artist'
import type { Concert } from '../../types/concert'
import { fetchRecommendations, type RecommendedArtist } from './api'

export interface EnrichedRecommendation extends RecommendedArtist {
  matchedArtist?: Artist
  concerts: Concert[]
}

interface RecommendationsState {
  status: 'idle' | 'loading' | 'error' | 'success'
  results: EnrichedRecommendation[]
  error?: string
}

/** Busca en Ticketmaster el artista real (coincidencia exacta de nombre) tras cada recomendación de la IA. */
async function matchArtist(name: string): Promise<Artist | undefined> {
  try {
    const found = await searchArtists(name)
    return found.find((artist) => artist.name.toLowerCase() === name.toLowerCase())
  } catch {
    return undefined
  }
}

export function useRecommendations() {
  const [state, setState] = useState<RecommendationsState>({ status: 'idle', results: [] })

  async function generate(seedArtists: string[]) {
    setState({ status: 'loading', results: [] })
    try {
      const recommendations = await fetchRecommendations(seedArtists)
      const matches = await Promise.all(recommendations.map((rec) => matchArtist(rec.name)))

      const matchedIds = matches
        .filter((artist): artist is Artist => Boolean(artist))
        .map((artist) => artist.id)
      const concerts = matchedIds.length > 0 ? await fetchConcertsByArtists(matchedIds) : []

      const results: EnrichedRecommendation[] = recommendations.map((rec, index) => {
        const matchedArtist = matches[index]
        return {
          ...rec,
          matchedArtist,
          concerts: matchedArtist
            ? concerts.filter((concert) => concert.artistId === matchedArtist.id)
            : [],
        }
      })

      setState({ status: 'success', results })
    } catch (error) {
      setState({
        status: 'error',
        results: [],
        error: error instanceof Error ? error.message : 'Error desconocido',
      })
    }
  }

  return { ...state, generate }
}
