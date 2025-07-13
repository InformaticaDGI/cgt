import { useNavigate } from "react-router"
import { useLogin } from "../../hooks/useAuth"
import { useState } from "react"
import { Flex } from "../../components/Layout/Flex"
import { Input } from "../../components/Ui/Input/Input"
import { Button } from "../../components/Ui/Button/Button"
import { FormControl } from "../../components/Ui/FormControl/FormControl"
import Text from "../../components/Ui/Text/Text"
import Card from "../../components/Card/Card"
import { Box } from "../../components/Layout/Box"
import { InfoIcon } from "lucide-react"

export const LoginView = () => {

    const [credentials, setCredentials] = useState({
        email: '',
        password: ''
    })

    const [error, setError] = useState('')

    const login = useLogin()

    const navigate = useNavigate()

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        try {
            await login.mutateAsync(credentials)
            navigate('/indicadores')
        } catch (err) {
            console.error(err)
            setError('Usuario  y/o contraseña incorrectos')
            setTimeout(() => {
                setError('')
            }, 3000)
        }
    }


    return (
        <Flex justify="center" align="center" height="100vh" backgroundColor="var(--gradient-primary)">
            <Flex justify="center" align="stretch" style={{ maxWidth: '400px' }}>
                <Card style={{ padding: '24px', backgroundColor: 'var(--background)' }} isSelectable={false} height="450px">
                    <form style={{ height: '100%' }} onSubmit={handleSubmit}>
                        <Flex justify="space-between" align="start" direction="column" gap="16px">
                            <Text style={{ fontSize: '24px', fontWeight: 'bold', color: 'var(--secondary)' }}>CGT - Bievenido de nuevo</Text>
                            <Text style={{ fontSize: '14px', fontWeight: '500' }}>Ingresa tus credenciales para acceder</Text>
                            <FormControl label="Usuario">
                                <Input style={{ border: error ? '1px solid var(--error)' : '1px solid var(--primary)', backgroundColor: error ? 'var(--error-light)' : 'var(--input-background)' }}  placeholder="Usuario" value={credentials.email} onChange={(e) => setCredentials({ ...credentials, email: e.target.value })} />
                            </FormControl>
                            <FormControl label="Contraseña">
                                <Input style={{ border: error ? '1px solid var(--error)' : '1px solid var(--primary)', backgroundColor: error ? 'var(--error-light)' : 'var(--input-background)' }} type="password" placeholder="Contraseña" value={credentials.password} onChange={(e) => setCredentials({ ...credentials, password: e.target.value })} />
                            </FormControl>
                            <Flex align="stretch" direction="column" gap="12px">
                                {error && <Flex justify="start" align="center" direction="row" gap="4px">
                                    <InfoIcon width={16} height={16} style={{ color: 'var(--error)' }} />
                                    <Text style={{ fontSize: '12px', fontWeight: '500', color: 'var(--error)' }}>{error}</Text>
                                </Flex>}
                                <Button type="submit" variant="primary">Acceder</Button>
                            </Flex>
                            <Flex align="stretch" direction="column" gap="12px">
                                <Flex direction="column" gap="12px">
                                    <Text style={{ fontSize: '12px', fontWeight: '500' }}> © 2025 - Dirección General de Informática</Text>
                                </Flex>
                            </Flex>
                        </Flex>
                    </form>
                </Card>
            </Flex>
        </Flex>
    )
}