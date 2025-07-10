import { createBrowserRouter } from 'react-router'
import HomeView from './pages/Home/HomeView'
import ProgramView from './pages/Home/[programId]/Program/ProgramView'
import ProjectView from './pages/Home/[programId]/Program/[projectId]/Project/ProjectView'


const router = createBrowserRouter([
    {
        path: '/',
        element: <HomeView />
    },
    {
        path: '/:programId',
        element: <ProgramView />
    },
    {
        path: '/:programId/:projectId',
        element: <ProjectView />
    },
    {
        path: '/:programId/:projectId/:taskId',
        element: <ProjectView />
    }
])

export default router