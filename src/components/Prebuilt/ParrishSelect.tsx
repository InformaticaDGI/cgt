import { Select } from "../Ui/Select/Select"
import { useParrishes } from "../../hooks/queries/useParrishes"

export const ParrishSelect = ({ value, onChange, municipalityId, style }: ParrishSelectProps) => {
    const { data: parrishes } = useParrishes(municipalityId)
    return <Select options={parrishes?.map(parrish => ({ label: parrish.name, value: parrish.id })) || []} value={value} onChange={onChange} 
    placeholder="Seleccione una parroquia" style={style} />
}

type ParrishSelectProps = {
    value: string
    onChange: (value: string) => void
    municipalityId: string
    style?: React.CSSProperties
}