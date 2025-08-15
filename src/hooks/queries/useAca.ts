import { useQuery } from "@tanstack/react-query"
import api from "../../lib/api"
import type { Area } from "./useAreas"

export const useAca = (acaId: string) => {
    return useQuery({
        queryKey: ['aca-project', acaId],
        queryFn: () => useAcaById(acaId)
    })
}

export const useAcaById = async (acaId: string) => {
    const { data } = await api.cgt.get<AcaProject>(`/aca-projects/${acaId}`)
    return data
}

export type AcaProject = {
    id: string
    name: string
    area: Area
    areaId: string
    municipalityId: string
    contacts: string[]
    communityCircuitId: string
    communityCircuit: {
        id: string
        code: string
    }
    sectorId: string
    potential: string
    criticalAspects: string
    estimatedBudget: string
    estimatedDuration: string
}