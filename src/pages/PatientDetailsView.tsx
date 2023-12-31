import MenuBasi, {PatientDetailsEnum} from '../components/MenuBasi'
import OrderDetailsPopup from '../components/OrderDetailsPopup'
import PatientDetailsPopup from '../components/PatientDetailsPopup'
import PatientViewContainer from '../components/PatientViewContainer'
import PersonalInfoPopup from '../components/PersonalInfoPopup'
import {CtrlPopupVisibility} from '../utils/utils'
import {supabaseClient} from '../utils/supabaseClient'
import {type BenhAn, BenhAnTable} from '../utils/supabaseTypes'
import {type FunctionComponent, useEffect, useState} from 'react'
import {useParams} from 'react-router-dom'
import {v4 as uuidv4} from 'uuid'

const PatientDetailsView: FunctionComponent = () => {
    const {patientID, khamBenhID} = useParams<{ patientID: string, khamBenhID: string }>()

    const popupMedicalRegisterVisibility = CtrlPopupVisibility()
    const medicalRegisterBlurBackgroundRef = popupMedicalRegisterVisibility.blurBackgroundRef
    const medicalRegisterShowMedicalRegisterContainer = popupMedicalRegisterVisibility.showPp
    const medicalRegisterShowMedicalRegister = popupMedicalRegisterVisibility.showP
    const medicalRegisterHideMedicalRegister = popupMedicalRegisterVisibility.hideP

    const popupOrderDetailsVisibility = CtrlPopupVisibility()
    const orderDetailsBlurBackgroundRef = popupOrderDetailsVisibility.blurBackgroundRef
    const orderDetailsShowMedicalRegisterContainer = popupOrderDetailsVisibility.showPp
    const orderDetailsShowMedicalRegister = popupOrderDetailsVisibility.showP
    const orderDetailsHideMedicalRegister = popupOrderDetailsVisibility.hideP

    const popupPersonalInfoVisibility = CtrlPopupVisibility()
    const personalInfoBlurBackgroundRef = popupPersonalInfoVisibility.blurBackgroundRef
    const medicalPersonalInfoPopupMedicalRegisterContainer = popupPersonalInfoVisibility.showPp
    const personalInfoShowMedicalRegister = popupPersonalInfoVisibility.showP
    const personalInfoHideMedicalRegister = popupPersonalInfoVisibility.hideP

    const [selectedID, setSelectedID] = useState<string | undefined>('')
    const [benhAns, setBenhAns] = useState<BenhAn[]>([])
    const [triggerRefreshListBenhAn, setTriggerRefreshListBenhAn] = useState(false)

    useEffect(() => {
        void supabaseClient
            .from(BenhAnTable)
            .select('*')
            .eq('benh_nhan_id', patientID)
            .order('created_at', {ascending: false})
            .then(resp => {
                setBenhAns(resp.data as BenhAn[])
                console.log('benhAns')
                console.log(benhAns)
            })
    }, [triggerRefreshListBenhAn])

    return (
        <div className="relative w-full h-[1024px] text-center text-sm text-grey-grey-60 font-body-body-2">
            <div className="absolute top-[0px] left-[0px] bg-background-background w-[100%] h-[1024px] overflow-hidden"
                 style={{paddingBottom: '100px'}}
            >
                <div className="absolute top-[0px] left-[14%] h-[1024px] flex flex-col items-start justify-start">
                    <div className="h-[1024px] flex flex-col p-8 box-border items-center justify-start gap-[32px]">
                        <div className="w-[1498px] flex flex-row items-center justify-between text-left">
                            <div
                                className="rounded-xl bg-monochrome-white box-border w-[343px] h-[49px] flex flex-row py-0 px-3 items-center justify-start gap-[8px] border-[1px] border-solid border-grey-grey-40-t">
                                <img
                                    className="relative w-[22px] h-[22px]"
                                    alt=""
                                    src="/left-icon.svg"
                                />
                                <div className="flex-1 relative leading-[150%]">
                                    {/* TODO: update here */}
                                    Tìm kiếm tên bệnh nhân
                                </div>
                            </div>
                            <div
                                className="flex flex-row items-start justify-start gap-[20px] text-center text-xs text-grey-grey-900-p">
                                <div
                                    className="rounded-lg box-border h-8 hidden flex-row py-2 px-4 items-center justify-center gap-[8px] border-[1px] border-solid border-grey-grey-900-p">
                                    <img
                                        className="relative w-4 h-4"
                                        alt=""
                                        src="/lefticon.svg"
                                    />
                                    <div className="relative leading-[150%]">Bộ lọc</div>
                                    <img
                                        className="relative w-6 h-6 hidden"
                                        alt=""
                                        src="/righticon.svg"
                                    />
                                </div>
                                <div
                                    className="cursor-button flex rounded-lg bg-monochrome-white box-border h-8 py-2 px-4 items-center justify-center gap-[8px] text-sm text-blue-blue-400 border-[1px] border-solid border-blue-blue-400"
                                    onClick={() => {
                                        setSelectedID(undefined)
                                        medicalRegisterShowMedicalRegister()
                                    }}
                                >
                                    <img
                                        className="relative w-4 h-4"
                                        alt=""
                                        src="/lefticon1.svg"
                                    />
                                    <div className="relative leading-[150%] uppercase font-medium">
                                        Thêm bệnh án
                                    </div>
                                </div>
                                <div
                                    className="cursor-button flex rounded-lg bg-monochrome-white box-border h-8 py-2 px-4 items-center justify-center gap-[8px] text-sm text-blue-blue-400 border-[1px] border-solid border-blue-blue-400"
                                    onClick={() => {
                                        orderDetailsShowMedicalRegister()
                                    }}
                                >
                                    <img
                                        className="relative w-4 h-4"
                                        alt=""
                                        src="/noun-printer-5896976.svg"
                                    />
                                    <div className="relative leading-[150%] uppercase font-medium">
                                        Hóa đơn
                                    </div>
                                </div>

                            </div>
                        </div>
                        <div className="flex flex-col items-center justify-start text-blue-blue-900">
                            <div
                                className="rounded-lg bg-blue-blue-20 box-border w-[1498px] flex flex-row p-6 items-start justify-start border-[1px] border-solid border-blue-blue-100">
                                <div className="self-stretch w-20 flex flex-row items-center justify-start">
                                    <div className="relative leading-[150%] font-medium">
                                        Số thứ tự
                                    </div>
                                </div>
                                <div
                                    className="flex-1 rounded-tl-lg rounded-tr-none rounded-br-none rounded-bl-lg h-[19px] flex flex-row items-center justify-start text-left">
                                    <div className="relative leading-[150%] font-medium">
                                        Chẩn đoán
                                    </div>
                                </div>
                                <div className="self-stretch w-[200px] flex flex-row items-center justify-start">
                                    <div className="relative leading-[150%] font-medium">
                                        Ngày lập
                                    </div>
                                </div>
                                <div className="self-stretch w-[100px] flex flex-row items-center justify-start">
                                    <div className="relative leading-[150%] font-medium">
                                        Hành động
                                    </div>
                                </div>
                            </div>
                            {
                                benhAns.map((item, idx) => {
                                    if (item === null) {
                                        return null
                                    }
                                    return (
                                        <PatientViewContainer
                                            ID={item.id}
                                            key={item.id}
                                            OrderNumber={idx + 1}
                                            BenhAn={item}
                                            propColor="#202124"
                                            ActionsCallback={() => {
                                                setSelectedID(item.id)
                                                medicalRegisterShowMedicalRegister()
                                                console.log(selectedID)
                                            }}
                                        />
                                    )
                                })
                            }
                        </div>
                        <div
                            className="self-stretch flex flex-row items-center justify-end gap-[24px] text-grey-grey-900-p"
                        >
                            <div className="flex flex-row items-center justify-center gap-[16px]"
                                 style={{display: 'none'}}
                            >
                                <img
                                    className="relative w-3.5 h-3.5"
                                    alt=""
                                    src="/caretleft.svg"
                                />
                                <div className="flex flex-row items-center justify-center gap-[8px]">
                                    <div className="relative w-6 h-6 overflow-hidden shrink-0 text-blue-blue-400">
                                        <div
                                            className="absolute top-[0px] left-[0px] rounded-[50%] bg-blue-blue-20 w-6 h-6"/>
                                        <div className="absolute top-[4px] left-[8px]">1</div>
                                    </div>
                                    <div className="relative w-6 h-6 overflow-hidden shrink-0">
                                        <div className="absolute top-[0px] left-[0px] rounded-[50%] w-6 h-6"/>
                                        <div className="absolute top-[4px] left-[8px]">2</div>
                                    </div>
                                    <div className="w-3.5 h-3.5 flex flex-col items-center justify-center text-xs">
                                        <div className="relative">...</div>
                                    </div>
                                    <div className="relative w-6 h-6 overflow-hidden shrink-0">
                                        <div className="absolute top-[0px] left-[0px] rounded-[50%] w-6 h-6"/>
                                        <div className="absolute top-[4px] left-[8px]">9</div>
                                    </div>
                                    <div className="relative w-6 h-6 overflow-hidden shrink-0">
                                        <div className="absolute top-[0px] left-[0px] rounded-[50%] w-6 h-6"/>
                                        <div className="absolute top-[4px] left-[4px]">10</div>
                                    </div>
                                </div>
                                <img
                                    className="relative w-3.5 h-3.5"
                                    alt=""
                                    src="/caretright.svg"
                                />
                            </div>
                            <div
                                className="rounded-lg box-border h-8 flex flex-row py-0 px-4 items-center justify-center gap-[16px] text-left text-xs border-[1px] border-solid border-grey-grey-300-s"
                                style={{display: 'none'}}
                            >
                                <div className="relative">10</div>
                                <img
                                    className="relative w-4 h-4"
                                    alt=""
                                    src="/caretdown-regular.svg"
                                />
                            </div>
                        </div>
                    </div>
                </div>
                <div
                    className="absolute top-[0px] left-[0px] bg-neutral-grey-800 w-[200px] h-[1024px] text-left text-grey-grey-300-s"
                    style={{position: 'fixed'}}
                >
                    <div className="absolute top-[0px] left-[0px] w-[200px] h-[376px]">
                        <div
                            className="absolute top-[0px] left-[47.27px] w-[98.42px] h-[90px] flex flex-row items-center justify-center">
                            <img
                                className="relative w-[81.2px] h-[70px] object-cover hidden"
                                alt=""
                                src="/logo-1@2x.png"
                            />
                        </div>

                        <MenuBasi onClickUpdateProfile={personalInfoShowMedicalRegister}
                                  SelectedItem={PatientDetailsEnum}/>
                    </div>
                </div>
            </div>

            <div
                id={'blur-background'}
                ref={medicalRegisterBlurBackgroundRef}
                style={{
                    visibility: 'hidden',
                    position: 'fixed'
                }}
                className="absolute top-[calc(50%_-_512px)] left-[0px] bg-blur-background w-[100%] h-[1024px]"
                onClick={medicalRegisterHideMedicalRegister}
            />
            {medicalRegisterShowMedicalRegisterContainer && (
                <PatientDetailsPopup
                    formID={uuidv4()}
                    existedID={selectedID}
                    existedBenhAn={(() => {
                        if (selectedID !== undefined) {
                            return benhAns?.find((item) => item?.id === selectedID)
                        }
                        return undefined
                    })()}
                    patientID={patientID ?? ''}
                    khamBenhID={khamBenhID ?? ''}
                    onCloseClick={() => {
                        setTriggerRefreshListBenhAn(!triggerRefreshListBenhAn)
                        medicalRegisterHideMedicalRegister()
                    }}
                    showOrderDetails={() => {
                        orderDetailsShowMedicalRegister()
                    }}
                />
            )}

            <div
                id={'blur-background'}
                ref={orderDetailsBlurBackgroundRef}
                style={{
                    visibility: 'hidden',
                    position: 'fixed'
                }}
                className="absolute top-[calc(50%_-_512px)] left-[0px] bg-blur-background w-[100%] h-[1024px]"
                onClick={orderDetailsHideMedicalRegister}
            />
            {orderDetailsShowMedicalRegisterContainer && (
                <OrderDetailsPopup
                    formID={uuidv4()}
                    existedID={selectedID}
                    existedBenhAn={(() => {
                        if (selectedID !== undefined) {
                            return benhAns?.find((item) => item?.id === selectedID)
                        }
                        return undefined
                    })()}
                    patientID={patientID ?? ''}
                    khamBenhID={khamBenhID ?? ''}
                    onCloseClick={() => {
                        orderDetailsHideMedicalRegister()
                    }}
                />
            )}

            <div
                id={'blur-background'}
                ref={personalInfoBlurBackgroundRef}
                style={{
                    visibility: 'hidden',
                    position: 'fixed'
                }}
                className="absolute top-[calc(50%_-_512px)] left-[0px] bg-blur-background w-[100%] h-[1024px]"
                onClick={personalInfoHideMedicalRegister}
            />
            {medicalPersonalInfoPopupMedicalRegisterContainer && (
                <PersonalInfoPopup onCloseClick={personalInfoHideMedicalRegister}/>
            )}
        </div>
    )
}

export default PatientDetailsView
