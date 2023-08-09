import KhamBenhContainer from '../components/KhamBenhContainer'
import MedicalRegisterPopup from '../components/MedicalRegisterPopup'
import MenuBasi, {TimeSheetDoctorEnum} from '../components/MenuBasi'
import PersonalInfoPopup from '../components/PersonalInfoPopup'
import {CtrlPopupVisibility} from '../utils/utils'
import {QueryListMedicalExamination} from '../api/graphql_query'
import {getAuthUser, GraphQLClient} from '../utils/supabaseClient'
import {type FunctionComponent, useEffect, useState} from 'react'
import {type ListMedicalExaminationResponse} from '../api/response'

const TimesheetDoctor: FunctionComponent = () => {
    const popupVisibility = CtrlPopupVisibility()
    const blurBackgroundRef = popupVisibility.blurBackgroundRef
    const showMedicalRegisterContainer = popupVisibility.showPp
    const showMedicalRegister = popupVisibility.showP
    const hideMedicalRegister = popupVisibility.hideP

    const popupPersonalInfoVisibility = CtrlPopupVisibility()
    const personalInfoBlurBackgroundRef = popupPersonalInfoVisibility.blurBackgroundRef
    const medicalPersonalInfoPopupMedicalRegisterContainer = popupPersonalInfoVisibility.showPp
    const personalInfoShowMedicalRegister = popupPersonalInfoVisibility.showP
    const personalInfoHideMedicalRegister = popupPersonalInfoVisibility.hideP

    const [medicalExaminations, setMedicalExaminations] = useState<ListMedicalExaminationResponse | null>(null)
    const [selectedID, setSelectedID] = useState('')

    const onActionClick = (id: string) => {
        setSelectedID(id)
        showMedicalRegister()
    }

    // get list medical examination
    useEffect(() => {
        void getAuthUser().then((user) => {
            if (user === null) {
                return
            }

            new GraphQLClient()
                .Send(QueryListMedicalExamination(user.id))
                .then((response) => {
                    const resp = response as ListMedicalExaminationResponse
                    setMedicalExaminations(resp)
                    console.log('resp')
                    console.log(resp)
                }).catch((error) => {
                console.log(error)
            })
        })
    }, [])

    return (
        <div className="relative w-full h-[1024px] text-center text-sm text-grey-grey-60 font-body-body-2">
            <div className="absolute top-[0px] left-[0px] bg-background-background w-[100%] h-[1024px] overflow-hidden"
                 style={{paddingBottom: '100px'}}
            >
                <div className="absolute top-[0px] left-[14%] h-[1024px] flex flex-col items-start justify-start">
                    <div className="h-[1024px] flex flex-col p-8 box-border items-center justify-start gap-[32px]">
                        <div className="w-[1498px] flex flex-row items-center justify-between text-left">
                            <div
                                className="rounded-xl bg-monochrome-white box-border w-[343px] h-[49px] flex flex-row py-0 px-3 items-center justify-start gap-[8px] border-[1px] border-solid border-grey-grey-40-t"
                                style={{display: 'none'}}
                            >
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
                                    className="rounded-lg bg-monochrome-white box-border h-8 hidden flex-row py-2 px-4 items-center justify-center gap-[8px] text-sm text-blue-blue-400 border-[1px] border-solid border-blue-blue-400">
                                    <img
                                        className="relative w-4 h-4"
                                        alt=""
                                        src="/lefticon1.svg"
                                    />
                                    <div className="relative leading-[150%] uppercase font-medium">
                                        thêm
                                    </div>
                                    <img
                                        className="relative w-6 h-6 hidden"
                                        alt=""
                                        src="/righticon.svg"
                                    />
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
                                        Họ tên
                                    </div>
                                </div>
                                <div className="self-stretch w-[308px] flex flex-row items-center justify-start">
                                    <div className="relative leading-[150%] font-medium inline-block w-[46px] shrink-0">
                                        Liên hệ
                                    </div>
                                </div>
                                <div className="self-stretch w-[200px] flex flex-row items-center justify-start">
                                    <div className="relative leading-[150%] font-medium">
                                        Giờ khám
                                    </div>
                                </div>
                                <div className="self-stretch flex-1 flex flex-row items-center justify-start">
                                    <div className="relative leading-[150%] font-medium">
                                        Loại khám
                                    </div>
                                </div>
                                <div className="self-stretch w-[100px] flex flex-row items-center justify-start">
                                    <div className="relative leading-[150%] font-medium">
                                        Hành động
                                    </div>
                                </div>
                            </div>
                            {
                                medicalExaminations?.data.kham_benhCollection.edges.map((item) =>
                                    <KhamBenhContainer
                                        key={item.node.id}
                                        ID={item.node.id}
                                        OrderNumber={item.node.so_thu_tu}
                                        profile={item.node.benh_nhan.profiles}
                                        TypeAccess={item.node.loai_kham === null ? '' : item.node.loai_kham.ten}
                                        StartAt={new Date(item.node.ngay_gio)}
                                        Duration={item.node.duration}
                                        propColor="#202124"
                                        ActionsCallback={() => {
                                            onActionClick(item.node.id)
                                        }}
                                    />
                                )
                            }
                        </div>
                        <div
                            className="self-stretch flex flex-row items-center justify-end gap-[24px] text-grey-grey-900-p"
                            style={{display: 'none'}}
                        >
                            <div className="flex flex-row items-center justify-center gap-[16px]">
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
                                className="rounded-lg box-border h-8 flex flex-row py-0 px-4 items-center justify-center gap-[16px] text-left text-xs border-[1px] border-solid border-grey-grey-300-s">
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
                                  SelectedItem={TimeSheetDoctorEnum}/>
                    </div>
                </div>
            </div>

            <div
                id={'blur-background'}
                ref={blurBackgroundRef}
                style={{
                    visibility: 'hidden',
                    position: 'fixed'
                }}
                className="absolute top-[calc(50%_-_512px)] left-[0px] bg-blur-background w-[100%] h-[1024px]"
                onClick={hideMedicalRegister}
            />
            {showMedicalRegisterContainer &&
                medicalExaminations?.data.kham_benhCollection.edges.map((item) => {
                        if (item.node.id === selectedID) {
                            console.log('item')
                            console.log(item)
                            const benhNhanID = item.node.benh_nhan?.profiles?.id
                            console.log(benhNhanID)
                            return (
                                <MedicalRegisterPopup
                                    key={item.node.id}
                                    selectedUserID={benhNhanID}
                                    khamBenhID={item.node.id}
                                    formID={undefined}
                                    StartAt={new Date(item.node.ngay_gio)}
                                    Duration={item.node.duration}
                                    loaiKhamE={item.node.loai_kham?.ten}
                                    onCloseClick={hideMedicalRegister}
                                />
                            )
                        }
                        return null
                    }
                )
            }

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

export default TimesheetDoctor
