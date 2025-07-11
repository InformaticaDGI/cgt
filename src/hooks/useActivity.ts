import { useQuery } from "@tanstack/react-query"
import data from '../utils/data.json';
const useActivity = (activityId: string) => {
    return useQuery({
        queryKey: ['activity', activityId],
        queryFn: () => fetchActivityById(activityId),
        initialData: undefined
    })
}


const fetchActivityById = (activityId: string) => {
    const [matchActivity] = data.evaluacionSistema.listado_programas[0].programas.map(program => {
        const [projects] = program.proyectos.map(project => {
            const activity = project.actividades.find(activity => activity.idActividad === activityId)
            if(!activity) throw new Error('activity not found')
            return activity
        })
        return projects
    })

    return matchActivity
}

export default useActivity