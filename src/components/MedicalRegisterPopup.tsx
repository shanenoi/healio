import React, {type FunctionComponent, useEffect, useState} from 'react'
import ToggleSwitch from './ToggleSwitch'
import axios from 'axios'
import {ErrorMessage, SuccessMessage, ToDateTimeFormat, ToTimeFormat} from '../utils/utils'
import {QueryListDoctorByExaminationType, QueryListExaminationType} from '../api/graphql_query'
import {getAuthUser, GraphQLClient, supabaseClient} from '../utils/supabaseClient'
import {notification} from 'antd'
import {type ExaminationTypeResponse, type ListDoctorByExaminationTypeResponse} from '../api/response'
import {type KhamBenh, KhamBenhTable, type Profiles, ProfilesTable} from '../utils/supabaseTypes'
import {useNavigate} from 'react-router-dom'

const defaultThoiLuong = 30

interface AvailableTime {
    start: Date
    end: Date
}

interface EmployeeInfoContainerType {
    formID?: string
    selectedUserID?: string
    khamBenhID?: string
    StartAt?: Date
    Duration?: number
    loaiKhamE?: string
    noteE?: string
    onCloseClick: () => void
}

const reloadEvents = async (bacSiID: string) => {
    const config = {
        method: 'post',
        maxBodyLength: Infinity,
        url: `http://localhost:6290/order-event?bac_si_id=${bacSiID}`,
        headers: {}
    }

    return await axios.request(config)
}

const getAvailableTime = async (bacSiID: string, date: Date) => {
    const config = {
        method: 'get',
        maxBodyLength: Infinity,
        url: `http://localhost:6290/available-time?bac_si_id=${bacSiID}&time=${date.toISOString()}`,
        headers: {}
    }

    return await axios.request(config)
}

const isTimeAvailable = (availableTimes: AvailableTime[], start: Date, end: Date) => {
    for (const availableTime of availableTimes) {
        if (start >= availableTime.start && end <= availableTime.end) {
            return true
        }
    }
    return false
}

const MedicalRegisterPopup: FunctionComponent<EmployeeInfoContainerType> = ({
                                                                                formID,
                                                                                selectedUserID,
                                                                                khamBenhID,
                                                                                StartAt,
                                                                                Duration,
                                                                                loaiKhamE,
                                                                                noteE,
                                                                                onCloseClick
                                                                            }) => {
    const navigate = useNavigate()

    const nullExaminationTypeID = 'Chọn loại'
    const nullBacSiID = 'Chọn Bác Sĩ'

    const [isViewOnly] = useState(formID === undefined)
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
    const [timeTableContent, setTimeTableContent] = useState('')
    const [availableTime, setAvailableTime] = useState<AvailableTime[]>([])

    const [api, pushMessageContextHolder] = notification.useNotification()
    const pushInvalidDataMessage = ErrorMessage(api)
    const pushSuccessMessage = SuccessMessage(api, 'bottomLeft')

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

                let _id = user.id
                if (selectedUserID !== undefined) {
                    _id = selectedUserID
                }

                const data = await supabaseClient
                    .from(ProfilesTable)
                    .select('*')
                    .eq('id', _id)
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

    useEffect(() => {
        if (doctorID === nullBacSiID) {
            return
        }

        const date = isEnableHenLichKham ? ngayGio : new Date()
        getAvailableTime(doctorID, date)
            .then(
                response => {
                    const d = response.data
                    setAvailableTime(d.map((item: {
                        end_time: string
                        start_time: string
                    }) => {
                        const start = new Date(item.start_time)
                        const end = new Date(item.end_time)
                        return {start, end}
                    }))

                    setTimeTableContent(d.map((item: {
                        end_time: string
                        start_time: string
                    }) => {
                        const start = new Date(item.start_time)
                        const end = new Date(item.end_time)
                        return `từ: ${start.getHours()}:${start.getMinutes()}   \t->\tđến: ${end.getHours()}:${end.getMinutes()}`
                    }).join('\n'))
                }
            ).catch(err => {
                console.log(err)
            }
        )
    }, [doctorID, ngayGio])

    const onSaveClick = () => {
        if (isEnableHenLichKham) {
            const now = new Date()

            if (ngayGio < now) {
                pushInvalidDataMessage('Lỗi Nhập Liệu', 'Thời gian không không được chọn trong quá khứ')
                return
            }

            if (!isTimeAvailable(availableTime, ngayGio, ngayGioKetThuc)) {
                pushInvalidDataMessage('Lỗi Nhập Liệu', 'Thời gian không hợp lệ')
                return
            }
        }

        if (patient === null) {
            return
        }

        if (formID === undefined) {
            return
        }

        const now = new Date()
        const khamBenh: KhamBenh = {
            id: formID,
            so_thu_tu: 0,
            trang_thai: '',
            cancel_at: null,

            bac_sy_id: doctorID,
            benh_nhan_id: patient.id,
            loai_kham_id: examinationTypeID,
            duration: isEnableHenLichKham ? thoiLuong : defaultThoiLuong,
            ngay_gio: isEnableHenLichKham ? ngayGio.toISOString() : null,
            is_scheduled: isEnableHenLichKham,
            note,

            created_at: now.toISOString(),
            updated_at: now.toISOString(),
            deleted_at: null
        }

        if (khamBenh.bac_sy_id === nullBacSiID) {
            pushInvalidDataMessage('Lỗi Nhập Liệu', 'Vui lòng chọn bác sĩ')
            return
        }

        void supabaseClient
            .from(KhamBenhTable)
            .insert(khamBenh)
            .then(r => {
                console.log(r)
                reloadEvents(doctorID).then(r => {
                    console.log(r)
                }).catch(err => {
                    console.log(err)
                })
            })

        console.log('\n===========================')
        console.log(`khamBenh.bac_sy_id ${khamBenh.bac_sy_id}`)
        console.log(`khamBenh.benh_nhan_id ${khamBenh.benh_nhan_id}`)
        console.log(`khamBenh.loai_kham_id ${khamBenh.loai_kham_id}`)
        console.log(`khamBenh.duration ${khamBenh.duration ?? ''}`)
        console.log(`khamBenh.ngay_gio ${khamBenh.ngay_gio ?? ''}`)
        console.log(`khamBenh.note ${khamBenh.note ?? ''}`)
        console.log('===========================')

        pushSuccessMessage('Cập nhật thành công', '')
        setTimeout(() => {
            onCloseClick()
        }, 1000)
    }

    const onChangeStartDate = (e: React.ChangeEvent<HTMLInputElement>) => {
        const now = new Date(e.target.value)
        setNgayGio(now)
        const _ngayGioKetThuc = new Date(now.getTime() + defaultThoiLuong * 60000)
        setNgayGioKetThuc(_ngayGioKetThuc)
        setThoiLuong(Math.floor((ngayGioKetThuc.getTime() - ngayGio.getTime()) / 1000 / 60))
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

    const directPatientDetailsView = (patientID: string, khamBenhID: string) => {
        navigate(`/patient_details_view/${patientID}/${khamBenhID}`)
    }

    return <div
        className="absolute top-[calc(50%_-_400px)] left-[calc(50%_-_350px)] rounded-2xl bg-monochrome-white flex flex-row py-0 px-8 items-start justify-start text-center text-sm text-neutral-grey-700 font-button-button-2">
        {pushMessageContextHolder}
        <div
            className="self-stretch w-[636px] flex flex-col py-8 px-0 box-border items-center justify-start gap-[32px]">
            <div className="self-stretch flex flex-row items-start justify-between text-blue-blue-400">
                <div className="flex-1 flex flex-col items-center justify-center gap-[16px]">
                    <img
                        className="relative w-[100px] h-[100px]"
                        alt=""
                        src={'/mask-group4.svg'}
                    />
                    {!isViewOnly && (
                        <div
                            className="rounded-lg bg-monochrome-white box-border h-8 flex flex-row py-2 px-4 items-center justify-center gap-[8px] border-[1px] border-solid border-blue-blue-400"
                            style={{display: 'none'}}
                        >
                            <img className="relative w-4 h-4" alt="" src="/lefticon1.svg"/>
                            <div className="relative leading-[150%] uppercase font-medium"
                                 style={{display: 'none'}}
                            >
                                chọn ảnh
                            </div>
                            <img className="relative w-6 h-6 hidden" alt="" src={'/righticon4.svg'}/>
                        </div>
                    )}
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
                                    {
                                        isViewOnly
                                            ? (
                                                <div className="flex flex-row items-center justify-start gap-[1px]">
                                                    <div className="relative leading-[150%]">{loaiKhamE}</div>
                                                </div>
                                            )
                                            : (
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
                                            )
                                    }
                                </div>
                            </div>
                        </div>

                        {isViewOnly && (
                            <div className="w-[310px] flex flex-col items-start justify-start">
                                <div className="flex flex-row items-start justify-start gap-[2px]">
                                    <div className="relative leading-[150%]">Thời gian khám</div>
                                    <div
                                        className="relative text-xl leading-[24px] font-semibold font-mobile-body-subtitle-2 text-red-red-400">
                                        *
                                    </div>
                                </div>
                                <div
                                    className="self-stretch rounded-lg bg-monochrome-white box-border h-10 flex flex-row py-2 pr-2 pl-4 items-center justify-start gap-[6px] text-sm text-grey-grey-300-s border-[1px] border-solid border-grey-grey-40-t">
                                    <div className="flex-1 relative leading-[150%] flex items-center h-4">
                                        {
                                            StartAt !== undefined && Duration !== undefined
                                                ? (
                                                    <div className="flex flex-row items-center justify-start gap-[1px]">
                                                        <div
                                                            className="relative leading-[150%]">{StartAt.toLocaleTimeString('local', {
                                                            hour: '2-digit',
                                                            minute: '2-digit',
                                                            hour12: false
                                                        })}
                                                        </div>
                                                        <div className="relative leading-[150%]">({Duration} Phút) -</div>

                                                        <div
                                                            className="relative leading-[150%]"> {StartAt.getDate()}</div>
                                                        <div className="relative leading-[150%]">/</div>
                                                        <div
                                                            className="relative leading-[150%]">{StartAt.getMonth() + 1}</div>
                                                        <div className="relative leading-[150%]">/</div>
                                                        <div
                                                            className="relative leading-[150%]">{StartAt.getFullYear()}</div>
                                                    </div>
                                                )
                                                : ''
                                        }

                                    </div>
                                </div>
                            </div>
                        )}

                        {!isViewOnly && (
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
                        )}
                    </div>
                    <div className="self-stretch flex flex-row items-start justify-start gap-[16px]">
                        {!isViewOnly && (
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
                                                        step={defaultThoiLuong * 60}
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
                        )}

                        {isEnableHenLichKham && (
                            <div className="w-[310px] flex flex-col items-start justify-start">
                                <div className="flex flex-row items-start justify-start gap-[2px]">
                                    <div className="relative leading-[150%]">Thời gian trống</div>
                                </div>
                                <textarea
                                    style={{
                                        height: '200px',
                                        maxHeight: '200px',
                                        maxWidth: '100%',
                                        minHeight: '200px',
                                        minWidth: '100%',
                                        outline: 'none',
                                        paddingTop: '20px'
                                    }}
                                    placeholder={''}
                                    value={timeTableContent}
                                    className="self-stretch rounded-3xs bg-monochrome-white box-border h-[41px] flex flex-row py-0 px-4 items-center justify-start gap-[4px] border-[1px] border-solid border-grey-grey-40-t"
                                    disabled
                                />
                            </div>
                        )}
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
                                    {isViewOnly
                                        ? (
                                            <div className="flex flex-row items-center justify-start gap-[1px]">
                                                <div className="relative leading-[150%]">{noteE}</div>
                                            </div>
                                        )
                                        : (
                                            <input
                                                type="text"
                                                placeholder={'Hãy mô tả về tình trạng của bạn'}
                                                className={'input flex-1 relative  w-[100%]'}
                                                value={note}
                                                onChange={(e) => {
                                                    setNote(e.target.value)
                                                }}
                                            />
                                        )}
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
            {isViewOnly
                ? (
                    <div
                        className="rounded-xl bg-blue-blue-300 w-[636px] h-12 flex flex-row py-2 px-4 box-border items-center justify-center gap-[8px] text-monochrome-white cursor-button"
                        onClick={() => {
                            if (patient?.id === undefined) {
                                return
                            }
                            if (khamBenhID === undefined) {
                                return
                            }
                            directPatientDetailsView(patient?.id, khamBenhID)
                        }}>
                        <img className="relative w-7 h-7 hidden" alt="" src={'/lefticon8.svg'}/>
                        <div className="relative leading-[150%] uppercase font-medium cursor-button">
                            Khám bệnh
                        </div>
                        <img className="relative w-7 h-7 hidden" alt="" src={'/lefticon8.svg'}/>
                    </div>
                )
                : (
                    <div
                        className="rounded-xl bg-blue-blue-300 w-[636px] h-12 flex flex-row py-2 px-4 box-border items-center justify-center gap-[8px] text-monochrome-white cursor-button"
                        onClick={onSaveClick}>
                        <img className="relative w-7 h-7 hidden" alt="" src={'/lefticon8.svg'}/>
                        <div className="relative leading-[150%] uppercase font-medium cursor-button">
                            Đăng ký khám bệnh
                        </div>
                        <img className="relative w-7 h-7 hidden" alt="" src={'/lefticon8.svg'}/>
                    </div>
                )}
        </div>
    </div>
}

export default MedicalRegisterPopup
