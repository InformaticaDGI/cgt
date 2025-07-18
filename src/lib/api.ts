import axios from "axios";
import { useAuthStorage } from "../store/auth-storage";
import { config } from "../config";

const cgt = axios.create({
    baseURL: `${config.apiUrl}`,
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': `Bearer ${useAuthStorage.getState().token}`
    }
})

const auth = axios.create({
    baseURL: 'https://auth.guarico.gob.ve/api/v1/',
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