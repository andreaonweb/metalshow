import { useMemo } from 'react'
import { FollowedArtistsList } from '../features/artists/FollowedArtistsList'
import { ConcertList } from '../features/concerts/ConcertList'
import { useFavoritesStore } from '../features/favorites/store'

export function Favorites() {
  const favoritesMap = useFavoritesStore((state) => state.favorites)
  const favorites = useMemo(() => Object.values(favoritesMap), [favoritesMap])

  return (
    <section>
      <FollowedArtistsList />
      <h2 style={{ marginBottom: '1.5rem' }}>Tus conciertos favoritos</h2>
      <ConcertList
        concerts={favorites}
        isLoading={false}
        isError={false}
        onPageChange={() => {}}
        emptyTitle="Aún no tienes conciertos favoritos"
        emptyDescription="Márcalos con el corazón desde la lista de conciertos para verlos aquí."
      />
    </section>
  )
}
