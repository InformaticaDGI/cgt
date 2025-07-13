import { useMutation } from "@tanstack/react-query";
import { config } from "../../config";
import axios from "axios";

export const useCreateMeasurementUnit = () => {
    return useMutation({
        mutationFn: async (data: CreateMeasurementUnitFormValues) => {
            const response = await createMeasurementUnit(data)
            return response
        }
    })
}

type CreateMeasurementUnitFormValues = {
    name: string
    description: string
}

const createMeasurementUnit = async (data: CreateMeasurementUnitFormValues) => {
    const response = await axios.post(`${config.apiUrl}/measurements`, data)
    return response.data
}