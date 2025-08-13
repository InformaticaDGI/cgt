import { useMutation } from "@tanstack/react-query"
import type { ACAFormValues } from "../../components/Forms/ACAForm"
import api from "../../lib/api"

export const useUpdateACA = () => {
    return useMutation({
        mutationFn: (aca: ACAFormValues) => {
            const { id, name, areaId, municipalityId, communityCircuit, sectorId, contacts, potential, criticalAspects, estimatedBudget, estimatedDuration } = aca

            const body: ACAProjectRequest = {
                name,
                areaId,
                municipalityId,
                contacts,
            }

            communityCircuit && Object.assign(body, { communityCircuitId: communityCircuit.id })
            sectorId && Object.assign(body, { sectorId })
            potential && Object.assign(body, { potential })
            criticalAspects && Object.assign(body, { criticalAspects })
            estimatedBudget && Object.assign(body, { estimatedBudget })
            estimatedDuration && Object.assign(body, { estimatedDuration })

            console.log(body)
            return api.cgt.put(`/aca-projects/${id}`, body)
        }
    })
}

type ACAProjectRequest = {
    id?: string
    name: string
    areaId: string
    municipalityId: string[]
    contacts: string[]
    potential?: string
    criticalAspects?: string
    estimatedBudget?: string
    estimatedDuration?: string
    communityCircuitId?: string
    sectorId?: string
}
