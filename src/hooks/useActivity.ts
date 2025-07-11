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
    const [matchActivity] = data.map(program => {
        const [projects] = program.projects.map(project => {
            const activity = project.activities.find(activity => activity.id === activityId)
            if(!activity) throw new Error('activity not found')
            return activity
        })
        return projects
    })

    return matchActivity
}

export default useActivity