import type { Artist } from '../types/artist'
import type { Concert } from '../types/concert'
import { extractGenreNames } from './genres'
import type { TmAttraction, TmEvent, TmImage } from './types'

function pickBestImage(images: TmImage[] | undefined): string | undefined {
  if (!images || images.length === 0) return undefined
  const landscape = images.find((img) => img.ratio === '16_9' && img.width >= 640)
  return (landscape ?? images[0]).url
}

export function mapTmEventToConcert(event: TmEvent): Concert {
  const venue = event._embedded?.venues?.[0]
  const attraction = event._embedded?.attractions?.[0]

  return {
    id: event.id,
    name: event.name,
    artist: attraction?.name ?? event.name,
    artistId: attraction?.id,
    imageUrl: pickBestImage(event.images),
    date: event.dates.start.localDate,
    time: event.dates.start.localTime,
    city: venue?.city?.name ?? 'Ciudad no especificada',
    venue: venue?.name ?? 'Sala no especificada',
    genres: extractGenreNames(event.classifications),
    ticketUrl: event.url,
    isCancelled: event.dates.status?.code === 'cancelled',
  }
}

export function mapTmAttractionToArtist(attraction: TmAttraction): Artist {
  return {
    id: attraction.id,
    name: attraction.name,
    imageUrl: pickBestImage(attraction.images),
    genres: extractGenreNames(attraction.classifications),
  }
}
