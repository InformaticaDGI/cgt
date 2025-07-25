import Header from "../../../components/Header/Header";
import CreateProgramForm from "../../../components/Forms/CreateProgramForm";
import { useCreateProgram } from "../../../hooks/mutations/useCreateProgram";
import Swal from "sweetalert2";
import { useNavigate } from "react-router";
import Card from "../../../components/Card/Card";
import { Flex } from "../../../components/Layout/Flex";

export default function CreateProgramView() {

    const { mutate: createProgram, isPending } = useCreateProgram()
    const navigate = useNavigate()
    return <Flex $direction="column" $gap="12px" $padding="1rem" $align="stretch" style={{ width: '80vw', position: 'relative' }}>
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
    </Flex>
}