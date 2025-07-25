import { useQuery } from "@tanstack/react-query"
import { config } from "../config";
const useMunicipality = (parishId: string) => {
    return useQuery({
        queryKey: ['municipality', parishId],
        queryFn: () => fetchMunicipality(parishId),
        initialData: undefined
    })
}


const fetchMunicipality = async (parishId: string): Promise<Municipality> => {
    const url = `${config.apiUrl}/municipalities/${parishId}`
    const response = await fetch(url)
    const data = await response.json()
    return data
}

export type Municipality = {
    id: string
    name: string
    territorialSecretaryId: string
    latitude: number
    longitude: number
    createdAt: string
    updatedAt: string
}

export default useMunicipality