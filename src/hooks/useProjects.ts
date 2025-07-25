import { useQuery } from "@tanstack/react-query"
import axios from "axios"
import { config } from "../config"

const useProjects  = () => {
    return useQuery({
        queryKey: ['projects'],
        queryFn: getProjects,
        initialData: []
    })
}

const getProjects = async (): Promise<Project[]> => {
    const { data } = await axios.get<Project[]>(`${config.apiUrl}/projects/with-kpi-instances/list`)
    return data
}


export type Project = {
    id: string
    name: string
    initialDate: string
    finalDate: string
    actualEndDate: string
    initialBudget: number
    actualBudget: number
    latitude?: number
    longitude?: number
    status: "completed" | "in_progress" | "pending"
    observations: string
    parishId: string
    secretaryId: string
    programId: string
    directLabor: number
    indirectLabor: number
    qualifiedLabor: number
    unqualifiedLabor: number
    femaleLabor: number
    maleLabor: number
    benefitedPopulation: number
    benefitedChildren: number
    createdAt: string
    updatedAt: string
    progressByTime: number
    daysRemaining: number
    areaId?: string
    overallProjectProgress: number
}

export default useProjects