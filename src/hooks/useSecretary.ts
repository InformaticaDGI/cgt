import { useQuery } from "@tanstack/react-query"
import { config } from "../config"

const useSecretary = (props: UseSecretaryProps = {}) => {
    return useQuery({
        queryKey: ['secretaries', props.rootOnly, props.parentId],
        queryFn: () => getQueryFn(props),
        enabled: getEnabled(props),
        initialData: []
    })
}

type UseSecretaryProps = {
    rootOnly?: boolean
    parentId?: string
}

const fetchRootSecretaries = async (): Promise<Secretary[]> => {
    const url = `${config.apiUrl}/secretaries/root/list`
    const response = await fetch(url)
    const data = await response.json()
    return data.map((secretary: Secretary) => ({ value: secretary.id, label: secretary.name }))
}

const fetchSecretaries = async (parentId: string): Promise<Secretary[]> => {
    const url = `${config.apiUrl}/secretaries/${parentId}/hierarchy`
    const response = await fetch(url)
    const data = await response.json()
    return data.children.map((secretary: Secretary) => ({ value: secretary.id, label: secretary.name }))
}

const getQueryFn = (props: UseSecretaryProps) => {
    if (props.rootOnly) {
        return fetchRootSecretaries()
    } else if (props.parentId) {
        return fetchSecretaries(props.parentId)
    }
    return []
}

const getEnabled = (props: UseSecretaryProps) => {
    if (!props.parentId && !props.rootOnly) {
        return false
    }
    return true
}

export type Secretary = {
    id: string,
    name: string,
    parentId: string,
    canHaveProjects: boolean,
    createdAt: string,
    updatedAt: string
}

export default useSecretary