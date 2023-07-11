import { FunctionComponent } from "react";

type PatientVisitContainerType = {
  productIds?: string;
  productDimensions?: string;
};

const PatientVisitContainer: FunctionComponent<PatientVisitContainerType> = ({
  productIds,
  productDimensions,
}) => {
  return (
    <div className="absolute top-[224px] left-[32px] w-[437px] flex flex-col items-start justify-start gap-[80px] text-left text-29xl text-neutral-neutral-6 font-body-body-2">
      <b className="relative leading-[150%] inline-block w-[437px]">
        Khám bệnh tại bệnh viện tư nhân
      </b>
      <div className="self-stretch flex flex-row items-start justify-start text-center text-base text-monochrome-white">
        <div className="rounded-xl bg-blue-blue-300 w-[400px] h-12 flex flex-row py-2 px-4 box-border items-center justify-center gap-[8px]">
          <img className="relative w-7 h-7 hidden" alt="" src={productIds} />
          <div className="relative leading-[150%] font-semibold">
            ĐĂNG KÝ KHÁM BỆNH
          </div>
          <img
            className="relative w-7 h-7 hidden"
            alt=""
            src={productDimensions}
          />
        </div>
      </div>
    </div>
  );
};

export default PatientVisitContainer;
