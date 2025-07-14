import useTerritorialSecretaries from "../../hooks/useTerritorialSecretaries"
import { Select } from "../Ui/Select/Select"


export const TerritorialSecreatarySelect = ({ value, onChange }: TerritorialSecretarySelectProps) => {
    const { data: territorialSecretaries } = useTerritorialSecretaries()
    return <Select options={territorialSecretaries} value={value} onChange={onChange} placeholder="Seleccione una secretaría" />
}

type TerritorialSecretarySelectProps = {
    value?: string
    onChange?: (value: string) => void
}