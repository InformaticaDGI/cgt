import styled from "styled-components"


const StyledProgress = styled.div<{ $progress: number, maxWidth: string, $color: string,$backgroundColor: string }>`
    position: relative;
    height: 8px;
    background-color: ${({ $backgroundColor }) => $backgroundColor};
    border-radius: 4px;
    width: ${({ maxWidth }) => maxWidth || '260px'};
    &:after {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        width: ${({ $progress }) => $progress}%;
        height: 100%;
        background-color: ${({ $color }) => $color};
        border-radius: 4px;
    }
`;



const Progress = ({ value, max, color, backgroundColor, maxWidth = '260px' }: { value: number, max: number, color: string, backgroundColor: string, maxWidth?: string }) => {

    const progress = (value / max) * 100

    return <StyledProgress $progress={progress} maxWidth={maxWidth} $color={color} $backgroundColor={backgroundColor} />
}

export default Progress;