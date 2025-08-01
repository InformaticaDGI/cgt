import styled from "styled-components";
import Card from "../../../../../../../../../../components/Card/Card";
import CardBody from "../../../../../../../../../../components/Card/CardBody";
import Header from "../../../../../../../../../../components/Header/Header";
import Tabs from "../../../../../../../../../../components/Tabs/Tabs";
import CardHeader from "../../../../../../../../../../components/Card/CardHeader";
import Text from "../../../../../../../../../../components/Ui/Text/Text";
import { Flex } from "../../../../../../../../../../components/Layout/Flex";
import IndicatorIcon from "../../../../../../../../../../components/Prebuilt/IndicatorIcon";
import IndicatorProgress from "../../../../../../../../../../components/Indicator/IndicatorProgress";

const TaskView = () => {

    return <MainWrapper>
            <Header />
            <Card $isSelectable={false}>
                <CardHeader>
                    <Text style={{ fontSize: '14px', color: '#0C777C', fontWeight: '700', textWrap: 'nowrap' }}>Tarea Ejemplo 1</Text>
                    <Flex $direction="row" $justify="end" $align="center" $gap="8px">
                        <IndicatorIcon $isOpen={true} />
                    </Flex>
                </CardHeader>
                <CardBody>
                    <Flex $align="stretch" $direction="column" $gap={"8px"}>
                                <Flex $align="stretch" $direction="column" $gap={"8px"}>
                                    <IndicatorProgress value={42} />
                                    <Text style={{ color: '#7A8E8B', fontSize: '11px', fontWeight: '600', textAlign: 'justify' }}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</Text>
                                </Flex>
                            </Flex>
                </CardBody>
            </Card>
            <Tabs/>
        </MainWrapper>
}

const MainWrapper = styled.div`
    display: flex;
    flex-direction: column;
    gap: 12px;
    width: 85vw;
    height: 100%;
    padding: 16px;
`;
export default TaskView