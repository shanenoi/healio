import DynamicTable from './DynamicTable'
import React, {type FunctionComponent, useEffect, useState} from 'react'
import {ToDateFormat} from '../utils/utils'
import {getAuthUser, supabaseClient} from '../utils/supabaseClient'
import {
    type BenhAn,
    type BenhAnThuoc,
    type Profiles,
    ProfilesTable,
    type Thuoc,
    ThuocTable
} from '../utils/supabaseTypes'

// TODO: add validate for each input

interface EmployeeInfoContainerType {
    formID: string
    existedID?: string
    patientID: string
    khamBenhID: string
    onCloseClick: () => void
}

const PatientDetailsPopup: FunctionComponent<EmployeeInfoContainerType> = ({
                                                                               formID,
                                                                               existedID,
                                                                               patientID,
                                                                               khamBenhID,
                                                                               onCloseClick
                                                                           }) => {
    const [currentUser, setCurrentUser] = useState<Profiles>(null)

    const [, setBenhAn] = useState<BenhAn>(null)
    const [chanDoan, setChanDoan] = useState('')
    const [trieuChung, setTrieuChung] = useState('')
    const [loiDang, setLoiDang] = useState('')
    const [thuocs, setThuocs] = useState<Thuoc[]>([])
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [benhAnThuoc, setBenhAnThuoc] = useState<BenhAnThuoc[]>([])

    useEffect(() => {
        getAuthUser().then(async user => {
            if (user === null) {
                return
            }

            const resp = await supabaseClient
                .from(ProfilesTable)
                .select('*')
                .eq('id', user.id)
                .single()
            setCurrentUser(resp.data as Profiles)
        }).catch(err => {
            console.log(err)
        })
    }, [])

    useEffect(() => {
        void supabaseClient
            .from(ThuocTable)
            .select('*')
            .then(resp => {
                const d = resp.data as Thuoc[]
                setThuocs(d)
                console.log('thuocs')
                console.log(d)
            })
    }, [])

    function getBenhAnID() {
        return existedID ?? formID
    }

    function saveBenhAnAction() {
        const now = new Date()
        const data: BenhAn = {
            id: getBenhAnID(),

            bac_sy_id: currentUser?.id ?? null,
            benh_nhan_id: patientID,
            chan_doan: chanDoan,
            loi_dan: loiDang,
            trieu_chung: trieuChung,

            created_at: now.toISOString(),
            updated_at: now.toISOString()
        }
        setBenhAn(data)

        console.log('BenhAn')
        console.log(data)

        console.log('benhAnThuoc')
        console.log(benhAnThuoc)
    }

    function onchangeListThuoc(data: Array<Record<string, any>>, i: number) {
        if (i === -1) {
            return
        }
        const thuoc = thuocs.filter(t => t?.id === data[i]['Tên thuốc'])[0]
        if (thuoc === null || thuoc === undefined) {
            return
        }

        const now = new Date()
        const selectedData: BenhAnThuoc[] = data.map(d => {
            return {
                benh_an_id: getBenhAnID(),
                kham_benh_id: khamBenhID,
                so_luong: d['Số lượng'] ?? 1,
                thuoc_id: d['Tên thuốc'] ?? '',
                ghi_chu: d['Ghi chú'] ?? '',

                created_at: now.toISOString(),
                updated_at: now.toISOString(),
                deleted_at: null
            }
        })
        console.log('selectedData')
        console.log(selectedData)
        setBenhAnThuoc(selectedData)
    }

    return <div
        className="absolute top-[calc(50%_-_328px)] left-[calc(50%_-_350px)] rounded-2xl bg-monochrome-white flex flex-row py-0 px-8 items-start justify-start text-center text-sm text-neutral-grey-700 font-button-button-2">
        <div
            className="self-stretch w-[636px] flex flex-col py-8 px-0 box-border items-center justify-start gap-[32px]">
            <div className="self-stretch flex flex-row items-start justify-between text-blue-blue-400">
                <div className="flex-1 flex flex-col items-center justify-center gap-[16px]">
                </div>
                <img className="relative w-6 h-6 cursor-button" alt="" src={'/x-regular3.svg'}
                     onClick={onCloseClick}/>
            </div>
            <div className="self-stretch flex flex-col items-start justify-start gap-[16px] text-left text-base">
                <div className="relative font-medium">Thông tin bệnh án</div>
                <div
                    className="self-stretch flex flex-col items-start justify-start gap-[16px] text-xs text-grey-grey-900-p">
                    <div className="self-stretch flex flex-row items-start justify-start gap-[16px]">
                        <div className="w-[310px] flex flex-col items-start justify-start">
                            <div className="flex flex-row items-start justify-start gap-[2px]">
                                <div className="relative leading-[150%]">Bác sỹ</div>
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
                                            value={(() => {
                                                if (currentUser === null) {
                                                    return ''
                                                }
                                                return (currentUser.first_name ?? '') + ' ' + (currentUser.last_name ?? '')
                                            })()}
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
                                <div className="relative leading-[150%]">Chẩn đoán</div>
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
                                            placeholder={'Chẩn đoán'}
                                            value={chanDoan}
                                            onChange={e => {
                                                setChanDoan(e.target.value)
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
                                <div className="relative leading-[150%]">Ngày lập</div>
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
                                            type="date"
                                            className={'input no-arrows'}
                                            placeholder={'--'}
                                            value={ToDateFormat(new Date())}
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
                    <div className="w-[636px] flex flex-col items-start justify-start">
                        <div className="flex flex-row items-start justify-start gap-[2px]">
                            <div className="relative leading-[150%]">Dấu hiệu / Triệu chứng</div>
                            <div
                                className="relative text-xl leading-[24px] font-semibold font-mobile-body-subtitle-2 text-red-red-400 hidden">
                                *
                            </div>
                        </div>
                        <textarea
                            style={{
                                height: '70px',
                                maxWidth: '100%',
                                minHeight: '100%',
                                minWidth: '100%',
                                outline: 'none',
                                paddingTop: '20px'
                            }}
                            placeholder={'Mô tả về tình trạng của bệnh nhân'}
                            value={trieuChung}
                            className="self-stretch rounded-3xs bg-monochrome-white box-border h-[41px] flex flex-row py-0 px-4 items-center justify-start gap-[4px] border-[1px] border-solid border-grey-grey-40-t"
                            onChange={(e) => {
                                setTrieuChung(e.target.value)
                            }}
                        />
                    </div>
                    <div
                        className="w-[636px] flex flex-col items-start justify-start"
                        style={{paddingTop: '20px'}}
                    >
                        <div className="flex flex-row items-start justify-start gap-[2px]">
                            <div className="relative leading-[150%]">Đơn thuốc</div>
                            <div
                                className="relative text-xl leading-[24px] font-semibold font-mobile-body-subtitle-2 text-red-red-400 hidden">
                                *
                            </div>
                        </div>
                        <div
                            className="self-stretch flex flex-col items-start justify-start gap-[4px] text-sm text-grey-grey-300-s">
                            <div
                                className="self-stretch rounded-3xs bg-monochrome-white box-border h-[41px] flex flex-row py-0 px-4 items-center justify-start gap-[4px] border-[1px] border-solid border-grey-grey-40-t"
                                style={{overflowX: 'auto', height: '100px'}}
                            >
                                <DynamicTable
                                    headerDef={[
                                        {
                                            name: 'Tên thuốc',
                                            inputMethod: 'select',
                                            options: thuocs.map(thuoc => {
                                                if (thuoc === null) {
                                                    return {text: '', value: ''}
                                                }
                                                return {text: `${thuoc.ten} (${thuoc.don_vi})`, value: thuoc.id}
                                            }),
                                            size: '40%'
                                        },
                                        {
                                            name: 'Số lượng',
                                            inputMethod: 'number',
                                            size: '10%'
                                        },
                                        {
                                            name: 'Ghi chú',
                                            inputMethod: 'text',
                                            size: '100%'
                                        }
                                    ]}
                                    data={[]}
                                    onChange={(data, i) => {
                                        onchangeListThuoc(data, i)
                                    }}
                                />
                            </div>
                            <div
                                className="self-stretch flex-row py-0 px-3 items-end justify-start gap-[4px] text-red-red-400">
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
                    <div className="w-[636px] flex flex-col items-start justify-start">
                        <div className="flex flex-row items-start justify-start gap-[2px]">
                            <div className="relative leading-[150%]">Lời dặn</div>
                            <div
                                className="relative text-xl leading-[24px] font-semibold font-mobile-body-subtitle-2 text-red-red-400 hidden">
                                *
                            </div>
                        </div>
                        <textarea
                            style={{
                                height: '50px',
                                maxWidth: '100%',
                                minHeight: '100%',
                                minWidth: '100%',
                                outline: 'none',
                                paddingTop: '20px'
                            }}
                            placeholder={'Lời dặn'}
                            value={loiDang}
                            className="self-stretch rounded-3xs bg-monochrome-white box-border h-[41px] flex flex-row py-0 px-4 items-center justify-start gap-[4px] border-[1px] border-solid border-grey-grey-40-t"
                            onChange={(e) => {
                                setLoiDang(e.target.value)
                            }}
                        />
                    </div>
                </div>
            </div>

            <div
                className="rounded-xl bg-blue-blue-300 w-[636px] h-12 flex flex-row py-2 px-4 box-border items-center justify-center gap-[8px] text-monochrome-white cursor-button"
                onClick={saveBenhAnAction}
            >
                <img className="relative w-7 h-7 hidden" alt="" src={'/lefticon8.svg'}/>
                <div className="relative leading-[150%] uppercase font-medium cursor-button">
                    Lưu
                </div>
                <img className="relative w-7 h-7 hidden" alt="" src={'/lefticon8.svg'}/>
            </div>
        </div>
    </div>
}

export default PatientDetailsPopup
