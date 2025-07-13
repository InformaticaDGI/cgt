import { useQuery } from "@tanstack/react-query"
import { config } from "../../config"
import axios from "axios"

export const useMeasurementUnit = (q: string) => {

    return useQuery<MeasurementUnit[]>({
        queryKey: ['measurement-unit', q],
        queryFn: async () => {
            return getMeasurementUnit(q)
        },
        enabled: !!q
    })
}

export const getMeasurementUnit = async (q: string) => {
    const response = await axios.get<MeasurementUnit[]>(`${config.apiUrl}/measurements/search?q=${q}`)
    return response.data
}

export type MeasurementUnit = {
    id: string
    name: string
    symbol: string
    description: string
}