import { type FunctionComponent } from 'react'

interface EmployeeInfoCardType {
  maskGroup?: string
  rightIcon?: string
  xRegular?: string
  leftIcon?: string
  rightIcon1?: string
}

const EmployeeInfoCard: FunctionComponent<EmployeeInfoCardType> = ({
  maskGroup,
  rightIcon,
  xRegular,
  leftIcon,
  rightIcon1
}) => {
  return (
        <div
            className="absolute top-[calc(50%_-_482px)] left-[calc(50%_-_350px)] rounded-2xl bg-monochrome-white flex flex-row py-0 px-8 items-start justify-start text-center text-sm text-neutral-grey-700 font-button-button-2">
            <div
                className="self-stretch w-[636px] flex flex-col py-8 px-0 box-border items-center justify-start gap-[32px]">
                <div className="self-stretch flex flex-row items-start justify-between text-blue-blue-400">
                    <img className="relative w-6 h-6" alt=""/>
                    <div className="flex-1 flex flex-col items-center justify-center gap-[16px]">
                        <img
                            className="relative w-[100px] h-[100px]"
                            alt=""
                            src={maskGroup}
                        />
                        <div
                            className="rounded-lg bg-monochrome-white box-border h-8 flex flex-row py-2 px-4 items-center justify-center gap-[8px] border-[1px] border-solid border-blue-blue-400">
                            <img className="relative w-4 h-4" alt="" src="/lefticon1.svg"/>
                            <div className="relative leading-[150%] uppercase font-medium">
                                chọn ảnh
                            </div>
                            <img className="relative w-6 h-6 hidden" alt="" src={rightIcon}/>
                        </div>
                    </div>
                    <img className="relative w-6 h-6" alt="" src={xRegular}/>
                </div>
                <div className="self-stretch flex flex-col items-start justify-start gap-[16px] text-left text-base">
                    <div className="relative font-medium">Thông tin nhân viên</div>
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
                                        <div className="flex-1 relative leading-[150%]"> A</div>
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
                                            Nguyen Van
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
                                            0123456789
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
                                            benhvientunhan@gmail.com
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
                                        Chọn loại khám bệnh
                                    </div>
                                    <div className="h-5 flex flex-col py-0.5 px-0 box-border items-start justify-start">
                                        <div
                                            className="flex-1 relative box-border w-px border-r-[1px] border-solid border-grey-grey-40-t"/>
                                    </div>
                                    <img
                                        className="relative w-6 h-6"
                                        alt=""
                                        src="/caretdown.svg"
                                    />
                                </div>
                            </div>
                            <div className="w-[310px] flex flex-col items-start justify-start gap-[6px]">
                                <div className="flex flex-row items-start justify-start gap-[2px]">
                                    <div className="relative leading-[150%]">Hẹn ngày khám</div>
                                    <div
                                        className="relative text-xl leading-[24px] font-semibold font-mobile-body-subtitle-2 text-red-red-400 hidden">
                                        *
                                    </div>
                                </div>
                                <div
                                    className="bg-monochrome-white shadow-[0px_2px_8px_rgba(0,_0,_0,_0.1)] h-[348px] flex flex-col py-2 px-0 box-border items-center justify-center gap-[16px] text-center text-lg">
                                    <div
                                        className="w-[358px] flex flex-row py-0 px-4 box-border items-center justify-between">
                                        <img
                                            className="relative w-8 h-8"
                                            alt=""
                                            src="/group-37.svg"
                                        />
                                        <div className="relative leading-[150%] font-semibold">
                                            Tháng 9, 2022
                                        </div>
                                        <img
                                            className="relative w-8 h-8"
                                            alt=""
                                            src="/group-38.svg"
                                        />
                                    </div>
                                    <div className="flex flex-col items-start justify-start gap-[8px] text-sm">
                                        <div
                                            className="w-[358px] h-10 flex flex-row py-0 px-4 box-border items-center justify-center text-blue-blue-400">
                                            <div
                                                className="self-stretch w-[46px] flex flex-row p-2.5 box-border items-center justify-center">
                                                <div className="relative leading-[150%]">H</div>
                                            </div>
                                            <div
                                                className="self-stretch w-[46px] flex flex-row p-2.5 box-border items-center justify-center">
                                                <div className="relative leading-[150%]">B</div>
                                            </div>
                                            <div
                                                className="self-stretch w-[46px] flex flex-row p-2.5 box-border items-center justify-center">
                                                <div className="relative leading-[150%]">T</div>
                                            </div>
                                            <div
                                                className="self-stretch w-[46px] flex flex-row p-2.5 box-border items-center justify-center">
                                                <div className="relative leading-[150%]">N</div>
                                            </div>
                                            <div
                                                className="self-stretch w-[46px] flex flex-row p-2.5 box-border items-center justify-center">
                                                <div className="relative leading-[150%]">S</div>
                                            </div>
                                            <div
                                                className="self-stretch w-[46px] flex flex-row p-2.5 box-border items-center justify-center">
                                                <div className="relative leading-[150%]">B</div>
                                            </div>
                                            <div
                                                className="self-stretch w-[46px] flex flex-row p-2.5 box-border items-center justify-center">
                                                <div className="relative leading-[150%]">CN</div>
                                            </div>
                                        </div>
                                        <div
                                            className="w-[358px] h-10 flex flex-row py-0 px-4 box-border items-center justify-center">
                                            <div
                                                className="self-stretch w-[46px] flex flex-row p-2.5 box-border items-center justify-center text-grey-grey-40-t">
                                                <div className="relative leading-[150%]">29</div>
                                            </div>
                                            <div
                                                className="self-stretch w-[46px] flex flex-row p-2.5 box-border items-center justify-center text-grey-grey-40-t">
                                                <div className="relative leading-[150%]">30</div>
                                            </div>
                                            <div
                                                className="self-stretch w-[46px] flex flex-row p-2.5 box-border items-center justify-center text-grey-grey-40-t">
                                                <div className="relative leading-[150%]">31</div>
                                            </div>
                                            <div
                                                className="self-stretch w-[46px] flex flex-row p-2.5 box-border items-center justify-center">
                                                <div
                                                    className="rounded-xl box-border w-[30px] h-[30px] flex flex-col items-center justify-center border-[1px] border-solid border-blue-blue-400">
                                                    <div className="relative leading-[150%]">1</div>
                                                </div>
                                            </div>
                                            <div
                                                className="self-stretch w-[46px] flex flex-row p-2.5 box-border items-center justify-center">
                                                <div className="relative leading-[150%]">2</div>
                                            </div>
                                            <div
                                                className="self-stretch w-[46px] flex flex-row p-2.5 box-border items-center justify-center">
                                                <div className="relative leading-[150%]">3</div>
                                            </div>
                                            <div
                                                className="self-stretch w-[46px] flex flex-row p-2.5 box-border items-center justify-center">
                                                <div className="relative leading-[150%]">4</div>
                                            </div>
                                        </div>
                                        <div
                                            className="w-[358px] h-10 flex flex-row py-0 px-4 box-border items-center justify-center">
                                            <div
                                                className="self-stretch w-[46px] flex flex-row p-2.5 box-border items-center justify-center">
                                                <div className="relative leading-[150%]">5</div>
                                            </div>
                                            <div
                                                className="self-stretch w-[46px] flex flex-row p-2.5 box-border items-center justify-center">
                                                <div className="relative leading-[150%]">6</div>
                                            </div>
                                            <div
                                                className="self-stretch w-[46px] flex flex-row p-2.5 box-border items-center justify-center">
                                                <div className="relative leading-[150%]">7</div>
                                            </div>
                                            <div
                                                className="self-stretch w-[46px] flex flex-row p-2.5 box-border items-center justify-center">
                                                <div className="relative leading-[150%]">8</div>
                                            </div>
                                            <div
                                                className="self-stretch w-[46px] flex flex-row p-2.5 box-border items-center justify-center">
                                                <div className="relative leading-[150%]">9</div>
                                            </div>
                                            <div
                                                className="self-stretch w-[46px] flex flex-row p-2.5 box-border items-center justify-center">
                                                <div className="relative leading-[150%]">10</div>
                                            </div>
                                            <div
                                                className="self-stretch w-[46px] flex flex-row p-2.5 box-border items-center justify-center">
                                                <div className="relative leading-[150%]">11</div>
                                            </div>
                                        </div>
                                        <div
                                            className="bg-monochrome-white w-[358px] h-10 flex flex-row py-0 px-4 box-border items-center justify-center">
                                            <div
                                                className="self-stretch w-[46px] flex flex-row py-2 px-4 box-border items-center justify-center">
                                                <div className="relative leading-[150%]">12</div>
                                            </div>
                                            <div
                                                className="self-stretch w-[46px] flex flex-row py-2.5 px-4 box-border items-center justify-center">
                                                <div className="relative leading-[150%]">13</div>
                                            </div>
                                            <div
                                                className="self-stretch rounded-tl-xl rounded-tr-none rounded-br-none rounded-bl-xl bg-monochrome-white w-[46px] flex flex-row py-0 px-4 box-border items-center justify-center text-monochrome-white">
                                                <div
                                                    className="rounded-xl bg-blue-blue-400 w-[30px] h-[30px] flex flex-col items-center justify-center">
                                                    <div className="relative leading-[150%]">14</div>
                                                </div>
                                            </div>
                                            <div
                                                className="self-stretch bg-monochrome-white w-[46px] flex flex-row py-2.5 px-4 box-border items-center justify-center">
                                                <div className="relative leading-[150%]">15</div>
                                            </div>
                                            <div
                                                className="self-stretch bg-monochrome-white w-[46px] flex flex-row p-2.5 box-border items-center justify-center">
                                                <div className="relative leading-[150%]">16</div>
                                            </div>
                                            <div
                                                className="self-stretch bg-monochrome-white w-[46px] flex flex-row p-2.5 box-border items-center justify-center">
                                                <div className="relative leading-[150%]">17</div>
                                            </div>
                                            <div
                                                className="self-stretch rounded-tl-none rounded-tr-xl rounded-br-xl rounded-bl-none bg-monochrome-white w-[46px] flex flex-row p-2.5 box-border items-center justify-center">
                                                <div className="relative leading-[150%]">18</div>
                                            </div>
                                        </div>
                                        <div
                                            className="w-[358px] h-10 flex flex-row py-0 px-4 box-border items-center justify-center">
                                            <div
                                                className="self-stretch rounded-tl-xl rounded-tr-none rounded-br-none rounded-bl-xl bg-monochrome-white w-[46px] flex flex-row items-center justify-center">
                                                <div className="relative leading-[150%]">19</div>
                                            </div>
                                            <div
                                                className="self-stretch bg-monochrome-white w-[46px] flex flex-row items-center justify-center">
                                                <div className="relative leading-[150%]">20</div>
                                            </div>
                                            <div
                                                className="self-stretch bg-monochrome-white w-[46px] flex flex-row items-center justify-center">
                                                <div className="relative leading-[150%]">21</div>
                                            </div>
                                            <div
                                                className="self-stretch bg-monochrome-white w-[46px] flex flex-row items-center justify-center">
                                                <div className="relative leading-[150%]">22</div>
                                            </div>
                                            <div
                                                className="self-stretch bg-monochrome-white w-[46px] flex flex-row items-center justify-center">
                                                <div className="relative leading-[150%]">23</div>
                                            </div>
                                            <div
                                                className="self-stretch bg-monochrome-white w-[46px] flex flex-row items-center justify-center">
                                                <div className="relative leading-[150%]">24</div>
                                            </div>
                                            <div
                                                className="self-stretch rounded-tl-none rounded-tr-xl rounded-br-xl rounded-bl-none bg-monochrome-white w-[46px] flex flex-row items-center justify-center">
                                                <div className="relative leading-[150%]">25</div>
                                            </div>
                                        </div>
                                        <div
                                            className="w-[358px] h-10 flex flex-row py-0 px-4 box-border items-center justify-center">
                                            <div
                                                className="self-stretch rounded-tl-xl rounded-tr-none rounded-br-none rounded-bl-xl bg-monochrome-white w-[46px] flex flex-row items-center justify-center">
                                                <div className="relative leading-[150%]">26</div>
                                            </div>
                                            <div
                                                className="self-stretch bg-monochrome-white w-[46px] flex flex-row items-center justify-center">
                                                <div className="relative leading-[150%]">27</div>
                                            </div>
                                            <div
                                                className="self-stretch rounded-tl-none rounded-tr-xl rounded-br-xl rounded-bl-none bg-monochrome-white w-[46px] flex flex-row py-0 px-2.5 box-border items-center justify-center">
                                                <div
                                                    className="rounded-xl bg-monochrome-white w-[30px] h-[30px] overflow-hidden shrink-0 flex flex-col p-2.5 box-border items-center justify-center">
                                                    <div className="relative leading-[150%]">28</div>
                                                </div>
                                            </div>
                                            <div
                                                className="self-stretch w-[46px] flex flex-row p-2.5 box-border items-center justify-center">
                                                <div className="relative leading-[150%]">29</div>
                                            </div>
                                            <div
                                                className="self-stretch w-[46px] flex flex-row p-2.5 box-border items-center justify-center">
                                                <div className="relative leading-[150%]">30</div>
                                            </div>
                                            <div
                                                className="self-stretch w-[46px] flex flex-row p-2.5 box-border items-center justify-center text-grey-grey-40-t">
                                                <div className="relative leading-[150%]">1</div>
                                            </div>
                                            <div
                                                className="self-stretch w-[46px] flex flex-row p-2.5 box-border items-center justify-center text-grey-grey-40-t">
                                                <div className="relative leading-[150%]">2</div>
                                            </div>
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
                                        Hãy mô tả về tình trạng của bạn
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
                <div className="self-stretch hidden flex-col items-start justify-start gap-[16px] text-left text-base">
                    <div className="relative font-medium">Thông tin thêm</div>
                    <div
                        className="self-stretch flex flex-col items-start justify-start gap-[16px] text-xs text-neutral-grey-600">
                        <div className="self-stretch flex flex-row items-start justify-start gap-[16px]">
                            <div className="flex-1 flex flex-col items-start justify-start gap-[4px]">
                                <div className="self-stretch flex flex-row items-start justify-start gap-[4px]">
                                    <div className="relative">Dân tộc</div>
                                    <div className="relative text-semantic-error-error-05 hidden">
                                        *
                                    </div>
                                </div>
                                <div
                                    className="self-stretch rounded-lg bg-monochrome-white box-border h-10 flex flex-row py-2 pr-2 pl-4 items-center justify-start gap-[6px] text-sm text-neutral-grey-500-secondary border-[1px] border-solid border-neutral-grey-200">
                                    <div className="flex-1 relative flex items-center h-4">
                                        Chọn dân tộc
                                    </div>
                                    <div className="h-5 flex flex-col py-0.5 px-0 box-border items-start justify-start">
                                        <div
                                            className="flex-1 relative box-border w-px border-r-[1px] border-solid border-neutral-grey-200"/>
                                    </div>
                                    <img
                                        className="relative w-6 h-6"
                                        alt=""
                                        src="/caretdown2.svg"
                                    />
                                </div>
                            </div>
                            <div className="flex-1 flex flex-col items-start justify-start gap-[4px]">
                                <div className="self-stretch flex flex-row items-start justify-start gap-[4px]">
                                    <div className="relative">Tôn giáo</div>
                                    <div className="relative text-semantic-error-error-05 hidden">
                                        *
                                    </div>
                                </div>
                                <div
                                    className="self-stretch rounded-lg bg-monochrome-white box-border h-10 flex flex-row py-2 pr-2 pl-4 items-center justify-start gap-[6px] text-sm text-neutral-grey-500-secondary border-[1px] border-solid border-neutral-grey-200">
                                    <div className="flex-1 relative flex items-center h-4">
                                        Chọn tôn giáo
                                    </div>
                                    <div className="h-5 flex flex-col py-0.5 px-0 box-border items-start justify-start">
                                        <div
                                            className="flex-1 relative box-border w-px border-r-[1px] border-solid border-neutral-grey-200"/>
                                    </div>
                                    <img
                                        className="relative w-6 h-6"
                                        alt=""
                                        src="/caretdown3.svg"
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="self-stretch flex flex-row items-start justify-start gap-[16px]">
                            <div className="flex-1 flex flex-col items-start justify-start gap-[4px]">
                                <div className="self-stretch flex flex-row items-start justify-start gap-[4px]">
                                    <div className="relative">Số CCCD/CMND</div>
                                    <div className="relative text-semantic-error-error-05 hidden">
                                        *
                                    </div>
                                </div>
                                <div
                                    className="self-stretch rounded-lg bg-monochrome-white box-border h-10 flex flex-row py-2 pr-2 pl-4 items-center justify-start gap-[6px] text-sm text-neutral-grey-500-secondary border-[1px] border-solid border-neutral-grey-200">
                                    <div className="flex-1 relative flex items-center h-4">
                                        Chọn dân tộc
                                    </div>
                                    <div className="h-5 flex flex-col py-0.5 px-0 box-border items-start justify-start">
                                        <div
                                            className="flex-1 relative box-border w-px border-r-[1px] border-solid border-neutral-grey-200"/>
                                    </div>
                                    <img
                                        className="relative w-6 h-6 hidden"
                                        alt=""
                                        src="/caretdown2.svg"
                                    />
                                </div>
                            </div>
                            <div className="flex-1 flex flex-col items-start justify-start gap-[4px]">
                                <div className="self-stretch flex flex-row items-start justify-start gap-[4px]">
                                    <div className="relative">Quốc tịch</div>
                                    <div className="relative text-semantic-error-error-05 hidden">
                                        *
                                    </div>
                                </div>
                                <div
                                    className="self-stretch rounded-lg bg-monochrome-white box-border h-10 flex flex-row py-2 pr-2 pl-4 items-center justify-start gap-[6px] text-sm text-neutral-grey-500-secondary border-[1px] border-solid border-neutral-grey-200">
                                    <div className="flex-1 relative flex items-center h-4">
                                        Chọn quốc tịch
                                    </div>
                                    <div className="h-5 flex flex-col py-0.5 px-0 box-border items-start justify-start">
                                        <div
                                            className="flex-1 relative box-border w-px border-r-[1px] border-solid border-neutral-grey-200"/>
                                    </div>
                                    <img
                                        className="relative w-6 h-6"
                                        alt=""
                                        src="/caretdown3.svg"
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="self-stretch flex flex-row items-start justify-start gap-[16px]">
                            <div className="flex-1 flex flex-col items-start justify-start gap-[4px]">
                                <div className="self-stretch flex flex-row items-start justify-start gap-[4px]">
                                    <div className="relative">Nơi cấp</div>
                                    <div className="relative text-semantic-error-error-05 hidden">
                                        *
                                    </div>
                                </div>
                                <div
                                    className="self-stretch rounded-lg bg-monochrome-white box-border h-10 flex flex-row py-2 pr-2 pl-4 items-center justify-start gap-[6px] text-sm text-neutral-grey-500-secondary border-[1px] border-solid border-neutral-grey-200">
                                    <div className="flex-1 relative flex items-center h-4">
                                        Nhập nơi cấp
                                    </div>
                                    <div className="h-5 flex flex-col py-0.5 px-0 box-border items-start justify-start">
                                        <div
                                            className="flex-1 relative box-border w-px border-r-[1px] border-solid border-neutral-grey-200"/>
                                    </div>
                                    <img
                                        className="relative w-6 h-6 hidden"
                                        alt=""
                                        src="/calendar.svg"
                                    />
                                </div>
                            </div>
                            <div className="flex-1 flex flex-col items-start justify-start gap-[4px]">
                                <div className="self-stretch flex flex-row items-start justify-start gap-[4px]">
                                    <div className="relative">Ngày cấp</div>
                                    <div className="relative text-semantic-error-error-05 hidden">
                                        *
                                    </div>
                                </div>
                                <div
                                    className="self-stretch rounded-lg bg-monochrome-white box-border h-10 flex flex-row py-2 pr-2 pl-4 items-center justify-start gap-[6px] text-sm text-neutral-grey-500-secondary border-[1px] border-solid border-neutral-grey-200">
                                    <div className="flex-1 relative flex items-center h-4">
                                        Chọn ngày cấp
                                    </div>
                                    <div className="h-5 flex flex-col py-0.5 px-0 box-border items-start justify-start">
                                        <div
                                            className="flex-1 relative box-border w-px border-r-[1px] border-solid border-neutral-grey-200"/>
                                    </div>
                                    <img
                                        className="relative w-6 h-6"
                                        alt=""
                                        src="/calendar.svg"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div
                    className="rounded-xl bg-blue-blue-300 w-[636px] h-12 flex flex-row py-2 px-4 box-border items-center justify-center gap-[8px] text-monochrome-white">
                    <img className="relative w-7 h-7 hidden" alt="" src={leftIcon}/>
                    <div className="relative leading-[150%] uppercase font-medium">
                        Đăng ký khám bệnh
                    </div>
                    <img className="relative w-7 h-7 hidden" alt="" src={rightIcon1}/>
                </div>
            </div>
        </div>
  )
}

export default EmployeeInfoCard
