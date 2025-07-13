import { Flex } from "../Layout/Flex"
import { useBaseKpis, type BaseKpi } from "../../hooks/mutations/useBaseKpis"
import { Table } from "../Ui/Table/Table"
import { Button } from "../Ui/Button/Button"
import { Modal, useModal } from "../Ui/Modal/Modal"
import { CreateKpiBaseForm, type CreateKpiBaseFormValues } from "../Forms/CreateKpiBaseForm"
import { useEffect, useState } from "react"
import { useCreateBaseKpi } from "../../hooks/mutations/useCreateBaseKpi"
import { Input } from "../Ui/Input/Input"

type KpiBaseSelectorProps = {
    value: string[]
    onChange: (value: string[]) => void
}

export const KpiBaseSelector = ({ value, onChange }: KpiBaseSelectorProps) => {

    const { baseKpis, isLoading, isError, isSuccess } = useBaseKpis()

    const { isOpen: isCreateKpiBaseOpen, setIsOpen: setIsCreateKpiBaseOpen } = useModal()

    const { createBaseKpi, isPending: isCreatingKpiBase } = useCreateBaseKpi()

    const [availableKpiBases, setAvailableKpiBases] = useState<BaseKpi[]>([])
    const [selectedKpiBases, setSelectedKpiBases] = useState<BaseKpi[]>(value.map((id) => baseKpis.find((kpi: BaseKpi) => kpi.id === id)).filter((kpi: BaseKpi | undefined) => kpi !== undefined))

    const handleCreateBaseKpi = (values: CreateKpiBaseFormValues) => {
        createBaseKpi({
            name: values.name,
            measurementId: values.measurementUnitId,
            areaId: values.areaId,
        }, {
            onSuccess: (data) => {
                setAvailableKpiBases([...availableKpiBases, data])
                setIsCreateKpiBaseOpen(false)
            }
        })
    }

    const handleRemoveKpiBase = (kpiBase: BaseKpi) => {
        setSelectedKpiBases(selectedKpiBases.filter(kpi => kpi.id !== kpiBase.id))
    }

    const handleAddKpiBase = (kpiBase: BaseKpi) => {
        setSelectedKpiBases([...selectedKpiBases, kpiBase])
    }

    useEffect(() => {
        if (isSuccess && baseKpis.length > 0) {
            setAvailableKpiBases(baseKpis.filter((kpi: BaseKpi) => !selectedKpiBases.map((kpi: BaseKpi) => kpi.id).includes(kpi.id)))
        }
    }, [baseKpis, selectedKpiBases, isSuccess])

    useEffect(() => {
        onChange(selectedKpiBases.map((kpi: BaseKpi) => kpi.id))
    }, [selectedKpiBases])

    if (isLoading) return <div>Cargando...</div>
    if (isError) return <div>Error</div>
    if (isSuccess && baseKpis.length === 0) return <Flex style={{ width: '100%', height: '100%', alignItems: 'center', justifyContent: 'center' }}>
        <h4>No se encontraron metas base</h4>
        <h6 style={{ color: 'var(--primary)', cursor: 'pointer', textDecoration: 'underline' }} onClick={() => setIsCreateKpiBaseOpen(true)}>Haz click para crear una nueva meta</h6>
        <Modal isOpen={isCreateKpiBaseOpen} onClose={() => setIsCreateKpiBaseOpen(false)} title="Crear meta base">
            <CreateKpiBaseForm onSubmit={handleCreateBaseKpi} initialValues={{ name: '', measurementUnitId: '', areaId: '' }} />
        </Modal>
    </Flex>

    return (
        <Flex style={{ width: '100%', gap: '12px', flexDirection: 'row', flexWrap: 'wrap', alignItems: 'flex-start', justifyContent: 'flex-start', alignContent: 'flex-start' }}>
            <div style={{ width: '49%', }}>
                <Flex style={{ flexDirection: 'column', flexWrap: 'nowrap', paddingBottom: '12px', height: '80px', alignItems: 'flex-start', justifyContent: 'flex-end' }}>
                    <h4>Metas disponibles</h4>
                    <h6 style={{ color: 'var(--primary)', cursor: 'pointer', textDecoration: 'underline' }} onClick={() => setIsCreateKpiBaseOpen(true)}>Haz click para crear una nueva meta si no encuentras el que buscas</h6>
                    <Modal isOpen={isCreateKpiBaseOpen} onClose={() => setIsCreateKpiBaseOpen(false)} title="Crear meta base">
                        <CreateKpiBaseForm onSubmit={handleCreateBaseKpi} initialValues={{ name: '', measurementUnitId: '', areaId: '' }} />
                    </Modal>
                </Flex>
                <Table
                    size="small"
                    headers={[
                        { key: 'name', label: 'Nombre', render: (row: BaseKpi) => `${row.name} (${row.measurement?.symbol || row.measurement?.name})` },
                        { key: 'id', label: 'Agregar', align: 'center', render: (row: BaseKpi) => <Button variant="primary" size="small" onClick={() => handleAddKpiBase(row)}>Agregar</Button> }
                    ]}
                    data={availableKpiBases}
                    rowKey={(row: BaseKpi) => row.id}
                />
            </div>
            <div style={{ width: '49%', }}>
                <Flex style={{ flexDirection: 'column', flexWrap: 'nowrap', paddingBottom: '12px', height: '80px', alignItems: 'flex-start', justifyContent: 'flex-end' }}>
                    <h4>Metas seleccionadas</h4>
                    <h6 style={{ color: 'var(--text-secondary)' }}>Las metas listadas a continuación serán usadas como base para las actividades del proyecto</h6>
                </Flex>
                <Table
                    size="small"
                    headers={[
                        { key: 'name', label: 'Nombre', render: (row: BaseKpi) => `${row.name} (${row.measurement?.symbol || row.measurement?.name})` },
                        { key: 'expectedValue', label: 'Meta planificada', render: (row: BaseKpi) => <Input placeholder={`En ${row.measurement?.name}`} size="small" type="number" onChange={(e) => console.log(row, e.target.value)} /> },
                        { key: 'id', align: 'center', label: 'Quitar', render: (row: BaseKpi) => <Button variant="primary" size="small" onClick={() => handleRemoveKpiBase(row)}>Quitar</Button> }
                    ]}
                    data={selectedKpiBases}
                    rowKey={(row: BaseKpi) => row.id}
                />
            </div>
        </Flex>
    )
}
