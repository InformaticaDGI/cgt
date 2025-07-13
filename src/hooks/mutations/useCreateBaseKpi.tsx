import { useMutation } from "@tanstack/react-query"
import axios from "axios"
import { config } from "../../config"

export const useCreateBaseKpi = () => {
    const { mutate, isPending, isSuccess, isError } = useMutation({
        mutationFn: (baseKpi: CreateKpiBaseValues) => createBaseKpi(baseKpi),
    })

    return { createBaseKpi: mutate, isPending, isSuccess, isError }
}

const createBaseKpi = async (baseKpi: CreateKpiBaseValues) => {
    const response = await axios.post(`${config.apiUrl}/kpis/kpi-bases`, baseKpi)
    return response.data
}

type CreateKpiBaseValues = {
    name: string
    measurementId: string
    areaId: string
}