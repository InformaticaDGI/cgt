import { useQuery } from "@tanstack/react-query"
import axios from "axios"
import { config } from "../../config"

export const useTransformations = () => {
    return useQuery({
        queryKey: ['transformations'],
        queryFn: () => axios.get<Transformations[]>(`${config.apiUrl}/transformations`),
    })
}


export type Transformations = {
    id: string
    name: string
}