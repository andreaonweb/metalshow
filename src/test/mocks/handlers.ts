import { http, HttpResponse } from 'msw'
import type { TmAttractionsResponse, TmEvent, TmEventsResponse } from '../../api/types'

export const mockEvent: TmEvent = {
  id: 'evt-1',
  name: 'Noche de Metal',
  url: 'https://www.ticketmaster.es/event/evt-1',
  images: [{ url: 'https://example.com/image.jpg', width: 1024, height: 576, ratio: '16_9' }],
  dates: {
    start: { localDate: '2026-10-15', localTime: '21:00:00' },
    status: { code: 'onsale' },
  },
  classifications: [{ segment: { name: 'Music' }, genre: { name: 'Metal' } }],
  _embedded: {
    venues: [{ name: 'Sala Razzmatazz', city: { name: 'Barcelona' } }],
    attractions: [{ id: 'artist-1', name: 'Banda de Prueba' }],
  },
}

const mockResponse: TmEventsResponse = {
  _embedded: { events: [mockEvent] },
  page: { size: 20, totalElements: 1, totalPages: 1, number: 0 },
}

const mockAttractionsResponse: TmAttractionsResponse = {
  _embedded: {
    attractions: [
      {
        id: 'artist-1',
        name: 'Banda de Prueba',
        images: [{ url: 'https://example.com/artist.jpg', width: 1024, height: 576, ratio: '16_9' }],
        classifications: [{ segment: { name: 'Music' }, genre: { name: 'Metal' } }],
      },
    ],
  },
}

export const handlers = [
  http.get('https://app.ticketmaster.com/discovery/v2/events.json', () => {
    return HttpResponse.json(mockResponse)
  }),
  http.get('https://app.ticketmaster.com/discovery/v2/events/:id.json', ({ params }) => {
    if (params.id === mockEvent.id) return HttpResponse.json(mockEvent)
    return new HttpResponse(null, { status: 404 })
  }),
  http.get('https://app.ticketmaster.com/discovery/v2/attractions.json', () => {
    return HttpResponse.json(mockAttractionsResponse)
  }),
]
