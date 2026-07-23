import { ArrowLeft } from 'lucide-react'
import { Link, useParams } from 'react-router-dom'
import { Button } from '../components/Button'
import { EmptyState } from '../components/EmptyState'
import { Skeleton } from '../components/Skeleton'
import { FavoriteButton } from '../features/favorites/FavoriteButton'
import { useConcert } from '../features/concerts/hooks/useConcert'
import { formatConcertDate } from '../utils/date'
import styles from './ConcertDetail.module.scss'

export function ConcertDetail() {
  const { id } = useParams<{ id: string }>()
  const { data: concert, isPending, isError } = useConcert(id)

  return (
    <section>
      <Link to="/" className={styles.back}>
        <ArrowLeft size={16} />
        Volver a conciertos
      </Link>

      {isPending && <Skeleton height="24rem" />}

      {isError && (
        <EmptyState
          title="No se ha podido cargar el concierto"
          description="Puede que el enlace sea incorrecto o haya un problema de conexión."
        />
      )}

      {!isPending && !isError && concert === null && (
        <EmptyState title="Concierto no encontrado" />
      )}

      {concert && (
        <div className={styles.hero}>
          {concert.imageUrl && <img src={concert.imageUrl} alt="" className={styles.image} />}
          <div className={styles.info}>
            <span className={styles.date}>
              {formatConcertDate(concert.date)}
              {concert.time && ` · ${concert.time.slice(0, 5)}`}
            </span>
            <h1 className={styles.title}>{concert.artist}</h1>
            <p className={styles.meta}>
              {concert.venue} · {concert.city}
            </p>
            {concert.genres.length > 0 && (
              <div className={styles.genres}>
                {concert.genres.map((genre) => (
                  <span key={genre} className={styles.genreTag}>
                    {genre}
                  </span>
                ))}
              </div>
            )}
            <div className={styles.actions}>
              <Button
                variant="primary"
                onClick={() => window.open(concert.ticketUrl, '_blank', 'noopener,noreferrer')}
              >
                Comprar entradas
              </Button>
              <FavoriteButton concert={concert} />
            </div>
          </div>
        </div>
      )}
    </section>
  )
}
