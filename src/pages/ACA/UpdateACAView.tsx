import Swal from "sweetalert2"
import Card from "../../components/Card/Card"
import { type ACAFormValues } from "../../components/Forms/ACAForm"
import CreateACAForm from "../../components/Forms/ACAForm"
import { useUpdateACA } from "../../hooks/mutations/useUpdateACA"
import { useNavigate, useParams } from "react-router"
import { useAca } from "../../hooks/queries/useAca"
import { Button } from "../../components/Ui/Button/Button"
import { Flex } from "../../components/Layout/Flex"
import { useDeleteACA } from "../../hooks/mutations/useDeleteACA"

export default function UpdateACAView() {
    const params = useParams()
    const acaId = params.acaId || '';
    const { mutate: updateACA, isPending, } = useUpdateACA()
    const { data: acaProject, isLoading, isError } = useAca(acaId)
    const { mutate: deleteACA, isPending: isDeleting } = useDeleteACA()
    const navigate = useNavigate()

    if (isLoading) {
        return <div>Cargando...</div>
    }

    if (isError) {
        return <div>Error al cargar el ACA</div>
    }

    const handleSubmit = (values: ACAFormValues) => {
        updateACA({ ...values, id: acaId }, {
            onSuccess: () => {
                Swal.fire({
                    title: 'ACA actualizado',
                    text: 'El ACA se ha actualizado correctamente',
                    icon: 'success'
                })

            }
        })
    }

    const handleDelete = () => {
        Swal.fire({
            title: '¿Estás seguro?',
            text: 'Esta acción no se puede deshacer',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Eliminar',
            cancelButtonText: 'Cancelar'
        })
            .then((result) => {
                if (result.isConfirmed) {
                    deleteACA(acaId, {
                        onSuccess: () => {
                            Swal.fire({
                                title: 'ACA eliminado',
                                text: 'El ACA se ha eliminado correctamente',
                                icon: 'success'
                            })
                            navigate('/aca')
                        },
                        onError: () => {
                            Swal.fire({
                                title: 'Error',
                                text: 'Error al eliminar el ACA',
                                icon: 'error'
                            })
                        }
                    })
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
                isLoading={isPending || isDeleting}
                onSubmit={handleSubmit} initialValues={{
                    name: acaProject.name,
                    transformationId: acaProject.area.transformationId,
                    areaId: acaProject.areaId,
                    municipalityId: acaProject.municipalityId,
                    contacts: acaProject.contacts,
                    communityCircuit: { id: acaProject.communityCircuit.id, code: acaProject.communityCircuit.code },
                    sectorId: acaProject.sectorId,
                    potential: acaProject.potential,
                    criticalAspects: acaProject.criticalAspects,
                    estimatedBudget: acaProject.estimatedBudget,
                    estimatedDuration: acaProject.estimatedDuration
                }} />
            <Flex $direction="row" $justify="end" $gap="10px">
                <Button $backgroundColor="var(--gradient-quinary)" $size="small" $variant="tertiary" $disabled={isDeleting} onClick={handleDelete}>Eliminar ACA</Button>
            </Flex>
        </Card>
    </div>
}