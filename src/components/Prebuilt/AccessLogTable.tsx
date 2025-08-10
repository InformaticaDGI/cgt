import useAccessLogs from "../../hooks/useAccessLogs";
import { Table, type HeaderConfig } from "../Ui/Table/Table";
import Text from "../Ui/Text/Text";

const AccessLogTable = () => {

    const { data: accessLogs } = useAccessLogs()

    const filteredAccessLogs = accessLogs?.filter((log: any) => log.appId === 'db701dae-f19d-484d-909c-ea0d0a5e02dc')

    const columnsAccess: HeaderConfig[] = [
        {
            key: 'user',
            label: 'Usuario',
            align: 'left',
            render: (row: any) => <Text style={{ fontSize: '12px', fontWeight: '500', maxWidth: '300px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{row.payload.name?.toUpperCase()}</Text>
        },
        {
            key: 'institution',
            label: 'Institución',
            align: 'left',
            render: (row: any) => row.institutionId,
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
            render: (row: any) => new Date(row.createdAt).toLocaleString('es-VE', {
                year: 'numeric',
                month: 'short',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit',
            }),
        }
    ]

    return <Table columns={columnsAccess} data={filteredAccessLogs ?? []} />
}

export default AccessLogTable;