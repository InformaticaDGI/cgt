import styled from "styled-components"
import StepperItem from "./StepperItem"
import { type StepperConfig } from "./Stepper"
import useStepper from "./useStepper"
import { LuCheck } from "react-icons/lu"

const StepperNavigation = ({ config }: { config: StepperConfig[] }) => {

    const { currentStep, lastStep, setStep } = useStepper()

    return (
        <StyledStepperNavigation>
            {config.map((step, index) => (
                <StepperItem key={index} isLast={index === lastStep} onClick={() => setStep(index)} isDone={step.done} icon={step.done ? <LuCheck style={{ width: '1.5em', height: '1.5em' }} /> : step.icon} isActive={currentStep === index}>
                    {step.title}
                </StepperItem>
            ))}
        </StyledStepperNavigation>
    )

}

export default StepperNavigation


const StyledStepperNavigation = styled.div`
    background: #ffffff;
    box-shadow: rgba(0, 0, 0, 0.1) 0px 0px 10px 0px;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    gap: 10px;
    width: 100%;
    height: 100%;
    padding: 10px;
    border-radius: 10px;
`