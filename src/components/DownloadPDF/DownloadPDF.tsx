import { pdf } from "@react-pdf/renderer";
import PDFModel from "../PDFModel/PDFModel";
import { Button } from "../Ui/Button/Button";
import { FaFilePdf } from "react-icons/fa6";
import type { Project, ProjectBudget, ProjectPayload } from "../../hooks/useProjects";
import { useState } from "react";
import { CgSpinner } from "react-icons/cg";

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

    const [isGenerating, setIsGenerating] = useState(false);
    const [error, setError] = useState<string | null>(null);

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
        if (!project || !project.id) {
            console.warn('Proyecto no válido para generar PDF');
            setError('Proyecto no válido');
            return;
        }

        setIsGenerating(true);
        setError(null);

        try {
            // Resolver URLs de imágenes con mejor manejo de errores
            const [startImageUrl, middleImageUrl, endImageUrl] = await Promise.allSettled([
                resolveImageUrl((project as any).projectImage?.startImageUrl),
                resolveImageUrl((project as any).projectImage?.middleImageUrl),
                resolveImageUrl((project as any).projectImage?.endImageUrl)
            ]);

            const pdfDocument = (
                <PDFModel
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
                        startImageUrl: startImageUrl.status === 'fulfilled' ? startImageUrl.value : "",
                        middleImageUrl: middleImageUrl.status === 'fulfilled' ? middleImageUrl.value : "",
                        endImageUrl: endImageUrl.status === 'fulfilled' ? endImageUrl.value : ""
                    }}
                />
            );

            // Generar el PDF solo cuando se hace clic
            const blob = await pdf(pdfDocument).toBlob();
            
            // Descargar el PDF
            const url = URL.createObjectURL(blob);
            const anchor = document.createElement("a");
            anchor.href = url;
            anchor.download = `ficha_${projectToken}.pdf`;
            document.body.appendChild(anchor);
            anchor.click();
            document.body.removeChild(anchor);
            
            // Limpiar la URL después de un breve delay
            setTimeout(() => {
                window.URL.revokeObjectURL(url);
            }, 100);

        } catch (error) {
            console.error('Error al generar PDF:', error);
            setError('Error al generar el PDF');
        } finally {
            setIsGenerating(false);
        }
    };

    const isDisabled = isGenerating || !!error;

    return (
        <div style={{ position: 'relative' }}>
            <Button 
                $backgroundColor={isGenerating ? "var(--gradient-quinary)" : "var(--gradient-quinary)"} 
                $disabled={isDisabled} 
                style={{ 
                    height: 'auto', 
                    padding: '8px 12px',
                    opacity: isGenerating ? 0.7 : 1,
                    cursor: isGenerating ? 'not-allowed' : 'pointer'
                }} 
                onClick={downloadPDF}
                title={isGenerating ? 'Generando PDF...' : (error || 'Descargar PDF')}
            >
                {isGenerating ? (
                    <CgSpinner 
                        fill="white" 
                        size={24} 
                        style={{ 
                            animation: 'spin 1s linear infinite'
                        }} 
                    />
                ) : (
                    <FaFilePdf fill="white" size={24} />
                )}
            </Button>
            {error && (
                <div style={{
                    position: 'absolute',
                    top: '100%',
                    left: '0',
                    background: '#ff4444',
                    color: 'white',
                    padding: '4px 8px',
                    borderRadius: '4px',
                    fontSize: '12px',
                    whiteSpace: 'nowrap',
                    zIndex: 1000
                }}>
                    {error}
                </div>
            )}
            <style>
                {`
                    @keyframes spin {
                        from { transform: rotate(0deg); }
                        to { transform: rotate(360deg); }
                    }
                `}
            </style>
        </div>
    );
}

export default DownloadPDF;

const resolveImageUrl = async (url: string): Promise<string> => {
    if (!url) return Promise.resolve("");
    
    try {
        const image = await convertWebPToBase64PNG(url);
        return Promise.resolve(image);
    } catch (error) {
        console.warn('Error al convertir imagen:', error);
        return Promise.resolve("");
    }
}

async function convertWebPToBase64PNG(webpBase64: string): Promise<string> {
    return new Promise<string>((resolve, reject) => {
        if (!webpBase64) {
            resolve("");
            return;
        }

        const img = document.createElement("img");
        img.crossOrigin = 'Anonymous';
        
        const timeout = setTimeout(() => {
            reject(new Error('Timeout al cargar imagen'));
        }, 10000); // 10 segundos de timeout

        img.onload = () => {
            clearTimeout(timeout);
            try {
                const canvas = document.createElement('canvas');
                canvas.width = img.width;
                canvas.height = img.height;
                const ctx = canvas.getContext('2d');
                if (!ctx) {
                    reject(new Error('No se pudo obtener contexto del canvas'));
                    return;
                }
                ctx.drawImage(img, 0, 0);
                const pngBase64 = canvas.toDataURL('image/png');
                resolve(pngBase64);
            } catch (error) {
                reject(error);
            }
        };
        
        img.onerror = (_) => {
            clearTimeout(timeout);
            reject(new Error('Error al cargar imagen'));
        };
        
        img.src = webpBase64;
    });
}