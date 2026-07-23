import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { Artist } from '../../types/artist'

interface FollowedArtistsState {
  artists: Record<string, Artist>
  followArtist: (artist: Artist) => void
  unfollowArtist: (id: string) => void
  isFollowing: (id: string) => boolean
}

export const useFollowedArtistsStore = create<FollowedArtistsState>()(
  persist(
    (set, get) => ({
      artists: {},
      followArtist: (artist) =>
        set((state) => ({ artists: { ...state.artists, [artist.id]: artist } })),
      unfollowArtist: (id) =>
        set((state) => {
          const next = { ...state.artists }
          delete next[id]
          return { artists: next }
        }),
      isFollowing: (id) => Boolean(get().artists[id]),
    }),
    { name: 'metalshow-followed-artists' },
  ),
)
