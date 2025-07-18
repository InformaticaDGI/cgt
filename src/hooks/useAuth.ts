import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useAuthStorage } from "../store/auth-storage"
import api from "../lib/api";

export const useLogin = () => {

    const queryClient = useQueryClient()
    const login = useAuthStorage((state) => state.login);

    return useMutation({
        mutationFn: async (credentials: { email: string; password: string }) => {
            const response = await api.auth.post('/users/auth', { appId: import.meta.env.VITE_APP_ID, ...credentials })
            const responseData = decodeJwt(response.data.token)

            const data = {
                user: {
                    ...responseData,
                },
                token: response.data.token
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


export const decodeJwt = (token?: string) => {

    if (!token) return undefined;
    const base64Url = token.split('.')[1];
    if (!base64Url) return undefined
  
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    try{
      const jwtObject = JSON.parse(window?.atob(base64));
      return jwtObject;
    } catch(err){
      console.log(err)
      return undefined
    }
  
  }