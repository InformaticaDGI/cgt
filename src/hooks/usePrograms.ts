import { useQuery } from "@tanstack/react-query"
import data from '../utils/data.json';
const usePrograms = () => {
    return useQuery({
        queryKey: ['programs'],
        queryFn: fetchPrograms,
        initialData: []
    })
}


const fetchPrograms = () => {
    return data;
}

export default usePrograms