import { useContext } from "react";
import { StepperContext } from "./StepperContext";

const useStepper = () => {
    const stepper = useContext(StepperContext)
    if (!stepper) {
        throw new Error("useStepper must be used within a Stepper component")
    }
    return stepper
}

export default useStepper;