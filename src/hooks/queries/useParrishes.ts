import { useQuery } from "@tanstack/react-query"
import { config } from "../../config"
import axios from "axios"

export const useParrishes = (municipalityId: string) => {
    return useQuery<Parrish[]>({
        queryKey: ['parrishes', municipalityId],
        queryFn: async () => {
            return getParrishes(municipalityId)
        },
        enabled: !!municipalityId
    })
}
export const getParrishes = async (municipalityId: string) => {
    const response = await axios.get(`${config.apiUrl}/parishes/municipality/${municipalityId}`)
    return response.data
}

type Parrish = {
    id: string
    name: string
}