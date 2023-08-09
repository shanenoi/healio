import React, {useEffect, useRef, useState} from 'react'

interface MenuBasiType {
    SelectedItem: number
    onClickUpdateProfile: () => void
}

const downHighlight = 'w-[200px] h-[50px] flex flex-col py-6 px-4 box-border items-start justify-center cursor-button'
const upHighlight = 'bg-blue-blue-400 box-border w-[200px] h-[50px] flex flex-col p-4 items-start justify-center text-monochrome-white border-l-[4px] border-solid border-monochrome-white cursor-button'

export const TimeSheetDoctorEnum = 0
export const PatientDetailsEnum = 1
export const OrderDetailsEnum = 2

const MenuBasi: React.FC<MenuBasiType> = ({
                                              SelectedItem,
                                              onClickUpdateProfile
                                          }) => {
    const ref = useRef(null)

    const [listItemsClasses, setListItemsClasses] = useState<string[]>(
        [
            downHighlight,
            downHighlight,
            downHighlight
        ].map((_, i) => i === SelectedItem ? upHighlight : downHighlight)
    )
    useEffect(() => {
        if (ref.current === null) {
            return
        }
        (ref.current as HTMLImageElement).src = listItemsClasses[TimeSheetDoctorEnum] === upHighlight ? '/calendarblank-regular.svg' : '/CalendarBlank_Regular.svg'
    }, [listItemsClasses])

    return (
        <div
            className="absolute top-[90px] left-[0px] w-[200px] flex flex-col items-center justify-start gap-[18px]">
            <div className="self-stretch flex flex-col items-start justify-center">
                <div
                    className={listItemsClasses[TimeSheetDoctorEnum]}
                    onClick={() => {
                        setListItemsClasses(listItemsClasses.map((_, i) => i === TimeSheetDoctorEnum ? upHighlight : downHighlight))
                        document.location.href = '/timesheet-doctor'
                    }}
                >
                    <div className="flex flex-row items-center justify-start gap-[16px]">
                        <img
                            className="relative w-6 h-6"
                            alt=""
                            ref={ref}
                        />
                        <div className="relative leading-[150%]">Lịch làm việc</div>
                    </div>
                </div>
                <div
                    className={listItemsClasses[PatientDetailsEnum]}
                    onClick={() => {
                        setListItemsClasses(listItemsClasses.map((_, i) => i === PatientDetailsEnum ? upHighlight : downHighlight))
                        document.location.href = '/list_patient_details_view'
                    }}
                >
                    <div className="w-[108px] flex flex-row items-center justify-start gap-[16px]">
                        <img
                            className="relative w-[24.25px] h-6"
                            alt=""
                            src="/userlist-regular.svg"
                        />
                        <div className="relative leading-[150%]">Bệnh án</div>
                    </div>
                </div>
                <div
                    className={listItemsClasses[OrderDetailsEnum]}
                    onClick={() => {
                        setListItemsClasses(listItemsClasses.map((_, i) => i === OrderDetailsEnum ? upHighlight : downHighlight))
                    }}
                >
                    <div className="w-[108px] flex flex-row items-center justify-start gap-[16px]">
                        <img
                            className="relative w-6 h-6"
                            alt=""
                            src="/receipt-regular.svg"
                        />
                        <div className="relative leading-[150%]">Hóa đơn</div>
                    </div>
                </div>

            </div>
            <img
                className="relative w-[164px] h-0.5"
                alt=""
                src="/vector-11.svg"
            />
            <div className="self-stretch flex flex-col items-start justify-center">
                <div
                    className="w-[200px] h-[50px] flex flex-col py-6 px-4 box-border items-start justify-center cursor-button"
                    onClick={onClickUpdateProfile}
                >
                    <div className="w-[108px] flex flex-row items-center justify-start gap-[16px]">
                        <img className="relative w-6 h-6" alt="" src="/userlist-regular1.svg"/>
                        <div className="relative leading-[150%]">Thông tin</div>
                    </div>
                </div>
                <div
                    className="w-[200px] h-[50px] flex flex-col py-6 px-4 box-border items-start justify-center cursor-button"
                    onClick={() => {
                        localStorage.clear()
                        window.location.href = '/log-in'
                    }}
                >
                    <div className="w-[108px] flex flex-row items-center justify-start gap-[16px]">
                        <img className="relative w-6 h-6" alt="" src="/signout-regular.svg"/>
                        <div className="relative leading-[150%]">Đăng xuất</div>
                    </div>
                </div>
            </div>
        </div>

    )
}

export default MenuBasi
