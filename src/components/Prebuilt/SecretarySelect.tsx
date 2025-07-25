import { Select } from "../Ui/Select/Select"
import useSecretary from "../../hooks/useSecretary"
import usePermisionTemp from "../../hooks/usePermisionTemp"

export const SecretarySelect = ({ value, onChange, rootOnly = false, parentId }: SecretarySelectProps) => {
    const { data: secretaries } = useSecretary({ rootOnly, parentId })
    const permissions = usePermisionTemp(rootOnly)
    const options = secretaries.filter(secretary => permissions.includes(secretary.value))
    return <Select options={options} value={value} onChange={onChange} placeholder="Seleccione una secretaría" />
}

type SecretarySelectProps = {
    rootOnly?: boolean
    parentId?: string
    value?: string
    onChange?: (value: string) => void
}