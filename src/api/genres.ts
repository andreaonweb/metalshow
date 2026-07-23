import type { Genre } from '../types/concert'
import type { TmClassification } from './types'

/**
 * Lista de géneros mostrados en los filtros de la UI.
 *
 * Nota sobre la integración con Ticketmaster: en vez de hardcodear IDs de
 * clasificación (genreId/subGenreId), que cambian entre entornos y no se
 * pueden verificar sin una API key real, usamos el parámetro `classificationName`
 * de Discovery API, que hace coincidencia por nombre contra segment/genre/subGenre.
 * Cada género de la UI puede mapear a varios términos de búsqueda para cubrir
 * subgéneros que Ticketmaster no siempre expone como término exacto.
 */
export const GENRES: Genre[] = [
  'Metal',
  'Metalcore',
  'Deathcore',
  'Death Metal',
  'Black Metal',
  'Thrash Metal',
  'Doom Metal',
  'Nu Metal',
  'Grindcore',
  'Hardcore',
  'Post-Hardcore',
  'Screamo',
  'Punk',
  'Ska Punk',
  'Rock',
  'Hard Rock',
]

export const GENRE_SEARCH_TERMS: Record<Genre, string[]> = {
  Metal: ['Metal'],
  Metalcore: ['Metalcore', 'Metal'],
  Deathcore: ['Deathcore', 'Metal'],
  'Death Metal': ['Death Metal', 'Metal'],
  'Black Metal': ['Black Metal', 'Metal'],
  'Thrash Metal': ['Thrash', 'Metal'],
  'Doom Metal': ['Doom', 'Metal'],
  'Nu Metal': ['Nu Metal', 'Nu-Metal', 'Metal'],
  Grindcore: ['Grindcore', 'Metal'],
  Hardcore: ['Hardcore', 'Punk'],
  'Post-Hardcore': ['Post-Hardcore', 'Post Hardcore', 'Punk'],
  Screamo: ['Screamo', 'Punk'],
  Punk: ['Punk'],
  'Ska Punk': ['Ska', 'Punk'],
  Rock: ['Rock'],
  'Hard Rock': ['Hard Rock', 'Rock'],
}

/**
 * La API de Ticketmaster hace matching difuso por `classificationName`, así que
 * puede devolver eventos que no encajen exactamente con el género pedido.
 * Esta función revalida en el cliente comparando los nombres de clasificación
 * reales del evento contra los géneros seleccionados.
 */
export function eventMatchesGenres(
  classifications: TmClassification[] | undefined,
  requestedGenres: Genre[],
): boolean {
  if (requestedGenres.length === 0) return true
  if (!classifications || classifications.length === 0) return false

  const names = classifications
    .flatMap((c) => [c.genre?.name, c.subGenre?.name])
    .filter((name): name is string => Boolean(name))
    .map((name) => name.toLowerCase())

  return requestedGenres.some((genre) =>
    GENRE_SEARCH_TERMS[genre].some((term) =>
      names.some((name) => name.includes(term.toLowerCase())),
    ),
  )
}

export function extractGenreNames(classifications: TmClassification[] | undefined): string[] {
  if (!classifications) return []
  const names = classifications.flatMap((c) => [c.genre?.name, c.subGenre?.name])
  return [...new Set(names.filter((name): name is string => Boolean(name) && name !== 'Undefined'))]
}
