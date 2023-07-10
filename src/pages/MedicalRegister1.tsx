import { FunctionComponent } from "react";
import PatientVisitContainer from "../components/PatientVisitContainer";
import EmployeeInfoContainer from "../components/EmployeeInfoContainer";

const MedicalRegister1: FunctionComponent = () => {
  return (
    <div className="relative bg-monochrome-white w-full h-[1024px]">
      <PatientVisitContainer
        productIds="/lefticon3.svg"
        productDimensions="/lefticon3.svg"
      />
      <div className="absolute top-[calc(50%_-_512px)] left-[calc(50%_-_720px)] bg-blur-background w-[1440px] h-[1024px]" />
      <EmployeeInfoContainer
        maskGroup="/mask-group1.svg"
        rightIcon="/righticon1.svg"
        xRegular="/x-regular1.svg"
        leftIcon="/lefticon4.svg"
        rightIcon1="/lefticon4.svg"
      />
    </div>
  );
};

export default MedicalRegister1;
