import { useQuery } from "@tanstack/react-query"
import api from "../../lib/api"

export const useAca = (acaId?: string) => {
    return useQuery({
        queryKey: ['aca-projects', acaId],
        queryFn: () => useAcaById(acaId)
    })
}

export const useAcaById = async (acaId?: string) => {
    if (!acaId) {
        throw new Error('ACA ID is required')
    }
    const { data } = await api.cgt.get<AcaProject>(`/aca-projects/${acaId}`)
    return data
}

export type AcaProject = {
    id: string
    name: string
    transformationId: string
    areaId: string
    municipalityId: string[]
    contacts: string[]
    communityCircuitId: string
    sectorId: string
    potential: string
    criticalAspects: string
    estimatedBudget: string
    estimatedDuration: string
}