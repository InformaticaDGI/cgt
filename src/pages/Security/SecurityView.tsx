import Card from "../../components/Card/Card";
import CardBody from "../../components/Card/CardBody";
import CardHeader from "../../components/Card/CardHeader";
import { Flex } from "../../components/Layout/Flex";
import AccessLogTable from "../../components/Prebuilt/AccessLogTable";
import ChangeLogTable from "../../components/Prebuilt/ChangeLogTable";
import Text from "../../components/Ui/Text/Text";

const SecurityView = () => {


    return (
        <Flex $align="stretch" $direction="column" $gap={"16px"} $padding={"16px"} $width='85vw' $position="relative">
            <Card $isSelectable={false} $padding={"24px"}>
                <CardHeader>
                    <Text style={{ fontSize: '16px', fontWeight: '600', color: '#5A787A' }}>Accesos</Text>
                </CardHeader>
                <CardBody style={{ paddingTop: '16px' }}>
                    <AccessLogTable />
                </CardBody>
            </Card>
            <Card $isSelectable={false} $padding={"24px"}>
                <CardHeader>
                    <Text style={{ fontSize: '16px', fontWeight: '600', color: '#5A787A' }}>Registro de cambios</Text>
                </CardHeader>
                <CardBody style={{ paddingTop: '16px' }}>
                    <ChangeLogTable />
                </CardBody>
            </Card>
        </Flex>
    )
}

export default SecurityView;