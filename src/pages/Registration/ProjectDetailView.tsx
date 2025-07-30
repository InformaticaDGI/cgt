// React se usa implícitamente en el JSX
import { useParams } from "react-router";
import useProject from "../../hooks/useProject";
import { FaCalendarAlt, FaClock } from 'react-icons/fa';
import ProjectActivities from "../../components/Project/ProjectActivities";
import { Grid, GridItem } from "../../components/Layout/Grid";
import Text from "../../components/Ui/Text/Text";
import { Flex } from "../../components/Layout/Flex";
import Card from "../../components/Card/Card";

export default function ProjectDetailView() {
  const { projectId } = useParams();
  const { data: project, isLoading, error } = useProject(projectId);

  // No state needed here anymore as it's all in the ProjectActivities component

  if (isLoading) return <div>Cargando...</div>;
  if (error || !project) return <div>Error al cargar el proyecto</div>;

  return (
    <Flex $direction="column" $gap="16px" $padding="32px 24px">
      {/* HEADER SIMPLIFICADO */}
      <div style={{
        background: "#fff",
        borderRadius: 12,
        boxShadow: "var(--shadow-sm)",
        padding: "24px 16px",
        width: "100%",
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        gap: 40
      }}>
        <Text $fontSize="20px" $fontWeight="500">{project.name}</Text>
        <div style={{ display: "flex", flexDirection: "row", gap: 40 }}>
          <div style={{ display: "flex", alignItems: "center" }}>
            <FaCalendarAlt size={18} style={{ color: "#16a085", marginRight: 12 }} />
            <div>
              <Text $fontSize="12px" $fontWeight="500">Fecha de inicio</Text>
              <Text $fontSize="12px" $fontWeight="600">
                {project.initialDate ? new Date(project.initialDate).toISOString().split('T')[0] : ''}
              </Text>
            </div>
          </div>
          <div style={{ display: "flex", alignItems: "center" }}>
            <FaClock size={18} style={{ color: "#16a085", marginRight: 12 }} />
            <div>
              <Text $fontSize="12px" $fontWeight="500">Fecha de finalización</Text>
              <Text $fontSize="12px" $fontWeight="600">
                {project.finalDate ? new Date(project.finalDate).toISOString().split('T')[0] : ''}
              </Text>
            </div>
          </div>
        </div>
      </div>
      <div style={{
        background: "#fff",
        borderRadius: 12,
        boxShadow: "var(--shadow-sm)",
        padding: 16,
        width: "100%",
        display: "flex",
        flexDirection: "row",
      }}>
        <Flex $direction="row" $gap="40px" $justify="start">
            <Text $fontSize="12px" $fontWeight="500">Actividades</Text>
            <Text $fontSize="12px" $fontWeight="500">Punto y Circulo</Text>
        </Flex>
      </div>
      <Grid $columns="repeat(30, 1fr)">
        <GridItem $colSpan={10} style={{ height: '300px' }}>
          <Card $isSelectable={false}>
            <Text $fontSize="16px" $fontWeight="500">Indicador de Metas</Text>
          </Card>
        </GridItem>
        <GridItem $colSpan={10} style={{ height: '300px' }}>
          <Card $isSelectable={false}>
            <Text $fontSize="16px" $fontWeight="500">Indicador de Eficiencia</Text>
          </Card>
        </GridItem>
        <GridItem $colSpan={10} style={{ height: '300px' }}>
          <Card $isSelectable={false}>
            <Text $fontSize="16px" $fontWeight="500">Indicador de Eficacia</Text>
          </Card>
        </GridItem>
        <GridItem $colSpan={12} style={{ height: '300px' }}>
          <Card $isSelectable={false}>
          <Text $fontSize="16px" $fontWeight="500">Listado de Actividades</Text>
              <ProjectActivities
                projectId={projectId}
                projectCircuitId={project.circuitId}
                projectCommunityId={project.communityId}
                projectStartDate={project.initialDate}
                projectEndDate={project.finalDate}
                projectMunicipalityId={project.municipalityId}
                projectParishId={project.parishId}
              />
          </Card>
        </GridItem>
        <GridItem $colSpan={18} style={{ height: '300px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <Card $isSelectable={false}>
            <Text $fontSize="16px" $fontWeight="500">Diagrama de Gantt</Text>
          </Card>
          <Card $isSelectable={false}>
            <Text $fontSize="16px" $fontWeight="500">Mapa con las ubicaciónes de las actividades/proyecto</Text>
          </Card>
        </GridItem>
      </Grid>
    </Flex>)

}
