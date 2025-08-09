import { BlobProvider } from "@react-pdf/renderer";
import PDFModel from "../PDFModel/PDFModel";
import { Button } from "../Ui/Button/Button";
import { FaFilePdf } from "react-icons/fa6";
import type { Project, ProjectBudget, ProjectPayload } from "../../hooks/useProjects";

const defaultProjectBudget: ProjectBudget = {
    id: '',
    projectId: '',
    budgetSourceId: '',
    value: '',
    currency: '',
    createdAt: '',
    budgetSource: {
        id: '',
        name: 'SIN FONDOS'
    }
}

const DownloadPDF = ({ project }: { project: ProjectPayload<Project, 'projectBudget' | 'scheduledActivities' | 'kpiInstances' | 'sector' | 'parish'> }) => {

    const projectToken = (project.id.slice(0, 6) || "").toUpperCase()

    const projectBudget = project.projectBudget[0] || defaultProjectBudget

    const scheduledActivities = project.scheduledActivities
    const projectName = project.name
    const projectDescription = project.observations
    const status = project.status
    const parish = project.parish.name
    const municipality = project.parish.municipality.name
    const startDate = project.initialDate
    const endDate = project.finalDate
    const territorialSecretary = project.parish.municipality.territorialSecretary.name
    const community = project.sector.name
    const circuit = project.sector.communityCircuit.name
    const kpiInstances = project.kpiInstances
    const beneficitPopulation = project.benefitedPopulation
    const beneficitChildren = project.benefitedChildren
    const budgetSource = projectBudget.budgetSource.name
    const budgetInVES = project.initialBudget.toString()
    const budgetInUSD = project.initialBudgetUsd.toString()
    const coordinate = `Latitud: ${project.latitude}, Longitud: ${project.longitude}`
    const directLabor = project.directLabor
    const indirectLabor = project.indirectLabor
    const maleLabor = project.maleLabor
    const femaleLabor = project.femaleLabor
    const qualifiedLabor = project.qualifiedLabor
    const unqualifiedLabor = project.unqualifiedLabor

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
        <BlobProvider document={<PDFModel
            projectName={projectName}
            projectDescription={projectDescription}
            status={status}
            parish={parish}
            municipality={municipality}
            startDate={startDate}
            endDate={endDate}
            territorialSecretary={territorialSecretary}
            community={community}
            circuit={circuit}
            kpiInstances={kpiInstances}
            beneficitPopulation={beneficitPopulation.toString()}
            beneficitChildren={beneficitChildren.toString()}
            budgetSource={budgetSource}
            budgetInVES={budgetInVES}
            budgetInUSD={budgetInUSD}
            coordinate={coordinate}
            directLabor={directLabor.toString()}
            indirectLabor={indirectLabor.toString()}
            maleLabor={maleLabor.toString()}
            femaleLabor={femaleLabor.toString()}
            qualifiedLabor={qualifiedLabor.toString()}
            unqualifiedLabor={unqualifiedLabor.toString()}
            projectToken={projectToken}
            scheduledActivities={scheduledActivities}
        />}
        >
            {({ blob }) => <Button $backgroundColor="var(--gradient-quinary)" style={{ height: 'auto', padding: '8px 12px' }} onClick={() => downloadPDF(blob)}>
                <FaFilePdf fill="white" size={24} />
            </Button>}
        </BlobProvider>
    )
}

export default DownloadPDF;