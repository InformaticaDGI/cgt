import { useMunicipalities } from "../../hooks/queries/useMunicipalities"
import { SearchableSelect } from "../Ui/Select/SearchableSelect"

export const MunicipalitySelect = ({ value, onChange, territorialSecretaryId, disabled }: MunicipalitySelectProps) => {
    const { data: municipalities } = useMunicipalities({ territorialSecretaryId })
    return <SearchableSelect options={municipalities?.map(municipality => ({ label: municipality.name, value: municipality.id })) || []} value={value} 
    onChange={onChange} placeholder="Seleccione un municipio" disabled={disabled} />
}

type MunicipalitySelectProps = {
    value: string
    onChange: (value: string) => void
    territorialSecretaryId?: string
    style?: React.CSSProperties
    disabled?: boolean
}   