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
import Progress from "../../../../components/Ui/Progress/Progress";
import StatusBadge from "../../../../components/Prebuilt/StatusBadge";
import { MdOutlineInventory, MdOutlineTimer, MdOutlineTrendingUp } from "react-icons/md";
import { Trophy } from "lucide-react";
import KPIIcon from "../../../../components/Prebuilt/KPIIcon";

const KPI_ICONS: Record<number, React.ElementType> = {
    0: MdOutlineTimer,
    1: MdOutlineInventory,
    2: MdOutlineTrendingUp
}

const ProgramView = () => {
    const { programId } = useParams();
    const { data: program } = useProgram(programId);
    const pathname = window.location.pathname;

    if (!program) return <Flex $justify="end" $height="100vh" $align="end" $padding="12px"><Text style={{ padding: '12px', fontSize: '12px', color: 'var(--secondary)', background: 'var(--input-background)', fontWeight: '500', textWrap: 'nowrap' }}>Cargando...</Text></Flex>


    return <MainWrapper>
        <Header />
        <Card $isSelectable={false}>
            <CardHeader>
                <Text style={{ fontSize: '14px', color: '#0C777C', fontWeight: '700', textWrap: 'nowrap' }}>{program?.name}</Text>
                <Flex $direction="row" $justify="end" $align="center" $gap="8px">
                    <Text style={{ fontSize: '14px', color: '#889C9D', fontWeight: 'normal', textWrap: 'nowrap' }}>{`${program.projects.length} Proyectos`}</Text>
                    <IndicatorIcon $isOpen={true} />
                </Flex>
            </CardHeader>
            <CardBody>
                <Flex $align="stretch" $direction="column" $gap={"8px"}>
                    <Text style={{ fontSize: '14px', color: '#5A787A' }}>No Definido</Text>
                    <Flex $align="stretch" $direction="column" $gap={"4px"}>
                        <IndicatorProgress value={program.overallProgramProgress} />
                        <IndicatorSecretary secretaryId={program.secretaryId} />
                        <IndicatorTerritorialSecretary parentId={program.secretaryId} />
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
                <Card as="a" href={`${pathname}/${project.id}`} key={project.id}>
                    <CardHeader>
                        <Text style={{ fontSize: '14px', color: '#0C777C', fontWeight: '700', textWrap: 'nowrap' }}>{project.name}</Text>
                        <Flex $direction="row" $justify="end" $align="center" $gap="8px">
                            <Text style={{ fontSize: '14px', color: '#889C9D', fontWeight: 'normal', textWrap: 'nowrap', textAlign: 'justify' }}>{"21 Actividades"}</Text>
                            <IndicatorIcon $isOpen={false} />
                        </Flex>
                    </CardHeader>
                    <CardBody>
                        <Flex $align="stretch" $direction="column" $gap={"32px"} >
                            <Flex $align="center" $justify="center" $direction="column" $gap={"8px"}>
                                <IndicatorProgress value={project.overallProjectProgress} strokeWidth={7} size={80} textSize={14} />
                                <Flex $align="center" $justify="center" $direction="column" $gap={"4px"}>
                                    <Trophy size={24} color="var(--text-secondary)"  />
                                    <Text style={{ color: '#7A8E8B', fontSize: '11px', fontWeight: '600', textAlign: 'justify' }}>Meta</Text>
                                </Flex>
                            </Flex>
                            <Flex $align="stretch" $direction="row" $gap={"2px"} >
                                {Array.from({ length: 3 }).map((_, index) => {
                                    const kpi = project.kpiInstances[index] || { fullFillmentRatePercentage: 0 };
                                    return (
                                        <Flex $align="center" $direction="column" $gap={"8px"} key={index}>
                                            <IndicatorProgress value={kpi.fullFillmentRatePercentage} size={60} strokeWidth={5} textSize={12} />
                                            <Flex $align="center" $justify="center" $direction="column" $gap={"4px"}>
                                                <KPIIcon icon={KPI_ICONS[index]} color="var(--text-secondary)" />
                                                <Text style={{ color: '#7A8E8B', fontSize: '11px', fontWeight: '600', textAlign: 'justify' }}>{index === 0 ? "Tiempo" : index === 1 ? "Recursos" : "Eficacia"}</Text>
                                            </Flex>
                                        </Flex>
                                    )
                                })}
                            </Flex>

                            <Flex $align="stretch" $direction="column" $gap={"16px"}>
                                <Flex $align="stretch" $justify="space-between" $direction="row" $gap={"4px"}>
                                    <Flex $align="start" $direction="column" $gap={"4px"}>
                                        <StatusBadge variant={'in_progress'} />
                                    </Flex>
                                    <Flex $align="end" $direction="column" $gap={"4px"}>
                                        <Text style={{ color: '#7A8E8B', fontSize: '11px', fontWeight: '500', textAlign: 'justify' }}>Tiempo de ejecución: {project.progressByTime}%</Text>
                                        <Progress value={project.progressByTime} max={100} color="var(--primary)" backgroundColor="#F3F4F6" />
                                    </Flex>
                                </Flex>

                            </Flex>
                        </Flex>
                    </CardBody>
                </Card>
            ))}
        </StyledGrid>
    </MainWrapper >
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