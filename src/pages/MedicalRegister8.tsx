import { FunctionComponent } from "react";
import PatientVisitContainer from "../components/PatientVisitContainer";

const MedicalRegister8: FunctionComponent = () => {
  return (
    <div className="relative bg-monochrome-white w-full h-[1024px]">
      <PatientVisitContainer
        productIds="/lefticon9.svg"
        productDimensions="/lefticon9.svg"
      />
      <img
        className="absolute top-[0px] left-[595px] w-[845px] h-[1024px]"
        alt=""
        src="/rectangle-15.svg"
      />
    </div>
  );
};

export default MedicalRegister8;
