import { SearchableSelect } from "../Ui/Select/SearchableSelect"
import { useParrishes } from "../../hooks/queries/useParrishes"

export const ParrishSelect = ({ value, onChange, municipalityId, style, disabled }: ParrishSelectProps) => {
    const { data: parrishes } = useParrishes(municipalityId)
    return <SearchableSelect options={parrishes?.map(parrish => ({ label: parrish.name, value: parrish.id })) || []} value={value} onChange={onChange} 
    placeholder="Seleccione una parroquia" style={style} disabled={disabled} />
}

type ParrishSelectProps = {
    value: string
    onChange: (value: string) => void
    municipalityId: string
    style?: React.CSSProperties
    disabled?: boolean
}