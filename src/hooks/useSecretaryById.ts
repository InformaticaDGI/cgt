import { useQuery } from "@tanstack/react-query"
import { config } from "../config"
import type { Secretary } from "./useSecretary"

const useSecretaryById = (parentId: string) => {
    return useQuery({
        queryKey: ['secretary-by-id', parentId],
        queryFn: () => fetchSecretaryById(parentId),
    })
}


const fetchSecretaryById = async (parentId: string): Promise<Secretary> => {
    const url = `${config.apiUrl}/secretaries/${parentId}/hierarchy`
    const response = await fetch(url)
    const data = await response.json()
    return data
}  

export default useSecretaryById