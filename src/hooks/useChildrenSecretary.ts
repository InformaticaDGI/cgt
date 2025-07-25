import { useQuery } from "@tanstack/react-query"

const useChildrenSecretary = (childrenId: string) => {
    return useQuery({
        queryKey: ['secretaries', childrenId],
        queryFn: () => fetchChildrenSecretary(childrenId)
    })
}

const fetchChildrenSecretary = async (childrenId: string): Promise<any> => {
    // const url = `${config.apiUrl}/secretaries/${childrenId}`
    // const response = await fetch(url)
    // const data = await response.json()
    // return data
    return { id: childrenId, name: 'CONSTRUGUARICO', parent: { id: '1', name: 'Nombre del secretario padre' } }
}

export default useChildrenSecretary