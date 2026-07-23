import { X } from 'lucide-react'
import { useMemo } from 'react'
import { Link } from 'react-router-dom'
import { useFollowedArtistsStore } from './store'
import styles from './FollowedArtistsList.module.scss'

export function FollowedArtistsList() {
  const artistsMap = useFollowedArtistsStore((state) => state.artists)
  const unfollowArtist = useFollowedArtistsStore((state) => state.unfollowArtist)
  const artists = useMemo(() => Object.values(artistsMap), [artistsMap])

  if (artists.length === 0) return null

  return (
    <div className={styles.section}>
      <h2 style={{ marginBottom: '1rem' }}>Grupos que sigues</h2>
      <div className={styles.grid}>
        {artists.map((artist) => (
          <Link
            key={artist.id}
            to={`/?artista=${artist.id}&nombre=${encodeURIComponent(artist.name)}`}
            className={styles.artist}
            title={`Ver conciertos de ${artist.name}`}
          >
            {artist.imageUrl && <img src={artist.imageUrl} alt="" className={styles.avatar} />}
            <span className={styles.name}>{artist.name}</span>
            <button
              type="button"
              className={styles.unfollow}
              aria-label={`Dejar de seguir a ${artist.name}`}
              onClick={(event) => {
                event.preventDefault()
                event.stopPropagation()
                unfollowArtist(artist.id)
              }}
            >
              <X size={14} />
            </button>
          </Link>
        ))}
      </div>
    </div>
  )
}
