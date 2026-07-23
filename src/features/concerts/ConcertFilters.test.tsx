import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'
import type { ConcertFilters as ConcertFiltersType } from '../../types/concert'
import { ConcertFilters } from './ConcertFilters'

const baseFilters: ConcertFiltersType = { genres: [], page: 0 }

describe('ConcertFilters', () => {
  it('activa un género al pulsar su chip', async () => {
    const user = userEvent.setup()
    const onChange = vi.fn()
    render(<ConcertFilters filters={baseFilters} onChange={onChange} />)

    await user.click(screen.getByRole('button', { name: 'Metal' }))

    expect(onChange).toHaveBeenCalledWith({ genres: ['Metal'], page: 0 })
  })

  it('desactiva un género ya seleccionado', async () => {
    const user = userEvent.setup()
    const onChange = vi.fn()
    render(
      <ConcertFilters filters={{ genres: ['Metal'], page: 0 }} onChange={onChange} />,
    )

    await user.click(screen.getByRole('button', { name: 'Metal' }))

    expect(onChange).toHaveBeenCalledWith({ genres: [], page: 0 })
  })

  it('actualiza el filtro de ciudad', async () => {
    const user = userEvent.setup()
    const onChange = vi.fn()
    render(<ConcertFilters filters={baseFilters} onChange={onChange} />)

    await user.type(screen.getByLabelText('Ciudad'), 'M')

    expect(onChange).toHaveBeenCalledWith({ genres: [], page: 0, city: 'M' })
  })
})
