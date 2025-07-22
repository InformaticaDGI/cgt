import { useBudgetSourcesQuery } from "../../hooks/queries/useBudgetSourcesQuery";
import { Select } from "../Ui/Select/Select"

export const BudgetSourceSelect = ({ value, onChange }: BudgetSourceSelectProps) => {
    const { data: sources = [] } = useBudgetSourcesQuery();
    return <Select options={sources.map(source => ({ value: source.id, label: source.name }))} value={value} onChange={onChange} placeholder="Seleccione el origen de los fondos" />
}

type BudgetSourceSelectProps = {
    value?: string
    onChange?: (value: string) => void
}