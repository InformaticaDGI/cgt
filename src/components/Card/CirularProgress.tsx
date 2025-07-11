import styled from "styled-components";
import Progress from "./Progress"
import { toHexColor, type Color } from "../../utils/libs";

const CircularProgress = ({ progress }: { progress: number }) => {

  const colors: Array<Color> = [
    { min: 0, max: 25, color: "#DC2626" },
    { min: 26, max: 50, color: "#EA580C" },
    { min: 51, max: 75, color: "#FDE047" },
    { min: 76, max: 100, color: "#14AE5C" }
  ]

  const progressColor = toHexColor(colors, progress);

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