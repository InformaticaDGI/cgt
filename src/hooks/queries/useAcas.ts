import { useQuery, type UseQueryResult } from "@tanstack/react-query"
import api from "../../lib/api"
import type { PaginatedResponse } from "./common/types"

export const useAcas = (): UseQueryResult<PaginatedResponse<AcaProject>, Error> => {
    return useQuery({
        queryKey: ['aca-projects'],
        queryFn: () => api.cgt.get<PaginatedResponse<AcaProject>>('/aca-projects'),
        select: (data) => data.data,
    })
}

export type AcaProject = {
    id: string
    name: string
}