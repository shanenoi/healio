import React, {type FunctionComponent} from 'react'
import ToggleSwitch from './ToggleSwitch'

// TODO: add validate for each input

interface EmployeeInfoContainerType {
    onCloseClick: () => void
}

const PatientDetailsPopup: FunctionComponent<EmployeeInfoContainerType> = ({onCloseClick}) => {
    return <div
        className="absolute top-[calc(50%_-_328px)] left-[calc(50%_-_350px)] rounded-2xl bg-monochrome-white flex flex-row py-0 px-8 items-start justify-start text-center text-sm text-neutral-grey-700 font-button-button-2">
        <div
            className="self-stretch w-[636px] flex flex-col py-8 px-0 box-border items-center justify-start gap-[32px]">
            <div className="self-stretch flex flex-row items-start justify-between text-blue-blue-400">
                <div className="flex-1 flex flex-col items-center justify-center gap-[16px]">
                    <img
                        className="relative w-[100px] h-[100px]"
                        alt=""
                        src={'/mask-group4.svg'}
                    />
                </div>
                <img className="relative w-6 h-6 cursor-button" alt="" src={'/x-regular3.svg'}
                     onClick={onCloseClick}/>
            </div>
            <div className="self-stretch flex flex-col items-start justify-start gap-[16px] text-left text-base">
                <div className="relative font-medium">Thông tin bệnh nhân</div>
                <div
                    className="self-stretch flex flex-col items-start justify-start gap-[16px] text-xs text-grey-grey-900-p">
                    <div className="self-stretch flex flex-row items-start justify-start gap-[16px]">
                        <div className="w-[310px] flex flex-col items-start justify-start">
                            <div className="flex flex-row items-start justify-start gap-[2px]">
                                <div className="relative leading-[150%]">Tên</div>
                                <div
                                    className="relative text-xl leading-[24px] font-semibold font-mobile-body-subtitle-2 text-red-red-400">
                                    *
                                </div>
                            </div>
                            <div
                                className="self-stretch flex flex-col items-start justify-start gap-[4px] text-sm text-grey-grey-300-s">
                                <div
                                    className="self-stretch rounded-3xs bg-monochrome-white box-border h-[41px] flex flex-row py-0 px-4 items-center justify-start gap-[4px] border-[1px] border-solid border-grey-grey-40-t">
                                    <img
                                        className="relative w-[22px] h-[22px] hidden"
                                        alt=""
                                        src="/left-icon.svg"
                                    />
                                    <div className="flex-1 relative leading-[150%]">
                                        <input
                                            type="text"
                                            className={'input'}
                                            // placeholder={'Văn A'}
                                            value={''}
                                            disabled={true}
                                        />
                                    </div>
                                    <img
                                        className="relative w-[22px] h-[22px] hidden"
                                        alt=""
                                        src="/left-icon.svg"
                                    />
                                </div>
                                <div
                                    className="self-stretch hidden flex-row py-0 px-3 items-end justify-start gap-[4px] text-red-red-400">
                                    <img
                                        className="relative w-5 h-5"
                                        alt=""
                                        src="/notice-icon.svg"
                                    />
                                    <div className="flex-1 relative leading-[150%]">Allert</div>
                                </div>
                            </div>
                        </div>
                        <div className="w-[310px] flex flex-col items-start justify-start">
                            <div className="flex flex-row items-start justify-start gap-[2px]">
                                <div className="relative leading-[150%]">Họ</div>
                                <div
                                    className="relative text-xl leading-[24px] font-semibold font-mobile-body-subtitle-2 text-red-red-400">
                                    *
                                </div>
                            </div>
                            <div
                                className="self-stretch flex flex-col items-start justify-start gap-[4px] text-sm text-grey-grey-300-s">
                                <div
                                    className="self-stretch rounded-3xs bg-monochrome-white box-border h-[41px] flex flex-row py-0 px-4 items-center justify-start gap-[4px] border-[1px] border-solid border-grey-grey-40-t">
                                    <img
                                        className="relative w-[22px] h-[22px] hidden"
                                        alt=""
                                        src="/left-icon.svg"
                                    />
                                    <div className="flex-1 relative leading-[150%]">
                                        <input
                                            type="text"
                                            className={'input'}
                                            placeholder={'--'}
                                            value={''}
                                            disabled={true}
                                        />
                                    </div>
                                    <img
                                        className="relative w-[22px] h-[22px] hidden"
                                        alt=""
                                        src="/left-icon.svg"
                                    />
                                </div>
                                <div
                                    className="self-stretch hidden flex-row py-0 px-3 items-end justify-start gap-[4px] text-red-red-400">
                                    <img
                                        className="relative w-5 h-5"
                                        alt=""
                                        src="/notice-icon.svg"
                                    />
                                    <div className="flex-1 relative leading-[150%]">Allert</div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="self-stretch flex flex-row items-start justify-start gap-[16px]">
                        <div className="w-[310px] flex flex-col items-start justify-start">
                            <div className="flex flex-row items-start justify-start gap-[2px]">
                                <div className="relative leading-[150%]">Số điện thoại</div>
                                <div
                                    className="relative text-xl leading-[24px] font-semibold font-mobile-body-subtitle-2 text-red-red-400">
                                    *
                                </div>
                            </div>
                            <div
                                className="self-stretch flex flex-col items-start justify-start gap-[4px] text-sm text-grey-grey-300-s">
                                <div
                                    className="self-stretch rounded-3xs bg-monochrome-white box-border h-[41px] flex flex-row py-0 px-4 items-center justify-start gap-[4px] border-[1px] border-solid border-grey-grey-40-t">
                                    <img
                                        className="relative w-[22px] h-[22px] hidden"
                                        alt=""
                                        src="/left-icon.svg"
                                    />
                                    <div className="flex-1 relative leading-[150%]">
                                        <input
                                            type="number"
                                            className={'input no-arrows'}
                                            placeholder={'--'}
                                            value={''}
                                            disabled={true}
                                        />
                                    </div>
                                    <img
                                        className="relative w-[22px] h-[22px] hidden"
                                        alt=""
                                        src="/left-icon.svg"
                                    />
                                </div>
                                <div
                                    className="self-stretch hidden flex-row py-0 px-3 items-end justify-start gap-[4px] text-red-red-400">
                                    <img
                                        className="relative w-5 h-5"
                                        alt=""
                                        src="/notice-icon.svg"
                                    />
                                    <div className="flex-1 relative leading-[150%]">Allert</div>
                                </div>
                            </div>
                        </div>
                        <div className="w-[310px] flex flex-col items-start justify-start">
                            <div className="flex flex-row items-start justify-start gap-[2px]">
                                <div className="relative leading-[150%]">Gmail</div>
                                <div
                                    className="relative text-xl leading-[24px] font-semibold font-mobile-body-subtitle-2 text-red-red-400">
                                    *
                                </div>
                            </div>
                            <div
                                className="self-stretch flex flex-col items-start justify-start gap-[4px] text-sm text-grey-grey-300-s">
                                <div
                                    className="self-stretch rounded-3xs bg-monochrome-white box-border h-[41px] flex flex-row py-0 px-4 items-center justify-start gap-[4px] border-[1px] border-solid border-grey-grey-40-t">
                                    <img
                                        className="relative w-[22px] h-[22px] hidden"
                                        alt=""
                                        src="/left-icon.svg"
                                    />
                                    <div className="flex-1 relative leading-[150%]">
                                        <input
                                            type="email"
                                            className={'input'}
                                            placeholder={'--'}
                                            value={''}
                                            disabled={true}
                                        />
                                    </div>
                                    <img
                                        className="relative w-[22px] h-[22px] hidden"
                                        alt=""
                                        src="/left-icon.svg"
                                    />
                                </div>
                                <div
                                    className="self-stretch hidden flex-row py-0 px-3 items-end justify-start gap-[4px] text-red-red-400">
                                    <img
                                        className="relative w-5 h-5"
                                        alt=""
                                        src="/notice-icon.svg"
                                    />
                                    <div className="flex-1 relative leading-[150%]">Allert</div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="self-stretch flex flex-row items-start justify-start gap-[16px]">
                        <div className="w-[310px] flex flex-col items-start justify-start">
                            <div className="flex flex-row items-start justify-start gap-[2px]">
                                <div className="relative leading-[150%]">Loại khám</div>
                                <div
                                    className="relative text-xl leading-[24px] font-semibold font-mobile-body-subtitle-2 text-red-red-400">
                                    *
                                </div>
                            </div>
                            <div
                                className="self-stretch rounded-lg bg-monochrome-white box-border h-10 flex flex-row py-2 pr-2 pl-4 items-center justify-start gap-[6px] text-sm text-grey-grey-300-s border-[1px] border-solid border-grey-grey-40-t">
                                <div className="flex-1 relative leading-[150%] flex items-center h-4">
                                    <div className="flex flex-row items-center justify-start gap-[1px]">
                                        <div className="relative leading-[150%]">{''}</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="w-[310px] flex flex-col items-start justify-start">
                            <div className="flex flex-row items-start justify-start gap-[2px]">
                                <div className="relative leading-[150%]">Bác Sĩ</div>
                                <div
                                    className="relative text-xl leading-[24px] font-semibold font-mobile-body-subtitle-2 text-red-red-400">
                                    *
                                </div>
                            </div>
                            <div
                                className="self-stretch rounded-lg bg-monochrome-white box-border h-10 flex flex-row py-2 pr-2 pl-4 items-center justify-start gap-[6px] text-sm text-grey-grey-300-s border-[1px] border-solid border-grey-grey-40-t">
                                <div className="flex-1 relative leading-[150%] flex items-center h-4">
                                    <select
                                        className={'input select-input flex-1 relative leading-[150%] flex items-center h-7'}
                                        value={''}
                                        onChange={(e) => {
                                        }}
                                    >
                                        <option
                                            className={'select-input-option'}
                                            value={''} disabled>{'nullBacSiID'}
                                        </option>
                                    </select>

                                </div>
                            </div>
                        </div>

                        <div className="w-[310px] flex flex-col items-start justify-start gap-[6px]">
                            <div className="flex flex-row items-start justify-start gap-[2px]">
                                <div className="relative leading-[150%]">Hẹn ngày khám
                                </div>
                                <ToggleSwitch checked={true} onChange={() => {
                                }}/>
                                <div
                                    className="relative text-xl leading-[24px] font-semibold font-mobile-body-subtitle-2 text-red-red-400 hidden">
                                    *
                                </div>
                            </div>
                            <div className="w-[310px] flex flex-col items-start justify-start">
                                <div
                                    className="self-stretch flex flex-col items-start justify-start gap-[4px] text-center text-sm">
                                    <div
                                        className="self-stretch hidden flex-row py-0 px-3 items-end justify-start gap-[4px] text-left text-red-red-400">
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="w-[636px] flex flex-col items-start justify-start">
                        <div className="flex flex-row items-start justify-start gap-[2px]">
                            <div className="relative leading-[150%]">Mô tả</div>
                            <div
                                className="relative text-xl leading-[24px] font-semibold font-mobile-body-subtitle-2 text-red-red-400 hidden">
                                *
                            </div>
                        </div>
                        <div
                            className="self-stretch flex flex-col items-start justify-start gap-[4px] text-sm text-grey-grey-300-s">
                            <div
                                className="self-stretch rounded-3xs bg-monochrome-white box-border h-[41px] flex flex-row py-0 px-4 items-center justify-start gap-[4px] border-[1px] border-solid border-grey-grey-40-t">
                                <img
                                    className="relative w-[22px] h-[22px] hidden"
                                    alt=""
                                    src="/left-icon.svg"
                                />
                                <div className="flex-1 relative leading-[150%]">
                                    <input
                                        type="text"
                                        placeholder={'Hãy mô tả về tình trạng của bạn'}
                                        className={'input flex-1 relative  w-[100%]'}
                                        value={''}
                                        onChange={() => {
                                        }}
                                    />
                                </div>
                                <img
                                    className="relative w-[22px] h-[22px] hidden"
                                    alt=""
                                    src="/left-icon.svg"
                                />
                            </div>
                            <div
                                className="self-stretch hidden flex-row py-0 px-3 items-end justify-start gap-[4px] text-red-red-400">
                                <img
                                    className="relative w-5 h-5"
                                    alt=""
                                    src="/notice-icon.svg"
                                />
                                <div className="flex-1 relative leading-[150%]">Allert</div>
                            </div>
                        </div>
                    </div>
                    <div
                        className="self-stretch hidden flex-col items-start justify-start gap-[4px] text-neutral-grey-600">
                        <div className="self-stretch flex flex-row items-start justify-start gap-[4px]">
                            <div className="relative">Địa chỉ làm việc</div>
                            <div className="relative text-semantic-error-error-05">*</div>
                        </div>
                        <div
                            className="self-stretch rounded-lg bg-monochrome-white box-border h-10 flex flex-row py-2 pr-2 pl-4 items-center justify-start gap-[6px] text-sm text-neutral-grey-500-secondary border-[1px] border-solid border-neutral-grey-200">
                            <div className="flex-1 relative flex items-center h-4">
                                Nhập địa chỉ làm việc
                            </div>
                            <div className="h-5 flex flex-col py-0.5 px-0 box-border items-start justify-start">
                                <div
                                    className="flex-1 relative box-border w-px border-r-[1px] border-solid border-neutral-grey-200"/>
                            </div>
                            <img
                                className="relative w-6 h-6 hidden"
                                alt=""
                                src="/caretdown1.svg"
                            />
                        </div>
                    </div>
                </div>
            </div>
            <div
                className="rounded-xl bg-blue-blue-300 w-[636px] h-12 flex flex-row py-2 px-4 box-border items-center justify-center gap-[8px] text-monochrome-white cursor-button"
                onClick={() => {
                }}>
                <img className="relative w-7 h-7 hidden" alt="" src={'/lefticon8.svg'}/>
                <div className="relative leading-[150%] uppercase font-medium cursor-button">
                    Đăng ký khám bệnh
                </div>
                <img className="relative w-7 h-7 hidden" alt="" src={'/lefticon8.svg'}/>
            </div>
        </div>
    </div>
}

export default PatientDetailsPopup
