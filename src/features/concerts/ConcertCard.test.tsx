import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { describe, expect, it } from 'vitest'
import type { Concert } from '../../types/concert'
import { ConcertCard } from './ConcertCard'

const concert: Concert = {
  id: 'evt-1',
  name: 'Noche de Metal',
  artist: 'Banda de Prueba',
  imageUrl: 'https://example.com/image.jpg',
  date: '2026-10-15',
  time: '21:00:00',
  city: 'Barcelona',
  venue: 'Sala Razzmatazz',
  genres: ['Metal'],
  ticketUrl: 'https://www.ticketmaster.es/event/evt-1',
  isCancelled: false,
}

function renderCard(overrides: Partial<Concert> = {}) {
  return render(
    <MemoryRouter>
      <ConcertCard concert={{ ...concert, ...overrides }} />
    </MemoryRouter>,
  )
}

describe('ConcertCard', () => {
  it('muestra el artista, la sala, la ciudad y el género', () => {
    renderCard()
    expect(screen.getByText('Banda de Prueba')).toBeInTheDocument()
    expect(screen.getByText(/Sala Razzmatazz/)).toBeInTheDocument()
    expect(screen.getByText(/Barcelona/)).toBeInTheDocument()
    expect(screen.getByText('Metal')).toBeInTheDocument()
  })

  it('muestra la insignia de cancelado cuando el concierto está cancelado', () => {
    renderCard({ isCancelled: true })
    expect(screen.getByText('Cancelado')).toBeInTheDocument()
  })

  it('enlaza al detalle del concierto', () => {
    renderCard()
    expect(screen.getByRole('link')).toHaveAttribute('href', '/conciertos/evt-1')
  })
})
