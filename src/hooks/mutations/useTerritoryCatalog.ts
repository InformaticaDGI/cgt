import { useQuery } from "@tanstack/react-query"


export const useTerritoryCatalog = (parrishId: string) => {
    return useQuery({
        queryKey: ['territory-catalog', parrishId],
        queryFn: () => getTerritoryCatalog(parrishId)
    })
}

const getTerritoryCatalog = async (parrishId: string) => {
    // const response = await axios.post<TerritoryCatalog[]>(`${config.apiUrl}/territories/catalog`, { parrishIds })
    // return response.data
    return {
        parish: {
            id: '1',
            name: 'San Juan de los morros',
            municipality: {
                id: '1',
                name: 'Juan German Roscio'
            }
        }
    }
}

export type TerritoryCatalog = {
    id: string
    name: string
    municipality: {
        id: string
        name: string
    }
}