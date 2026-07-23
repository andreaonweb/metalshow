import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { Concert } from '../../types/concert'

interface FavoritesState {
  favorites: Record<string, Concert>
  toggleFavorite: (concert: Concert) => void
  isFavorite: (id: string) => boolean
}

export const useFavoritesStore = create<FavoritesState>()(
  persist(
    (set, get) => ({
      favorites: {},
      toggleFavorite: (concert) =>
        set((state) => {
          const next = { ...state.favorites }
          if (next[concert.id]) {
            delete next[concert.id]
          } else {
            next[concert.id] = concert
          }
          return { favorites: next }
        }),
      isFavorite: (id) => Boolean(get().favorites[id]),
    }),
    { name: 'metalshow-favorites' },
  ),
)
