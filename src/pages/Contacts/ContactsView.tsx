import Card from "../../components/Card/Card";
import CardHeader from "../../components/Card/CardHeader";
import Text from "../../components/Ui/Text/Text";
import CardBody from "../../components/Card/CardBody";
import { Table, type HeaderConfig } from "../../components/Ui/Table/Table";
import { useContacts } from "../../hooks/queries/useContacts";
import { Flex } from "../../components/Layout/Flex";
import { Button } from "../../components/Ui/Button/Button";

export default function ContactsView() {

    const { data: contacts } = useContacts()

    const columns: HeaderConfig[] = [
        {
            key: 'name',
            label: 'Nombre',
            render: (row) => <Flex $align="start" $gap={'1px'}>
                <Text $fontSize="14px">{row.name}</Text>
                <Text $fontSize="10px" color="gray.500">{row.position}</Text>
            </Flex>
        },
        {
            key: 'email',
            label: 'Email',
            render: (row) => <Text $fontSize="14px">{row.email}</Text>
        },
        {
            key: 'phone',
            label: 'Teléfono',
            render: (row) => (
                <a href={`tel:${row.phone}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                    <Text $fontSize="14px">{row.phone}</Text>
                </a>
            )
        },
    ]

    return <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%', width: '100%', padding: '20px', paddingTop: '5%' }}>
        <Card $width="80%">
            <CardHeader>
                <Flex $direction="row" $gap="10px" $justify="space-between">
                    <Flex $direction="column" $gap="10px" $align="start">
                        <Text>Contactos</Text>
                        <Text $fontSize="12px" color="gray.500">
                            Crea contactos para asociarlos a los proyectos.
                        </Text>
                    </Flex>
                    <Flex $direction="row" $gap="10px" $justify="end">
                        <Button $variant="primary" as="a" href="contactos/crear">
                            Nuevo contacto
                        </Button>
                    </Flex>
                </Flex>
            </CardHeader>
            <CardBody>
                <Table size="small" columns={columns} data={contacts || []} />
            </CardBody>
        </Card>
    </div>
}