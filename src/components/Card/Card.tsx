import styled from "styled-components"

const Card = ({ children, to }: { to: string | false, children: React.ReactElement[] }) => {
    if(to === false){
        return <StyledCard>
            {children}
        </StyledCard>
    }
    return <StyledCard as={'a'} href={to}>
            {children}
        </StyledCard>
}

export default Card

const StyledCard = styled.div`
    text-decoration: none;
    border: 1px solid #98F4E3;
    display: flex;
    flex-direction: column;
    gap: 8px;
    padding: 12px;
    border-radius: 12px;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    cursor: pointer;
    &:hover {
        box-shadow: 0px 8px 8px rgba(0, 0, 0, 0.25)
    }
`;