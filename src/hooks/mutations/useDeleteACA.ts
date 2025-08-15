import { useMutation } from "@tanstack/react-query"
import api from "../../lib/api"

export const useDeleteACA = () => {
    return useMutation({
        mutationFn: (id: string) => {
            return api.cgt.delete(`/aca-projects/${id}`)
        },
    })
}
