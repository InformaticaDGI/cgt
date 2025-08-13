import Card from "../../components/Card/Card";
import CardHeader from "../../components/Card/CardHeader";
import Text from "../../components/Ui/Text/Text";
import CardBody from "../../components/Card/CardBody";
import { Table, type HeaderConfig } from "../../components/Ui/Table/Table";
import { Flex } from "../../components/Layout/Flex";
import { Button } from "../../components/Ui/Button/Button";
import { useAcas } from "../../hooks/queries/useAcas";

export default function ACAView() {

    const { data: acas } = useAcas()

    const columns: HeaderConfig[] = [
        {
            key: 'name',
            label: 'Nombre',
            align: 'left',
            render: (row) => <Flex $align="start" $gap={'1px'} $width="auto">
                <Text $fontSize="11px" $fontWeight="normal">{row.name}</Text>
            </Flex>
        },
        {
            key: 'potential',
            label: 'Potencial',
            align: 'left',
            render: (row) => <Flex $direction="row" $gap="10px" $width="auto">
                <Text $fontSize="11px" $fontWeight="normal">{row.potential || 'N/A'}</Text>
            </Flex>
        },
        {
            key: 'criticalAspects',
            label: 'Aspectos críticos',
            align: 'left',
            render: (row) => <Flex $direction="row" $gap="10px" $width="auto">
                <Text $fontSize="11px" $fontWeight="normal">{row.criticalAspects || 'N/A'}</Text>
            </Flex>
        }
    ]

    return <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%', width: '100%',  paddingTop: '6%' }}>
        <Card $width="90%" $padding="40px" $backgroundColor="none">
            <CardHeader>
                <Flex $direction="row" $gap="10px" $justify="space-between">
                    <Flex $direction="column" $gap="10px" $align="start">
                        <Text>Proyectos ACA</Text>
                        <Text $fontSize="12px" color="gray.500">
                            Ver los proyectos ACA.
                        </Text>
                    </Flex>
                    <Flex $direction="row" $gap="10px" $justify="end">
                        <Button $variant="primary" as="a" href="/aca/crear">
                            Nuevo proyecto ACA
                        </Button>
                    </Flex>
                </Flex>
            </CardHeader>
            <CardBody>
                <Table size="small" columns={columns} data={acas?.data || []} />
            </CardBody>
        </Card>
    </div>
}