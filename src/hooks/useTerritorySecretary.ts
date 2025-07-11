import { useQuery } from "@tanstack/react-query"
import data from '../utils/data.json';
const useTerritorySecretary = () => {
    return useQuery({
        queryKey: ['territory-secretary'],
        queryFn: fetchSecretaryTerritory,
        initialData: []
    })
}


const fetchSecretaryTerritory = () => {
    const values = data.evaluacionSistema.secretarias_territoriales.map(secretary => ({ value: secretary.idSecretariaTerritorial, label: secretary.nombreSecretariaTerritorial }))
    return values;
}

export default useTerritorySecretary