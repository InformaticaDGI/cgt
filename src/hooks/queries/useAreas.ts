import { useQuery } from "@tanstack/react-query"
import axios from "axios"
import { config } from "../../config"

export const useAreas = (transformationId?: string) => {

    const params = {}

    if(transformationId){
        Object.assign(params, {
            transformationId
        })
    }

    return useQuery({
        queryKey: ['areas', transformationId],
        queryFn: () => axios.get<Area[]>(`${config.apiUrl}/areas`, {
            params
        }),
    })
}


export type Area = {
    id: string
    name: string
    transformationId: string
}