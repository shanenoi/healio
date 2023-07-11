import { FunctionComponent } from "react";

const Title: FunctionComponent = () => {
  return (
    <div className="relative w-full flex flex-col items-start justify-start text-left text-77xl text-monochrome-white font-body-body-2">
      <div className="bg-blue-blue-600 flex flex-row py-8 px-12 items-start justify-start">
        <b className="relative">Login</b>
      </div>
      <div className="self-stretch relative box-border h-1.5 border-t-[6px] border-solid border-blue-blue-800" />
    </div>
  );
};

export default Title;
