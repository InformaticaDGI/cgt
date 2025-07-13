import { Link } from "react-router"
import { useAuthStorage } from "../../store/auth-storage"
import { Flex } from "../../components/Layout/Flex"
import Text from "../../components/Ui/Text/Text"

const NotFoundView = () => {
    const { isAuthenticated } = useAuthStorage.getState()
    
    return (
        <Flex height='30vh' padding="24px" justify="start" align="start" direction="column" gap="16px">
            <Text style={{ fontSize: '48px', fontWeight: 'bold', color: 'var(--secondary)' }}>
                404
            </Text>
            <Text style={{ fontSize: '18px', fontWeight: '500', color: 'var(--text-secondary)' }}>
                La página que buscas no existe
            </Text>
            
            {isAuthenticated ? (
                <Link 
                    to="/" 
                    className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                    Volver al inicio
                </Link>
            ) : (
                <Link 
                    to="/login" 
                    className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                    Iniciar sesión
                </Link>
            )}
        </Flex>
    )
}

export default NotFoundView