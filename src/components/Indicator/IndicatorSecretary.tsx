import useSecretaryById from "../../hooks/useSecretaryById"
import Text from "../Ui/Text/Text"

const IndicatorSecretary = ({ secretaryId }: { secretaryId: string }) => {
    const { data, isLoading, isError } = useSecretaryById(secretaryId)

    if(isLoading) return <Text style={{ fontSize: '12px', color: '#5A787A', fontWeight: '600' }}>Cargando...</Text>

    if(isError) return <Text style={{ fontSize: '12px', color: '#5A787A', fontWeight: '600' }}>Error</Text>

    return <Text style={{ fontSize: '12px', color: '#5A787A', fontWeight: '600' }}>{data?.name || 'Sin Datos'}</Text>
}

export default IndicatorSecretary