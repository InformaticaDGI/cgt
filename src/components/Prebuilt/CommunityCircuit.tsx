import { useCommunityCircuits } from "../../hooks/queries/useCommunityCircuits"
import { SearchableSelect } from "../Ui/Select/SearchableSelect"

export const CommunityCircuitSelect = ({ value, onChange, municipalityId, parishId, style }: CommunityCircuitSelectProps) => {

    const { data: circuits } = useCommunityCircuits({ municipalityId, parishId })
    const options = circuits?.map(circuit => ({ label: circuit.name, value: circuit.id, code: circuit.code })) || []
    
    const handleChange = (selectedValue: string) => {
        const code = options.find(option => option.value === selectedValue)?.code || ''
        onChange({ id: selectedValue, code })
    }
    
    return <SearchableSelect 
    options={options} 
    value={value} onChange={handleChange} 
    placeholder="Seleccione un circuito comunal" 
    style={style} />
}

type CommunityCircuitSelectProps = {
    value: string
    onChange: (value: { id: string, code: string }) => void
    parishId?: string
    municipalityId?: string[]
    style?: React.CSSProperties
    onCircuitSelect?: (code: string, id: string) => void
}