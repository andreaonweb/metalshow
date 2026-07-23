import { Heart } from 'lucide-react'
import type { Concert } from '../../types/concert'
import { useFavoritesStore } from './store'
import styles from './FavoriteButton.module.scss'

interface FavoriteButtonProps {
  concert: Concert
  className?: string
}

export function FavoriteButton({ concert, className }: FavoriteButtonProps) {
  const isFavorite = useFavoritesStore((state) => state.isFavorite(concert.id))
  const toggleFavorite = useFavoritesStore((state) => state.toggleFavorite)

  const classNames = [styles.button, isFavorite && styles.active, className]
    .filter(Boolean)
    .join(' ')

  return (
    <button
      type="button"
      className={classNames}
      aria-pressed={isFavorite}
      aria-label={isFavorite ? 'Quitar de favoritos' : 'Añadir a favoritos'}
      onClick={(event) => {
        event.preventDefault()
        event.stopPropagation()
        toggleFavorite(concert)
      }}
    >
      <Heart size={18} fill={isFavorite ? 'currentColor' : 'none'} />
    </button>
  )
}
