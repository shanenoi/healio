import { FunctionComponent } from "react";
import PatientVisitContainer from "../components/PatientVisitContainer";
import EmployeeDataContainer from "../components/EmployeeDataContainer";

const MedicalRegister4: FunctionComponent = () => {
  return (
    <div className="relative bg-monochrome-white w-full h-[1024px]">
      <PatientVisitContainer
        productIds="/lefticon5.svg"
        productDimensions="/lefticon5.svg"
      />
      <div className="absolute top-[calc(50%_-_512px)] left-[calc(50%_-_720px)] bg-blur-background w-[1440px] h-[1024px]" />
      <EmployeeDataContainer
        maskGroup="/mask-group3.svg"
        rightIcon="/righticon3.svg"
        xRegular="/x-regular2.svg"
        leftIcon="/lefticon6.svg"
        rightIcon1="/lefticon6.svg"
      />
    </div>
  );
};

export default MedicalRegister4;
