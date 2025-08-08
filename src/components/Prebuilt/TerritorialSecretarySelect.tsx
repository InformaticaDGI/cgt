import useTerritorialSecretaries from "../../hooks/useTerritorialSecretaries"
import { SearchableSelect } from "../Ui/Select/SearchableSelect"


export const TerritorialSecreatarySelect = ({ value, onChange }: TerritorialSecretarySelectProps) => {
    const { data: territorialSecretaries } = useTerritorialSecretaries()
    return <SearchableSelect options={territorialSecretaries} value={value} onChange={onChange} placeholder="Seleccione una secretaría" />
}

type TerritorialSecretarySelectProps = {
    value?: string
    onChange?: (value: string) => void
}