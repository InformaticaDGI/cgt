import Header from "../../../components/Header/Header";
import styled from "styled-components";
import Stepper from "../../../components/Stepper/Stepper";
import BasicInformation from "./BasicInformation";

export default function CreateProjectView() {

    return <MainWrapper>
        <Header />
        <Stepper>
            <Stepper.Step>
                <BasicInformation />
            </Stepper.Step>
            <Stepper.Step>
                <h1>{/** TODO - STEP 2 */}</h1>
            </Stepper.Step>
            <Stepper.Step>
                <h1>{/** TODO - STEP 3 */}</h1>
            </Stepper.Step>
            <Stepper.Step>
                <h1>{/** TODO - STEP 4 */}</h1>
            </Stepper.Step>
        </Stepper>
    </MainWrapper>
}

const MainWrapper = styled.div`
    display: flex;
    flex-direction: column;
    gap: 12px;
    width: 100%;
    height: 100%;
    padding: 16px;
`;