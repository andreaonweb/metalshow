import { describe, expect, it } from 'vitest'
import { fetchConcerts, fetchConcertsByArtists, searchArtists } from './ticketmaster'

describe('fetchConcerts', () => {
  it('mapea la respuesta de Ticketmaster al modelo interno de Concert', async () => {
    const { concerts, page } = await fetchConcerts({ genres: ['Metal'], page: 0 })

    expect(page.totalElements).toBe(1)
    expect(concerts).toHaveLength(1)
    expect(concerts[0]).toMatchObject({
      id: 'evt-1',
      artist: 'Banda de Prueba',
      city: 'Barcelona',
      venue: 'Sala Razzmatazz',
      date: '2026-10-15',
      isCancelled: false,
    })
    expect(concerts[0].genres).toContain('Metal')
  })

  it('descarta eventos que no coinciden con los géneros pedidos tras la revalidación en cliente', async () => {
    const { concerts } = await fetchConcerts({ genres: ['Punk'], page: 0 })
    expect(concerts).toHaveLength(0)
  })
})

describe('searchArtists', () => {
  it('mapea los resultados de búsqueda de artistas', async () => {
    const artists = await searchArtists('Banda')
    expect(artists).toHaveLength(1)
    expect(artists[0]).toMatchObject({ id: 'artist-1', name: 'Banda de Prueba' })
    expect(artists[0].genres).toContain('Metal')
  })
})

describe('fetchConcertsByArtists', () => {
  it('devuelve una lista vacía sin llamar a la API si no hay artistas', async () => {
    expect(await fetchConcertsByArtists([])).toEqual([])
  })

  it('mapea los conciertos de los artistas seguidos', async () => {
    const concerts = await fetchConcertsByArtists(['artist-1'])
    expect(concerts).toHaveLength(1)
    expect(concerts[0]).toMatchObject({ id: 'evt-1', artistId: 'artist-1' })
  })
})
