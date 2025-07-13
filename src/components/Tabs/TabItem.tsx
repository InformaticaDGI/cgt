import styled from "styled-components";

const TabItem = ({ children, index = 0, selected, ...props }: { index?: number, children: React.ReactNode, selected?: boolean } & React.ComponentPropsWithoutRef<'div'>) => {
    return (
        <StyledTabItem {...props} $currentTab={selected!!}>
            {children}
        </StyledTabItem>
    )

}

export default TabItem


const StyledTabItem = styled.div<{$currentTab: boolean}>`
    display: flex;
    justify-items: center;
    align-items: center;
    padding: 6px 24px;
    border-radius: 12px;
    cursor: pointer;
    box-shadow: ${props => props.$currentTab ? "0px 2px 5.5px rgba(0, 0, 0, 0.06)": "none"};
`;
