import { useQuery } from "@tanstack/react-query"
import { config } from '../config';

const useProject = (projectId: string | undefined) => {
    return useQuery({
        queryKey: ['project', projectId],
        queryFn: () => fetchProjectById(projectId),
        initialData: undefined
    })
}

const fetchProjectById = async (projectId: string | undefined) => {
    if (!projectId) throw new Error('Project ID is required');
    const response = await fetch(`${config.apiUrl}/projects/${projectId}?include=parish.municipality`);
    if (!response.ok) throw new Error('Project not found');
    return response.json();
}

export default useProject