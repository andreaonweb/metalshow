import { Bell } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import type { Concert } from '../../types/concert'
import { formatConcertDate } from '../../utils/date'
import { useNewConcerts } from './useNewConcerts'
import { useSeenConcertsStore } from './store'
import styles from './NotificationBell.module.scss'

export function NotificationBell() {
  const [open, setOpen] = useState(false)
  const [snapshot, setSnapshot] = useState<Concert[]>([])
  const containerRef = useRef<HTMLDivElement>(null)

  const { newConcerts } = useNewConcerts()
  const markSeen = useSeenConcertsStore((state) => state.markSeen)

  useEffect(() => {
    if (!open) return
    function handleClickOutside(event: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [open])

  function handleToggle() {
    if (!open) {
      setSnapshot(newConcerts)
      markSeen(newConcerts.map((concert) => concert.id))
    }
    setOpen((prev) => !prev)
  }

  return (
    <div className={styles.container} ref={containerRef}>
      <button
        type="button"
        className={styles.toggle}
        aria-label="Notificaciones de tus artistas seguidos"
        aria-expanded={open}
        onClick={handleToggle}
      >
        <Bell size={18} />
        {newConcerts.length > 0 && <span className={styles.badge}>{newConcerts.length}</span>}
      </button>

      {open && (
        <div className={styles.panel}>
          <p className={styles.title}>Novedades de tus artistas</p>
          {snapshot.length === 0 && (
            <p className={styles.empty}>
              No hay fechas nuevas por ahora. Sigue grupos con el buscador para enterarte cuando
              anuncien conciertos.
            </p>
          )}
          {snapshot.map((concert) => (
            <Link
              key={concert.id}
              to={`/conciertos/${concert.id}`}
              className={styles.item}
              onClick={() => setOpen(false)}
            >
              <span className={styles.itemArtist}>{concert.artist}</span>
              <span className={styles.itemMeta}>
                {formatConcertDate(concert.date)} · {concert.venue} · {concert.city}
              </span>
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}
