import type { Artist } from '../types/artist'
import type { Concert, ConcertFilters } from '../types/concert'
import { eventMatchesGenres, GENRE_SEARCH_TERMS } from './genres'
import { mapTmAttractionToArtist, mapTmEventToConcert } from './mappers'
import type { TmAttractionsResponse, TmEventsResponse } from './types'

const EVENTS_URL = 'https://app.ticketmaster.com/discovery/v2/events.json'
const ATTRACTIONS_URL = 'https://app.ticketmaster.com/discovery/v2/attractions.json'
const PAGE_SIZE = 20

export class TicketmasterError extends Error {
  status?: number

  constructor(message: string, status?: number) {
    super(message)
    this.name = 'TicketmasterError'
    this.status = status
  }
}

function getApiKey(): string {
  const apiKey = import.meta.env.VITE_TICKETMASTER_API_KEY
  if (!apiKey) {
    throw new TicketmasterError(
      'Falta VITE_TICKETMASTER_API_KEY. Configúrala en tu .env local o en las variables de entorno de Vercel.',
    )
  }
  return apiKey
}

function toDateTime(date: string | undefined, endOfDay: boolean): string | undefined {
  if (!date) return undefined
  return `${date}T${endOfDay ? '23:59:59' : '00:00:00'}Z`
}

function buildSearchParams(filters: ConcertFilters): URLSearchParams {
  const apiKey = getApiKey()

  const params = new URLSearchParams({
    apikey: apiKey,
    countryCode: 'ES',
    classificationName: 'music',
    size: String(PAGE_SIZE),
    page: String(filters.page ?? 0),
    sort: 'date,asc',
  })

  const searchTerms = [...new Set(filters.genres.flatMap((genre) => GENRE_SEARCH_TERMS[genre]))]
  if (searchTerms.length > 0) {
    // classificationName acepta valores separados por coma y hace matching por
    // nombre contra segment/genre/subGenre; se revalida en el cliente después.
    params.set('classificationName', searchTerms.join(','))
  }

  if (filters.city) params.set('city', filters.city)

  const startDateTime = toDateTime(filters.startDate, false)
  const endDateTime = toDateTime(filters.endDate, true)
  if (startDateTime) params.set('startDateTime', startDateTime)
  if (endDateTime) params.set('endDateTime', endDateTime)

  return params
}

export interface ConcertsPage {
  concerts: Concert[]
  page: TmEventsResponse['page']
}

export async function fetchConcerts(filters: ConcertFilters): Promise<ConcertsPage> {
  const params = buildSearchParams(filters)
  const response = await fetch(`${EVENTS_URL}?${params.toString()}`)

  if (!response.ok) {
    throw new TicketmasterError(
      `Ticketmaster respondió con un error (${response.status})`,
      response.status,
    )
  }

  const data: TmEventsResponse = await response.json()
  const events = data._embedded?.events ?? []

  const concerts = events
    .filter((event) => eventMatchesGenres(event.classifications, filters.genres))
    .map(mapTmEventToConcert)

  return { concerts, page: data.page }
}

export async function fetchConcertById(id: string): Promise<Concert | null> {
  const apiKey = getApiKey()

  const response = await fetch(
    `https://app.ticketmaster.com/discovery/v2/events/${id}.json?apikey=${apiKey}`,
  )

  if (response.status === 404) return null
  if (!response.ok) {
    throw new TicketmasterError(
      `Ticketmaster respondió con un error (${response.status})`,
      response.status,
    )
  }

  return mapTmEventToConcert(await response.json())
}

/** Busca artistas/bandas por nombre (Ticketmaster "attractions") para poder seguirlos. */
export async function searchArtists(keyword: string): Promise<Artist[]> {
  const apiKey = getApiKey()
  const params = new URLSearchParams({
    apikey: apiKey,
    keyword,
    countryCode: 'ES',
    size: '10',
    classificationName: 'music',
  })

  const response = await fetch(`${ATTRACTIONS_URL}?${params.toString()}`)
  if (!response.ok) {
    throw new TicketmasterError(
      `Ticketmaster respondió con un error (${response.status})`,
      response.status,
    )
  }

  const data: TmAttractionsResponse = await response.json()
  return (data._embedded?.attractions ?? []).map(mapTmAttractionToArtist)
}

/** Próximos conciertos en España de una lista de artistas seguidos, ordenados por fecha. */
export async function fetchConcertsByArtists(artistIds: string[]): Promise<Concert[]> {
  if (artistIds.length === 0) return []

  const apiKey = getApiKey()
  const params = new URLSearchParams({
    apikey: apiKey,
    countryCode: 'ES',
    attractionId: artistIds.join(','),
    size: '50',
    sort: 'date,asc',
  })

  const response = await fetch(`${EVENTS_URL}?${params.toString()}`)
  if (!response.ok) {
    throw new TicketmasterError(
      `Ticketmaster respondió con un error (${response.status})`,
      response.status,
    )
  }

  const data: TmEventsResponse = await response.json()
  return (data._embedded?.events ?? []).map(mapTmEventToConcert)
}
