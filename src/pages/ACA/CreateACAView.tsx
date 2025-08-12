import Swal from "sweetalert2"
import Card from "../../components/Card/Card"
import { type CreateACAFormValues } from "../../components/Forms/CreateACAForm"
// import { useCreateACA } from "../../hooks/mutations/useCreateACA"
// import { useNavigate } from "react-router-dom"
import CreateACAForm from "../../components/Forms/CreateACAForm"
import { useCreateACA } from "../../hooks/mutations/useCreateACA"
import type { FormikHelpers } from "formik"

export default function CreateACAView() {

    // const navigate = useNavigate()
    const { mutate: createACA, isPending, } = useCreateACA()

    const handleSubmit = (values: CreateACAFormValues, helpers: FormikHelpers<CreateACAFormValues>) => {
        createACA(values, {
            onSuccess: () => {
                Swal.fire({
                    title: 'ACA creado',
                    text: 'El ACA se ha creado correctamente',
                    icon: 'success'
                })

                helpers.resetForm()
                // navigate('/mapa')
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
                isLoading={isPending}
                onSubmit={handleSubmit} initialValues={{
                    name: '',
                    transformationId: '', 
                    areaId: '',
                    municipalityId: [],
                    contacts: [],
                    communityCircuit: { id: '', code: '' },
                    sectorId: '',
                    potential: '',
                    criticalAspects: '',
                    estimatedBudget: '',
                    estimatedDuration: ''
                }} />
        </Card>
    </div>
}