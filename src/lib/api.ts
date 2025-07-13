import axios from "axios";
import { useAuthStorage } from "../store/auth-storage";

const api = axios.create({
    baseURL: 'https://auth.guarico.gob.ve/api/v1/',
})

api.interceptors.request.use((config) => {
    const token = useAuthStorage.getState().token
    if(token) {
        config.headers.Authorization = `Bearer ${token}`
    }

    return config
})


api.interceptors.response.use(
    (response) => response,
    (error) => {
        if(error.response?.status === 401) {
            useAuthStorage.getState().logout()
            window.location.href = '/login'
        }

        return Promise.reject(error)
    }
)

export default api