import { Table, type HeaderConfig } from "../Ui/Table/Table";

const ChangeLogTable = () => {

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

    return <Table columns={columnsChanges} data={[{ action: 'Creación', user: 'Juan Perez', institution: 'Institución 1', ip: '192.168.1.1', date: '2021-01-01' }]} />

}

export default ChangeLogTable;