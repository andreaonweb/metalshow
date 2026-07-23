import { Button } from '../../components/Button'
import { EmptyState } from '../../components/EmptyState'
import { Skeleton } from '../../components/Skeleton'
import type { Concert } from '../../types/concert'
import type { ConcertsPage } from '../../api/ticketmaster'
import { ConcertCard } from './ConcertCard'
import styles from './ConcertList.module.scss'

interface ConcertListProps {
  data?: ConcertsPage
  concerts?: Concert[]
  isLoading: boolean
  isError: boolean
  onPageChange: (page: number) => void
  emptyTitle?: string
  emptyDescription?: string
}

export function ConcertList({
  data,
  concerts,
  isLoading,
  isError,
  onPageChange,
  emptyTitle = 'No hay conciertos con estos filtros',
  emptyDescription = 'Prueba a quitar algún género o ampliar la búsqueda por ciudad.',
}: ConcertListProps) {
  if (isLoading) {
    return (
      <div className={styles.grid}>
        {Array.from({ length: 6 }).map((_, i) => (
          <Skeleton key={i} height="20rem" />
        ))}
      </div>
    )
  }

  if (isError) {
    return (
      <EmptyState
        title="No se han podido cargar los conciertos"
        description="Revisa tu conexión o inténtalo de nuevo en unos minutos."
      />
    )
  }

  const list = concerts ?? data?.concerts ?? []

  if (list.length === 0) {
    return <EmptyState title={emptyTitle} description={emptyDescription} />
  }

  const page = data?.page

  return (
    <>
      <div className={styles.grid}>
        {list.map((concert) => (
          <ConcertCard key={concert.id} concert={concert} />
        ))}
      </div>
      {page && page.totalPages > 1 && (
        <div className={styles.pagination}>
          <Button
            variant="secondary"
            disabled={page.number === 0}
            onClick={() => onPageChange(page.number - 1)}
          >
            Anterior
          </Button>
          <span className={styles.pageLabel}>
            Página {page.number + 1} de {page.totalPages}
          </span>
          <Button
            variant="secondary"
            disabled={page.number + 1 >= page.totalPages}
            onClick={() => onPageChange(page.number + 1)}
          >
            Siguiente
          </Button>
        </div>
      )}
    </>
  )
}
