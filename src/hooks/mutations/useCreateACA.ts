import { useMutation } from "@tanstack/react-query"
import type { CreateACAFormValues } from "../../components/Forms/CreateACAForm"
import api from "../../lib/api"

export const useCreateACA = () => {
    return useMutation({
        mutationFn: (aca: CreateACAFormValues) => {
            const { name, areaId, municipalityId, communityCircuit, sectorId, contacts, potential, criticalAspects, estimatedBudget, estimatedDuration } = aca

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
            return api.cgt.post('/aca-projects', body)
        }
    })
}

type ACAProjectRequest = {
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
