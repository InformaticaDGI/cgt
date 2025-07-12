import { Select } from "../Ui/Select/Select"
import useSecretary from "../../hooks/useSecretary"

export const SecretarySelect = ({ value, onChange, rootOnly = false, parentId }: SecretarySelectProps) => {
    const { data: secretaries } = useSecretary({ rootOnly, parentId })
    return <Select options={secretaries} value={value} onChange={onChange} placeholder="Seleccione una secretaría" />
}

type SecretarySelectProps = {
    rootOnly?: boolean
    parentId?: string
    value?: string
    onChange?: (value: string) => void
}