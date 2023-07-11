import { FunctionComponent } from "react";
import PatientVisitContainer from "../components/PatientVisitContainer";
import EmployeeInfoCard from "../components/EmployeeInfoCard";

const MedicalRegister2: FunctionComponent = () => {
  return (
    <div className="relative bg-monochrome-white w-full h-[1024px]">
      <PatientVisitContainer
        productIds="/lefticon2.svg"
        productDimensions="/lefticon2.svg"
      />
      <div className="absolute top-[calc(50%_-_512px)] left-[calc(50%_-_720px)] bg-blur-background w-[1440px] h-[1024px]" />
      <EmployeeInfoCard
        maskGroup="/mask-group1.svg"
        rightIcon="/righticon1.svg"
        xRegular="/x-regular.svg"
        leftIcon="/lefticon21.svg"
        rightIcon1="/lefticon21.svg"
      />
    </div>
  );
};

export default MedicalRegister2;
