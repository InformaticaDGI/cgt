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
import DownloadPDF from "../../components/DownloadPDF/DownloadPDF";
import GanttChart from "../../components/GanttChart/GanttChart";
import { GobMap } from "../../components/Map/map.components";
import ImageProject from "../../components/Project/ImageProject";


export default function ProjectDetailView() {
  const { projectId } = useParams();
  const { data: project, isLoading, error } = useProject(projectId);

  if (isLoading) return <div>Cargando...</div>;
  if (error || !project) return <div>Error al cargar el proyecto</div>;

  return (
    <Flex $direction="column" $gap="16px" $padding="32px 24px" className="project-detail-container">
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
      }} className="project-header">
        <Text $fontSize="12px" $fontWeight="600" className="project-header-title">{project.name}</Text>
        <div style={{ display: "flex", flexDirection: "row", gap: 40, flex: 1 }} className="project-header-dates">
          <div style={{ display: "flex", alignItems: "center" }} className="project-header-date">
            <FaCalendarAlt size={18} style={{ color: "#16a085", marginRight: 12 }} />
            <div>
              <Text $fontSize="12px" $fontWeight="500">Fecha de inicio</Text>
              <Text $fontSize="12px" $fontWeight="600">
                {project.initialDate ? new Date(project.initialDate).toISOString().split('T')[0] : ''}
              </Text>
            </div>
          </div>
          <div style={{ display: "flex", alignItems: "center" }} className="project-header-date">
            <FaClock size={18} style={{ color: "#16a085", marginRight: 12 }} />
            <div>
              <Text $fontSize="12px" $fontWeight="500">Fecha de finalización</Text>
              <Text $fontSize="12px" $fontWeight="600">
                {project.finalDate ? new Date(project.finalDate).toISOString().split('T')[0] : ''}
              </Text>

            </div>
          </div>

        </div>
        <Flex $direction="row" $justify="end" $align="center" style={{ flex: 1 }}>
          <DownloadPDF project={project} />
        </Flex>
      </div>
      <Grid $columns="repeat(30, 1fr)" $justify="space-between" className="project-indicators-grid">
        <GridItem $colSpan={10} $colSpanSm={30} $colSpanXs={30} style={{ height: '250px' }} className="indicator-card">
          <Card $isSelectable={false}>
            <CardHeader>
              <Text $fontSize="14px" $color="var(--primary)">Metas</Text>
            </CardHeader>
            <CardBody style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              <IndicatorProgress overrideProgressColor="var(--primary)" value={30} strokeWidth={14} size={160} textSize={18} />
            </CardBody>
          </Card>
        </GridItem>
        <GridItem $colSpan={10} $colSpanSm={30} $colSpanXs={30} style={{ height: '250px' }} className="indicator-card">
          <Card $isSelectable={false}>
            <CardHeader>
              <Text $fontSize="14px" $color="var(--primary)">Eficiencia</Text>
            </CardHeader>
            <CardBody style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              <IndicatorProgress overrideProgressColor="var(--primary)" value={100} strokeWidth={14} size={160} textSize={18} />
            </CardBody>
          </Card>
        </GridItem>
        <GridItem $colSpan={10} $colSpanSm={30} $colSpanXs={30} style={{ height: '250px' }} className="indicator-card">
          <Card $isSelectable={false}>
            <CardHeader>
              <Text $fontSize="14px" $fontWeight="500" $color="var(--primary)">Eficacia</Text>
            </CardHeader>
            <CardBody style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              <IndicatorProgress overrideProgressColor="var(--primary)" value={74} strokeWidth={14} size={160} textSize={18} />
            </CardBody>
          </Card>
        </GridItem>
        <GridItem $colSpan={30} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <Card $isSelectable={false}>
            <Text style={{ fontSize: '14px', fontWeight: 'normal', textWrap: 'nowrap', textAlign: 'justify' }}>Diagrama de Gantt</Text>
            <GanttChart activities={project.scheduledActivities} />
          </Card>
        </GridItem>
        <GridItem $colSpan={15} $colSpanSm={30} $colSpanXs={30}>
          <Card $isSelectable={false}>
            <ProjectActivities
              projectId={projectId}
              projectCircuitCode={project.communityCircuitCode}
              projectCommunityId={project.sectorId}
              projectStartDate={project.initialDate}
              projectEndDate={project.finalDate}
              projectMunicipalityId={project.parish.municipality.id}
              projectParishId={project.parish.id}
            />
          </Card>
        </GridItem>
        <GridItem $colSpan={15} $colSpanSm={30} $colSpanXs={30} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <Card $isSelectable={false} $height="300px">
            <CardHeader>
              <Text style={{ fontSize: '14px', fontWeight: 'normal', textWrap: 'nowrap', textAlign: 'justify' }}>Ubicación del proyecto</Text>
            </CardHeader>
            <GobMap />
          </Card>
          <Card $isSelectable={false} $height="300px">
            <ImageProject projectId={project.id} projectImages={project.projectImage} />
          </Card>
        </GridItem>
      </Grid>
    </Flex>)

}


