// React se usa implícitamente en el JSX
import { useParams } from "react-router";
import useProject from "../../hooks/useProject";
import { FaCalendarAlt, FaClock } from 'react-icons/fa';
import ProjectActivities from "../../components/Project/ProjectActivities";

export default function ProjectDetailView() {
  const { projectId } = useParams();
  const { data: project, isLoading, error } = useProject(projectId || "");

  // No state needed here anymore as it's all in the ProjectActivities component

  if (isLoading) return <div>Cargando...</div>;
  if (error || !project) return <div>Error al cargar el proyecto</div>;

  return (
    <div style={{ width: "85vw", padding: "32px 24px" }}>
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

      {/* ACTIVIDADES
      <ProjectActivities 
        projectId={projectId}
        projectStartDate={project.initialDate}
        projectEndDate={project.finalDate}
        projectMunicipalityId={project.municipalityId}
        projectParishId={project.parishId}
        projectCircuitId={project.circuitId}
        projectCommunityId={project.communityId}
      /> */}
    </div>
  );
}
