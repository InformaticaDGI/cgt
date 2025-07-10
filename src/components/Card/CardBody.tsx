import styled from "styled-components"
import Text from "../Ui/Text"
import CircularProgress from "./CirularProgress"

const CardBody = ({ progress, subtitle, info, description }: { progress: number, subtitle: string | false, info: string | false, description: string | false }) => {
    return <StyledCardBody>
        {subtitle !== false && <Text style={{ fontSize: '14px', color: '#5A787A' }}>{subtitle}</Text>}
        <StyledIndicatorWrapper>
            <CircularProgress progress={progress}  />
            {info !== false && <Text style={{ fontSize: '12px', color: '#5A787A', fontWeight: '600' }}>{info}</Text>}
            {description !== false && <Text style={{ fontSize: '11px', color: '#7A8E8B', fontWeight: 'normal', textAlign: 'justify' }} >{description}</Text>}
        </StyledIndicatorWrapper>
        <StyledSeparator />
    </StyledCardBody>
}

export default CardBody

const StyledSeparator = styled.div`
    background: #F3F3F3;
    height: 1px;
    width: 100%;
`;

const StyledCardBody = styled.div`
    display: flex;
    flex-direction: column;
    gap: 8px;
`;

const StyledIndicatorWrapper = styled.div`
    display: flex;
    flex-direction: column;
    gap: 4px;
`;