import { useMemo } from 'react'
import { Sparkles } from 'lucide-react'
import { Button } from '../components/Button'
import { EmptyState } from '../components/EmptyState'
import { Skeleton } from '../components/Skeleton'
import { useFollowedArtistsStore } from '../features/artists/store'
import { useFavoritesStore } from '../features/favorites/store'
import { RecommendationCard } from '../features/recommendations/RecommendationCard'
import { useRecommendations } from '../features/recommendations/useRecommendations'
import styles from './Recommendations.module.scss'

export function Recommendations() {
  const followedArtists = useFollowedArtistsStore((state) => state.artists)
  const favorites = useFavoritesStore((state) => state.favorites)
  const { status, results, error, generate } = useRecommendations()

  const seedArtists = useMemo(() => {
    const names = new Set<string>()
    Object.values(followedArtists).forEach((artist) => names.add(artist.name))
    Object.values(favorites).forEach((concert) => names.add(concert.artist))
    return [...names]
  }, [followedArtists, favorites])

  return (
    <section>
      <div className={styles.header}>
        <div>
          <h2>Recomendaciones</h2>
          <p className={styles.subtitle}>
            Una IA sugiere grupos nuevos a partir de tus favoritos y de los grupos que sigues, y te
            decimos si tienen conciertos anunciados en España.
          </p>
        </div>
        <Button
          variant="primary"
          disabled={seedArtists.length === 0 || status === 'loading'}
          onClick={() => generate(seedArtists)}
        >
          <Sparkles size={16} />
          {status === 'loading' ? 'Generando…' : 'Generar recomendaciones'}
        </Button>
      </div>

      {seedArtists.length === 0 && (
        <EmptyState
          title="Aún no tenemos con qué recomendarte nada"
          description="Marca algún concierto como favorito o sigue algún grupo desde el buscador para poder generar recomendaciones."
        />
      )}

      {status === 'error' && <p className={styles.error}>{error}</p>}

      {status === 'loading' && (
        <div className={styles.grid}>
          {Array.from({ length: 6 }).map((_, i) => (
            <Skeleton key={i} height="10rem" />
          ))}
        </div>
      )}

      {status === 'success' && results.length === 0 && (
        <EmptyState title="La IA no ha devuelto recomendaciones. Prueba de nuevo en unos minutos." />
      )}

      {status === 'success' && results.length > 0 && (
        <div className={styles.grid}>
          {results.map((recommendation) => (
            <RecommendationCard key={recommendation.name} recommendation={recommendation} />
          ))}
        </div>
      )}
    </section>
  )
}
