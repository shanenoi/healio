import { FunctionComponent } from "react";
import PatientVisitContainer from "../components/PatientVisitContainer";
import EmployeeInfoContainer from "../components/EmployeeInfoContainer";

const MedicalRegister7: FunctionComponent = () => {
  return (
    <div className="relative bg-monochrome-white w-full h-[1024px]">
      <PatientVisitContainer
        productIds="/lefticon7.svg"
        productDimensions="/lefticon7.svg"
      />
      <div className="absolute top-[calc(50%_-_512px)] left-[calc(50%_-_720px)] bg-blur-background w-[1440px] h-[1024px]" />
      <EmployeeInfoContainer
        maskGroup="/mask-group4.svg"
        rightIcon="/righticon4.svg"
        xRegular="/x-regular3.svg"
        leftIcon="/lefticon8.svg"
        rightIcon1="/lefticon8.svg"
      />
    </div>
  );
};

export default MedicalRegister7;
