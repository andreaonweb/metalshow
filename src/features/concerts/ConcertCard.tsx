import { Star } from 'lucide-react'
import { Link } from 'react-router-dom'
import { Card } from '../../components/Card'
import { useFollowedArtistsStore } from '../artists/store'
import { FavoriteButton } from '../favorites/FavoriteButton'
import type { Concert } from '../../types/concert'
import { formatConcertDate } from '../../utils/date'
import styles from './ConcertCard.module.scss'

interface ConcertCardProps {
  concert: Concert
}

export function ConcertCard({ concert }: ConcertCardProps) {
  const isFollowingArtist = useFollowedArtistsStore((state) =>
    concert.artistId ? state.isFollowing(concert.artistId) : false,
  )

  return (
    <Card>
      <Link to={`/conciertos/${concert.id}`} className={styles.link}>
        <div className={styles.imageWrapper}>
          {concert.imageUrl && (
            <img
              src={concert.imageUrl}
              alt=""
              className={styles.image}
              loading="lazy"
            />
          )}
          {concert.isCancelled && <span className={styles.cancelledBadge}>Cancelado</span>}
          <div className={styles.favoriteSlot}>
            <FavoriteButton concert={concert} />
          </div>
        </div>
        <div className={styles.body}>
          <div className={styles.dateRow}>
            <span className={styles.date}>{formatConcertDate(concert.date)}</span>
            {isFollowingArtist && (
              <span className={styles.followedBadge}>
                <Star size={12} fill="currentColor" />
                Sigues a este grupo
              </span>
            )}
          </div>
          <h3 className={styles.name}>{concert.artist}</h3>
          <span className={styles.venue}>
            {concert.venue} · {concert.city}
          </span>
          {concert.genres.length > 0 && (
            <div className={styles.genres}>
              {concert.genres.map((genre) => (
                <span key={genre} className={styles.genreTag}>
                  {genre}
                </span>
              ))}
            </div>
          )}
        </div>
      </Link>
    </Card>
  )
}
