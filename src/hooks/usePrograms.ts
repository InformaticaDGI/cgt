import { useQuery } from "@tanstack/react-query"
import data from '../utils/data.json';
import { useAppStore } from "../store/store";
const usePrograms = () => {
    const dependency_id = useAppStore(item => item.dependency_id)
    const secretary_id = useAppStore(item => item.secretary_id)
    const territory_id = useAppStore(item => item.territory_id)
    const municipality_id = useAppStore(item => item.municipality_id)
    const parrish_id = useAppStore(item => item.parrish_id)
    return useQuery({
        queryKey: ['programs', dependency_id, secretary_id, territory_id, municipality_id, parrish_id],
        queryFn: () => fetchPrograms({ dependency_id, secretary_id, territory_id, municipality_id, parrish_id }),
        initialData: []
    })
}


const fetchPrograms = (filters: { dependency_id: string, secretary_id: string, territory_id: string, municipality_id: string, parrish_id: string }) => {
    
     const value =  data.evaluacionSistema.listado_programas
            .filter(list => {
                if(filters.dependency_id === '') return true
                return list.idDependencia === filters.dependency_id
            })
            .filter(list => {
                if(filters.territory_id === '') return true
                return list.idSecretariaTerritorialAsociada === filters.territory_id
            })
        
            let programas: any[] = []
            value.forEach(item => {
                programas = [...programas, ...item.programas]
            })

    return programas
}

export default usePrograms