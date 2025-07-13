import { useQuery } from "@tanstack/react-query"
import axios from "axios"
import { config } from "../../config"
import type { MeasurementUnit } from "../queries/useMeasurementUnit"
import type { Area } from "../queries/useAreas"

export const useBaseKpis = () => {
    const { data, isLoading, isError, isSuccess } = useQuery({
        queryKey: ['base-kpis'],
        queryFn: () => getBaseKpis(),
    })

    return { baseKpis: data, isLoading, isError, isSuccess }
}

const getBaseKpis = async () => {
    const response = await axios.get(`${config.apiUrl}/kpis/kpi-bases/with-relations`)
    return response.data
}

export type BaseKpi = {
    id: string
    name: string
    measurement: MeasurementUnit
    area: Area
}