import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface SeenConcertsState {
  seenIds: Record<string, true>
  markSeen: (ids: string[]) => void
}

export const useSeenConcertsStore = create<SeenConcertsState>()(
  persist(
    (set, get) => ({
      seenIds: {},
      markSeen: (ids) => {
        if (ids.length === 0) return
        const seenIds = get().seenIds
        set({ seenIds: { ...seenIds, ...Object.fromEntries(ids.map((id) => [id, true as const])) } })
      },
    }),
    { name: 'metalshow-seen-concerts' },
  ),
)
