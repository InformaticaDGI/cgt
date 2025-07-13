import { createBrowserRouter, Navigate } from 'react-router'
import HomeView from './pages/Home/HomeView'
import ProgramView from './pages/Home/[programId]/Program/ProgramView'
import ProjectView from './pages/Home/[programId]/Program/[projectId]/Project/ProjectView'
import ActivityView from './pages/Home/[programId]/Program/[projectId]/Project/[activityId]/Activity/ActivityView'
import TaskView from './pages/Home/[programId]/Program/[projectId]/Project/[activityId]/Activity/[taskId]/Task/TaskView'
import CreateProgramView from './pages/Home/CreateProgram/CreateProgram.view'
import CreateProjectView from './pages/Home/CreateProject/CreateProjectView'
import { LoginView } from './pages/Login/LoginView'
import { ProtectedRoute } from './components/ProtectedRoute/ProtectedRoute'
import NotFoundView from './pages/NotFoundView/NotFoundView'
import MapView from './pages/Map/MapView'
import Navigation from './components/Navigation/Navigation'

const router = createBrowserRouter([

    {
        path: '/',
        element: <ProtectedRoute><Navigation /></ProtectedRoute>,
        children: [
            {
                index: true,
                element: <Navigate to={'/indicadores'} replace />
            },
            {
                path: 'indicadores',
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
            {
                path: 'crear-programa',
                element: <CreateProgramView />
            },
            {
                path: 'crear-proyecto',
                element: <CreateProjectView />
            },
            {
                path: 'mapa',
                element: <MapView />
            }
        ]
    },
    {
        path: 'login',
        element: <LoginView />
    },
    {
        path: '*',
        element: <NotFoundView />
    }
])

export default router