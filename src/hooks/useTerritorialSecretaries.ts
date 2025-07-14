import { useQuery } from "@tanstack/react-query"
import axios from "axios";
import { config } from "../config";

const useTerritorialSecretaries = () => {
    return useQuery({
        queryKey: ['territorial-secretary'],
        queryFn: fetchTerritorialSecretary,
        initialData: []
    })
}


const fetchTerritorialSecretary = async () => {
    const { data } = await axios.get<TerritorialSecretary[]>(`${config.apiUrl}/territorial-secretaries`)
    return data.map(territory => ({ value: territory.id, label: territory.name }))
}


export type TerritorialSecretary = {
    id: string
    name: string
    createdAt: string
    updatedAt: string
}

export default useTerritorialSecretaries