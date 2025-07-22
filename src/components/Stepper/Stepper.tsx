import styled from "styled-components";
import StepperItem from "./StepperItem";
import { LuCheck, LuClipboardList, LuMapPin, LuPackage } from "react-icons/lu";
import { FaBullseye } from "react-icons/fa6";
import { createContext, useState } from "react";


const stepperConfig = [
    {
        icon: <LuClipboardList style={{ width: "1.5em", height: "1.5m" }} />,
        title: "Información Básica",
        done: false
    },
    {
        icon: <LuMapPin style={{ width: "1.5em", height: "1.5m" }} />,
        title: "Ubicación y Fechas",
        done: false
    },
    {
        icon: <LuPackage style={{ width: "1.5em", height: "1.5m" }} />,
        title: "Recursos del Proyecto",
        done: false
    },
    {
        icon: <FaBullseye style={{ width: "1.5em", height: "1.5m" }} />,
        title: "Metas del Proyecto",
        done: false
    }
]


export const StepperContext = createContext<{
    currentStep: number;
    isLastStep: boolean;
    isFirstStep: boolean;
    setStep: (step: number) => void;
    nextStep: () => void;
    previousStep: () => void;
}>({
    currentStep: 0,
    setStep: () => null,
    isLastStep: false,
    isFirstStep: false,
    nextStep: () => null,
    previousStep: () => null
})



const Stepper = ({ children }: { children: React.ReactNode[] }) => {

    const [currentStep, setStep] = useState<number>(0)
    const [config, setConfig] = useState<{ icon: React.ReactNode, title: string, done: boolean }[]>(stepperConfig)
    const firstStep = 0
    const lastStep = children.length - 1
    const isLastStep = currentStep === lastStep
    const isFirstStep = currentStep === firstStep

    const nextStep = () => {
        if (isLastStep) return
        setConfig(config.map((step, index) => index === currentStep ? { ...step, done: true } : step))
        setStep(currentStep + 1)
    }
    const previousStep = () => {
        if (isFirstStep) return
        setStep(currentStep - 1)
    }

    const handleStepClick = (step: number) => {
        if (step === currentStep) return
        if (step > lastStep) return
        if (step < firstStep) return
        if (config[step].done === false) return
        setStep(step)
    }

    return (
        <StepperContext.Provider value={{ currentStep, setStep: handleStepClick, isLastStep, isFirstStep, nextStep, previousStep }}>
            <StepperContainer>
                <StepperWrapper>
                    {config.map((step, index) => (
                        <StepperItem key={index} isLast={index === lastStep} onClick={() => handleStepClick(index)} isDone={step.done} icon={step.done ? <LuCheck style={{ width: '1.5em', height: '1.5em' }} /> : step.icon} isActive={currentStep === index}>
                            {step.title}
                        </StepperItem>
                    ))}
                </StepperWrapper>
                <StepperMainView>
                    {children[currentStep]}
                </StepperMainView>
            </StepperContainer>
        </StepperContext.Provider>
    )


}


const Step = ({ children }: { children: React.ReactNode }) => {
    return (
        <div>
            {children}
        </div>
    )
}

const StepperContainer = ({ children }: { children: React.ReactNode }) => {
    return (
        <StyledStepperContainer>
            {children}
        </StyledStepperContainer>
    )
}

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


const StepperWrapper = styled.div`
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

Stepper.Step = Step;
export default Stepper;
