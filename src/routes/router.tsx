import { createBrowserRouter } from 'react-router-dom'
import { Layout } from '../components/Layout/Layout'
import { Home } from '../pages/Home'
import { Favorites } from '../pages/Favorites'
import { ConcertDetail } from '../pages/ConcertDetail'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      { index: true, element: <Home /> },
      { path: 'conciertos/:id', element: <ConcertDetail /> },
      { path: 'favoritos', element: <Favorites /> },
    ],
  },
])
