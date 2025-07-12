import Header from "../../../components/Header/Header";
import CreateProgramForm from "../../../components/Forms/CreateProgramForm";
import Navigation from "../../../components/Navigation/Navigation";
import styled from "styled-components";
import { useCreateProgram } from "../../../hooks/mutations/useCreateProgram";

export default function CreateProgramView() {

    const { mutate: createProgram, isPending } = useCreateProgram()

    return <Navigation>
        <MainWrapper>
            <Header />
            <CreateProgramForm onSubmit={(values) => {
                createProgram(values)
            }}
                initialValues={{ name: '', secretaryId: '' }}
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