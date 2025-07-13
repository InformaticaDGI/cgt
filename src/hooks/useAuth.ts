import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useAuthStorage } from "../store/auth-storage"
import api from "../lib/api";

export const useLogin = () => {


    const queryClient = useQueryClient()
    const login = useAuthStorage((state) => state.login);

    return useMutation({
        mutationFn: async (credentials: { email: string; password: string }) => {
            const response = await api.post('/users/auth', { appId: 'd77c7648-500e-4650-b786-6eb1754bf418', ...credentials })
            const responseData = response.data
            const roles = await api.get(`/users/id/${responseData.id}/`, {
                headers: {
                    Authorization: `Bearer ${responseData.token}`
                }
            })

            const data = {
                user: {
                    ...responseData,
                    role: roles.data.role.name
                },
                token: responseData.token
            }

            return data
        },
        onSuccess: (data) => {
            login(data.user, data.token)
            queryClient.invalidateQueries()
        }
    })

}

export const useLogout = () => {
    const logout = useAuthStorage((state) => state.logout);
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: async () => {
            await api.post('/auth/logout')
        },
        onSuccess: () => {
            logout()
            queryClient.clear()
        }
    })
}