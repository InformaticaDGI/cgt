import { useQuery } from "@tanstack/react-query"
import api from "../lib/api"
const useAccessLogs = () => {
    return useQuery({
        queryKey: ['access-logs'],
        queryFn: () => fetchAccessLogs(),
        initialData: undefined
    })
}


const fetchAccessLogs = async() => {
    const { data } = await api.auth.get('/logs')
    return data
}

export default useAccessLogs