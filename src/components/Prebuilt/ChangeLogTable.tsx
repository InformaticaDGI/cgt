import { Flex } from "../Layout/Flex";
import { Table, type HeaderConfig } from "../Ui/Table/Table";
import Text from "../Ui/Text/Text";

const ChangeLogTable = () => {

    const data = []

    const columnsChanges: HeaderConfig[] = [
        {
            key: 'action',
            label: 'Acción',
            align: 'left',
            render: (row: any) => row.action,
        },
        {
            key: 'user',
            label: 'Usuario',
            align: 'left',
            render: (row: any) => row.user,
        },
        {
            key: 'institution',
            label: 'Institución',
            align: 'left',
            render: (row: any) => row.institution,
        },
        {
            key: 'ip',
            label: 'Dirección IP',
            align: 'left',
            render: (row: any) => row.ip,
        },
        {
            key: 'date',
            label: 'Fecha de Acceso',
            align: 'left',
            render: (row: any) => row.date,
        }
    ]

    if (data.length === 0) {

        return <Flex $align="center" $justify="center" $height="100%">
            <Text style={{ fontSize: '12px', fontWeight: '600', color: '#5A787A' }}>No hay datos para mostrar</Text>
        </Flex>
    }

    return <Table columns={columnsChanges} data={[]} />

}

export default ChangeLogTable;