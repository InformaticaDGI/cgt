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

const router = createBrowserRouter([
    {
        path: '/login',
        element: <LoginView />
    },
    {
        path: '/',
        element: <Navigate to={'/indicadores'} replace />,
    },
    {
        path: '/crear-programa',
        element: <ProtectedRoute><CreateProgramView /></ProtectedRoute>
    },
    {
        path: '/crear-proyecto',
        element: <ProtectedRoute><CreateProjectView /></ProtectedRoute>
    },
    {
        path: '/indicadores',
        children: [
            {
                index: true,
                element: <ProtectedRoute><HomeView /></ProtectedRoute>
            },
            {
                path: ':programId',
                element: <ProtectedRoute><ProgramView /></ProtectedRoute>
            },
            {
                path: ':programId/:projectId',
                element: <ProtectedRoute><ProjectView /></ProtectedRoute>
            },
            {
                path: ':programId/:projectId/:activityId',
                element: <ProtectedRoute><ActivityView /></ProtectedRoute>
            },
            {
                path: ':programId/:projectId/:activityId/:taskId',
                element: <ProtectedRoute><TaskView /></ProtectedRoute>
            }
        ]
    },
])

export default router