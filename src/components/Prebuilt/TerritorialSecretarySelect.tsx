import { Select } from "../Ui/Select/Select"
import useTerritorialSecretary from "../../hooks/useTerritorialSecretary"

export const TerritorialSecreatarySelect = ({ value, onChange }: TerritorialSecretarySelectProps) => {
    const { data: territorialSecretaries } = useTerritorialSecretary()
    return <Select options={territorialSecretaries} value={value} onChange={onChange} placeholder="Seleccione una secretaría" />
}

type TerritorialSecretarySelectProps = {
    value?: string
    onChange?: (value: string) => void
}