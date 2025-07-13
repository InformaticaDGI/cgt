import axios from "axios";
import { useAuthStorage } from "../store/auth-storage";
import { config } from "../config";

const cgt = axios.create({
    baseURL: `${config.apiUrl}`,
})

const auth = axios.create({
    baseURL: 'https://auth.guarico.gob.ve/api/v1/',
})

cgt.interceptors.request.use((config) => {
    const token = useAuthStorage.getState().token
    if(token) {
        config.headers.Authorization = `Bearer ${token}`
    }

    return config
})


cgt.interceptors.response.use(
    (response) => response,
    (error) => {
        if(error.response?.status === 401) {
            useAuthStorage.getState().logout()
            window.location.href = '/login'
        }

        return Promise.reject(error)
    }
)

export default {
    cgt,
    auth
}