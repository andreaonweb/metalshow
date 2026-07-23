import { UserCheck, UserPlus } from 'lucide-react'
import { Link } from 'react-router-dom'
import { Card } from '../../components/Card'
import { useFollowedArtistsStore } from '../artists/store'
import { formatConcertDate } from '../../utils/date'
import type { EnrichedRecommendation } from './useRecommendations'
import styles from './RecommendationCard.module.scss'

export function RecommendationCard({ recommendation }: { recommendation: EnrichedRecommendation }) {
  const { name, reason, genres, matchedArtist, concerts } = recommendation
  const followedArtists = useFollowedArtistsStore((state) => state.artists)
  const followArtist = useFollowedArtistsStore((state) => state.followArtist)
  const unfollowArtist = useFollowedArtistsStore((state) => state.unfollowArtist)

  const following = matchedArtist ? Boolean(followedArtists[matchedArtist.id]) : false

  return (
    <Card>
      <div className={styles.card}>
        <div className={styles.header}>
          <h3 className={styles.name}>{name}</h3>
          {matchedArtist && (
            <button
              type="button"
              className={[styles.followButton, following && styles.followButtonActive]
                .filter(Boolean)
                .join(' ')}
              onClick={() =>
                following ? unfollowArtist(matchedArtist.id) : followArtist(matchedArtist)
              }
            >
              {following ? <UserCheck size={14} /> : <UserPlus size={14} />}
              {following ? 'Siguiendo' : 'Seguir'}
            </button>
          )}
        </div>

        <p className={styles.reason}>{reason}</p>

        {genres.length > 0 && (
          <div className={styles.genres}>
            {genres.map((genre) => (
              <span key={genre} className={styles.genreTag}>
                {genre}
              </span>
            ))}
          </div>
        )}

        {concerts.length > 0 && (
          <div className={styles.concerts}>
            {concerts.map((concert) => (
              <Link key={concert.id} to={`/conciertos/${concert.id}`} className={styles.concertLink}>
                <span className={styles.concertDate}>{formatConcertDate(concert.date)}</span>
                <span className={styles.concertMeta}>
                  {concert.venue} · {concert.city}
                </span>
              </Link>
            ))}
          </div>
        )}

        {matchedArtist && concerts.length === 0 && (
          <p className={styles.noConcerts}>Sin conciertos anunciados en España por ahora.</p>
        )}
      </div>
    </Card>
  )
}
