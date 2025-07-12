import { useQuery } from "@tanstack/react-query"
import { useAppStore } from "../store/store";
import axios from "axios";
import { config } from "../config";
const usePrograms = () => {
    const {secretarialTerritoryId, secretaryParentId, secretaryRootId, municipalityId, parrishId} = useAppStore()

    return useQuery({
        queryKey: ['programs', secretarialTerritoryId, secretaryParentId, secretaryRootId, municipalityId, parrishId],
        queryFn: () => fetchPrograms({ secretarialTerritoryId, secretaryParentId, secretaryRootId, municipalityId, parrishId }),
        initialData: []
    })
}


const fetchPrograms = async (filters: { secretarialTerritoryId: string, secretaryParentId: string, secretaryRootId: string, municipalityId: string, parrishId: string }) => {
    
    const { data } = await axios.get<Program[]>(`${config.apiUrl}/programs`)

    return data
}

export type Program = {
    id: string
    name: string
    secretaryId: string
    createdAt: string
    updatedAt: string
}

export default usePrograms