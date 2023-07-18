import React, {type FunctionComponent, type MouseEventHandler, useEffect, useState} from 'react'
import ToggleSwitch from './ToggleSwitch'
import {QueryListDoctorByExaminationType, QueryListExaminationType} from '../api/graphql_query'
import {ToDateTimeFormat, ToTimeFormat} from '../utils/utils'
import {getAuthUser, GraphQLClient, supabaseClient} from '../utils/supabaseClient'
import {type ExaminationTypeResponse, type ListDoctorByExaminationTypeResponse} from '../api/response'
import {type KhamBenhPayloadType} from '../api/types'
import {type Profiles, ProfilesTable} from '../utils/supabaseTypes'

// TODO: add validate for each input

interface EmployeeInfoContainerType {
    maskGroup?: string
    rightIcon?: string
    xRegular?: string
    leftIcon?: string
    rightIcon1?: string
    xRegularClick?: MouseEventHandler<HTMLImageElement>
    saveClick: (khamBenhPayload: KhamBenhPayloadType) => void
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
    const nullExaminationTypeID = 'Chọn loại'
    const nullBacSiID = 'Chọn Bác Sĩ'

    const [isEnableHenLichKham, setIsEnableHenLichKham] = useState(false)
    const [ngayGio, setNgayGio] = useState(new Date())
    const [ngayGioKetThuc, setNgayGioKetThuc] = useState(new Date())
    const [thoiLuong, setThoiLuong] = useState(0)
    const [note, setNote] = useState('')
    const [examinationTypeID, setExaminationTypeID] = useState(nullExaminationTypeID)
    const [doctorID, setDoctorID] = useState(nullBacSiID)
    const [listDoctor, setListDoctor] = useState<ListDoctorByExaminationTypeResponse>({data: {bac_sy_loai_khamCollection: {edges: []}}})
    const [reloadListDoctor, setReloadListDoctor] = useState(false)
    const [examinationTypes, setExaminationTypes] = useState<ExaminationTypeResponse>({data: {bac_sy_loai_khamCollection: {edges: []}}})
    const [patient, setPatient] = useState<Profiles>(null)

    const handleReloadListDoctor = () => {
        setReloadListDoctor(!reloadListDoctor)
    }

    const handleToggle = (checked: boolean) => {
        setIsEnableHenLichKham(checked)
    }

    // get user info
    useEffect(() => {
        getAuthUser()
            .then(async user => {
                if (user === null) {
                    return
                }

                const data = await supabaseClient
                    .from(ProfilesTable)
                    .select('*')
                    .eq('id', user.id)
                    .single()
                setPatient(data.data as Profiles)
            })
            .catch(err => {
                console.log(err)
            })
    }, [])

    // select list loai kham
    useEffect(() => {
        new GraphQLClient()
            .Send(QueryListExaminationType())
            .then((response) => {
                const resp = response as ExaminationTypeResponse

                const uniqueLoaiKham = new Set()
                resp.data.bac_sy_loai_khamCollection.edges =
                    resp.data
                        .bac_sy_loai_khamCollection
                        .edges
                        .filter(
                            edge => {
                                const id = edge.node.loai_kham.id
                                if (uniqueLoaiKham.has(id)) {
                                    return false
                                } else {
                                    uniqueLoaiKham.add(id)
                                    return true
                                }
                            }
                        )

                setExaminationTypes(resp)
            }).catch((error) => {
            console.log(error)
        })
    }, [])

    // select list bac si by loai kham id
    useEffect(() => {
        if (nullExaminationTypeID === examinationTypeID) {
            return
        }
        new GraphQLClient()
            .Send(QueryListDoctorByExaminationType(examinationTypeID))
            .then((response) => {
                setListDoctor(response as ListDoctorByExaminationTypeResponse)
            }).catch((error) => {
            console.log(error)
        })
    }, [reloadListDoctor])

    const onSaveClick = () => {
        const khamBenhPayload: KhamBenhPayloadType = {
            patientID: patient?.id ?? '',
            doctorID,
            ngayGio: isEnableHenLichKham ? ngayGio : undefined,
            thoiLuong: isEnableHenLichKham ? thoiLuong : undefined,
            examinationTypeID,
            note
        }

        saveClick(khamBenhPayload)
    }

    const onChangeStartDate = (e: React.ChangeEvent<HTMLInputElement>) => {
        const now = new Date(e.target.value)
        setNgayGio(now)
        const next = new Date(now.getTime() + 30 * 60000)
        setNgayGioKetThuc(next)
    }

    const onChangeEndDate = (e: React.ChangeEvent<HTMLInputElement>) => {
        const currentDateTime = new Date()
        const currentDateTimeStr = currentDateTime.toString().replaceAll(
            currentDateTime.toLocaleTimeString('local', {
                hour: '2-digit',
                minute: '2-digit',
                hour12: false
            }),
            e.target.value
        )
        const _ngayGioKetThuc = new Date(currentDateTimeStr)
        _ngayGioKetThuc.setFullYear(ngayGio.getFullYear(), ngayGio.getMonth(), ngayGio.getDate())
        if (_ngayGioKetThuc.getTime() < ngayGio.getTime()) {
            _ngayGioKetThuc.setDate(_ngayGioKetThuc.getDate() + 1)
        }
        setNgayGioKetThuc(new Date(currentDateTimeStr))
        setThoiLuong(Math.floor((_ngayGioKetThuc.getTime() - ngayGio.getTime()) / 1000 / 60))
    }

    return <div
        className="absolute top-[calc(50%_-_328px)] left-[calc(50%_-_350px)] rounded-2xl bg-monochrome-white flex flex-row py-0 px-8 items-start justify-start text-center text-sm text-neutral-grey-700 font-button-button-2">
        <div
            className="self-stretch w-[636px] flex flex-col py-8 px-0 box-border items-center justify-start gap-[32px]">
            <div className="self-stretch flex flex-row items-start justify-between text-blue-blue-400">
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
                                            // placeholder={'Văn A'}
                                            value={patient?.first_name ?? ''}
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
                                            value={patient?.last_name ?? ''}
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
                                            value={patient?.phone ?? ''}
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
                                            value={patient?.email ?? ''}
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
                                    <select
                                        className={'input select-input flex-1 relative leading-[150%] flex items-center h-7'}
                                        value={examinationTypeID}
                                        onChange={(e) => {
                                            setExaminationTypeID(e.target.value)
                                            handleReloadListDoctor()
                                        }}
                                    >
                                        <option
                                            className={'select-input-option'}
                                            value={nullExaminationTypeID} disabled>{nullExaminationTypeID}
                                        </option>
                                        {examinationTypes.data.bac_sy_loai_khamCollection.edges.map((loadKham) =>
                                            <option
                                                className={'select-input-option'}
                                                value={loadKham.node.loai_kham.id}
                                                key={loadKham.node.loai_kham.id}
                                            >
                                                {loadKham.node.loai_kham.ten}
                                            </option>)}
                                    </select>
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
                                        value={doctorID}
                                        onChange={(e) => {
                                            setDoctorID(e.target.value)
                                        }}
                                    >
                                        <option
                                            className={'select-input-option'}
                                            value={nullBacSiID} disabled>{nullBacSiID}
                                        </option>
                                        {listDoctor.data.bac_sy_loai_khamCollection.edges.map((bacSi) => <option
                                            className={'select-input-option'}
                                            value={bacSi.node.bac_sy.profiles.id}
                                            key={bacSi.node.bac_sy.profiles.id}
                                        >
                                            {bacSi.node.bac_sy.profiles.first_name} {bacSi.node.bac_sy.profiles.last_name}
                                        </option>)}
                                    </select>
                                </div>
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
                                        ? <div style={{width: '100%'}}>
                                            <b>(Thời Lượng {thoiLuong} Phút)</b>
                                            <p>Thời gian bắt đầu</p>
                                            <div
                                                className="self-stretch rounded-3xs bg-monochrome-white box-border h-[41px] flex flex-row py-0 px-4 items-center justify-start gap-[4px] border-[1px] border-solid border-grey-grey-40-t">
                                                <input
                                                    type={'datetime-local'}
                                                    className={'input'}
                                                    step={1800}
                                                    value={ToDateTimeFormat(ngayGio)}
                                                    onChange={onChangeStartDate}
                                                />
                                            </div>
                                        </div>
                                        : null}

                                    {isEnableHenLichKham
                                        ? <div style={{width: '50%', marginLeft: '25%'}}>
                                            <p>Thời gian kết thúc</p>
                                            <div
                                                className="self-stretch rounded-3xs bg-monochrome-white box-border h-[41px] flex flex-row py-0 px-4 items-center justify-start gap-[4px] border-[1px] border-solid border-grey-grey-40-t">
                                                <input
                                                    type={'time'}
                                                    className={'input'}
                                                    step={30 * 60}
                                                    value={ToTimeFormat(ngayGioKetThuc)}
                                                    onChange={onChangeEndDate}
                                                />
                                            </div>
                                        </div>
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
}

export default MedicalRegisterContainer
