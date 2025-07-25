import { useQuery } from "@tanstack/react-query"
import { config } from '../config';

const useProject = (projectId: string) => {
    return useQuery({
        queryKey: ['project', projectId],
        queryFn: () => fetchProjectById(projectId),
        initialData: undefined
    })
}

const fetchProjectById = async (projectId: string) => {
    const response = await fetch(`${config.apiUrl}/projects/${projectId}`);
    if (!response.ok) throw new Error('Project not found');
    return response.json();
}

export default useProject