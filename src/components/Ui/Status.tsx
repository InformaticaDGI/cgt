import styled from "styled-components"
import Text from "./Text";

export type StatusInfo = "economy" | "ecology" | "social"

const Statuses = {
    social: "Social",
    economy: "Economia",
    ecology: "Ecologia"
}

const Status = ({ variant = "social" }: { variant?: StatusInfo }) => {


    return (
        <StyledStatus variant={variant}>
            <Text style={{fontSize: '12px', fontWeight: '600', color: "#ffffff"}}>{Statuses[variant]}</Text>
        </StyledStatus>
    )
}

export default Status

const StyledStatus = styled.div<{ variant?: StatusInfo }>`
    display: flex;
    background: ${props => {

        if(props.variant === 'ecology'){
            return "linear-gradient(90deg, #25C330 0%, #0F7705 100%)"
        }
        if(props.variant === 'economy') {
            return "linear-gradient(90deg, #CEDD03 0%, #FFB01C 100%)"
        }

        return "linear-gradient(90deg, #FFA500 0%, #FF4500 100%)"
    }};
    padding: 8px 30px;
    border-radius: 0.5rem;
`;

