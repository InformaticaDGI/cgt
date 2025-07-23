import { createContext } from "react";

interface StepperContextType {
    currentStep: number;
    isLastStep: boolean;
    isFirstStep: boolean;
    lastStep: number;
    firstStep: number;
    setStep: (step: number) => void;
    nextStep: () => void;
    previousStep: () => void;
    resetStepper: () => void;
}

export const StepperContext = createContext<StepperContextType>({
    currentStep: 0,
    setStep: () => null,
    isLastStep: false,
    isFirstStep: false,
    nextStep: () => null,
    previousStep: () => null,
    lastStep: 0,
    firstStep: 0,
    resetStepper: () => null,
})
