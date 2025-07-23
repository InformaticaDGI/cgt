import Header from "../../../components/Header/Header";
import styled from "styled-components";
import Stepper from "../../../components/Stepper/Stepper";
import BasicInformation from "./BasicInformationStep";
import LocationStep from "./LocationStep";
import ResourceStep from "./ResourceStep";
import { LuClipboardList, LuMapPin, LuPackage } from "react-icons/lu";
import { FaBullseye } from "react-icons/fa6";
import KpiStep from "./KpiStep";

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



export default function CreateProjectView() {
  return (
    <MainWrapper>
      <Header />
      <Stepper config={stepperConfig}>
        <Stepper.Step>
          <BasicInformation />
        </Stepper.Step>
        <Stepper.Step>
          <LocationStep />
        </Stepper.Step>
        <Stepper.Step>
          <ResourceStep />
        </Stepper.Step>
        <Stepper.Step>
          <KpiStep />
        </Stepper.Step>
      </Stepper>
    </MainWrapper>
  );
}
const MainWrapper = styled.div`
    display: flex;
    flex-direction: column;
    gap: 12px;
    width: 100%;
    height: 100%;
    padding: 16px;
`;