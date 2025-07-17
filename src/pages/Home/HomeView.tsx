import FilterTool from "../../components/Prebuilt/FilterTool";
import Header from "../../components/Header/Header";
import Tabs from "../../components/Tabs/Tabs";
import Card from "../../components/Card/Card";
import CardFooter from "../../components/Card/CardFooter";
import usePrograms from "../../hooks/usePrograms";
import IndicatorSecretary from "../../components/Indicator/IndicatorSecretary";
import IndicatorProgress from "../../components/Indicator/IndicatorProgress";
import IndicatorTerritorialSecretary from "../../components/Indicator/IndicatorTerritorialSecretary";
import { Grid } from "../../components/Layout/Grid";
import { Flex } from "../../components/Layout/Flex";
import Text from "../../components/Ui/Text/Text";
import Badge from "../../components/Ui/Badge/Badge";
import CardBody from "../../components/Card/CardBody";
import CardHeader from "../../components/Card/CardHeader";
import IndicatorIcon from "../../components/Prebuilt/IndicatorIcon";
import { Trophy } from "lucide-react";
import { Link } from "react-router";

const HomeView = () => {

    const { data } = usePrograms()
    return <Flex $direction="column" $gap="12px" $padding="16px" $align="stretch">
        <Header />
        <FilterTool />
        <Tabs />
        <Grid>
            {data.map(program => (
                <Card as={Link} to={`/indicadores/${program.id}`} key={program.id}>
                    <CardHeader>
                        <Text style={{ fontSize: '14px', color: '#0C777C', fontWeight: '700', textWrap: 'nowrap' }}>{program.name}</Text>
                        <Flex $direction="row" $justify="end" $align="center" $gap="8px">
                            <Text style={{ fontSize: '14px', color: '#889C9D', fontWeight: 'normal', textWrap: 'nowrap' }}>{`${program.projects.length} Proyectos`}</Text>
                            <IndicatorIcon $isOpen={false} />
                        </Flex>
                    </CardHeader>
                    <CardBody>
                        <Flex $align="stretch" $direction="column" $gap={"8px"}>
                            {/* <Text style={{ fontSize: '14px', color: '#5A787A' }}>No Definido</Text> */}
                            <Flex $align="stretch" $direction="column" $gap={"4px"}>
                                <Flex $align="center" $justify="center" $direction="column" $gap={"8px"}>
                                    <IndicatorProgress value={program.overallProgramProgress} size={130} strokeWidth={8} />
                                    <Flex $align="center" $justify="center" $direction="column" $gap={"4px"}>
                                        <Trophy size={20} color="var(--text-secondary)" />
                                        <Text style={{ color: '#7A8E8B', fontSize: '11px', fontWeight: '600', textAlign: 'justify' }}>Meta</Text>
                                    </Flex>
                                </Flex>
                                <IndicatorSecretary secretaryId={program.secretaryId} />
                                <IndicatorTerritorialSecretary parentId={program.secretaryId} />
                            </Flex>
                        </Flex>
                    </CardBody>
                    <CardFooter>

                        <Flex $align="center" $justify="end" $direction="row" $gap={"4px"}>
                            <Badge parentId={program.secretaryId} />
                        </Flex>
                        {/* <Text style={{ color: '#7A8E8B', fontSize: '11px', fontWeight: '600' }}>No Definido</Text> */}
                    </CardFooter>
                </Card>
            ))}
        </Grid>
    </Flex>
}


export default HomeView