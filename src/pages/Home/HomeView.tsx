import styled from "styled-components"
import Navigation from "../../components/Navigation/Navigation"
import FilterTool from "../../components/FilterTool";
import Header from "../../components/Header/Header";
import Tabs from "../../components/Tabs/Tabs";
import Card from "../../components/Card/Card";
import CardBody from "../../components/Card/CardBody";
import CardFooter from "../../components/Card/CardFooter";
import CardHeader from "../../components/Card/CardHeader";

const HomeView = () => {
    return <Navigation>
        <MainWrapper>
            <Header />
            <FilterTool />
            <Tabs/>
            <StyledGrid>
            <Card to="programa1">
                <CardHeader title="Programa Ejemplo 1" count="6 Proyectos"  />
                <CardBody subtitle="Secretaria Territorial 1" description="SECRETARIA EJECUTIVA DE PROTECCIÓN SOCIAL Y GESTIÓN TERRITORIAL" info="SECRETARIA DE PROTECCIÓN SOCIAL" progress={20} />
                <CardFooter location="Juan German Roscio, San Juan de los Morros" status="social" />
            </Card>
            <Card to="programa2">
                <CardHeader title="Programa Ejemplo 1" count="6 Proyectos"  />
                <CardBody subtitle="Secretaria Territorial 1" description="SECRETARIA EJECUTIVA DE PROTECCIÓN SOCIAL Y GESTIÓN TERRITORIAL" info="SECRETARIA DE PROTECCIÓN SOCIAL" progress={20} />
                <CardFooter location="Juan German Roscio, San Juan de los Morros" status="social" />
            </Card>
            <Card to="programa3">
                <CardHeader title="Programa Ejemplo 1" count="6 Proyectos"  />
                <CardBody subtitle="Secretaria Territorial 1" description="SECRETARIA EJECUTIVA DE PROTECCIÓN SOCIAL Y GESTIÓN TERRITORIAL" info="SECRETARIA DE PROTECCIÓN SOCIAL" progress={20} />
                <CardFooter location="Juan German Roscio, San Juan de los Morros" status="social" />
            </Card>
            <Card to="programa4">
                <CardHeader title="Programa Ejemplo 1" count="6 Proyectos"  />
                <CardBody subtitle="Secretaria Territorial 1" description="SECRETARIA EJECUTIVA DE PROTECCIÓN SOCIAL Y GESTIÓN TERRITORIAL" info="SECRETARIA DE PROTECCIÓN SOCIAL" progress={20} />
                <CardFooter location="Juan German Roscio, San Juan de los Morros" status="social" />
            </Card>
            <Card to="programa5">
                <CardHeader title="Programa Ejemplo 1" count="6 Proyectos"  />
                <CardBody subtitle="Secretaria Territorial 1" description="SECRETARIA EJECUTIVA DE PROTECCIÓN SOCIAL Y GESTIÓN TERRITORIAL" info="SECRETARIA DE PROTECCIÓN SOCIAL" progress={20} />
                <CardFooter location="Juan German Roscio, San Juan de los Morros" status="social" />
            </Card>
            <Card to="programa6">
                <CardHeader title="Programa Ejemplo 1" count="6 Proyectos"  />
                <CardBody subtitle="Secretaria Territorial 1" description="SECRETARIA EJECUTIVA DE PROTECCIÓN SOCIAL Y GESTIÓN TERRITORIAL" info="SECRETARIA DE PROTECCIÓN SOCIAL" progress={20} />
                <CardFooter location="Juan German Roscio, San Juan de los Morros" status="social" />
            </Card>
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