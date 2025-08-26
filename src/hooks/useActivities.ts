import axios from 'axios';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { config } from '../config';

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
  projectId: string;
};

type ActivityPayload = {
  name: string;
  startDate: string | null;
  endDate: string | null;
  sectorId?: string;
  parishId?: string;
  communityCircuitCode?: string;
  projectId: string | undefined;
};

const useActivities = (projectId: string | undefined) => {
  return useQuery({
    queryKey: ['activities', projectId],
    queryFn: () => fetchActivities(projectId),
    enabled: !!projectId,
    initialData: [],
  })
}

// Función para cargar las actividades del proyecto desde el backend
const fetchActivities = async (projectId: string | undefined): Promise<Activity[]> => {
  if (!projectId) return [];
  const { data } = await axios.get<Activity[]>(`${config.apiUrl}/scheduled-activities/project/${projectId}`);
  return data;
};


const useCreateActivity = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (activity: ActivityPayload) => createActivity(activity),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['activities', data.projectId] });
    }
  })
}

const createActivity = async (activity: ActivityPayload) => {
  const payload: ActivityPayload = {
    name: activity.name,
    startDate: activity.startDate,
    endDate: activity.endDate,
    projectId: activity.projectId,
  }
  if (activity.communityCircuitCode) {
    payload.communityCircuitCode = activity.communityCircuitCode;
  }
  if (activity.parishId) {
    payload.parishId = activity.parishId;
  }
  if (activity.sectorId) {
    payload.sectorId = activity.sectorId;
  }
  const { data } = await axios.post<Activity>(`${config.apiUrl}/scheduled-activities`, payload);
  return data;
}


export {
  useActivities,
  useCreateActivity,
};
