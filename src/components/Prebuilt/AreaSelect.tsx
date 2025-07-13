import { Select } from "../Ui/Select/Select"
import { useAreas } from "../../hooks/queries/useAreas"

export const AreaSelect = ({ value, onChange }: AreaSelectProps) => {
    const { data: areas } = useAreas()
    return <Select options={areas?.data?.map(area => ({ label: area.name, value: area.id })) || []} value={value} onChange={onChange} placeholder="Seleccione una área" />
}

type AreaSelectProps = {
    value: string
    onChange: (value: string) => void
}