import styled from "styled-components"
import Text from "../Ui/Text";
import { ChevronRight } from "lucide-react";

const CardHeader = () => {

    return (
        <StyledCardHeader>
            <Text style={{color: '#0C777C', fontWeight: '500'}}>Titulo</Text>
            <StyledInfoHeader>
                <Text style={{fontSize: '14px', color: '#889C9D', fontWeight: 'normal'}}>Cantidad</Text>
                <ChevronRight strokeWidth="1" color="#889C9D" />
            </StyledInfoHeader>
        </StyledCardHeader>
    )

}

const StyledInfoHeader = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 8px;
`;

const StyledCardHeader = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
`;

export default CardHeader