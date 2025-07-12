import styled from "styled-components"
import Navigation from "../../components/Navigation/Navigation"
import FilterTool from "../../components/Prebuilt/FilterTool";
import Header from "../../components/Header/Header";
import Tabs from "../../components/Tabs/Tabs";
import Card from "../../components/Card/Card";
import CardBody from "../../components/Card/CardBody";
import CardFooter from "../../components/Card/CardFooter";
import CardHeader from "../../components/Card/CardHeader";
import usePrograms from "../../hooks/usePrograms";
import { Button } from "../../components/Ui/Button/Button";
import { useAppStore } from "../../store/store";
import { getSecretaryName } from "../../utils/libs";

const HomeView = () => {

    const { data } = usePrograms()
    const store = useAppStore()
    return <Navigation>
        <MainWrapper>
            <Header />
            <FilterTool />
            <Tabs/>
            <Button onClick={() => console.log(store)}>Ver</Button>
            <StyledGrid>
                {data.map(program => (
                    <Card to="indicadores/programa1" key={program.id}>
                        <CardHeader title={program.name} count={`${0} Proyectos`}  />
                        <CardBody subtitle={getSecretaryName(program.secretaryId)} description="SECRETARIA EJECUTIVA DE PROTECCIÓN SOCIAL Y GESTIÓN TERRITORIAL" info="SECRETARIA DE PROTECCIÓN SOCIAL" progress={20} />
                        <CardFooter location="Juan German Roscio, San Juan de los Morros" status="social" />
                    </Card>
                ))}
            </StyledGrid>
        </MainWrapper>
    </Navigation>
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

export default HomeView