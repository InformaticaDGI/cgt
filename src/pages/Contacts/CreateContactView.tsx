import Swal from "sweetalert2"
import Card from "../../components/Card/Card"
import CreateContactForm, { type CreateContactFormValues } from "../../components/Forms/CreateContactForm"
import { useCreateContact } from "../../hooks/mutations/useCreateContact"
import { useNavigate } from "react-router-dom"

export default function CreateContactView() {

    const navigate = useNavigate()
    const { mutate: createContact, isPending, } = useCreateContact()

    const handleSubmit = (values: CreateContactFormValues) => {
        createContact(values, {
            onSuccess: () => {
                Swal.fire({
                    title: 'Contacto creado',
                    text: 'El contacto se ha creado correctamente',
                    icon: 'success'
                })
                navigate('/contactos')
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
            <CreateContactForm
                isLoading={isPending}
                onSubmit={handleSubmit} initialValues={{
                    name: '',
                    email: '',
                    phone: '',
                    position: ''
                }} />
        </Card>
    </div>
}