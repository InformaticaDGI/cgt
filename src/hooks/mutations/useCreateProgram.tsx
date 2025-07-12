import { useMutation } from "@tanstack/react-query";
import { config } from "../../config";
import axios from "axios";

export const useCreateProgram = () => {
    return useMutation({
        mutationFn: async (data: CreateProgramFormValues) => {
            const response = await createProgram({
                name: data.name,
                secretaryId: data.secretaryId,
            })
            return response
        }
    })
}

type CreateProgramFormValues = {
    name: string
    secretaryId: string
}

const createProgram = async (data: CreateProgramFormValues) => {
    const response = await axios.post(`${config.apiUrl}/programs`, data)
    return response.data
}