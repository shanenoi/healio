import DynamicTable from './DynamicTable'
import React, {type FunctionComponent, useEffect, useState} from 'react'
import {getAuthUser, supabaseClient} from '../utils/supabaseClient'
import {
    type BenhAn,
    BenhAnTable,
    type BenhAnThuoc,
    BenhAnThuocTable,
    type HoaDon,
    HoaDonTable,
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

const OrderDetailsPopup: FunctionComponent<EmployeeInfoContainerType> = ({
                                                                             formID,
                                                                             existedID,
                                                                             existedBenhAn,
                                                                             patientID,
                                                                             khamBenhID,
                                                                             onCloseClick
                                                                         }) => {
    const [currentUser, setCurrentUser] = useState<Profiles>(null)

    const [benhAn, setBenhAn] = useState<BenhAn>(null)
    const [hoaDon, setHoaDon] = useState<HoaDon>(null)
    const [benhAns, setBenhAns] = useState<BenhAn[]>([])
    const [thuocs, setThuocs] = useState<Thuoc[]>([])
    const [, setBenhAnThuocs] = useState<BenhAnThuoc[]>([])
    const [selectedID, setSelectedID] = useState(existedBenhAn?.id)
    const listStatuses = ['Chờ Thanh Toán', 'Đã Thanh Toán', 'Đã Hũy']
    const [listThuocBenhAnData, setListThuocBenhAnData] = useState<Array<Record<string, any>>>([])

    useEffect(() => {
        if (selectedID === undefined) {
            return
        }

        void supabaseClient
            .from(BenhAnTable)
            .select('*')
            .eq('id', selectedID)
            .single()
            .then(resp => {
                setBenhAn(resp.data as BenhAn)

                void supabaseClient
                    .from(BenhAnThuocTable)
                    .select('*')
                    .eq('benh_an_id', selectedID)
                    .is('deleted_at', null)
                    .then(resp => {
                        const _benhAnThuoc = resp.data as BenhAnThuoc[]
                        setBenhAnThuocs(_benhAnThuoc)

                        console.log(_benhAnThuoc)
                        setListThuocBenhAnData(_benhAnThuoc.map(bat => {
                            if (bat === null) {
                                return {
                                    _id: `${new Date().getTime()}.${Math.random().toString(36).substring(2, 9)}`,
                                    'Tên thuốc': '',
                                    'Số lượng': '',
                                    'Tổng tiền': ''
                                }
                            }
                            return {
                                _id: `${new Date().getTime()}.${Math.random().toString(36).substring(2, 9)}`,
                                'Tên thuốc': bat.thuoc_id,
                                'Số lượng': bat.so_luong,
                                'Tổng tiền': `${bat.so_luong * (() => {
                                    const thuoc = thuocs.find(thuoc => thuoc?.id === bat.thuoc_id)
                                    if (thuoc === undefined || thuoc === null) {
                                        return 0
                                    }
                                    return thuoc.gia
                                })()}đ`
                            }
                        }))
                    })
            })
    }, [selectedID])

    useEffect(() => {
        const now = new Date()
        setHoaDon({
            id: hoaDon?.id ?? formID,

            benh_an_id: selectedID ?? null,
            phuong_thuc: hoaDon?.phuong_thuc ?? '',
            tien_kham: hoaDon?.tien_kham ?? null,
            tong_so_tien: hoaDon?.tong_so_tien ?? 0,
            trang_thai: hoaDon?.trang_thai ?? '',

            created_at: hoaDon?.created_at ?? now.toISOString(),
            updated_at: now.toISOString(),
            deleted_at: null
        })

        if (selectedID === undefined) {
            return
        }

        void supabaseClient
            .from(HoaDonTable)
            .select('*')
            .eq('benh_an_id', selectedID)
            .single()
            .then(resp => {
                if (resp.error !== null) {
                    console.log('resp.error.HoaDonTable')
                    console.log(resp.error)
                    return
                }
                setHoaDon(resp.data as HoaDon)
            })
    }, [selectedID])

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

    useEffect(() => {
        void supabaseClient
            .from(BenhAnTable)
            .select('*')
            .eq('benh_nhan_id', patientID)
            .then(resp => {
                setBenhAns(resp.data as BenhAn[])
                console.log('benhAns')
                console.log(benhAns)
            })
    }, [])

    function saveOrderAction() {
        if (hoaDon === null) {
            return
        }

        void supabaseClient
            .from(HoaDonTable)
            .upsert(hoaDon)
            .then(resp => {
                if (resp.error !== null) {
                    console.log('resp-upsert.hoaDon')
                    console.log(resp.error)
                    return
                }

                console.log('resp')
                console.log(resp)
                onCloseClick()
            })
    }

    return <div
        className="absolute top-[calc(50%_-_400px)] left-[calc(50%_-_350px)] rounded-2xl bg-monochrome-white flex flex-row py-0 px-8 items-start justify-start text-center text-sm text-neutral-grey-700 font-button-button-2">
        <div
            className="self-stretch w-[636px] flex flex-col py-8 px-0 box-border items-center justify-start gap-[32px]">
            <div className="self-stretch flex flex-row items-start justify-between text-blue-blue-400">
                <div className="flex-1 flex flex-col items-center justify-center gap-[16px]">
                </div>
                <img className="relative w-6 h-6 cursor-button" alt="" src={'/x-regular3.svg'}
                     onClick={onCloseClick}/>
            </div>
            <div className="self-stretch flex flex-col items-start justify-start gap-[16px] text-left text-base">
                <div className="relative font-medium">Cập Nhật Hóa Đơn</div>
                <div
                    className="self-stretch flex flex-col items-start justify-start gap-[16px] text-xs text-grey-grey-900-p">
                    <div className="self-stretch flex flex-row items-start justify-start gap-[16px]">
                        <div className="w-[310px] flex flex-col items-start justify-start">
                            <div className="flex flex-row items-start justify-start gap-[2px]">
                                <div className="relative leading-[150%]">Bác sỹ</div>
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
                                        <select
                                            className={'input select-input flex-1 relative leading-[150%] flex items-center h-7'}
                                            value={benhAn?.id ?? ''}
                                            onChange={(e) => {
                                                setSelectedID(e.target.value)
                                            }}
                                        >
                                            <option className={'select-input-option'} value={''} disabled>--</option>
                                            {benhAns.map((ba) => {
                                                if (ba === null) {
                                                    return null
                                                }
                                                return <option
                                                    className={'select-input-option'}
                                                    value={ba.id}
                                                    key={ba.id}
                                                >
                                                    {ba.chan_doan}
                                                </option>
                                            })}
                                        </select>
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
                                <div className="relative leading-[150%]">Trạng thái</div>
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
                                        <select
                                            className={'input select-input flex-1 relative leading-[150%] flex items-center h-7'}
                                            value={hoaDon?.trang_thai ?? 'Chờ Thanh Toán'}
                                            onChange={(e) => {
                                                setHoaDon({
                                                    id: hoaDon?.id ?? '',

                                                    benh_an_id: hoaDon?.benh_an_id ?? null,
                                                    phuong_thuc: hoaDon?.phuong_thuc ?? '',
                                                    tien_kham: hoaDon?.tien_kham ?? 0,
                                                    tong_so_tien: hoaDon?.tong_so_tien ?? 0,
                                                    trang_thai: e.target.value,

                                                    created_at: hoaDon?.created_at ?? null,
                                                    updated_at: hoaDon?.updated_at ?? null,
                                                    deleted_at: hoaDon?.deleted_at ?? null
                                                })
                                            }}
                                        >
                                            {listStatuses.map((stt) => {
                                                if (stt === null) {
                                                    return null
                                                }
                                                return (
                                                    <option
                                                        className={'select-input-option'}
                                                        value={stt}
                                                        key={stt}
                                                    >
                                                        {stt}
                                                    </option>
                                                )
                                            })}
                                        </select>
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
                                <div className="relative leading-[150%]">Tiền khám bệnh</div>
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
                                    <div
                                        className="flex-1 relative leading-[150%]"
                                        style={{display: 'flex', gap: '4px'}}
                                    >
                                        <input
                                            type="number"
                                            className={'input no-arrows'}
                                            placeholder={'0'}
                                            value={Math.floor((hoaDon?.tien_kham ?? 0) / 1000)}
                                            style={{
                                                width: '40px',
                                                textAlign: 'right'
                                            }}
                                            onChange={(e) => {
                                                setHoaDon({
                                                    id: hoaDon?.id ?? '',

                                                    benh_an_id: hoaDon?.benh_an_id ?? '',
                                                    phuong_thuc: hoaDon?.phuong_thuc ?? '',
                                                    tien_kham: Math.floor((parseInt(e.target.value) ?? 1) * 1000),
                                                    tong_so_tien: hoaDon?.tong_so_tien ?? 0,
                                                    trang_thai: hoaDon?.trang_thai ?? '',

                                                    created_at: hoaDon?.created_at ?? null,
                                                    updated_at: hoaDon?.updated_at ?? null,
                                                    deleted_at: hoaDon?.deleted_at ?? null
                                                })
                                            }}
                                        />
                                        <input
                                            type="text"
                                            className={'input no-arrows'}
                                            placeholder={'000đ'}
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
                    <div
                        className="w-[636px] flex flex-col items-start justify-start"
                        style={{paddingTop: '20px'}}
                    >
                        <div className="flex flex-row items-start justify-start gap-[2px]">
                            <div className="relative leading-[150%]">Đơn thuốc</div>
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
                                            name: 'Tổng tiền',
                                            inputMethod: 'text',
                                            size: '100%'
                                        }
                                    ]}
                                    data={listThuocBenhAnData}
                                    onChange={(data, i) => {
                                    }}
                                    disabled={true}
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
                            <div className="relative leading-[150%]">Tổng tiền</div>
                        </div>
                        <b>
                            <input
                                type={'text'}
                                placeholder={'1000, 0000'}
                                value={(() => {
                                    const totalMoneyThuoc = listThuocBenhAnData
                                        .map(thuoc => parseInt(thuoc['Tổng tiền']) ?? 0)
                                        .reduce((partialSum, a) => partialSum + a, 0)
                                    return ((hoaDon?.tien_kham ?? 0) + (isNaN(totalMoneyThuoc) ? 0 : totalMoneyThuoc))
                                })()}
                                className="self-stretch rounded-3xs bg-monochrome-white box-border h-[41px] flex flex-row py-0 px-4 items-center justify-start gap-[4px] border-[1px] border-solid border-grey-grey-40-t"
                                style={{fontWeight: 'bold'}}
                                disabled={true}
                            />
                        </b>
                    </div>

                </div>
            </div>

            <div
                className="rounded-xl bg-blue-blue-300 w-[636px] h-12 flex flex-row py-2 px-4 box-border items-center justify-center gap-[8px] text-monochrome-white cursor-button"
                onClick={() => {
                    saveOrderAction()
                }}
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

export default OrderDetailsPopup
