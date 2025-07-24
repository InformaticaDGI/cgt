import { Navigate } from "react-router"
import { useAuthStorage } from "../../store/auth-storage"

interface ProtectedRouteProps {
    children: React.ReactNode
    requiredRoles?: string[]
}

export const ProtectedRoute = ({ children, requiredRoles }: ProtectedRouteProps) => {
    const { isAuthenticated, user } = useAuthStorage()
    if(!isAuthenticated) {
        return <Navigate to="/login" replace />
    }

    if(requiredRoles && !requiredRoles.some((role) => user?.role.name.includes(role))) {
        return <Navigate to="/unauthorized" replace />
    }

    return <>{children}</>
}