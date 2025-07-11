import { useQuery } from "@tanstack/react-query"
import data from '../utils/data.json';
const useDependency = (secretaryId: string) => {
    return useQuery({
        queryKey: ['dependencies', secretaryId],
        queryFn: () => fetchDependency(secretaryId),
        initialData: []
    })
}


const fetchDependency = (secretaryId: string) => {
    const values = data.evaluacionSistema.dependencias
        .filter(dep => dep.idSecretariaAsociada === secretaryId)
        .map(dep => ({ label: dep.nombreDependencia, value: dep.idDependencia }))

    return values;
}

export default useDependency