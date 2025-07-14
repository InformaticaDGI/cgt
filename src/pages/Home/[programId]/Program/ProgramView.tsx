import styled from "styled-components";
import Card from "../../../../components/Card/Card";
import CardBody from "../../../../components/Card/CardBody";
import Header from "../../../../components/Header/Header";
import Tabs from "../../../../components/Tabs/Tabs";
import CardHeader from "../../../../components/Card/CardHeader";
import Text from "../../../../components/Ui/Text/Text";
import IndicatorIcon from "../../../../components/Prebuilt/IndicatorIcon";
import { Flex } from "../../../../components/Layout/Flex";
import IndicatorProgress from "../../../../components/Indicator/IndicatorProgress";
import useProgram from "../../../../hooks/useProgram";
import { useParams } from "react-router";
import IndicatorSecretary from "../../../../components/Indicator/IndicatorSecretary";
import IndicatorTerritorialSecretary from "../../../../components/Indicator/IndicatorTerritorialSecretary";
import CardFooter from "../../../../components/Card/CardFooter";
import Badge from "../../../../components/Ui/Badge/Badge";

const ProgramView = () => {
    const { programId } = useParams();
    const { data: program } = useProgram(programId);
    const pathname = window.location.pathname;


    if (!program) return <Flex $justify="end" $height="100vh" $align="end" $padding="12px"><Text style={{  padding: '12px', fontSize: '12px', color: 'var(--secondary)', background: 'var(--input-background)', fontWeight: '500', textWrap: 'nowrap' }}>Cargando...</Text></Flex>


    // return <Progress value={10} max={100} color="green" size="10px" />
    
    return <MainWrapper>
            <Header />
            <Card $isSelectable={false}>
                        <CardHeader>
                            <Text style={{ fontSize: '14px', color: '#0C777C', fontWeight: '700', textWrap: 'nowrap' }}>{program.name}</Text>
                            <Flex $direction="row" $justify="end" $align="center" $gap="8px">
                                <Text style={{ fontSize: '14px', color: '#889C9D', fontWeight: 'normal', textWrap: 'nowrap' }}>{`${program.projects.length} Proyectos`}</Text>
                                <IndicatorIcon $isOpen={true} />
                            </Flex>
                        </CardHeader>
                        <CardBody>
                            <Flex $align="stretch" $direction="column" $gap={"8px"}>
                                <Text style={{ fontSize: '14px', color: '#5A787A' }}>No Definido</Text>
                                <Flex $align="stretch" $direction="column" $gap={"4px"}>
                                    <IndicatorProgress value={program?.promediateProjectPercentage || 0} />
                                    <IndicatorSecretary secretaryId={program?.secretaryId || ''} />
                                    <IndicatorTerritorialSecretary parentId={program?.secretaryId || ''} />
                                </Flex>
                            </Flex>
                        </CardBody>
                        <CardFooter>
                            <Text style={{ color: '#7A8E8B', fontSize: '11px', fontWeight: '600' }}>No Definido</Text>
                            <Badge variant={'social'} />
                        </CardFooter>
                    </Card>
            <Tabs />
            <StyledGrid>
                {program?.projects.map(project => (
                <Card as="a" href={`${pathname}/${project.id}`}>
                    <CardHeader>
                        <Text style={{ fontSize: '14px', color: '#0C777C', fontWeight: '700', textWrap: 'nowrap' }}>{project.name}</Text>
                        <Flex $direction="row" $justify="end" $align="center" $gap="8px">
                            <Text style={{ fontSize: '14px', color: '#889C9D', fontWeight: 'normal', textWrap: 'nowrap', textAlign: 'justify' }}>{"21 Actividades"}</Text>
                            <IndicatorIcon $isOpen={false} />
                        </Flex>
                    </CardHeader>
                    <CardBody>
                        <Flex $align="stretch" $direction="column" $gap={"8px"}>
                            <Flex $align="stretch" $direction="column" $gap={"8px"}>
                                <IndicatorProgress value={project.promediatePercentage} />
                                <Text style={{ color: '#7A8E8B', fontSize: '11px', fontWeight: '600', textAlign: 'justify' }}>{project.observations}</Text>
                            </Flex>
                        </Flex>
                    </CardBody>
                </Card>
                ))}
            </StyledGrid>
        </MainWrapper>
}

const StyledGrid = styled.div`
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 12px;
`;

const MainWrapper = styled.div`
    display: flex;
    flex-direction: column;
    gap: 12px;
    width: 100%;
    height: 100%;
    padding: 16px;
`;

export default ProgramView