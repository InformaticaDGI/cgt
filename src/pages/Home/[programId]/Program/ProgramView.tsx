import styled from "styled-components";
import Card from "../../../../components/Card/Card";
import CardBody from "../../../../components/Card/CardBody";
import CardFooter from "../../../../components/Card/CardFooter";
import CardHeader from "../../../../components/Card/CardHeader";
import Header from "../../../../components/Header/Header";
import Tabs from "../../../../components/Tabs/Tabs";
import Navigation from "../../../../components/Navigation/Navigation";

const ProgramView = () => {
    const pathname = window.location.pathname;
    return <Navigation>
        <MainWrapper>
            <Header />
            <Card to={false}>
                <CardHeader title="Programa Ejemplo 1" count="10 Actividades"  iconState="open" />
                <CardBody subtitle={false} description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum." info={false} progress={20} />
                <CardFooter location={false} status={false} />
            </Card>
            <Tabs/>
            <StyledGrid>
            <Card to={`${pathname}/proyecto1`}>
                <CardHeader title="Proyecto 1" count="10 Actividades"  />
                <CardBody subtitle={false} description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum." info={false} progress={20} />
                <CardFooter location={false} status={false} />
            </Card>
            <Card to={`${pathname}/proyecto2`}>
                <CardHeader title="Proyecto 2" count="10 Actividades"  />
                <CardBody subtitle={false} description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum." info={false} progress={20} />
                <CardFooter location={false} status={false} />
            </Card>
            <Card to={`${pathname}/proyecto3`}>
                <CardHeader title="Proyecto 3" count="10 Actividades"  />
                <CardBody subtitle={false} description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum." info={false} progress={20} />
                <CardFooter location={false} status={false} />
            </Card>
            <Card to={`${pathname}/proyecto4`}>
                <CardHeader title="Proyecto 4" count="10 Actividades"  />
                <CardBody subtitle={false} description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum." info={false} progress={20} />
                <CardFooter location={false} status={false} />
            </Card>
            <Card to={`${pathname}/proyecto5`}>
                <CardHeader title="Proyecto 5" count="10 Actividades"  />
                <CardBody subtitle={false} description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum." info={false} progress={20} />
                <CardFooter location={false} status={false} />
            </Card>
            <Card to={`${pathname}/proyecto6`}>
                <CardHeader title="Proyecto 6" count="10 Actividades"  />
                <CardBody subtitle={false} description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum." info={false} progress={20} />
                <CardFooter location={false} status={false} />
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

export default ProgramView