import { useQuery } from "@tanstack/react-query"
import data from '../utils/data.json';
const useMunicipality = (secretaryTerritoryId: string) => {
    return useQuery({
        queryKey: ['municipality', secretaryTerritoryId],
        queryFn: () => fetchMunicipality(secretaryTerritoryId),
        initialData: []
    })
}


const fetchMunicipality = (secretaryTerritoryId: string) => {
    const values = data.evaluacionSistema.municipios
        .filter(dep => dep.idSecretariaTerritorialAsociada === secretaryTerritoryId)
        .map(dep => ({ label: dep.nombreMunicipio, value: dep.idMunicipio, parroquias: dep.parroquias }))

    return values;
}

export default useMunicipality