import Header from "../../../components/Header/Header";
import CreateProgramForm from "../../../components/Forms/CreateProgramForm";
import styled from "styled-components";
import { useCreateProgram } from "../../../hooks/mutations/useCreateProgram";
import Swal from "sweetalert2";
import { useNavigate } from "react-router";
import Card from "../../../components/Card/Card";

export default function CreateProgramView() {

    const { mutate: createProgram, isPending } = useCreateProgram()
    const navigate = useNavigate()
    return <MainWrapper>
        <Header />
        <Card $isSelectable={false} $padding="32px">
            <CreateProgramForm onSubmit={(values) => {
                createProgram(values, {
                    onSuccess: () => {
                        Swal.fire({
                            title: 'Su programa ha sido creado.',
                            position: 'center',
                            icon: 'success',
                            timer: 3000,
                        })
                        navigate('/indicadores')
                    },
                    onError: () => {
                        Swal.fire({
                            title: 'Ocurrió un error al crear el programa.',
                            icon: 'error',
                            position: 'center',
                            timer: 3000
                        })
                    }
                })
            }}
                initialValues={{ name: '', secretaryId: '' }}
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