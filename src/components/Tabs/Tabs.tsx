import { BsFillGridFill } from "react-icons/bs";
import { FaListUl } from "react-icons/fa6";
import styled from "styled-components"
import TabItem from "./TabItem";
import TabsContainer from "./TabsContainer";

const Tabs = () => {

    return (
        <StyledTabs>
            <TabsContainer>
                <TabItem>
                    <BsFillGridFill width={32} height={32} color="#2D3748" />
                </TabItem>
                <TabItem >
                    <FaListUl width={32} height={32} color="#2D3748" />
                </TabItem>
            </TabsContainer>
        </StyledTabs>
    )
}


const StyledTabs = styled.div`
    display: flex;
    flex-direction: column;
    align-items: end;
`;

export default Tabs
