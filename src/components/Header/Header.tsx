import styled from "styled-components";
import BreadCrump from "./BreadCrump";

const Header = () => {

    return <StyledHeader>
        <BreadCrump />
        <div>
            {/*TODO*/}
        </div>
    </StyledHeader>

}

export default Header


const StyledHeader = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    padding-bottom: 8px;
`;