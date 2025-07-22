import Swal from "sweetalert2"
import Card from "../../../components/Card/Card"
import CreateProjectForm from "../../../components/Forms/CreateProjectForm"
import { useCreateProject } from "../../../hooks/mutations/useCreateProject"

const BasicInformation = () => {

    const { mutate: createProject, isPending } = useCreateProject()

    return (

        <Card $isSelectable={false} $padding="32px">
                    <CreateProjectForm onSubmit={(values) => {
                        createProject(values, {
                            onSuccess: () => {
                                Swal.fire({
                                    title: 'Su proyecto ha sido creado.',
                                    icon: 'success',
                                    position: 'center',
                                    timer: 1500
                                })
                            },
                            onError: () => {
                                Swal.fire({
                                    title: 'Ocurrió un error al crear el proyecto.',
                                    icon: 'error',
                                    position: 'center',
                                    timer: 1500
                                })
                            }
                        })
                    }}
                        initialValues={{
                            name: '',
                            secretaryId: '',
                            programId: '',
                            initialDate: '',
                            finalDate: '',
                            observations: '',
                            municipalityId: '',
                            parrishId: '',
                            kpiInstances: [],
                        }}
                        isLoading={isPending}
                    />
                </Card>
    )
}

export default BasicInformation;