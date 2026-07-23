import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { renderHook, waitFor } from '@testing-library/react'
import type { ReactNode } from 'react'
import { describe, expect, it } from 'vitest'
import { useConcerts } from './useConcerts'

function createWrapper() {
  const queryClient = new QueryClient({
    defaultOptions: { queries: { retry: false } },
  })
  return function Wrapper({ children }: { children: ReactNode }) {
    return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  }
}

describe('useConcerts', () => {
  it('devuelve los conciertos mapeados desde Ticketmaster', async () => {
    const { result } = renderHook(() => useConcerts({ genres: ['Metal'], page: 0 }), {
      wrapper: createWrapper(),
    })

    await waitFor(() => expect(result.current.isSuccess).toBe(true))

    expect(result.current.data?.concerts).toHaveLength(1)
    expect(result.current.data?.concerts[0].artist).toBe('Banda de Prueba')
  })
})
