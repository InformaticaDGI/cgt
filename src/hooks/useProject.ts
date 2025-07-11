import { useQuery } from "@tanstack/react-query"
import data from '../utils/data.json';
const useProject = (projectId: string) => {
    return useQuery({
        queryKey: ['project', projectId],
        queryFn: () => fetchProjectById(projectId),
        initialData: undefined
    })
}


const fetchProjectById = (projectId: string) => {
    const [matchProject] = data.evaluacionSistema.listado_programas[0].programas.map(program => {
        const project = program.proyectos.find(project => project.idProyecto === projectId)
        if(!project) throw new Error('Project not found')
        return project
    })

    return matchProject
}

export default useProject