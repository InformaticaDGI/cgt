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
import { Button } from "../../components/Ui/Button/Button";
import PDFModel from "../../components/PDFModel/PDFModel";
import { BlobProvider } from "@react-pdf/renderer";

export default function ProjectDetailView() {
  const { projectId } = useParams();
  const { data: project, isLoading, error } = useProject(projectId);

  // No state needed here anymore as it's all in the ProjectActivities component

  if (isLoading) return <div>Cargando...</div>;
  if (error || !project) return <div>Error al cargar el proyecto</div>;

  const projectToken = (projectId?.slice(0, 6) || "").toUpperCase()

  const downloadPDF = async (blob: Blob | null) => {
    if (!blob) return;
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = `ficha_${projectToken}.pdf`;
    anchor.click();
    window.URL.revokeObjectURL(url);
  }

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
        <Text $fontSize="20px" $fontWeight="500" className="project-header-title">{project.name}</Text>
        <div style={{ display: "flex", flexDirection: "row", gap: 40 }} className="project-header-dates">
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
      </div>
      <div style={{
        background: "#fff",
        borderRadius: 12,
        boxShadow: "var(--shadow-sm)",
        padding: 16,
        width: "100%",
        display: "flex",
        flexDirection: "row",
      }} className="project-tabs">
        <Flex $direction="row" $gap="40px" $justify="start">
          <Text $fontSize="12px" $fontWeight="500">Actividades</Text>
          <Text $fontSize="12px" $fontWeight="500">Punto y Circulo</Text>
          <BlobProvider document={<PDFModel
            projectName={project.name}
            projectDescription={project.observations}
            status={project.status}
            parish={project.parish.name}
            municipality={project.parish.municipality.name}
            startDate={project.initialDate}
            endDate={project.finalDate}
            territorialSecretary={"Eje 1"}
            community="23 DE ENERO"
            circuit="CIRCUITO 14 DE MARZO"
            kpiInstances={[]}
            beneficitPopulation={project.benefitedPopulation}
            beneficitChildren={project.benefitedChildren}
            budgetSource="Recursos Ordinarios"
            budgetInVES="0,00"
            budgetInUSD="0,00"
            coordinate={`Latitud: ${project.latitude}, Longitud: ${project.longitude}`}
            directLabor={project.directLabor}
            indirectLabor={project.indirectLabor}
            maleLabor={project.maleLabor}
            femaleLabor={project.femaleLabor}
            qualifiedLabor={project.qualifiedLabor}
            unqualifiedLabor={project.unqualifiedLabor}
            projectToken={projectToken} />}

          >
            {({ blob }) => <Button $variant="primary" $size="small" onClick={() => downloadPDF(blob)}>Descargar PDF</Button>}
          </BlobProvider>
        </Flex>
      </div>
      <Grid $columns="repeat(30, 1fr)" className="project-indicators-grid">
        <GridItem $colSpan={10} style={{ height: '250px' }} className="indicator-card">
          <Card $isSelectable={false}>
            <CardHeader>
              <Text style={{ fontSize: '14px', fontWeight: 'normal', textWrap: 'nowrap', textAlign: 'justify' }}>Indicador de Meta</Text>
            </CardHeader>
            <CardBody style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              <IndicatorProgress value={0} strokeWidth={8} size={160} textSize={14} />
            </CardBody>
          </Card>
        </GridItem>
        <GridItem $colSpan={10} style={{ height: '250px' }} className="indicator-card">
          <Card $isSelectable={false}>
            <CardHeader>
              <Text style={{ fontSize: '14px', fontWeight: 'normal', textWrap: 'nowrap', textAlign: 'justify' }}>Indicador de Eficiencia</Text>
            </CardHeader>
            <CardBody style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              <IndicatorProgress value={0} strokeWidth={8} size={160} textSize={14} />
            </CardBody>
          </Card>
        </GridItem>
        <GridItem $colSpan={10} style={{ height: '250px' }} className="indicator-card">
          <Card $isSelectable={false}>
            <CardHeader>
              <Text style={{ fontSize: '14px', fontWeight: 'normal', textWrap: 'nowrap', textAlign: 'justify' }}>Indicador de Eficacia</Text>
            </CardHeader>
            <CardBody style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              <IndicatorProgress value={0} strokeWidth={8} size={160} textSize={14} />
            </CardBody>
          </Card>
        </GridItem>
        <GridItem $colSpan={12} className="activities-container">
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
        <GridItem $colSpan={18} style={{ height: '300px', display: 'flex', flexDirection: 'column', gap: '16px' }} className="diagram-map-container">
          <Card $isSelectable={false}>
            <Text style={{ fontSize: '14px', fontWeight: 'normal', textWrap: 'nowrap', textAlign: 'justify' }}>Diagrama de Gantt</Text>
          </Card>
          <Card $isSelectable={false}>
            <Text style={{ fontSize: '14px', fontWeight: 'normal', textWrap: 'nowrap', textAlign: 'justify' }}>Mapa con las ubicaciónes de las actividades/proyecto</Text>
          </Card>
        </GridItem>
      </Grid>
    </Flex>)

}