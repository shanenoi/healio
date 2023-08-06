import DynamicTable from './DynamicTable'
import React, {type FunctionComponent, useEffect, useState} from 'react'
import {ToDateFormat} from '../utils/utils'
import {getAuthUser, supabaseClient} from '../utils/supabaseClient'
import {
    type BenhAn,
    BenhAnTable,
    type BenhAnThuoc,
    BenhAnThuocTable,
    type Profiles,
    ProfilesTable,
    type Thuoc,
    ThuocTable
} from '../utils/supabaseTypes'

interface EmployeeInfoContainerType {
    formID: string
    existedID?: string
    existedBenhAn?: BenhAn
    patientID: string
    khamBenhID: string
    onCloseClick: () => void
}

const now = new Date()

const PatientDetailsPopup: FunctionComponent<EmployeeInfoContainerType> = ({
                                                                               formID,
                                                                               existedID,
                                                                               existedBenhAn,
                                                                               patientID,
                                                                               khamBenhID,
                                                                               onCloseClick
                                                                           }) => {
    const [currentUser, setCurrentUser] = useState<Profiles>(null)

    const [benhAn, setBenhAn] = useState<BenhAn>(null)
    const [thuocs, setThuocs] = useState<Thuoc[]>([])
    const [oldBenhAnThuocs, setOldBenhAnThuocs] = useState<BenhAnThuoc[]>([])
    const [benhAnThuocs, setBenhAnThuocs] = useState<BenhAnThuoc[]>([])

    useEffect(() => {
        if (existedBenhAn === undefined) {
            return
        }

        void supabaseClient
            .from(BenhAnTable)
            .select('*')
            .eq('id', existedBenhAn?.id)
            .single()
            .then(resp => {
                setBenhAn(resp.data as BenhAn)

                void supabaseClient
                    .from(BenhAnThuocTable)
                    .select('*')
                    .eq('benh_an_id', existedBenhAn?.id)
                    .is('deleted_at', null)
                    .then(resp => {
                        const _benhAnThuoc = resp.data as BenhAnThuoc[]
                        setBenhAnThuocs(_benhAnThuoc)
                        setOldBenhAnThuocs(_benhAnThuoc)
                        console.log('_benhAnThuoc')
                        console.log(_benhAnThuoc)
                    })
            })
    }, [])

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
        const newBenhAn: BenhAn = {
            id: getBenhAnID(),

            bac_sy_id: currentUser?.id ?? null,
            benh_nhan_id: patientID,
            chan_doan: benhAn?.chan_doan ?? '',
            kham_benh_id: khamBenhID,
            loi_dan: benhAn?.loi_dan ?? '',
            tai_kham: benhAn?.tai_kham ?? null,
            trieu_chung: benhAn?.trieu_chung ?? '',

            created_at: benhAn?.created_at ?? now.toISOString(),
            updated_at: now.toISOString()
        }

        void supabaseClient
            .from(BenhAnTable)
            .upsert(newBenhAn)
            .then(resp => {
                console.log('resp-upsert.BenhAn')
                console.log(resp.error)
                if (resp.error !== null) {
                    return
                }

                benhAnThuocs.forEach(benhAnThuoc => {
                    if (benhAnThuoc === null) {
                        return
                    }

                    const newBenhAnThuoc: BenhAnThuoc = {
                        benh_an_id: benhAnThuoc.benh_an_id,
                        ghi_chu: benhAnThuoc.ghi_chu,
                        kham_benh_id: benhAnThuoc.kham_benh_id,
                        so_luong: benhAnThuoc.so_luong,
                        thuoc_id: benhAnThuoc.thuoc_id,

                        created_at: now.toISOString(),
                        updated_at: now.toISOString(),
                        deleted_at: null
                    }
                    void supabaseClient
                        .from(BenhAnThuocTable)
                        .upsert(newBenhAnThuoc).then(resp => {
                            console.log('resp-upsert.BenhAnThuoc')
                            console.log(resp)
                        })
                })

                oldBenhAnThuocs.forEach(benhAnThuoc => {
                    if (benhAnThuoc === null) {
                        return
                    }

                    console.log('=====================')
                    console.log(benhAnThuocs
                        .map(benhAnThuoc => benhAnThuoc?.thuoc_id ?? ''))
                    console.log(benhAnThuoc?.thuoc_id ?? '.')
                    console.log(benhAnThuocs
                        .map(benhAnThuoc => benhAnThuoc?.thuoc_id ?? '')
                        .includes(benhAnThuoc?.thuoc_id ?? '.'))
                    if (benhAnThuocs
                        .map(benhAnThuoc => benhAnThuoc?.thuoc_id ?? '')
                        .includes(benhAnThuoc?.thuoc_id ?? '.')) {
                        return
                    }

                    const newBenhAnThuoc: BenhAnThuoc = {
                        benh_an_id: benhAnThuoc.benh_an_id,
                        ghi_chu: benhAnThuoc.ghi_chu,
                        kham_benh_id: benhAnThuoc.kham_benh_id,
                        so_luong: benhAnThuoc.so_luong,
                        thuoc_id: benhAnThuoc.thuoc_id,

                        created_at: benhAnThuoc.created_at,
                        updated_at: benhAnThuoc.updated_at,
                        deleted_at: now.toISOString()
                    }
                    void supabaseClient
                        .from(BenhAnThuocTable)
                        .upsert(newBenhAnThuoc).then(resp => {
                            console.log('resp-upsert.BenhAnThuoc')
                            console.log(resp)
                        })
                })

                onCloseClick()
            })
    }

    function onchangeListThuoc(data: Array<Record<string, any>>, i: number) {
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
        setBenhAnThuocs(selectedData)
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
                                            value={benhAn?.chan_doan ?? ''}
                                            onChange={e => {
                                                setBenhAn({
                                                    id: benhAn?.id ?? '',

                                                    bac_sy_id: benhAn?.bac_sy_id ?? '',
                                                    benh_nhan_id: benhAn?.benh_nhan_id ?? '',
                                                    chan_doan: e.target.value,
                                                    kham_benh_id: benhAn?.kham_benh_id ?? '',
                                                    loi_dan: benhAn?.loi_dan ?? '',
                                                    tai_kham: benhAn?.tai_kham ?? null,
                                                    trieu_chung: benhAn?.trieu_chung ?? '',

                                                    created_at: benhAn?.created_at ?? now.toISOString(),
                                                    updated_at: benhAn?.updated_at ?? now.toISOString()
                                                })
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
                                            value={ToDateFormat(new Date(benhAn?.created_at ?? now.toISOString()))}
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
                            value={benhAn?.trieu_chung ?? ''}
                            className="self-stretch rounded-3xs bg-monochrome-white box-border h-[41px] flex flex-row py-0 px-4 items-center justify-start gap-[4px] border-[1px] border-solid border-grey-grey-40-t"
                            onChange={(e) => {
                                setBenhAn({
                                    id: benhAn?.id ?? '',

                                    bac_sy_id: benhAn?.bac_sy_id ?? '',
                                    benh_nhan_id: benhAn?.benh_nhan_id ?? '',
                                    chan_doan: benhAn?.chan_doan ?? '',
                                    kham_benh_id: benhAn?.kham_benh_id ?? '',
                                    loi_dan: benhAn?.loi_dan ?? '',
                                    tai_kham: benhAn?.tai_kham ?? null,
                                    trieu_chung: e.target.value,

                                    created_at: benhAn?.created_at ?? now.toISOString(),
                                    updated_at: benhAn?.updated_at ?? now.toISOString()
                                })
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
                                            size: '60%'
                                        },
                                        {
                                            name: 'Số lượng',
                                            inputMethod: 'number',
                                            size: '12%'
                                        },
                                        {
                                            name: 'Ghi chú',
                                            inputMethod: 'text',
                                            size: '100%'
                                        }
                                    ]}
                                    data={benhAnThuocs.map(benhAnThuoc => {
                                        if (benhAnThuoc === null) {
                                            return {
                                                _id: `${new Date().getTime()}.${Math.random().toString(36).substring(2, 9)}`,
                                                'Tên thuốc': '',
                                                'Số lượng': '',
                                                'Ghi chú': ''
                                            }
                                        }
                                        return {
                                            _id: `${new Date().getTime()}.${Math.random().toString(36).substring(2, 9)}`,
                                            'Tên thuốc': benhAnThuoc.thuoc_id,
                                            'Số lượng': benhAnThuoc.so_luong,
                                            'Ghi chú': benhAnThuoc.ghi_chu
                                        }
                                    })}
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
                    <div className="self-stretch flex flex-row items-start justify-start gap-[16px]">
                        <div className="w-[310px] flex flex-col items-start justify-start">
                            <div className="flex flex-row items-start justify-start gap-[2px]">
                                <div className="relative leading-[150%]">Tái khám</div>
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
                                            value={(() => {
                                                if (benhAn == null) {
                                                    return ''
                                                }
                                                if (benhAn.tai_kham == null) {
                                                    return ''
                                                }

                                                return ToDateFormat(new Date(benhAn.tai_kham))
                                            })()}
                                            onChange={(e) => {
                                                let taiKham: Date | null = null

                                                if (e.target.value !== '') {
                                                    taiKham = new Date(e.target.value)
                                                }

                                                setBenhAn({
                                                    id: benhAn?.id ?? '',

                                                    bac_sy_id: benhAn?.bac_sy_id ?? '',
                                                    benh_nhan_id: benhAn?.benh_nhan_id ?? '',
                                                    chan_doan: benhAn?.chan_doan ?? '',
                                                    kham_benh_id: benhAn?.kham_benh_id ?? '',
                                                    loi_dan: benhAn?.loi_dan ?? '',
                                                    tai_kham: taiKham !== null ? taiKham.toISOString() : null,
                                                    trieu_chung: benhAn?.trieu_chung ?? '',

                                                    created_at: benhAn?.created_at ?? now.toISOString(),
                                                    updated_at: benhAn?.updated_at ?? now.toISOString()
                                                })
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
                    <div className="w-[636px] flex flex-col items-start justify-start">
                        <div className="flex flex-row items-start justify-start gap-[2px]">
                            <div className="relative leading-[150%]">Lời dặn</div>
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
                            value={benhAn?.loi_dan ?? ''}
                            className="self-stretch rounded-3xs bg-monochrome-white box-border h-[41px] flex flex-row py-0 px-4 items-center justify-start gap-[4px] border-[1px] border-solid border-grey-grey-40-t"
                            onChange={(e) => {
                                setBenhAn({
                                    id: benhAn?.id ?? '',

                                    bac_sy_id: benhAn?.bac_sy_id ?? '',
                                    benh_nhan_id: benhAn?.benh_nhan_id ?? '',
                                    chan_doan: benhAn?.chan_doan ?? '',
                                    kham_benh_id: benhAn?.kham_benh_id ?? '',
                                    loi_dan: e.target.value,
                                    tai_kham: benhAn?.tai_kham ?? null,
                                    trieu_chung: benhAn?.trieu_chung ?? '',

                                    created_at: benhAn?.created_at ?? now.toISOString(),
                                    updated_at: benhAn?.updated_at ?? now.toISOString()
                                })
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
