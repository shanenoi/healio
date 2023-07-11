import { type FunctionComponent, useMemo } from 'react'
import { type Property } from 'csstype'
import type CSS from 'csstype'

interface TaiMuiHongContainerType {
  optionText?: string

  /** Style props */
  propColor?: Property.Color
}

const TaiMuiHongContainer: FunctionComponent<TaiMuiHongContainerType> = ({
  optionText,
  propColor
}) => {
  const nguynTnPhtStyle: CSS.Properties = useMemo(() => {
    return {
      color: propColor
    }
  }, [propColor])

  return (
    <div className="rounded-lg bg-monochrome-white box-border w-[1176px] flex flex-row p-6 items-center justify-start text-left text-sm text-grey-grey-900-p font-body-body-2 border-[1px] border-solid border-grey-grey-40-t">
      <div className="w-20 flex flex-col items-start justify-center">
        <div className="relative leading-[150%]">{optionText}</div>
      </div>
      <div className="self-stretch flex-1 flex flex-row items-center justify-start gap-[16px] text-green-green-900">
        <img className="relative w-12 h-12" alt="" src="/mask-group.svg" />
        <div className="flex flex-col items-start justify-start">
          <div
            className="relative leading-[150%] font-medium"
            style={nguynTnPhtStyle}
          >
            Nguyễn Tấn Phát
          </div>
        </div>
      </div>
      <div className="w-[185px] flex flex-col items-start justify-center gap-[4px]">
        <div className="relative leading-[150%]">0805232026</div>
        <div className="relative text-neutral-grey-800">
          phatpatient@gmail.com
        </div>
      </div>
      <div className="w-[200px] flex flex-col items-start justify-center text-center">
        <div className="flex flex-row items-center justify-start gap-[1px]">
          <div className="relative leading-[150%]">03</div>
          <div className="relative leading-[150%]">/</div>
          <div className="relative leading-[150%]">10</div>
          <div className="relative leading-[150%]">/</div>
          <div className="relative leading-[150%]">2022</div>
        </div>
      </div>
      <div className="flex-1 flex flex-col items-start justify-center text-blue-blue-400">
        <div className="relative leading-[150%] font-medium">Tai mũi họng</div>
      </div>
      <div className="w-[100px] flex flex-col items-start justify-center">
        <img className="relative w-8 h-8" alt="" src="/info-regular.svg" />
      </div>
    </div>
  )
}

export default TaiMuiHongContainer
