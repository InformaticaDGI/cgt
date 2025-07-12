import { useQuery } from "@tanstack/react-query"
import { config } from "../../config"
import axios from "axios"

export const useMunicipalities = () => {
    return useQuery<Municipality[]>({
        queryKey: ['municipalities'],
        queryFn: async () => {
            const response = await axios.get(`${config.apiUrl}/municipalities`)
            return response.data
        }
    })
}

type Municipality = {
    id: string
    name: string
}