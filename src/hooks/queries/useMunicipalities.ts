import { useQuery } from "@tanstack/react-query"
import { config } from "../../config"
import axios from "axios"

type UseMunicipalitiesProps = {
    territorialSecretaryId?: string
}

export const useMunicipalities = ({ territorialSecretaryId }: UseMunicipalitiesProps) => {
    return useQuery<Municipality[]>({
        queryKey: ['municipalities', territorialSecretaryId],
        queryFn: async () => {
            if (territorialSecretaryId) {
                return await getMunicipalitiesByTerritorialSecretaryId(territorialSecretaryId)
            }
            return await getMunicipalities()
        }
    })
}

const getMunicipalities = async (territorialSecretaryId?: string) => {
    const response = await axios.get(`${config.apiUrl}/municipalities`, {
        params: {
            territorialSecretaryId
        }
    })
    return response.data
}

const getMunicipalitiesByTerritorialSecretaryId = async (territorialSecretaryId: string) => {
    const response = await axios.get(`${config.apiUrl}/municipalities/territorial-secretary/${territorialSecretaryId}`)
    return response.data
}

type Municipality = {
    id: string
    name: string
}