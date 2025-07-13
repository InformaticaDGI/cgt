import useTerritorialSecretaryById from "../../hooks/useTerritorialSecretaryById"
import Text from "../Ui/Text/Text"

const IndicatorTerritorialSecretary = ({ parentId }: { parentId: string }) => {
    const { data, isLoading, isError } = useTerritorialSecretaryById(parentId)

    if(isLoading) return <Text style={{ fontSize: '12px', color: '#5A787A', fontWeight: '600' }}>Cargando...</Text>

    if(isError) return <Text style={{ fontSize: '12px', color: '#5A787A', fontWeight: '600' }}>Error</Text>

    return <Text style={{ fontSize: '11px', color: '#7A8E8B', fontWeight: 'normal', textAlign: 'justify' }} >{data?.name || 'Sin Datos'}</Text>
}

export default IndicatorTerritorialSecretary