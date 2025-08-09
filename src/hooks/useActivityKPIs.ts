import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { config } from '../config';

export interface KPI {
  id: string;
  name: string;
  measurementId: string;
  areaId: string;
  measurement: Measurement;
}

export interface Measurement {
  id: string;
  name: string;
  symbol: string;
  description: string;
  createdAt: string;
  updatedAt: string;
}

export interface KPIInstanceWithKPI {
  id: string;
  kpiId: string;
  value: string;
  expected: string;
  kpi: KPI;
  activityId?: number;
  projectId?: string;
}

export interface KPIInstance {
  id?: string;
  kpiId: string;
  value: string;
  expected: string;
  kpi?: KPI;
  activityId?: number;
  projectId?: string;
}

export interface KPIResult {
  kpiInstanceId: string;
  value: number;
}

interface CompleteActivityPayload {
  scheduledActivityId: number;
  kpiResults: KPIResult[];
  observations: string;
}

/**
 * Hook para consultar los KPIs disponibles y las instancias existentes de un proyecto
 */
export const useProjectKPIs = (projectId: string | undefined) => {
  return useQuery({
    queryKey: ['kpiinstances', projectId],
    queryFn: async () => {
      if (!projectId) return { kpis: [], instances: [] };
      
      // Consultar KPIs disponibles y sus instancias usando el endpoint proporcionado
      const response = await axios.get(`${config.apiUrl}/projects/${projectId}?include=kpiinstances.kpi.measurement`);
      console.log('Respuesta de KPIs:', response.data);
      
      // Extraer las instancias de KPI con su información de KPI asociada
      const kpiInstances = response.data.kpiInstances || [];
      
      // Mapear las instancias para usarlas como KPIs disponibles
      const availableKPIs = kpiInstances.map((instance: KPIInstanceWithKPI) => ({
        id: instance.id,
        kpiId: instance.kpiId,
        name: instance.kpi?.name || 'KPI sin nombre',
        value: instance.value || '0',
        expected: instance.expected || '100',
        measurement: instance.kpi?.measurement || {
          id: '',
          name: '',
          symbol: '',
          description: '',
          createdAt: '',
          updatedAt: ''
        }
      }));
      
      console.log('KPIs disponibles mapeados:', availableKPIs);
      
      return {
        kpis: availableKPIs,
        instances: kpiInstances
      };
    },
    enabled: !!projectId
  });
};

/**
 * Hook para actualizar los KPIs de una actividad
 */
export const useUpdateActivityKPIs = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (payload: CompleteActivityPayload) => {
      const { data } = await axios.post(
        `${config.apiUrl}/activities/complete-scheduled`,
        payload
      );
      return data;
    },
    onSuccess: () => {
      // Invalidar consultas relacionadas para que se actualicen
      queryClient.invalidateQueries({ queryKey: ['kpiinstances'] });
      queryClient.invalidateQueries({ queryKey: ['activities'] });
    }
  });
};
