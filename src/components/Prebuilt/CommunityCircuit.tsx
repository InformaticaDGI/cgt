import { Select } from "../Ui/Select/Select"
import { useCommunityCircuitsByParish } from "../../hooks/queries/useCommunityCircuitsByParish"

export const CommunityCircuitSelect = ({ value, onChange, parishId }: CommunityCircuitSelectProps) => {
    const { data: circuits } = useCommunityCircuitsByParish(parishId)
    return <Select options={circuits?.map(circuit => ({ label: circuit.name, value: circuit.id })) || []} value={value} onChange={onChange} 
    placeholder="Seleccione un circuito comunal" />
}

type CommunityCircuitSelectProps = {
    value: string
    onChange: (value: string) => void
    parishId: string
}