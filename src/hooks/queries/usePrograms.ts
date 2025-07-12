import { useQuery } from "@tanstack/react-query"
import axios from "axios"
import { config } from "../../config"

export const usePrograms = (secretaryId: string) => {
    return useQuery<Program[]>({
        queryKey: ["programs", secretaryId],
        queryFn: () => getPrograms(secretaryId),
        enabled: !!secretaryId
    })
}

const getPrograms = async (secretaryId: string) => {
    const response = await axios.get(`${config.apiUrl}/programs/secretary/${secretaryId}`)
    return response.data
}

type Program = {
    id: string
    name: string
    secretaryId: string
}