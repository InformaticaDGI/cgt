import { useMutation } from "@tanstack/react-query";
import { config } from "../../config";
import axios from "axios";

export const useUploadFiles = (onProgress?: (progress: number) => void) => {
    return useMutation({
        mutationFn: async (data: UploadFilesFormValues) => {
            const response = await uploadFiles(data, onProgress)
            return response
        }
    })
}

type UploadFilesFormValues = {
    formData: FormData;
    activityId: string;
}

const uploadFiles = async (data: UploadFilesFormValues, onProgress?: (progress: number) => void) => {
    const response = await axios.post(`${config.apiUrl}/activities-images/${data.activityId}/upload`, data.formData, {
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



