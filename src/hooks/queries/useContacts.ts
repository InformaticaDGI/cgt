import { useQuery, type UseQueryResult } from "@tanstack/react-query"
import api from "../../lib/api"

export const useContacts = (): UseQueryResult<Contact[], Error> => {
    return useQuery({
        queryKey: ['contacts'],
        queryFn: () => api.cgt.get<Contact[]>('/contacts'),
        select: (data) => data.data
    })
}

export type Contact = {
    id: string
    name: string
    email: string
    phone: string
    position: string
}