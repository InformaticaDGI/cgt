import { SearchableMultiSelect } from "../Ui/Select/SearchableMultiSelect"
import { useContacts } from "../../hooks/queries/useContacts"

export const ContactMultiSelect = ({ value, onChange }: ContactMultiSelectProps) => {
    const { data: contacts } = useContacts()
    return <SearchableMultiSelect options={contacts?.map(contact => ({ label: contact.name, value: contact.id })) || []} value={value} onChange={onChange} placeholder="Seleccione un contacto" />
}

type ContactMultiSelectProps = {
    value: string[]
    onChange: (value: string[]) => void
}