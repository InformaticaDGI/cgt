import { usePDF } from "@react-pdf/renderer";
import PDFModel from "../PDFModel/PDFModel";
import { Button } from "../Ui/Button/Button";
import { FaFilePdf } from "react-icons/fa6";
import type { Project, ProjectBudget, ProjectPayload } from "../../hooks/useProjects";
import { useEffect } from "react";

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

const DownloadPDF = ({ project }: { project: ProjectPayload<Project, 'projectBudget' | 'activities' | 'kpiInstances' | 'sector' | 'parish'> }) => {

    const [instance, update] = usePDF();

    const projectToken = (project.id.slice(0, 6) || "").toUpperCase()

    const projectBudget = project.projectBudget[0] || defaultProjectBudget

    const activities = project.activities
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

    const downloadPDF = async () => {
        if (!instance.blob) return;
        const url = URL.createObjectURL(instance.blob);
        const anchor = document.createElement("a");
        anchor.href = url;
        anchor.download = `ficha_${projectToken}.pdf`;
        anchor.click();
        window.URL.revokeObjectURL(url);
    }


    const updatePDF = async () => {
        debugger;
        const startImageUrl = await resolveImageUrl((project as any).projectImage?.startImageUrl).catch(() => "")
        const middleImageUrl = await resolveImageUrl((project as any).projectImage?.middleImageUrl).catch(() => "")
        const endImageUrl = await resolveImageUrl((project as any).projectImage?.endImageUrl).catch(() => "")

        update(<PDFModel
                projectName={projectName}
                projectDescription={projectDescription}
                status={status}
                projectToken={projectToken}
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
                activities={activities}
                municipality={municipality}
                parish={parish}
                projectImage={{
                    startImageUrl,
                    middleImageUrl,
                    endImageUrl
                }}
        />)
    }


    useEffect(() => {
        updatePDF()
    }, [project])

    return <Button $backgroundColor="var(--gradient-quinary)" $disabled={instance.loading} style={{ height: 'auto', padding: '8px 12px' }} onClick={downloadPDF}>
        <FaFilePdf fill="white" size={24} />
    </Button>

}

export default DownloadPDF;

const resolveImageUrl = async (url: string) => {
    const image = await convertWebPToBase64PNG(url)
    return image        
}

async function convertWebPToBase64PNG(webpBase64: string) {
    return new Promise<string>((resolve, reject) => {
        const img = document.createElement("img");
        img.crossOrigin = 'Anonymous';
        img.onload = () => {
            const canvas = document.createElement('canvas');
            canvas.width = img.width;
            canvas.height = img.height;
            const ctx = canvas.getContext('2d');
            ctx?.drawImage(img, 0, 0);
            const pngBase64 = canvas.toDataURL('image/png');
            resolve(pngBase64);
        };
        img.onerror = (e) => reject(e);
        img.src = webpBase64;
    });
}