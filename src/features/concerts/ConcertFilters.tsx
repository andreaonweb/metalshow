import { GENRES } from '../../api/genres'
import { Chip } from '../../components/Chip'
import type { ConcertFilters as ConcertFiltersType, Genre } from '../../types/concert'
import styles from './ConcertFilters.module.scss'

interface ConcertFiltersProps {
  filters: ConcertFiltersType
  onChange: (filters: ConcertFiltersType) => void
}

export function ConcertFilters({ filters, onChange }: ConcertFiltersProps) {
  function toggleGenre(genre: Genre) {
    const isActive = filters.genres.includes(genre)
    const genres = isActive
      ? filters.genres.filter((g) => g !== genre)
      : [...filters.genres, genre]
    onChange({ ...filters, genres, page: 0 })
  }

  return (
    <div className={styles.container}>
      <div className={styles.genreRow}>
        {GENRES.map((genre) => (
          <Chip key={genre} active={filters.genres.includes(genre)} onClick={() => toggleGenre(genre)}>
            {genre}
          </Chip>
        ))}
      </div>
      <div className={styles.fieldsRow}>
        <label className={styles.field}>
          Ciudad
          <input
            className={styles.input}
            type="text"
            placeholder="Madrid, Barcelona..."
            value={filters.city ?? ''}
            onChange={(e) => onChange({ ...filters, city: e.target.value || undefined, page: 0 })}
          />
        </label>
        <label className={styles.field}>
          Desde
          <input
            className={styles.input}
            type="date"
            value={filters.startDate ?? ''}
            onChange={(e) =>
              onChange({ ...filters, startDate: e.target.value || undefined, page: 0 })
            }
          />
        </label>
        <label className={styles.field}>
          Hasta
          <input
            className={styles.input}
            type="date"
            value={filters.endDate ?? ''}
            onChange={(e) => onChange({ ...filters, endDate: e.target.value || undefined, page: 0 })}
          />
        </label>
      </div>
    </div>
  )
}
