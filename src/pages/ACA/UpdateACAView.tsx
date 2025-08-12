import Swal from "sweetalert2"
import Card from "../../components/Card/Card"
import { type ACAFormValues } from "../../components/Forms/ACAForm"
// import { useCreateACA } from "../../hooks/mutations/useCreateACA"
// import { useNavigate } from "react-router-dom"
import CreateACAForm from "../../components/Forms/ACAForm"
import type { FormikHelpers } from "formik"
import { useUpdateACA } from "../../hooks/mutations/useUpdateACA"
import { useParams } from "react-router"
import { useAca } from "../../hooks/queries/useAca"

export default function UpdateACAView() {
    const { acaId } = useParams()
    const { mutate: updateACA, isPending, } = useUpdateACA()
    const { data: acaProject } = useAca(acaId)
    

    if (!acaProject) {
        return <div>ACA no encontrado</div>
    }

    const handleSubmit = (values: ACAFormValues, helpers: FormikHelpers<ACAFormValues>) => {
        updateACA(values, {
            onSuccess: () => {
                Swal.fire({
                    title: 'ACA actualizado',
                    text: 'El ACA se ha actualizado correctamente',
                    icon: 'success'
                })

                helpers.resetForm()
            }
        })
    }

    return <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100%',
        width: '100%',
        padding: '20px',
        paddingTop: '5%'
    }}>
        <Card>
            <CreateACAForm
                isUpdate
                isLoading={isPending}
                onSubmit={handleSubmit} initialValues={{
                    name: acaProject.name,
                    transformationId: acaProject.transformationId,
                    areaId: acaProject.areaId,
                    municipalityId: typeof acaProject.municipalityId === 'string' ? [acaProject.municipalityId] : acaProject.municipalityId,
                    contacts: acaProject.contacts,
                    communityCircuit: { id: acaProject.communityCircuitId, code: '' },
                    sectorId: acaProject.sectorId,
                    potential: acaProject.potential,
                    criticalAspects: acaProject.criticalAspects,
                    estimatedBudget: acaProject.estimatedBudget,
                    estimatedDuration: acaProject.estimatedDuration
                }} />
        </Card>
    </div>
}