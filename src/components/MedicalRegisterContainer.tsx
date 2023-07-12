import React, {type FunctionComponent, type MouseEventHandler, useState} from 'react'

interface KhamBenhPayloadType {
    benhNhanID: string // benh_nhan_id
    bacSyID: string // bac_sy_id
    ngayGio?: Date // ngay_gio
    thoiLuong?: number // ngay_gio
    loaiKhamID: string // loai_kham_id
    note: string // note
}

interface BenhNhanPayloadType {
    email: string // email
    firstName: string // first_name
    lastName: string // last_name
    phone: string // phone
}

type saveClickHandler = (khamBenhPayload: KhamBenhPayloadType, benhNhanPayload: BenhNhanPayloadType) => void

// todo: add validate for each input
interface EmployeeInfoContainerType {
    maskGroup?: string
    rightIcon?: string
    xRegular?: string
    leftIcon?: string
    rightIcon1?: string
    xRegularClick?: MouseEventHandler<HTMLImageElement>
    saveClick: saveClickHandler
}

interface ToggleSwitchProps {
    checked: boolean
    onChange: (checked: boolean) => void
}

const ToggleSwitch: React.FC<ToggleSwitchProps> = ({checked, onChange}) => {
    const [isChecked, setIsChecked] = useState(checked)

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setIsChecked(event.target.checked)
        onChange(event.target.checked)
    }

    return (
        <div className="toggle-switch">
            <input
                type="checkbox"
                className="toggle-switch-checkbox"
                id="toggleSwitch"
                checked={isChecked}
                onChange={handleChange}
            />
            <label className="toggle-switch-label" htmlFor="toggleSwitch">
                <span className="toggle-switch-inner"></span>
                <span className="toggle-switch-switch"></span>
            </label>
        </div>
    )
}

const toTimeFormat = (time: Date) => {
    return new Date(time.getTime() - time.getTimezoneOffset() * 60000).toISOString().slice(11, 16)
}

const toDateTimeFormat = (time: Date) => {
    return new Date(time.getTime() - time.getTimezoneOffset() * 60000).toISOString().slice(0, 16)
}

const MedicalRegisterContainer: FunctionComponent<EmployeeInfoContainerType> = ({
                                                                                    maskGroup,
                                                                                    rightIcon,
                                                                                    xRegular,
                                                                                    leftIcon,
                                                                                    rightIcon1,
                                                                                    xRegularClick,
                                                                                    saveClick
                                                                                }) => {
    const nullLoaiKhamID = 'Chọn loại'
    const nullBacSiID = 'Chọn Bác Sĩ'

    const [isEnableHenLichKham, setIsEnableHenLichKham] = useState(false)
    const [ngayGio, setNgayGio] = useState(new Date())
    const [ngayGioKetThuc, setNgayGioKetThuc] = useState(new Date())
    const [thoiLuong, setThoiLuong] = useState(0)
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [phone, setPhone] = useState('')
    const [note, setNote] = useState('')
    const [email, setEmail] = useState('')
    const [loaiKhamID, setLoaiKhamID] = useState(nullLoaiKhamID)
    const [bacSiID, setBacSiID] = useState(nullBacSiID)

    const bacSis = [
        {
            id: '1',
            name: 'Bác sĩ 1'
        },
        {
            id: '2',
            name: 'Bác sĩ 2'
        }
    ]

    const loadKhams = [
        {
            id: '1',
            name: 'Loại khám 1'
        },
        {
            id: '2',
            name: 'Loại khám 1'
        }
    ]

    const onSaveClick = () => {
        const benhNhanPayload: BenhNhanPayloadType = {email, firstName, lastName, phone}
        const khamBenhPayload: KhamBenhPayloadType = {
            benhNhanID: 'benh_nhan_id',
            bacSyID: bacSiID,
            ngayGio: isEnableHenLichKham ? ngayGio : undefined,
            thoiLuong: isEnableHenLichKham ? thoiLuong : undefined,
            loaiKhamID,
            note
        }

        saveClick(khamBenhPayload, benhNhanPayload)
    }
    const handleToggle = (checked: boolean) => {
        setIsEnableHenLichKham(checked)
    }

    return (
        <div
            className="absolute top-[calc(50%_-_328px)] left-[calc(50%_-_350px)] rounded-2xl bg-monochrome-white flex flex-row py-0 px-8 items-start justify-start text-center text-sm text-neutral-grey-700 font-button-button-2">
            <div
                className="self-stretch w-[636px] flex flex-col py-8 px-0 box-border items-center justify-start gap-[32px]">
                <div className="self-stretch flex flex-row items-start justify-between text-blue-blue-400">
                    {/* <img className="relative w-6 h-6" alt="" /> */}
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
                    <img className="relative w-6 h-6 cursor-button" alt="" src={xRegular} onClick={xRegularClick}/>
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
                                                placeholder={'Văn A'}
                                                value={firstName}
                                                onChange={(e) => {
                                                    setFirstName(e.target.value)
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
                                                placeholder={'Nguyễn'}
                                                value={lastName}
                                                onChange={(e) => {
                                                    setLastName(e.target.value)
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
                                                placeholder={'0123456789'}
                                                value={phone}
                                                onChange={(e) => {
                                                    setPhone(e.target.value)
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
                                                placeholder={'email@gmail.com'}
                                                value={email}
                                                onChange={(e) => {
                                                    setEmail(e.target.value)
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
                                        <select
                                            className={'input select-input flex-1 relative leading-[150%] flex items-center h-7'}
                                            value={loaiKhamID}
                                            onChange={(e) => {
                                                setLoaiKhamID(e.target.value)
                                            }}
                                        >
                                            <option
                                                className={'select-input-option'}
                                                value={nullLoaiKhamID} disabled>{nullLoaiKhamID}
                                            </option>
                                            {loadKhams.map((loadKham) => (
                                                <option
                                                    className={'select-input-option'}
                                                    value={loadKham.id}
                                                    key={loadKham.id}
                                                >
                                                    {loadKham.name}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                    {/* <div className="h-5 flex flex-col py-0.5 px-0 box-border items-start justify-start"> */}
                                    {/*  <div className="flex-1 relative box-border w-px border-r-[1px] border-solid border-grey-grey-40-t" /> */}
                                    {/* </div> */}
                                    {/* <img */}
                                    {/*  className="relative w-6 h-6" */}
                                    {/*  alt="" */}
                                    {/*  src="/caretdown.svg" */}
                                    {/* /> */}
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
                                            value={bacSiID}
                                            onChange={(e) => {
                                                setBacSiID(e.target.value)
                                            }}
                                        >
                                            <option
                                                className={'select-input-option'}
                                                value={nullBacSiID} disabled>{nullBacSiID}
                                            </option>
                                            {bacSis.map((bacSi) => (
                                                <option
                                                    className={'select-input-option'}
                                                    value={bacSi.id}
                                                    key={bacSi.id}
                                                >
                                                    {bacSi.name}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                    {/* <div className="h-5 flex flex-col py-0.5 px-0 box-border items-start justify-start"> */}
                                    {/*  <div className="flex-1 relative box-border w-px border-r-[1px] border-solid border-grey-grey-40-t" /> */}
                                    {/* </div> */}
                                    {/* <img */}
                                    {/*  className="relative w-6 h-6" */}
                                    {/*  alt="" */}
                                    {/*  src="/caretdown.svg" */}
                                    {/* /> */}
                                </div>
                            </div>

                            <div className="w-[310px] flex flex-col items-start justify-start gap-[6px]">
                                <div className="flex flex-row items-start justify-start gap-[2px]">
                                    <div className="relative leading-[150%]">Hẹn ngày khám
                                    </div>
                                    <ToggleSwitch checked={isEnableHenLichKham} onChange={handleToggle}/>
                                    <div
                                        className="relative text-xl leading-[24px] font-semibold font-mobile-body-subtitle-2 text-red-red-400 hidden">
                                        *
                                    </div>
                                </div>
                                <div className="w-[310px] flex flex-col items-start justify-start">
                                    <div
                                        className="self-stretch flex flex-col items-start justify-start gap-[4px] text-center text-sm">
                                        {isEnableHenLichKham
                                            ? (
                                                <div style={{width: '100%'}}>
                                                    <b>(Thời Lượng {thoiLuong} Phút)</b>
                                                    <p>Thời gian bắt đầu</p>
                                                    <div
                                                        className="self-stretch rounded-3xs bg-monochrome-white box-border h-[41px] flex flex-row py-0 px-4 items-center justify-start gap-[4px] border-[1px] border-solid border-grey-grey-40-t">
                                                        <input
                                                            type={'datetime-local'}
                                                            className={'input'}
                                                            step={1800}
                                                            value={toDateTimeFormat(ngayGio)}
                                                            onChange={(e) => {
                                                                const now = new Date(e.target.value)
                                                                setNgayGio(now)
                                                                const next = new Date(now.getTime() + 30 * 60000)
                                                                setNgayGioKetThuc(next)
                                                            }}
                                                        />
                                                        {/* <div className="flex flex-row items-center justify-start gap-[1px]"> */}
                                                        {/*    <div className="relative leading-[150%]">03</div> */}
                                                        {/*    <div className="relative leading-[150%]">/</div> */}
                                                        {/*    <div className="relative leading-[150%]">10</div> */}
                                                        {/*    <div className="relative leading-[150%]">/</div> */}
                                                        {/*    <div className="relative leading-[150%]">2022</div> */}
                                                        {/* </div> */}
                                                    </div>
                                                </div>
                                            )
                                            : null}

                                        {isEnableHenLichKham
                                            ? (
                                                <div style={{width: '50%', marginLeft: '25%'}}>
                                                    <p>Thời gian kết thúc</p>
                                                    <div
                                                        className="self-stretch rounded-3xs bg-monochrome-white box-border h-[41px] flex flex-row py-0 px-4 items-center justify-start gap-[4px] border-[1px] border-solid border-grey-grey-40-t">
                                                        <input
                                                            type={'time'}
                                                            className={'input'}
                                                            step={30 * 60}
                                                            value={toTimeFormat(ngayGioKetThuc)}
                                                            onChange={(e) => {
                                                                const currentDateTime = new Date()
                                                                const currentDateTimeStr = currentDateTime.toString().replaceAll(
                                                                    currentDateTime.toLocaleTimeString('local', {
                                                                        hour: '2-digit',
                                                                        minute: '2-digit',
                                                                        hour12: false
                                                                    }),
                                                                    e.target.value
                                                                )
                                                                const ngayGioKetThuc = new Date(currentDateTimeStr)
                                                                ngayGioKetThuc.setFullYear(ngayGio.getFullYear(), ngayGio.getMonth(), ngayGio.getDate())
                                                                if (ngayGioKetThuc.getTime() < ngayGio.getTime()) {
                                                                    ngayGioKetThuc.setDate(ngayGioKetThuc.getDate() + 1)
                                                                }
                                                                setNgayGioKetThuc(new Date(currentDateTimeStr))
                                                                setThoiLuong(Math.floor((ngayGioKetThuc.getTime() - ngayGio.getTime()) / 1000 / 60))
                                                                console.log(thoiLuong)
                                                            }}
                                                        />
                                                        {/* <div className="flex flex-row items-center justify-start gap-[1px]"> */}
                                                        {/*    <div className="relative leading-[150%]">03</div> */}
                                                        {/*    <div className="relative leading-[150%]">/</div> */}
                                                        {/*    <div className="relative leading-[150%]">10</div> */}
                                                        {/*    <div className="relative leading-[150%]">/</div> */}
                                                        {/*    <div className="relative leading-[150%]">2022</div> */}
                                                        {/* </div> */}
                                                    </div>
                                                </div>
                                            )
                                            : null}
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
                                            value={note}
                                            onChange={(e) => {
                                                setNote(e.target.value)
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
                    className="rounded-xl bg-blue-blue-300 w-[636px] h-12 flex flex-row py-2 px-4 box-border items-center justify-center gap-[8px] text-monochrome-white cursor-button"
                    onClick={onSaveClick}>
                    <img className="relative w-7 h-7 hidden" alt="" src={leftIcon}/>
                    <div className="relative leading-[150%] uppercase font-medium cursor-button">
                        Đăng ký khám bệnh
                    </div>
                    <img className="relative w-7 h-7 hidden" alt="" src={rightIcon1}/>
                </div>
            </div>
        </div>
    )
}

export default MedicalRegisterContainer
