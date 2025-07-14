import { useQuery } from "@tanstack/react-query"
import api from "../lib/api";
import type { Program } from "./usePrograms";
const useProgram = (programId: string | undefined) => {
    return useQuery({
        queryKey: ['program', programId],
        queryFn: () => fetchProgramById(programId),
        initialData: undefined
    })
}


const fetchProgramById = async (programId: string | undefined) => {
    if (!programId) throw new Error('Program ID is required')
    const { data } = await api.cgt.get<Program>(`/programs/${programId}`)
    return data
}

export default useProgram