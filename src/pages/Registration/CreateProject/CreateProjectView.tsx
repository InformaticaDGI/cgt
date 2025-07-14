import { useCreateProject } from "../../../hooks/mutations/useCreateProject";
import Header from "../../../components/Header/Header";
import styled from "styled-components";
import CreateProjectForm from "../../../components/Forms/CreateProjectForm";
import Swal from "sweetalert2";
import { useNavigate } from "react-router";
import Card from "../../../components/Card/Card";

export default function CreateProjectView() {

    const { mutate: createProject, isPending } = useCreateProject()
    const navigate = useNavigate()
    return <MainWrapper>
        <Header />
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
                        navigate('/indicadores')
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
    </MainWrapper>
}

const MainWrapper = styled.div`
    display: flex;
    flex-direction: column;
    gap: 12px;
    width: 100%;
    height: 100%;
    padding: 16px;
`;