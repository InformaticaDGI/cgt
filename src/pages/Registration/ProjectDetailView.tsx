// React se usa implícitamente en el JSX
import { useParams } from "react-router";
import useProject from "../../hooks/useProject";
import { FaCalendarAlt, FaClock } from 'react-icons/fa';
import ProjectActivities from "../../components/Project/ProjectActivities";
import { Grid, GridItem } from "../../components/Layout/Grid";
import Text from "../../components/Ui/Text/Text";
import { Flex } from "../../components/Layout/Flex";
import Card from "../../components/Card/Card";
import CardHeader from "../../components/Card/CardHeader";
import CardBody from "../../components/Card/CardBody";
import IndicatorProgress from "../../components/Indicator/IndicatorProgress";
import GanttChart from "../../components/GanttChart/GanttChart";
import { GobMap } from "../../components/Map/map.components";

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
      {/*   <div style={{
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
      </div> */}
      <Grid $columns="repeat(30, 1fr)">
        <GridItem $colSpan={10} style={{ height: '250px' }}>
          <Card $isSelectable={false}>
            <CardHeader>
              <Text style={{ fontSize: '14px', fontWeight: 'normal', textWrap: 'nowrap', textAlign: 'justify' }}>Metas cumplida</Text>
            </CardHeader>
            <CardBody style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              <IndicatorProgress value={30} strokeWidth={14} size={160} textSize={18} />
            </CardBody>
          </Card>
        </GridItem>
        <GridItem $colSpan={10} style={{ height: '250px' }}>
          <Card $isSelectable={false}>
            <CardHeader>
              <Text style={{ fontSize: '14px', fontWeight: 'normal', textWrap: 'nowrap', textAlign: 'justify' }}>Eficiencia</Text>
            </CardHeader>
            <CardBody style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              <IndicatorProgress value={100} strokeWidth={14} size={160} textSize={18} />
            </CardBody>
          </Card>
        </GridItem>
        <GridItem $colSpan={10} style={{ height: '250px' }}>
          <Card $isSelectable={false}>
            <CardHeader>
              <Text style={{ fontSize: '14px', fontWeight: 'normal', textWrap: 'nowrap', textAlign: 'justify' }}>Eficacia</Text>
            </CardHeader>
            <CardBody style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              <IndicatorProgress value={74} strokeWidth={14} size={160} textSize={18} />
            </CardBody>
          </Card>
        </GridItem>
        <GridItem $colSpan={32} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <Card $isSelectable={false}>
            <Text style={{ fontSize: '14px', fontWeight: 'normal', textWrap: 'nowrap', textAlign: 'justify' }}>Diagrama de Gantt</Text>
            <GanttChart activities={project.scheduledActivities} />
          </Card>
        </GridItem>
        <GridItem $colSpan={16}>
          <Card $isSelectable={false}>
            <ProjectActivities
              projectId={projectId}
              projectCircuitCode={project.circuitCode}
              projectCommunityId={project.communityId}
              projectStartDate={project.initialDate}
              projectEndDate={project.finalDate}
              projectMunicipalityId={project.municipalityId}
              projectParishId={project.parishId}
            />
          </Card>
        </GridItem>
        <GridItem $colSpan={16}>
          <Card $isSelectable={false} $height="300px">
            <CardHeader>
              <Text style={{ fontSize: '14px', fontWeight: 'normal', textWrap: 'nowrap', textAlign: 'justify' }}>Ubicaciónes del proyecto</Text>
            </CardHeader>
            <GobMap />
          </Card>
        </GridItem>
      </Grid>
    </Flex>)

}