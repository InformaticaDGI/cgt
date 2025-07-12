import { useMutation } from "@tanstack/react-query";
import { config } from "../../config";
import axios from "axios";

export const useCreateProject = () => {
    return useMutation({
        mutationFn: async (data: CreateProjectFormValues) => {
            const response = await createProject({
                name: data.name,
                secretaryId: data.secretaryId,
                programId: data.programId
            })
            return response
        }
    })
}

type CreateProjectFormValues = {
    name: string
    secretaryId: string
    programId: string
}

const createProject = async (data: CreateProjectFormValues) => {
    const response = await axios.post(`${config.apiUrl}/projects`, data)
    return response.data
}