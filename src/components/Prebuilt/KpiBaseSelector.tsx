import { Flex } from "../Layout/Flex";
import { useBaseKpis, type BaseKpi } from "../../hooks/mutations/useBaseKpis";
import { Table } from "../Ui/Table/Table";
import { Button } from "../Ui/Button/Button";
import { Modal, useModal } from "../Ui/Modal/Modal";
import { CreateKpiBaseForm, type CreateKpiBaseFormValues } from "../Forms/CreateKpiBaseForm";
import { useEffect, useState } from "react";
import { useCreateBaseKpi } from "../../hooks/mutations/useCreateBaseKpi";
import { Input } from "../Ui/Input/Input";
import type { KpiInstance } from "../../hooks/mutations/useKpiInstances";

type KpiInstanceSelectorProps = {
    value: KpiInstance[];
    onChange: (value: KpiInstance[]) => void;
};

// --- Helper Components ---

const NoKpiBasesFound = ({
    isCreateKpiBaseOpen,
    setIsCreateKpiBaseOpen,
    handleCreateBaseKpi,
}: {
    isCreateKpiBaseOpen: boolean;
    setIsCreateKpiBaseOpen: (open: boolean) => void;
    handleCreateBaseKpi: (values: CreateKpiBaseFormValues) => void;
}) => (
    <Flex
        style={{
            width: "100%",
            height: "100%",
            alignItems: "center",
            justifyContent: "center",
        }}
    >
        <h4>No se encontraron metas base</h4>
        <h6
            style={{
                color: "var(--primary)",
                cursor: "pointer",
                textDecoration: "underline",
            }}
            onClick={() => setIsCreateKpiBaseOpen(true)}
        >
            Haz click para crear una nueva meta
        </h6>
        <Modal
            isOpen={isCreateKpiBaseOpen}
            onClose={() => setIsCreateKpiBaseOpen(false)}
            title="Crear meta base"
        >
            <CreateKpiBaseForm
                onSubmit={handleCreateBaseKpi}
                initialValues={{ name: "", measurementUnitId: "", areaId: "" }}
            />
        </Modal>
    </Flex>
);

const AvailableKpiBasesSection = ({
    availableKpiBases,
    handleAddKpiBase,
    isCreateKpiBaseOpen,
    setIsCreateKpiBaseOpen,
    handleCreateBaseKpi,
}: {
    availableKpiBases: BaseKpi[];
    handleAddKpiBase: (kpiBase: BaseKpi) => void;
    isCreateKpiBaseOpen: boolean;
    setIsCreateKpiBaseOpen: (open: boolean) => void;
    handleCreateBaseKpi: (values: CreateKpiBaseFormValues) => void;
}) => (
    <div style={{ width: "49%" }}>
        <Flex
            style={{
                flexDirection: "column",
                flexWrap: "nowrap",
                paddingBottom: "12px",
                height: "80px",
                alignItems: "flex-start",
                justifyContent: "flex-end"
            }}
        >
            <h4>Metas disponibles</h4>
            <h6
                style={{
                    color: "var(--primary)",
                    cursor: "pointer",
                    textDecoration: "underline",
                }}
                onClick={() => setIsCreateKpiBaseOpen(true)}
            >
                Haz click para crear una nueva meta si no encuentras el que buscas
            </h6>
            <Modal
                isOpen={isCreateKpiBaseOpen}
                onClose={() => setIsCreateKpiBaseOpen(false)}
                title="Crear meta base"
            >
                <CreateKpiBaseForm
                    onSubmit={handleCreateBaseKpi}
                    initialValues={{ name: "", measurementUnitId: "", areaId: "" }}
                />
            </Modal>
        </Flex>
        <Table
            size="small"
            columns={[
                {
                    key: "name",
                    label: "Meta",
                    render: (row: BaseKpi) =>
                        `${row.name} (${row.measurement?.symbol || row.measurement?.name})`,
                },
                {
                    key: "id",
                    label: "Acciones",
                    align: "center",
                    width: "200px",
                    render: (row: BaseKpi) => (
                        <Button
                            $variant="primary"
                            $size="small"
                            onClick={() => handleAddKpiBase(row)}
                        >
                            Agregar al proyecto
                        </Button>
                    ),
                },
            ]}
            data={availableKpiBases}
            rowKey={(row: BaseKpi) => row.id}
        />
    </div>
);

const SelectedKpiBasesSection = ({
    selectedKpiBases,
    handleRemoveKpiBase,
    handleUpdateExpectedValue,
}: {
    selectedKpiBases: KpiInstance[];
    handleRemoveKpiBase: (kpiBase: BaseKpi) => void;
    handleUpdateExpectedValue: (kpiBase: BaseKpi, expectedValue: number) => void;
}) => (
    <div style={{ width: "49%" }}>
        <Flex
            style={{
                flexDirection: "column",
                flexWrap: "nowrap",
                paddingBottom: "12px",
                height: "80px",
                alignItems: "flex-start",
                justifyContent: "flex-end",
            }}
        >
            <h4>Metas seleccionadas</h4>
            <h6 style={{ color: "var(--text-secondary)" }}>
                Las metas listadas a continuación serán usadas como base para las actividades del proyecto
            </h6>
        </Flex>
        <Table
            size="small"
            columns={[
                {
                    key: "name",
                    label: "Meta",
                    render: (row: KpiInstance) => (
                        <KpiBaseSelectorItem
                            kpiBase={row.kpiBase!}
                            onUpdateExpectedValue={handleUpdateExpectedValue}
                        />
                    ),
                },
                {
                    key: "id",
                    align: "center",
                    label: "Acciones",
                    width: "100px",
                    render: (row: KpiInstance) => (
                        <Button
                            $variant="primary"
                            $size="small"
                            onClick={() => handleRemoveKpiBase(row.kpiBase!)}
                        >
                            Quitar
                        </Button>
                    ),
                },
            ]}
            data={selectedKpiBases}
            rowKey={(row: KpiInstance) => row.kpiBaseId}
        />
    </div>
);

const KpiBaseSelectorItem = ({
    kpiBase,
    onUpdateExpectedValue,
}: {
    kpiBase: BaseKpi;
    onUpdateExpectedValue: (kpiBase: BaseKpi, expectedValue: number) => void;
}) => {
    return (
        <Flex
            style={{
                flexDirection: "row",
                flexWrap: "nowrap",
                alignItems: "center",
                justifyContent: "space-between",
            }}
        >
            <h4>
                {kpiBase.name} ({kpiBase.measurement?.symbol || kpiBase.measurement?.name})
            </h4>
            <Input
                style={{ width: "150px", marginLeft: "12px" }}
                placeholder={`En ${kpiBase.measurement?.name}`}
                $size="small"
                type="number"
                onChange={(e) =>
                    onUpdateExpectedValue(kpiBase, Number(e.target.value))
                }
                
            />
        </Flex>
    );
};

// --- Main Component ---

export const KpiInstanceSelector = ({ value, onChange }: KpiInstanceSelectorProps) => {
    const { baseKpis, isLoading, isError, isSuccess } = useBaseKpis();
    const { isOpen: isCreateKpiBaseOpen, setIsOpen: setIsCreateKpiBaseOpen } = useModal();
    const { createBaseKpi } = useCreateBaseKpi();

    const [selectedKpiInstances, setSelectedKpiInstances] = useState<KpiInstance[]>(value);

    // --- Handlers ---

    const handleCreateBaseKpi = (values: CreateKpiBaseFormValues) => {
        createBaseKpi(
            {
                name: values.name,
                measurementId: values.measurementUnitId,
                areaId: values.areaId,
            },
            {
                onSuccess: () => {
                    setIsCreateKpiBaseOpen(false);
                },
            }
        );
    };

    const handleRemoveKpiBase = (kpiBase: BaseKpi) => {
        setSelectedKpiInstances(
            selectedKpiInstances.filter((kpi) => kpi.kpiBaseId !== kpiBase.id)
        );
    };

    const handleAddKpiBase = (kpiBase: BaseKpi) => {
        setSelectedKpiInstances([
            ...selectedKpiInstances,
            {
                id: kpiBase.id,
                kpiBaseId: kpiBase.id,
                kpiBase,
                expectedValue: 0,
            },
        ]);
    };

    const handleUpdateExpectedValue = (
        kpiBase: BaseKpi,
        expectedValue: number
    ) => {
        setSelectedKpiInstances(
            selectedKpiInstances.map((kpi) =>
                kpi.kpiBaseId === kpiBase.id
                    ? { ...kpi, expectedValue }
                    : kpi
            )
        );
    };

    // --- Effects ---

    useEffect(() => {
        onChange(selectedKpiInstances);
    }, [selectedKpiInstances]);

    // --- Render ---

    if (isLoading) return <div>Cargando...</div>;
    if (isError) return <div>Error</div>;
    if (isSuccess && baseKpis.length === 0)
        return (
            <NoKpiBasesFound
                isCreateKpiBaseOpen={isCreateKpiBaseOpen}
                setIsCreateKpiBaseOpen={setIsCreateKpiBaseOpen}
                handleCreateBaseKpi={handleCreateBaseKpi}
            />
        );

    return (
        <Flex
            style={{
                width: "100%",
                gap: "12px",
                flexDirection: "row",
                flexWrap: "wrap",
                alignItems: "flex-start",
                justifyContent: "flex-start",
                alignContent: "flex-start",
            }}
        >
            <AvailableKpiBasesSection
                availableKpiBases={baseKpis}
                handleAddKpiBase={handleAddKpiBase}
                isCreateKpiBaseOpen={isCreateKpiBaseOpen}
                setIsCreateKpiBaseOpen={setIsCreateKpiBaseOpen}
                handleCreateBaseKpi={handleCreateBaseKpi}
            />
            <SelectedKpiBasesSection
                selectedKpiBases={selectedKpiInstances}
                handleRemoveKpiBase={handleRemoveKpiBase}
                handleUpdateExpectedValue={handleUpdateExpectedValue}
            />
        </Flex>
    );
};