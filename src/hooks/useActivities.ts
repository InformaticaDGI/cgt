import axios from 'axios';
import { useMutation, useQuery } from '@tanstack/react-query';
import { config } from '../config';
import { useAppStore } from '../store/store';

export type Activity = {
  id: number;
  name: string;
  description?: string;
  startDate: string;
  endDate: string;
  municipalityId: string;
  parishId: string;
  circuitId: string;
  communityId: string;
  isCompleted?: boolean;
};

type ActivityPayload = {
  name: string;
  startDate: string | null;
  endDate: string | null;
  sectorId: string;
  parishId: string;
  communityCircuitId: string;
  projectId: string | undefined;
};

const useActivities = (projectId: string | undefined) => {
  const { setActivities } = useAppStore();
  return useQuery({
    queryKey: ['activities', projectId],
    queryFn: () => fetchActivities(projectId),
    enabled: !!projectId,
    initialData: [],
    onSuccess: (data) => {
      setActivities(data);
    }
  })
}

// Función para cargar las actividades del proyecto desde el backend
const fetchActivities = async (projectId: string | undefined): Promise<Activity[]> => {
  if (!projectId) return [];
  const { data } = await axios.get<Activity[]>(`${config.apiUrl}/scheduled-activities/project/${projectId}`);
  return data;
};


const useCreateActivity = () => {
  const { setActivities, activities } = useAppStore();
  return useMutation({
    mutationFn: (activity: ActivityPayload) => createActivity(activity),
    onSuccess: (data) => {
      setActivities([...activities, data]);
    }
  })
}

const createActivity = async (activity: ActivityPayload) => {
  const { data } = await axios.post<Activity>(`${config.apiUrl}/scheduled-activities`, activity);
  return data;
}


export {
  useActivities,
  useCreateActivity,
};
