import { NavLink, Outlet } from 'react-router-dom'
import logo from '../../assets/logo-metalshow.png'
import { ArtistSearch } from '../../features/artists/ArtistSearch'
import { NotificationBell } from '../../features/notifications/NotificationBell'
import styles from './Layout.module.scss'

export function Layout() {
  return (
    <>
      <header className={styles.header}>
        <NavLink to="/" className={styles.logo} aria-label="MetalShow — inicio">
          <img src={logo} alt="MetalShow" className={styles.logoImage} />
        </NavLink>
        <nav className={styles.nav}>
          <NavLink
            to="/"
            end
            className={({ isActive }) =>
              isActive ? `${styles.navLink} ${styles.navLinkActive}` : styles.navLink
            }
          >
            Conciertos
          </NavLink>
          <NavLink
            to="/favoritos"
            className={({ isActive }) =>
              isActive ? `${styles.navLink} ${styles.navLinkActive}` : styles.navLink
            }
          >
            Favoritos
          </NavLink>
        </nav>
        <div className={styles.actions}>
          <ArtistSearch />
          <NotificationBell />
        </div>
      </header>
      <main className={styles.main}>
        <Outlet />
      </main>
    </>
  )
}
