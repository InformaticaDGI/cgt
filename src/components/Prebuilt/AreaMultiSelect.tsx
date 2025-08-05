import { SearchableMultiSelect } from "../Ui/Select/SearchableMultiSelect"
import { useAreas } from "../../hooks/queries/useAreas"

export const AreaMultiSelect = ({ value, onChange }: AreaMultiSelectProps) => {
    const { data: areas } = useAreas()
    return <SearchableMultiSelect options={areas?.data?.map(area => ({ label: area.name, value: area.id })) || []} value={value} onChange={onChange} placeholder="Seleccione una área" />
}

type AreaMultiSelectProps = {
    value: string[]
    onChange: (value: string[]) => void
}