import React, { useState, useEffect } from "react";
import { Button } from "../Ui/Button/Button";
import { Modal } from '../Ui/Modal/Modal';
import { FaPlus } from 'react-icons/fa';
import { useActivities, useCreateActivity } from '../../hooks/useActivities';
import { ActivityItem } from './ActivityItem';
import { ActivityForm } from './ActivityForm';
import type { ActivityFormData } from './ActivityForm';
import Text from "../Ui/Text/Text";
import { Flex } from "../Layout/Flex";

interface ProjectActivitiesProps {
  projectId: string | undefined;
  projectStartDate?: string;
  projectEndDate?: string;
  projectMunicipalityId?: string;
  projectParishId?: string;
  projectCircuitCode?: string;
  projectCommunityId?: string;
}

const ProjectActivities: React.FC<ProjectActivitiesProps> = ({
  projectId,
  projectStartDate,
  projectEndDate,
  projectMunicipalityId,
  projectParishId,
  projectCircuitCode,
  projectCommunityId
}) => {
  const {
    isLoading,
    data: activities,
  } = useActivities(projectId);
  const { mutateAsync: createActivity, isPending: isSubmitting } = useCreateActivity();


  const [modalOpen, setModalOpen] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [formData, setFormData] = useState<ActivityFormData>({
    name: "",
    startDate: "",
    endDate: "",
    municipalityId: projectMunicipalityId || "",
    parishId: projectParishId || "",
    circuitCode: projectCircuitCode || "",
    communityId: projectCommunityId || ""
  });

  // Precarga selects de ubicación con la info del proyecto
  useEffect(() => {
    if (projectMunicipalityId || projectParishId || projectCircuitCode || projectCommunityId) {
      setFormData(prev => ({
        ...prev,
        municipalityId: projectMunicipalityId || "",
        parishId: projectParishId || "",
        circuitCode: projectCircuitCode || "",
        communityId: projectCommunityId || ""
      }));
    }
  }, [projectMunicipalityId, projectParishId, projectCircuitCode, projectCommunityId]);

  // Efecto para precargar los selects cuando se abre el modal
  useEffect(() => {
    if (modalOpen) {
      setFormData(prev => ({
        ...prev,
        municipalityId: projectMunicipalityId || "",
        parishId: projectParishId || "",
        circuitCode: projectCircuitCode || "",
        communityId: projectCommunityId || ""
      }));
      // Limpiar cualquier error anterior
      setSubmitError("");
    }
  }, [modalOpen, projectMunicipalityId, projectParishId, projectCircuitCode, projectCommunityId, setSubmitError]);

  const handleAddActivity = async () => {
    // Validar que todos los campos requeridos estén completos
    if (!formData.name || !formData.startDate || !formData.endDate) {
      setSubmitError("Por favor complete todos los campos requeridos");
    }

    if (projectMunicipalityId && (!formData.municipalityId || !formData.parishId || !formData.circuitCode || !formData.communityId)) {
      setSubmitError("Por favor complete todos los campos requeridos");
      return;
    }

    // Validar que la fecha de inicio no sea mayor que la fecha de fin
    if (new Date(formData.startDate) > new Date(formData.endDate)) {
      setSubmitError("La fecha de inicio no puede ser mayor que la fecha de finalización");
      return;
    }

    // Validar que las fechas de la actividad estén dentro del rango del proyecto
    if (projectStartDate && projectEndDate) {
      const activityStartDate = new Date(formData.startDate);
      const activityEndDate = new Date(formData.endDate);
      const projStartDate = new Date(projectStartDate);
      const projEndDate = new Date(projectEndDate);

      if (activityStartDate < projStartDate || activityEndDate > projEndDate) {
        setSubmitError("Las fechas de la actividad deben estar dentro del rango del proyecto");
        return;
      }
    }

    // Guardar la actividad
    const success = await createActivity({
      name: formData.name,
      startDate: formData.startDate ? new Date(formData.startDate).toISOString() : null,
      endDate: formData.endDate ? new Date(formData.endDate).toISOString() : null,
      sectorId: formData.communityId,
      parishId: formData.parishId,
      communityCircuitCode: formData.circuitCode,
      projectId: projectId
    });


    if (success) {
      setModalOpen(false);
      // Limpiar el formulario
      setFormData({
        name: "",
        startDate: "",
        endDate: "",
        municipalityId: projectMunicipalityId || "",
        parishId: projectParishId || "",
        circuitCode: projectCircuitCode || "",
        communityId: projectCommunityId || ""
      });
    }
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "16px", height: "100%" }}  >
      <Flex $direction="row" $justify="space-between" $align="center" $gap="24px" $height="auto">
        <Text style={{ fontSize: '14px', fontWeight: 'normal', textWrap: 'nowrap', textAlign: 'justify' }}>Listado de Actividades</Text>
        <Button $variant="primary" $size="small" onClick={() => setModalOpen(true)} style={{ display: "flex", alignItems: "center", gap: "5px" }}>
          <FaPlus size={12} /> Nueva Actividad
        </Button>
      </Flex>
      {/* Contenido de actividades */}
      <div style={{ padding: "0" }}>
        {isLoading ? (
          <div style={{ padding: "30px", textAlign: "center", color: "#777" }}>
            Cargando actividades...
          </div>
        ) : activities.length === 0 ? (
          <div style={{ padding: "30px", textAlign: "center", color: "#777" }}>
            No hay actividades registradas.
          </div>
        ) : (
          <div>
            {activities.map((activity, index) => (
              <ActivityItem
                key={activity.id}
                activity={activity}
                isLast={index === activities.length - 1}
                projectId={projectId}
              />
            ))}
          </div>
        )}
      </div>

      {/* MODAL REGISTRO ACTIVIDAD */}
      <Modal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        title="Registrar Nueva Actividad"
        width="1000px"
      >
        <ActivityForm
          formData={formData}
          onFormChange={setFormData}
          onSubmit={handleAddActivity}
          isSubmitting={isSubmitting}
          submitError={submitError}
        />
      </Modal>
    </div>
  );
};

export default ProjectActivities;
