import styled from "styled-components"
import Text from "../Ui/Text";
import { ChevronRight } from "lucide-react";

const CardHeader = ({ title, count, iconState = "closed" }: { title: string | false, count: string | false, iconState?: "open" | "closed" }) => {

    return (
        <StyledCardHeader>
            {title !== false && <Text style={{ fontSize: '16px', color: '#0C777C', fontWeight: '500' }}>{title}</Text>}
            <StyledInfoHeader>
                {count !== false && <Text style={{ fontSize: '14px', color: '#889C9D', fontWeight: 'normal' }}>{count}</Text>}
                <ChevronRight strokeWidth="1" style={{rotate: iconState === "open" ? "90deg": "0deg", color: "#889C9D"}} />
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