import { useMunicipalities } from "../../hooks/queries/useMunicipalities"
import { SearchableMultiSelect } from "../Ui/Select/SearchableMultiSelect"

export const MunicipalityMultiSelect = ({ value, onChange, territorialSecretaryId }: MunicipalitySelectProps) => {
    const { data: municipalities } = useMunicipalities({ territorialSecretaryId })
    return <SearchableMultiSelect options={municipalities?.map(municipality => ({ label: municipality.name, value: municipality.id })) || []} value={value} onChange={onChange} placeholder="Seleccione un municipio" />
}

type MunicipalitySelectProps = {
    value: string[]
    onChange: (value: string[]) => void
    territorialSecretaryId?: string
    style?: React.CSSProperties
}   