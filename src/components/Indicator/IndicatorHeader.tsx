import styled from "styled-components"
import Text from "../Ui/Text/Text";
import { ChevronRight } from "lucide-react";

const IndicatorHeader = ({ title, count, iconState = "closed" }: { title: string | false, count: string | false, iconState?: "open" | "closed" }) => {

    return (
        <StyledIndicatorHeader>
            {title !== false && <Text style={{ fontSize: '14px', color: '#0C777C', fontWeight: '700', maxWidth: '20rem' }}>{title}</Text>}
            <StyledInfoHeader>
                {count !== false && <Text style={{ fontSize: '14px', color: '#889C9D', fontWeight: 'normal', textWrap: 'nowrap' }}>{count}</Text>}
                <ChevronRight strokeWidth="1" style={{rotate: iconState === "open" ? "90deg": "0deg", color: "#889C9D"}} />
            </StyledInfoHeader>
        </StyledIndicatorHeader>
    )

}

const StyledInfoHeader = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 8px;
`;

const StyledIndicatorHeader = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
`;

export default IndicatorHeader