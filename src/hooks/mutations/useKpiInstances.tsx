import { useQuery } from "@tanstack/react-query"
import axios from "axios"
import { config } from "../../config"
import type { BaseKpi } from "./useBaseKpis"

export const useKpiInstances = () => {
    const { data, isLoading, isError, isSuccess } = useQuery({
        queryKey: ['kpi-instances'],
        queryFn: () => getKpiInstances(),
    })

    return { kpiInstances: data, isLoading, isError, isSuccess }
}

const getKpiInstances = async () => {
    const response = await axios.get(`${config.apiUrl}/kpis/kpi-instances`)
    return response.data
}

export type KpiInstance = {
    id: string
    kpiBaseId: string
    expectedValue: number
    projectId?: string
    kpiBase?: BaseKpi
}