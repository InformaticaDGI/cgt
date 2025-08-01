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
                parishId: data.parishId,
                communityCircuitCode: data.communityCircuitCode,
                areaId: data.areaId,
                directLabor: data.directLabor,
                indirectLabor: data.indirectLabor,
                qualifiedLabor: data.qualifiedLabor,
                unqualifiedLabor: data.unqualifiedLabor,
                femaleLabor: data.femaleLabor,
                maleLabor: data.maleLabor,
                benefitedPopulation: data.benefitedPopulation,
                benefitedChildren: data.benefitedChildren,
                // budgetSources: data.budgetSources,
                initialBudget: data.initialBudget,
                latitude: data.latitude,
                longitude: data.longitude,
                status: 'in_progress'
            })
            return response
        }
    })
}

type CreateProjectFormValues = {
    name: string;
    initialDate: string;
    finalDate: string;
    // budgetSources: BudgetSourceDto[];
    initialBudget: number;
    latitude: number;
    longitude: number;
    observations: string;
    kpiInstances: KpiInstance[];
    parishId: string;
    communityCircuitCode: string;
    secretaryId: string;
    programId: string;
    areaId: string;
    directLabor: number;
    indirectLabor: number;
    qualifiedLabor: number;
    unqualifiedLabor: number;
    femaleLabor: number;
    maleLabor: number;
    benefitedPopulation: number;
    benefitedChildren: number;
}

const createProject = async (data: any) => {
    const response = await axios.post(`${config.apiUrl}/projects`, data)
    return response.data
}



