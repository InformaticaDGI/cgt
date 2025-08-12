import { SearchableSelect } from "../Ui/Select/SearchableSelect"
import { useAreas } from "../../hooks/queries/useAreas"

export const AreaSelect = ({ value, onChange, transformationId }: AreaSelectProps) => {
    const { data: areas } = useAreas(transformationId)
    return <SearchableSelect options={areas?.data?.map(area => ({ label: area.name, value: area.id })) || []} value={value} onChange={onChange} placeholder="Seleccione una área" />
}

type AreaSelectProps = {
    transformationId?: string
    value: string
    onChange: (value: string) => void
}