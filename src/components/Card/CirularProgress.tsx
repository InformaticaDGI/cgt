import styled from "styled-components";
import Progress from "./Progress"

const CircularProgress = ({ progress }: { progress: number }) => {

  let progressColor = "#DC2626";

  if (progress >= 75) {
    progressColor = "#14AE5C"
  } else if (progress >= 50) {
    progressColor = "#FDE047"
  } else  if (progress >= 25) {
    progressColor = "#EA580C"
  }


  return (
    <StyledProgressIndicator>
      <Progress progress={progress} color={progressColor} backgroundColor="#F3F4F6" strokeWidth={10} size={130} />
    </StyledProgressIndicator>
  )


}

export default CircularProgress

const StyledProgressIndicator = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;