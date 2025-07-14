import Header from "../../../components/Header/Header";
import Navigation from "../../../components/Navigation/Navigation";
import styled from "styled-components";
import CreateProjectForm from "../../../components/Forms/CreateProjectForm";
import { useCreateProject } from "../../../hooks/mutations/useCreateProject";

export default function CreateProjectView() {

    const { mutate: createProject, isPending } = useCreateProject()

    return <Navigation>
        <MainWrapper>
            <Header />
            <CreateProjectForm onSubmit={(values) => {
                console.log(values)
                createProject(values)
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
        </MainWrapper>
    </Navigation>
}

const MainWrapper = styled.div`
    display: flex;
    flex-direction: column;
    gap: 12px;
    width: 100%;
    height: 100%;
    padding: 16px;
`;