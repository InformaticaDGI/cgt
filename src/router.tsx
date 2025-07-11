import { createBrowserRouter, Navigate } from 'react-router'
import HomeView from './pages/Home/HomeView'
import ProgramView from './pages/Home/[programId]/Program/ProgramView'
import ProjectView from './pages/Home/[programId]/Program/[projectId]/Project/ProjectView'
import ActivityView from './pages/Home/[programId]/Program/[projectId]/Project/[activityId]/Activity/ActivityView'
import TaskView from './pages/Home/[programId]/Program/[projectId]/Project/[activityId]/Activity/[taskId]/Task/TaskView'

const router = createBrowserRouter([
    {
        path: '/',
        element: <Navigate to={'/indicadores'} replace />
    },
    {
        path: '/indicadores',
        children: [
            {
                index: true,
                element: <HomeView />
            },
            {
                path: ':programId',
                element: <ProgramView />
            },
            {
                path: ':programId/:projectId',
                element: <ProjectView />
            },
            {
                path: ':programId/:projectId/:activityId',
                element: <ActivityView />
            },
            {
                path: ':programId/:projectId/:activityId/:taskId',
                element: <TaskView />
            }
        ]
    },
])

export default router