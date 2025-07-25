import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "../../components/Ui/Button/Button";
import { Modal } from '../../components/Ui/Modal/Modal';
import { Input } from '../../components/Ui/Input/Input';
import { FormControl } from '../../components/Ui/FormControl/FormControl';
import useProject from '../../hooks/useProject';
import { MunicipalitySelect } from "../../components/Prebuilt/MunicipalitySelect";
import { ParrishSelect } from "../../components/Prebuilt/ParrishSelect";
import { CommunityCircuitSelect } from "../../components/Prebuilt/CommunityCircuit";
import { CommunitySelect } from "../../components/Prebuilt/CommunitySelect";
import { FaCalendarAlt, FaPlus, FaClock, FaCheckCircle, FaHourglassHalf } from 'react-icons/fa';
import axios from 'axios';
import { config } from '../../config';

export default function ProjectDetailView() {
  const { projectId } = useParams();
  const { data: project, isLoading, error } = useProject(projectId || "");
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
  
  // Tipo para los datos que se envían al endpoint
  type ActivityPayload = {
    name: string;
    startDate: string | null;
    endDate: string | null;
    sectorId: string;
    parishId: string;
    communityCircuitId: string;
    projectId: string | undefined;
  };

const [activities, setActivities] = useState<Activity[]>([]);
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
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");

  // Función para cargar las actividades del proyecto desde el backend
  const fetchActivities = async () => {
    try {
      if (!projectId) return;
      
      const response = await axios.get(`/api/scheduled-activities/project/${projectId}`);
      
      if (response.data) {
        setActivities(response.data);
      }
    } catch (error) {
      console.error('Error al cargar las actividades:', error);
    }
  };
  
  useEffect(() => {
    // Cargar actividades desde el backend
    fetchActivities();
    
    // Precarga selects de ubicación con la info del proyecto
    if (project) {
      setNewActivity(a => ({
        ...a,
        municipalityId: project.municipalityId || "",
        parishId: project.parishId || "",
        circuitId: project.circuitId || "",
        communityId: project.communityId || ""
      }));
    }
  }, [project, projectId]);

  // Efecto para precargar los selects cuando se abre el modal
  useEffect(() => {
    if (modalOpen && project) {
      // Limpiar mensaje de error al abrir el modal
      setSubmitError("");
      
      setNewActivity(a => ({
        ...a,
        municipalityId: project.municipalityId || "",
        parishId: project.parishId || "",
        circuitId: project.circuitId || "",
        communityId: project.communityId || ""
      }));
    }
  }, [modalOpen, project]);

  const saveActivity = async (activityData: typeof newActivity): Promise<boolean> => {
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
      
      // Mostrar en consola los datos que se envían para depurar el error 400
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
    
    // Validar que las fechas estén dentro del rango del proyecto
    if (project && (
        new Date(newActivity.startDate) < new Date(project.initialDate) || 
        new Date(newActivity.endDate) > new Date(project.finalDate)
    )) {
      setSubmitError(`Las fechas de la actividad deben estar dentro del rango del proyecto (${new Date(project.initialDate).toISOString().split('T')[0]} - ${new Date(project.finalDate).toISOString().split('T')[0]})`);
      return;
    }
    
    // Si pasa todas las validaciones, guardar la actividad
    const success = await saveActivity(newActivity);
    
    if (success) {
      // Resetear el formulario
      setNewActivity({
        name: "",
        startDate: "",
        endDate: "",
        municipalityId: project?.municipalityId || "",
        parishId: project?.parishId || "",
        circuitId: project?.circuitId || "",
        communityId: project?.communityId || ""
      });
      setModalOpen(false);
    }
  };

  if (isLoading) return <div>Cargando...</div>;
  if (error || !project) return <div>Error al cargar el proyecto</div>;

  return (
    <div style={{ width: "100%", padding: "32px 24px" }}>
      {/* HEADER SIMPLIFICADO */}
      <div style={{
        background: "#fff",
        borderRadius: 12,
        boxShadow: "0 2px 12px #0001",
        padding: 32,
        marginBottom: 28
      }}>
        <h1 style={{ fontSize: 32, margin: 0, fontWeight: 700 }}>{project.name}</h1>
        <div style={{ display: "flex", gap: 40, margin: "24px 0 0 0" }}>
          <div style={{ display: "flex", alignItems: "center" }}>
            <FaCalendarAlt size={18} style={{ color: "#16a085", marginRight: 12 }} />
            <div>
              <div style={{ color: "#888", fontSize: 13, marginBottom: 4 }}>Fecha de inicio</div>
              <div style={{ fontWeight: 600 }}>
                {project.initialDate ? new Date(project.initialDate).toISOString().split('T')[0] : ''}
              </div>
            </div>
          </div>
          <div style={{ display: "flex", alignItems: "center" }}>
            <FaClock size={18} style={{ color: "#16a085", marginRight: 12 }} />
            <div>
              <div style={{ color: "#888", fontSize: 13, marginBottom: 4 }}>Fecha de finalización</div>
              <div style={{ fontWeight: 600 }}>
                {project.finalDate ? new Date(project.finalDate).toISOString().split('T')[0] : ''}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ACTIVIDADES */}
      <div style={{ 
        background: "#fff", 
        borderRadius: 12, 
        boxShadow: "0 2px 12px #0001", 
        overflow: "hidden"
      }}>
        {/* Header con título y botón */}
        <div style={{ 
          display: "flex", 
          justifyContent: "space-between", 
          alignItems: "center", 
          padding: "16px 24px", 
          borderBottom: "1px solid #eee", 
          background: "#f9f9f9" 
        }}>
          <h2 style={{ margin: 0, fontSize: 20, fontWeight: 600 }}>Actividades</h2>
          <Button 
            $variant="primary" 
            onClick={() => setModalOpen(true)} 
            style={{ display: "flex", alignItems: "center", gap: "8px" }}
          >
            <FaPlus size={12} /> Nueva Actividad
          </Button>
        </div>
        
        {/* Contenido de actividades */}
        <div style={{ padding: "0" }}>
          {activities.length === 0 ? (
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
      </div>

      {/* MODAL REGISTRO ACTIVIDAD */}
      <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)} title="" width="900px">
        <div style={{ width: "100%", padding: "30px" }}>
          <h2 style={{ marginBottom: 25, textAlign: "center", fontWeight: 700, fontSize: 22 }}>Registrar Nueva Actividad</h2>
          
          {submitError && (
            <div style={{ 
              padding: "12px", 
              backgroundColor: "#ffebee", 
              color: "#c62828", 
              borderRadius: "4px", 
              marginBottom: "20px",
              fontSize: "14px"
            }}>
              {submitError}
            </div>
          )}
          
          {/* Nombre de actividad - Fila completa */}
          <div style={{ marginBottom: 60 }}>
            <FormControl label="Nombre de la actividad" required>
              <Input
                name="name"
                placeholder="Nombre de la actividad"
                value={newActivity.name}
                onChange={e => setNewActivity({ ...newActivity, name: e.target.value })}
                $size="medium"
                style={{ marginBottom: 0, height: 40, fontSize: 14 }}
              />
            </FormControl>

            <div style={{ display: "flex", gap: "20px", marginBottom: "30px" }}>
              <FormControl label="Fecha de inicio" required style={{ flex: 1 }}>
                <Input
                  type="date"
                  value={newActivity.startDate}
                  onChange={(e) => setNewActivity({ ...newActivity, startDate: e.target.value })}
                  style={{ height: "40px", fontSize: "14px" }}
                />
              </FormControl>
              <FormControl label="Fecha de finalización" required style={{ flex: 1 }}>
                <Input
                  type="date"
                  value={newActivity.endDate}
                  onChange={(e) => setNewActivity({ ...newActivity, endDate: e.target.value })}
                  style={{ height: "40px", fontSize: "14px" }}
                />
              </FormControl>
            </div>

            <div style={{ display: "flex", gap: "20px", marginBottom: "20px" }}>
              <FormControl label="Municipio" required style={{ flex: 1 }}>
                <MunicipalitySelect
                  value={newActivity.municipalityId}
                  onChange={(value) => {
                    setNewActivity({
                      ...newActivity,
                      municipalityId: value,
                      parishId: "",
                      circuitId: "",
                      communityId: ""
                    });
                  }}
                  style={{ height: "40px", fontSize: "14px" }}
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
                      circuitId: "",
                      communityId: ""
                    });
                  }}
                  style={{ height: "40px", fontSize: "14px" }}
                />
              </FormControl>
            </div>

            <div style={{ display: "flex", gap: "20px", marginBottom: "20px" }}>
              <FormControl label="Circuito" required style={{ flex: 1 }}>
                <CommunityCircuitSelect
                  parishId={newActivity.parishId}
                  value={newActivity.circuitId}
                  onChange={(value) => {
                    setNewActivity({
                      ...newActivity,
                      circuitId: value,
                      communityId: ""
                    });
                  }}
                  style={{ height: "40px", fontSize: "14px" }}
                />
              </FormControl>
              <FormControl label="Comunidad" required style={{ flex: 1 }}>
                <CommunitySelect
                  circuitId={newActivity.circuitId}
                  value={newActivity.communityId}
                  onChange={(value) => setNewActivity({ ...newActivity, communityId: value })}
                  style={{ height: "40px", fontSize: "14px" }}
                />
              </FormControl>
            </div>
            
            <div style={{ display: "flex", justifyContent: "flex-end", marginTop: "20px" }}>
              <Button 
                $variant="primary" 
                onClick={handleAddActivity} 
                disabled={isSubmitting}
                style={{ 
                  position: "relative",
                  minWidth: "100px"
                }}
              >
                {isSubmitting ? 'Guardando...' : 'Guardar'}
              </Button>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
}
