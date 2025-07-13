import styled from "styled-components"
import Separator from "../Ui/Separator/Separator";

const CardFooter = ({ children }: { children: React.ReactNode }) => {
    return (
        <>
        <Separator />
        <StyledCardFooter>
            {children}
        </StyledCardFooter>
        </>
    )
}

export default CardFooter

const StyledCardFooter = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
`;