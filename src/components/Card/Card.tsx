import styled from "styled-components"

const Card = ({ children, to }: { to: string | false, children: React.ReactElement[] }) => {

    if(to === false){
        return <StyledCard animation={false}>
            {children}
        </StyledCard>
    }
    return <StyledCard animation={true} as={'a'} href={to}>
            {children}
        </StyledCard>
}

export default Card

const StyledCard = styled.div<{animation?: boolean}>`
    text-decoration: none;
    border: 1px solid #98F4E3;
    display: flex;
    flex-direction: column;
    gap: 8px;
    padding: 12px;
    border-radius: 12px;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    cursor: ${props => props.animation === false ? "default": "pointer"};
    &:hover {
        transform: ${props => props.animation === false ? "none": "scale(1.02)"};
        box-shadow: ${props => props.animation === false ? "0px 4px 4px rgba(0, 0, 0, 0.25)": "0px 8px 8px rgba(0, 0, 0, 0.25)"};
        outline: ${props => props.animation === false ? "none": "3px solid #66CDAA"};
    }
`;