import { useMutation } from "@tanstack/react-query"
import api from "../../lib/api"
import type { CreateContactFormValues } from "../../components/Forms/CreateContactForm"

export const useCreateContact = () => {
    return useMutation({
        mutationFn: (contact: CreateContactFormValues) => api.cgt.post('/contacts', {
            name: contact.name,
            email: contact.email,
            phone: contact.phone,
            position: contact.position
        }),
    })
}
