import { FunctionComponent } from "react";
import PatientVisitContainer from "../components/PatientVisitContainer";
import EmployeeInfoContainer from "../components/EmployeeInfoContainer";

const MedicalRegister: FunctionComponent = () => {
  return (
    <div className="relative bg-monochrome-white w-full h-[1024px]">
      <PatientVisitContainer
        productIds="/lefticon.svg"
        productDimensions="/lefticon.svg"
      />
      <div className="absolute top-[calc(50%_-_512px)] left-[calc(50%_-_720px)] bg-blur-background w-[1440px] h-[1024px]" />
      <EmployeeInfoContainer
        maskGroup="/mask-group.svg"
        rightIcon="/righticon.svg"
        xRegular="/x-regular.svg"
        leftIcon="/lefticon2.svg"
        rightIcon1="/lefticon2.svg"
      />
    </div>
  );
};

export default MedicalRegister;
