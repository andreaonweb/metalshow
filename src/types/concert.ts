export type Genre =
  | 'Metal'
  | 'Metalcore'
  | 'Deathcore'
  | 'Death Metal'
  | 'Black Metal'
  | 'Thrash Metal'
  | 'Doom Metal'
  | 'Nu Metal'
  | 'Grindcore'
  | 'Hardcore'
  | 'Post-Hardcore'
  | 'Screamo'
  | 'Punk'
  | 'Ska Punk'
  | 'Rock'
  | 'Hard Rock'

export interface Concert {
  id: string
  name: string
  artist: string
  artistId?: string
  imageUrl?: string
  date: string // ISO local date (YYYY-MM-DD)
  time?: string
  city: string
  venue: string
  genres: string[] // nombres de género/subgénero tal como los da Ticketmaster
  ticketUrl: string
  isCancelled: boolean
}

export interface ConcertFilters {
  genres: Genre[]
  city?: string
  startDate?: string // YYYY-MM-DD
  endDate?: string // YYYY-MM-DD
  page?: number
}
