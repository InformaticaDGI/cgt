import styled from "styled-components";
import CircularProgress from "../Ui/CircularProgress/CircularProgress"
import { toHexColor, type Color } from "../../utils/libs";

type IndicatorProgressProps = {
  value: number,
  size?: number,
  strokeWidth?: number,
  textSize?: number,
  backgroundColor?: string
  overrideProgressColor?: string
}

const IndicatorProgress = ({ value, size = 180, strokeWidth = 10, textSize = 20, backgroundColor = "#F3F4F6", overrideProgressColor }: IndicatorProgressProps) => {

  const colors: Array<Color> = [
    { min: 0, max: 59, color: "#DC2626" },
    { min: 60, max: 99, color: "#FDE047" },
    { min: 100, max: 100, color: "#14AE5C" }
  ]

  const progressColor = overrideProgressColor || toHexColor(colors, value);

  return (
    <StyledProgressIndicator>
      <CircularProgress progress={value} color={progressColor} backgroundColor={backgroundColor} strokeWidth={strokeWidth} size={size} textSize={textSize} />
    </StyledProgressIndicator>
  )


}

export default IndicatorProgress

const StyledProgressIndicator = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;