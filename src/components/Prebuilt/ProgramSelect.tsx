import { SearchableSelect } from "../Ui/Select/SearchableSelect"
import { usePrograms } from "../../hooks/queries/usePrograms"

export const ProgramSelect = ({ value, onChange, secretaryId }: ProgramSelectProps) => {
    const { data: programs } = usePrograms(secretaryId)
    return <SearchableSelect options={programs?.map(program => ({ label: program.name, value: program.id })) || []} value={value} onChange={onChange} placeholder="Seleccione un programa" />
}

type ProgramSelectProps = {
    secretaryId: string
    value?: string
    onChange?: (value: string) => void
}