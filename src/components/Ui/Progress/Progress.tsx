import styled from "styled-components"
import { Box } from "../../Layout/Box"


const ProgressBar = styled.div<{ $size: string, $color: string }>`
    height: ${({ $size }) => $size};
    background-color: ${({ $color }) => $color};
    border-radius: 10px;
`;

const ProgressContainer = styled.div`
    position: relative;
    width: 100%;
    height: 10px;
    background-color: #e0e0e0;
    border-radius: 10px;
`;



const Progress = ({ value, max, color, size }: { value: number, max: number, color: string, size: string }) => {

    const progress = (value / max) * 100

    return (

        <ProgressContainer>
            <ProgressBar $size={size} $color={color}>
                <Box className={`h-full bg-${color} rounded-full`} style={{ height: '100%', width: `${progress}%` }}></Box>
            </ProgressBar>
            <ProgressBar $size={size} $color={color}>
                <Box className={`h-full bg-${color} rounded-full`} style={{ height: '100%', width: `${progress}%` }}></Box>
            </ProgressBar>
        </ProgressContainer>


    )
}

export default Progress;