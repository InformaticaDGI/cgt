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
    const matchProgram = data.evaluacionSistema.listado_programas[0].programas.find(program => program.idPrograma === programId);
    if(!matchProgram) throw new Error('Program not found')
    return matchProgram;
}

export default useProgram