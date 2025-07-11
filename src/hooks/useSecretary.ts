import { useQuery } from "@tanstack/react-query"
import data from '../utils/data.json';
const useSecretary = () => {
    return useQuery({
        queryKey: ['secretaries'],
        queryFn: fetchSecretary,
        initialData: []
    })
}


const fetchSecretary = () => {
    const values = data.evaluacionSistema.secretarias.map(secretary => ({ value: secretary.idSecretaria, label: secretary.nombreSecretaria }))
    return values;
}

export default useSecretary