import { useMutation } from "@tanstack/react-query";
import { config } from "../../config";
import axios from "axios";
import type { KpiInstance } from "./useKpiInstances";

export const useCreateProject = () => {
    return useMutation({
        mutationFn: async (data: CreateProjectFormValues) => {
            const response = await createProject({
                name: data.name,
                secretaryId: data.secretaryId,
                programId: data.programId,
                kpiInstances: data.kpiInstances
                    .map(kpi => ({
                        expected: kpi.expectedValue,
                        baseKpiId: kpi.kpiBaseId,
                    })),
                initialDate: data.initialDate,
                finalDate: data.finalDate,
                observations: data.observations,
                parishId: data.parrishId,
                status: 'in_progress'
            })
            return response
        }
    })
}

type CreateProjectFormValues = {
    name: string
    secretaryId: string
    programId: string
    kpiInstances: KpiInstance[],
    initialDate: string,
    finalDate: string,
    observations: string,
    parrishId: string,
}

const createProject = async (data: any) => {
    const response = await axios.post(`${config.apiUrl}/projects`, data)
    return response.data
}