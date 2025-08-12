import { SearchableSelect } from "../Ui/Select/SearchableSelect"
import { useTransformations } from "../../hooks/queries/useTransformations"

export const TransformationSelect = ({ value, onChange }: TransformationSelectProps) => {
    const { data: transformations } = useTransformations()
    return <SearchableSelect options={transformations?.data?.map(transformation => ({ label: transformation.name, value: transformation.id })) || []} value={value} onChange={onChange} placeholder="Seleccione una transformación" />
}

type TransformationSelectProps = {
    value: string
    onChange: (value: string) => void
}