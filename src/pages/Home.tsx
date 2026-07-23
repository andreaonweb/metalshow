import { useMemo, useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { X } from 'lucide-react'
import { GENRES } from '../api/genres'
import { Button } from '../components/Button'
import { useArtistConcerts } from '../features/artists/useArtistConcerts'
import { useFollowedArtistIds } from '../features/artists/useFollowedArtistConcerts'
import { ConcertFilters } from '../features/concerts/ConcertFilters'
import { ConcertList } from '../features/concerts/ConcertList'
import { useConcerts } from '../features/concerts/hooks/useConcerts'
import type { ConcertFilters as ConcertFiltersType } from '../types/concert'
import { todayISODate } from '../utils/date'
import { sortByFollowedFirst } from '../utils/sortConcerts'
import styles from './Home.module.scss'

// Todos los géneros activos por defecto: la lista aparece directamente,
// sin que el usuario tenga que tocar los filtros, ya ordenada del concierto
// más próximo al más lejano (ver sort=date,asc en api/ticketmaster.ts).
const INITIAL_FILTERS: ConcertFiltersType = {
  genres: [...GENRES],
  startDate: todayISODate(),
  page: 0,
}

function ArtistFilteredConcerts({
  artistId,
  artistName,
  onClear,
}: {
  artistId: string
  artistName: string
  onClear: () => void
}) {
  const { data: concerts, isPending, isError } = useArtistConcerts([artistId])

  return (
    <section>
      <div className={styles.artistFilterBanner}>
        <span className={styles.artistFilterLabel}>
          Mostrando conciertos de <strong>{artistName}</strong>
        </span>
        <Button variant="secondary" onClick={onClear}>
          <X size={14} />
          Quitar filtro
        </Button>
      </div>
      <ConcertList
        concerts={concerts}
        isLoading={isPending}
        isError={isError}
        onPageChange={() => {}}
        emptyTitle={`${artistName} no tiene conciertos anunciados en España`}
        emptyDescription="En cuanto anuncien una fecha nueva, aparecerá aquí."
      />
    </section>
  )
}

export function Home() {
  const [filters, setFilters] = useState<ConcertFiltersType>(INITIAL_FILTERS)
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()
  const { data, isPending, isError } = useConcerts(filters)
  const followedArtistIds = useFollowedArtistIds()

  const sortedConcerts = useMemo(
    () => (data ? sortByFollowedFirst(data.concerts, followedArtistIds) : undefined),
    [data, followedArtistIds],
  )

  const artistId = searchParams.get('artista')
  const artistName = searchParams.get('nombre')

  if (artistId && artistName) {
    return (
      <ArtistFilteredConcerts
        artistId={artistId}
        artistName={artistName}
        // Este filtro solo se entra desde "Grupos que sigues" en Favoritos,
        // así que al quitarlo volvemos ahí en vez de dejar al usuario en Conciertos.
        onClear={() => navigate('/favoritos')}
      />
    )
  }

  return (
    <section>
      <ConcertFilters filters={filters} onChange={setFilters} />
      <ConcertList
        data={data}
        concerts={sortedConcerts}
        isLoading={isPending}
        isError={isError}
        onPageChange={(page) => {
          setFilters((prev) => ({ ...prev, page }))
          window.scrollTo({ top: 0, behavior: 'smooth' })
        }}
      />
    </section>
  )
}
