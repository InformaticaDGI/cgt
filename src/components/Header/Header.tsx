import styled from "styled-components";
import BreadCrump from "./BreadCrump";

const Header = () => {

    return <HeaderContent>
        <BreadCrump />
        <div>
            {/*TODO*/}
        </div>
    </HeaderContent>

}

export default Header


const HeaderContent = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    padding-bottom: 8px;
`;