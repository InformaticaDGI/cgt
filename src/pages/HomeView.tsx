import styled from "styled-components"
import Navigation from "../components/Navigation/Navigation"
import FilterTool from "../components/FilterTool";
import Header from "../components/Header/Header";

const HomeView = () => {
    return <Navigation>
        <MainWrapper>
            <Header />
            <FilterTool />
            <p>...</p>
        </MainWrapper>
    </Navigation>
}

const MainWrapper = styled.div`
    display: flex;
    flex-direction: column;
    gap: 12px;
    width: 100%;
    height: 100%;
    padding: 16px;
`;

export default HomeView