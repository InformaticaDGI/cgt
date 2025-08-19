import { useMutation, useQueryClient } from "@tanstack/react-query";
import { config } from "../../config";
import axios from "axios";

export const useUploadFiles = (onProgress?: (progress: number) => void) => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async (data: UploadFilesFormValues) => {
            const response = await uploadFiles(data, onProgress)
            return response
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['project'] })
        }
    })
}

type UploadFilesFormValues = {
    formData: FormData;
    projectId: string;
}

const uploadFiles = async (data: UploadFilesFormValues, onProgress?: (progress: number) => void) => {
    const response = await axios.post(`${config.apiUrl}/project-images/${data.projectId}/upload`, data.formData, {
        headers: {
            'Content-Type': 'multipart/form-data'
        },
        onUploadProgress: (progressEvent) => {
            if (onProgress && progressEvent.total) {
                const progress = Math.round((progressEvent.loaded * 100) / progressEvent.total);
                onProgress(progress);
            }
        }
    })
    return response.data
}



