/** Subconjunto tipado de la respuesta de Ticketmaster Discovery API (solo los campos que usamos). */

export interface TmImage {
  url: string
  width: number
  height: number
  ratio?: string
}

export interface TmClassification {
  segment?: { name: string }
  genre?: { name: string }
  subGenre?: { name: string }
}

export interface TmVenue {
  name: string
  city?: { name: string }
  state?: { name: string }
  address?: { line1?: string }
}

export interface TmAttraction {
  id: string
  name: string
  images?: TmImage[]
  classifications?: TmClassification[]
}

export interface TmEvent {
  id: string
  name: string
  url: string
  images: TmImage[]
  dates: {
    start: {
      localDate: string
      localTime?: string
      dateTime?: string
    }
    status?: { code: string }
  }
  classifications?: TmClassification[]
  _embedded?: {
    venues?: TmVenue[]
    attractions?: TmAttraction[]
  }
}

export interface TmEventsResponse {
  _embedded?: {
    events?: TmEvent[]
  }
  page: {
    size: number
    totalElements: number
    totalPages: number
    number: number
  }
}

export interface TmAttractionsResponse {
  _embedded?: {
    attractions?: TmAttraction[]
  }
}
