import styled from "styled-components"
import Text from "../Ui/Text";
import Status, { type StatusInfo } from "../Ui/Status";

const CardFooter = ({location, status}: {location: string | false, status: StatusInfo | false}) => {
    return (
        <StyledCardFooter>
            {location !== false && <Text style={{color: '#7A8E8B', fontSize: '11px', fontWeight: '600'}}>{location}</Text>}
            {status !== false && <Status variant={status}/>}
        </StyledCardFooter>
    )
}

export default CardFooter

const StyledCardFooter = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
`;