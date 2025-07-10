import type React from "react";
import styled from "styled-components";
import TabItem from "./TabItem";
import { useState } from "react";

const TabsContainer = ({ children }: { children: React.ReactElement[] }) => {

    const [selectedTab, setSelectedTab] = useState(0);

    return <StyledContainerTabs>
        {children.map((child, index) => {
            return <TabItem onClick={() => setSelectedTab(index)} selected={selectedTab === index} index={index} key={index}>
                {child}
            </TabItem>
        })}
    </StyledContainerTabs>
}

export default TabsContainer


const StyledContainerTabs = styled.div`
    display: flex;
    flex-direction: row;
    gap: 4px;
`;
