import { useQuery } from "@tanstack/react-query"
import axios from "axios"
import { config } from "../../config"

export const useAreas = () => {
    return useQuery({
        queryKey: ['areas'],
        queryFn: () => axios.get<Area[]>(`${config.apiUrl}/areas`),
    })
}


export type Area = {
    id: string
    name: string
}