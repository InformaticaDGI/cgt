import { ChevronRight } from "lucide-react";
import styled from "styled-components";

const IndicatorIcon = styled(ChevronRight)<{isOpen?: boolean}>`
    stroke-width: 1;
    color: #889C9D;
    transform: ${props => props.isOpen ? 'rotate(90deg)' : 'rotate(0deg)'};
`;  

export default IndicatorIcon