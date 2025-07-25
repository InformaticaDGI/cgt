import { useState, useEffect } from 'react';
import axios from 'axios';

type Activity = {
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
  const [activities, setActivities] = useState<Activity[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [submitError, setSubmitError] = useState<string>("");

  // Función para cargar las actividades del proyecto desde el backend
  const fetchActivities = async () => {
    if (!projectId) return;
    
    try {
      setIsLoading(true);
      setError(null);
      
      const response = await axios.get(`/api/scheduled-activities/project/${projectId}`);
      
      if (response.data) {
        setActivities(response.data);
      }
    } catch (error) {
      console.error('Error al cargar las actividades:', error);
      setError('Error al cargar las actividades');
    } finally {
      setIsLoading(false);
    }
  };

  // Función para guardar una nueva actividad
  const saveActivity = async (activityData: Omit<Activity, 'id'>): Promise<boolean> => {
    try {
      setIsSubmitting(true);
      setSubmitError("");
      
      // Preparar los datos para el endpoint según el formato requerido
      const payload: ActivityPayload = {
        name: activityData.name,
        startDate: activityData.startDate ? new Date(activityData.startDate).toISOString() : null,
        endDate: activityData.endDate ? new Date(activityData.endDate).toISOString() : null,
        sectorId: activityData.communityId, // El sectorId debe ser el UUID de la comunidad seleccionada
        parishId: activityData.parishId,
        communityCircuitId: activityData.circuitId, // Mapeando circuitId a communityCircuitId
        projectId: projectId
      };
      
      // Mostrar en consola los datos que se envían para depurar
      console.log('Datos enviados al endpoint:', payload);
      
      // Realizar la petición POST usando el proxy configurado en vite.config.ts
      const response = await axios.post(
        `/api/scheduled-activities`,
        payload,
        {
          headers: {
            'Content-Type': 'application/json'
          }
        }
      );
      
      // Si la petición es exitosa, recargar las actividades desde el backend
      if (response.data) {
        // Recargar las actividades desde el backend para tener la lista actualizada
        fetchActivities();
        return true;
      }
      return false;
    } catch (error: unknown) {
      console.error('Error al guardar la actividad:', error);
      const errorMessage = error instanceof Error ? error.message : 'Error al guardar la actividad';
      setSubmitError(errorMessage);
      return false;
    } finally {
      setIsSubmitting(false);
    }
  };

  // Cargar actividades cuando cambia el projectId
  useEffect(() => {
    fetchActivities();
  }, [projectId]);

  return {
    activities,
    isLoading,
    error,
    isSubmitting,
    submitError,
    fetchActivities,
    saveActivity,
    setSubmitError
  };
};

export default useActivities;
export type { Activity, ActivityPayload };
