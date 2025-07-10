import { createBrowserRouter } from 'react-router'
import HomeView from './pages/HomeView'


const router = createBrowserRouter([
    {
        path: '/',
        element: <HomeView />
    },
    {
        path: '/programa1/proyecto1/actividad1/tarea1',
        element: <HomeView />
    }
])

export default router