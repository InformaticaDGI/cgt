import styled from "styled-components"


const StyledProgress = styled.div<{ $progress: number, $color: string,$backgroundColor: string }>`
    position: relative;
    height: 8px;
    background-color: ${({ $backgroundColor }) => $backgroundColor};
    border-radius: 4px;
    width: 260px;
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



const Progress = ({ value, max, color, backgroundColor }: { value: number, max: number, color: string, backgroundColor: string }) => {

    const progress = (value / max) * 100

    return <StyledProgress $progress={progress} $color={color} $backgroundColor={backgroundColor} />
}

export default Progress;