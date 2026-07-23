import { Search, UserCheck, UserPlus } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import { useFollowedArtistsStore } from './store'
import { useArtistSearch } from './useArtistSearch'
import styles from './ArtistSearch.module.scss'

export function ArtistSearch() {
  const [open, setOpen] = useState(false)
  const [keyword, setKeyword] = useState('')
  const containerRef = useRef<HTMLDivElement>(null)

  const { data: results, isFetching } = useArtistSearch(keyword)
  // Se lee el mapa de artistas (no la función `isFollowing`) para que el
  // componente se re-renderice cuando cambie: seleccionar la función en sí
  // siempre devuelve la misma referencia y Zustand nunca notificaría el cambio.
  const followedArtists = useFollowedArtistsStore((state) => state.artists)
  const followArtist = useFollowedArtistsStore((state) => state.followArtist)
  const unfollowArtist = useFollowedArtistsStore((state) => state.unfollowArtist)

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

  return (
    <div className={styles.container} ref={containerRef}>
      <button
        type="button"
        className={styles.toggle}
        aria-label="Buscar un grupo"
        aria-expanded={open}
        onClick={() => setOpen((prev) => !prev)}
      >
        <Search size={18} />
      </button>

      {open && (
        <div className={styles.panel}>
          <input
            className={styles.input}
            type="text"
            autoFocus
            placeholder="Busca un grupo (ej. Metallica)"
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
          />

          <div className={styles.results}>
            {keyword.trim().length < 2 && (
              <p className={styles.hint}>Escribe al menos 2 letras para buscar.</p>
            )}

            {keyword.trim().length >= 2 && isFetching && <p className={styles.hint}>Buscando…</p>}

            {keyword.trim().length >= 2 && !isFetching && results?.length === 0 && (
              <p className={styles.empty}>No se ha encontrado ningún grupo con ese nombre.</p>
            )}

            {results?.map((artist) => {
              const following = Boolean(followedArtists[artist.id])
              return (
                <div key={artist.id} className={styles.result}>
                  {artist.imageUrl && (
                    <img src={artist.imageUrl} alt="" className={styles.avatar} />
                  )}
                  <div className={styles.info}>
                    <div className={styles.name}>{artist.name}</div>
                    {artist.genres.length > 0 && (
                      <div className={styles.genre}>{artist.genres.join(', ')}</div>
                    )}
                  </div>
                  <button
                    type="button"
                    className={[styles.followButton, following && styles.followButtonActive]
                      .filter(Boolean)
                      .join(' ')}
                    onClick={() => (following ? unfollowArtist(artist.id) : followArtist(artist))}
                  >
                    {following ? <UserCheck size={14} /> : <UserPlus size={14} />}
                    {following ? 'Siguiendo' : 'Seguir'}
                  </button>
                </div>
              )
            })}
          </div>
        </div>
      )}
    </div>
  )
}
