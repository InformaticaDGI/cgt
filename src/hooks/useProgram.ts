import { useQuery } from "@tanstack/react-query"
import data from '../utils/data.json';
const useProgram = (programId: string) => {
    return useQuery({
        queryKey: ['program', programId],
        queryFn: () => fetchProgramById(programId),
        initialData: undefined
    })
}


const fetchProgramById = (programId: string) => {
    const matchProgram = data.find(program => program.id === programId);
    if(!matchProgram) throw new Error('Program not found')
    return matchProgram;
}

export default useProgram