import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useAuthStorage } from "../store/auth-storage"
import api from "../lib/api";

export const useLogin = () => {


    const queryClient = useQueryClient()
    const login = useAuthStorage((state) => state.login);

    return useMutation({
        mutationFn: async (credentials: { email: string; password: string }) => {
            const response = await api.auth.post('/users/auth', { appId: 'db701dae-f19d-484d-909c-ea0d0a5e02dc', ...credentials })
            const responseData = response.data
            const roles = await api.auth.get(`/users/id/${responseData.id}/`, {
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
            await api.auth.post('/auth/logout')
        },
        onSuccess: () => {
            logout()
            queryClient.clear()
        }
    })
}