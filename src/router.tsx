import { createBrowserRouter } from 'react-router'
import Navigation from './components/Navigation/Navigation'
import FilterBody from './components/Filter/FilterBody'

const router = createBrowserRouter([
    {
        path: '/',
        element: <Navigation><FilterBody /></Navigation>
    }
])

export default router