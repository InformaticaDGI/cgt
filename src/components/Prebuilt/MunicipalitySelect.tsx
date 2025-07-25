import { useMunicipalities } from "../../hooks/queries/useMunicipalities"
import { Select } from "../Ui/Select/Select"

export const MunicipalitySelect = ({ value, onChange, territorialSecretaryId }: MunicipalitySelectProps) => {
    const { data: municipalities } = useMunicipalities({ territorialSecretaryId })
    return <Select options={municipalities?.map(municipality => ({ label: municipality.name, value: municipality.id })) || []} value={value} 
    onChange={onChange} placeholder="Seleccione un municipio" />
}

type MunicipalitySelectProps = {
    value: string
    onChange: (value: string) => void
    territorialSecretaryId?: string
    style?: React.CSSProperties
}   