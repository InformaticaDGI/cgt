import { useQuery } from "@tanstack/react-query"
import { config } from "../config"
import type { Secretary } from "./useSecretary"

const useTerritorialSecretaryById = (parentId: string) => {
        return useQuery({
            queryKey: ['territorial-secretary-by-id', parentId],
            queryFn: () => fetchTerritorialSecretaryById(parentId),
        })
    
}

    const fetchTerritorialSecretaryById = async (parentId: string): Promise<Secretary> => {
        const urlParent = `${config.apiUrl}/secretaries/${parentId}/hierarchy`
        const responseParent = await fetch(urlParent)
        const dataParent = await responseParent.json()

        const urlTerritorial = `${config.apiUrl}/secretaries/${dataParent.parentId}/hierarchy`
        const responseTerritorial = await fetch(urlTerritorial)
        const dataTerritorial = await responseTerritorial.json()

        return dataTerritorial
    }  

export default useTerritorialSecretaryById