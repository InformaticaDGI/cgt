import styled from "styled-components";
import { useState } from "react";
import StepperNavigation from "./StepperNavigation";
import { StepperContext } from "./StepperContext";

export interface StepperConfig {
    icon: React.ReactNode;
    title: string;
    done: boolean;
}

export interface StepperProps {
    children: React.ReactNode[];
    config: StepperConfig[];
}

export interface StepProps {
    children: React.ReactNode;
}

export interface StepperComponent extends React.FC<StepperProps> {
    Step: React.FC<StepProps>;
}


const Stepper: StepperComponent = ({ children, config }: StepperProps) => {

    const [currentStep, setCurrentStep] = useState<number>(0)
    const [stepperConfig, setStepperConfig] = useState<StepperConfig[]>(config)
    const firstStep = 0
    const lastStep = children.length - 1
    const isLastStep = currentStep === lastStep
    const isFirstStep = currentStep === firstStep


    const resetStepper = () => {
        setCurrentStep(0)
        setStepperConfig(config)
    }

    const nextStep = () => {
        if (isLastStep) return
        setStepperConfig(stepperConfig.map((step, index) => index === currentStep ? { ...step, done: true } : step))
        setCurrentStep(currentStep + 1)
    }

    const previousStep = () => {
        if (isFirstStep) return
        setCurrentStep(currentStep - 1)
    }

    const setStep = (step: number) => {
        if (step === currentStep) return
        if (step > lastStep) return
        if (step < firstStep) return
        if (stepperConfig[step].done === false) return
        setCurrentStep(step)
    }

    return (
        <StepperContext.Provider value={{ currentStep, setStep, isLastStep, isFirstStep, nextStep, previousStep, lastStep, firstStep, resetStepper }}>
            <StepperContainer>
                <StepperNavigation config={stepperConfig} />
                <StepperMainView>
                    {children[currentStep]}
                </StepperMainView>
            </StepperContainer>
        </StepperContext.Provider>
    )


}

const StepperContainer = ({ children }: { children: React.ReactNode }) => {
    return (
        <StyledStepperContainer>
            {children}
        </StyledStepperContainer>
    )
}

const Step: React.FC<StepProps> = ({ children }) => {
    return (
        <StyledStep>
            {children}
        </StyledStep>
    )
}

Stepper.Step = Step;



const StyledStep = styled.div`
    width: 100%;
    height: 100%;
`

const StyledStepperContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 10px;
    width: 100%;
    height: 100%;
`

const StepperMainView = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    width: 100%;
    height: 100%;
`
export default Stepper;
