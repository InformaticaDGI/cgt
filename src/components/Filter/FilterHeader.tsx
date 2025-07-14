import type { ReactNode } from "react";
import styled from "styled-components"

const FilterHeader = ({ icon, fill, children }: { icon?: ReactNode, fill?: string, children: string }) => {

    return <HeaderWrapper>
        <Header>
            <IconWrapper $fill={fill}>
                {icon}
            </IconWrapper>
            <Title>{children}</Title>
        </Header>
    </HeaderWrapper>
}


const HeaderWrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: start;
`;

const Header = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    gap: 8px;
`;
const Title = styled.h1`
    font-size: 14px;
    font-weigth: bold;
    color: #2D3748;
`;

const IconWrapper = styled.div<{ $fill?: string }>`
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 4px;
    border-radius: 4px;
    background: ${props => props.$fill ? props.$fill : "linear-gradient(180deg, #008000 0%, #006400 100%)"};
`;

export default FilterHeader