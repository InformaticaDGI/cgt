import React, { useState, useEffect } from "react";
import { Button } from "../Ui/Button/Button";
import { Modal } from '../Ui/Modal/Modal';
import { Input } from '../Ui/Input/Input';
import { FormControl } from '../Ui/FormControl/FormControl';
import { MunicipalitySelect } from "../Prebuilt/MunicipalitySelect";
import { ParrishSelect } from "../Prebuilt/ParrishSelect";
import { CommunityCircuitSelect } from "../Prebuilt/CommunityCircuit";
import { CommunitySelect } from "../Prebuilt/CommunitySelect";
import { FaCalendarAlt, FaPlus, FaClock, FaCheckCircle, FaHourglassHalf } from 'react-icons/fa';
import useActivities from '../../hooks/useActivities';
import type { Activity } from '../../hooks/useActivities';

interface ProjectActivitiesProps {
  projectId: string | undefined;
  projectStartDate?: string;
  projectEndDate?: string;
  projectMunicipalityId?: string;
  projectParishId?: string;
  projectCircuitId?: string;
  projectCommunityId?: string;
}

const ProjectActivities: React.FC<ProjectActivitiesProps> = ({
  projectId,
  projectStartDate,
  projectEndDate,
  projectMunicipalityId,
  projectParishId,
  projectCircuitId,
  projectCommunityId
}) => {
  const {
    activities,
    isLoading,
    error,
    isSubmitting,
    submitError,
    saveActivity,
    setSubmitError
  } = useActivities(projectId);

  const [modalOpen, setModalOpen] = useState(false);
  const [newActivity, setNewActivity] = useState({
    name: "",
    startDate: "",
    endDate: "",
    municipalityId: "",
    parishId: "",
    circuitId: "",
    communityId: ""
  });

  // Precarga selects de ubicación con la info del proyecto
  useEffect(() => {
    if (projectMunicipalityId || projectParishId || projectCircuitId || projectCommunityId) {
      setNewActivity(a => ({
        ...a,
        municipalityId: projectMunicipalityId || "",
        parishId: projectParishId || "",
        circuitId: projectCircuitId || "",
        communityId: projectCommunityId || ""
      }));
    }
  }, [projectMunicipalityId, projectParishId, projectCircuitId, projectCommunityId]);

  // Efecto para precargar los selects cuando se abre el modal
  useEffect(() => {
    if (modalOpen) {
      setNewActivity(a => ({
        ...a,
        municipalityId: projectMunicipalityId || "",
        parishId: projectParishId || "",
        circuitId: projectCircuitId || "",
        communityId: projectCommunityId || ""
      }));
      // Limpiar cualquier error anterior
      setSubmitError("");
    }
  }, [modalOpen, projectMunicipalityId, projectParishId, projectCircuitId, projectCommunityId, setSubmitError]);

  const handleAddActivity = async () => {
    // Validar que todos los campos requeridos estén completos
    if (!newActivity.name || !newActivity.startDate || !newActivity.endDate || 
        !newActivity.municipalityId || !newActivity.parishId || !newActivity.circuitId || !newActivity.communityId) {
      setSubmitError("Por favor complete todos los campos requeridos");
      return;
    }
    
    // Validar que la fecha de inicio no sea mayor que la fecha de fin
    if (new Date(newActivity.startDate) > new Date(newActivity.endDate)) {
      setSubmitError("La fecha de inicio no puede ser mayor que la fecha de finalización");
      return;
    }
    
    // Validar que las fechas de la actividad estén dentro del rango del proyecto
    if (projectStartDate && projectEndDate) {
      const activityStartDate = new Date(newActivity.startDate);
      const activityEndDate = new Date(newActivity.endDate);
      const projStartDate = new Date(projectStartDate);
      const projEndDate = new Date(projectEndDate);
      
      if (activityStartDate < projStartDate || activityEndDate > projEndDate) {
        setSubmitError("Las fechas de la actividad deben estar dentro del rango del proyecto");
        return;
      }
    }
    
    // Guardar la actividad
    const success = await saveActivity(newActivity);
    if (success) {
      setModalOpen(false);
      // Limpiar el formulario
      setNewActivity({
        name: "",
        startDate: "",
        endDate: "",
        municipalityId: projectMunicipalityId || "",
        parishId: projectParishId || "",
        circuitId: projectCircuitId || "",
        communityId: projectCommunityId || ""
      });
    }
  };

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
        <h2 style={{ margin: 0 }}>Actividades</h2>
        <Button $variant="primary" onClick={() => setModalOpen(true)} style={{ display: "flex", alignItems: "center", gap: "5px" }}>
          <FaPlus size={12} /> Nueva Actividad
        </Button>
      </div>
      
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
              <div key={activity.id} style={{ 
                padding: "16px 24px", 
                borderBottom: index < activities.length - 1 ? "1px solid #eee" : "none",
                transition: "background 0.2s",
                cursor: "pointer",
                position: "relative"
              }}>
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                  <div>
                    <h3 style={{ margin: "0 0 8px 0", fontSize: "16px", fontWeight: "600" }}>{activity.name}</h3>
                    <div style={{ display: "flex", gap: "30px", fontSize: "14px", color: "#666" }}>
                      <div style={{ display: "flex", alignItems: "center", gap: "5px" }}>
                        <FaCalendarAlt size={12} color="#16a085" />
                        <span>Inicio: {activity.startDate ? new Date(activity.startDate).toISOString().split('T')[0] : ''}</span>
                      </div>
                      <div style={{ display: "flex", alignItems: "center", gap: "5px" }}>
                        <FaClock size={12} color="#e74c3c" />
                        <span>Fin: {activity.endDate ? new Date(activity.endDate).toISOString().split('T')[0] : ''}</span>
                      </div>
                      <div style={{ display: "flex", alignItems: "center", gap: "5px" }}>
                        {activity.isCompleted ? (
                          <>
                            <FaCheckCircle size={14} color="#27ae60" />
                            <span style={{ color: "#27ae60" }}>Completada</span>
                          </>
                        ) : (
                          <>
                            <FaHourglassHalf size={14} color="#f39c12" />
                            <span style={{ color: "#f39c12" }}>En progreso</span>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                  {/* Botones de acción eliminados según requerimiento */}
                </div>
              </div>
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
        <div style={{ padding: "40px" }}>
          {submitError && (
            <div style={{ 
              backgroundColor: "#f8d7da", 
              color: "#721c24", 
              padding: "10px 15px", 
              borderRadius: "4px", 
              marginBottom: "20px" 
            }}>
              {submitError}
            </div>
          )}
          
          <FormControl label="Nombre de la actividad" required>
            <Input
              type="text"
              value={newActivity.name}
              onChange={(e) => setNewActivity({...newActivity, name: e.target.value})}
              placeholder="Ingrese el nombre de la actividad"
              style={{ height: "40px", fontSize: "16px" }}
            />
          </FormControl>
          
          <div style={{ marginTop: "40px", display: "flex", gap: "20px" }}>
            <FormControl label="Fecha de inicio" required style={{ flex: 1 }}>
              <Input
                type="date"
                value={newActivity.startDate}
                onChange={(e) => setNewActivity({...newActivity, startDate: e.target.value})}
                style={{ height: "40px", fontSize: "16px" }}
              />
            </FormControl>
            
            <FormControl label="Fecha de finalización" required style={{ flex: 1 }}>
              <Input
                type="date"
                value={newActivity.endDate}
                onChange={(e) => setNewActivity({...newActivity, endDate: e.target.value})}
                style={{ height: "40px", fontSize: "16px" }}
              />
            </FormControl>
          </div>
          
          <div style={{ marginTop: "40px", display: "flex", gap: "20px" }}>
            <FormControl label="Municipio" required style={{ flex: 1 }}>
              <MunicipalitySelect
                value={newActivity.municipalityId}
                onChange={(value) => {
                  setNewActivity({
                    ...newActivity, 
                    municipalityId: value,
                    parishId: "", // Reset dependientes
                    circuitId: "",
                    communityId: ""
                  });
                }}
              />
            </FormControl>
            
            <FormControl label="Parroquia" required style={{ flex: 1 }}>
              <ParrishSelect
                municipalityId={newActivity.municipalityId}
                value={newActivity.parishId}
                onChange={(value) => {
                  setNewActivity({
                    ...newActivity, 
                    parishId: value,
                    circuitId: "", // Reset dependientes
                    communityId: ""
                  });
                }}
              />
            </FormControl>
          </div>
          
          <div style={{ marginTop: "40px", display: "flex", gap: "20px" }}>
            <FormControl label="Circuito" required style={{ flex: 1 }}>
              <CommunityCircuitSelect
                parishId={newActivity.parishId}
                value={newActivity.circuitId}
                onChange={(value) => {
                  setNewActivity({
                    ...newActivity, 
                    circuitId: value,
                    communityId: "" // Reset dependiente
                  });
                }}
              />
            </FormControl>
            
            <FormControl label="Comunidad" required style={{ flex: 1 }}>
              <CommunitySelect
                circuitId={newActivity.circuitId}
                value={newActivity.communityId}
                onChange={(value) => setNewActivity({...newActivity, communityId: value})}
              />
            </FormControl>
          </div>
          
          <div style={{ marginTop: "40px", display: "flex", justifyContent: "center" }}>
            <Button 
              $variant="primary"
              onClick={handleAddActivity} 
              disabled={isSubmitting}
              style={{ padding: "10px 30px", fontSize: "16px" }}
            >
              {isSubmitting ? "Guardando..." : "Guardar Actividad"}
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default ProjectActivities;
