import PatientVisitContainer from '../components/PatientVisitContainer'
import {type FunctionComponent, useRef, useState} from 'react'
import MedicalRegisterContainer from '../components/MedicalRegisterContainer'

const MedicalRegister: FunctionComponent = () => {
    const blurBackgroundRef = useRef(null)
    const [showMedicalRegisterContainer, setShowMedicalRegisterContainer] = useState(false)

    const setVisibilityMedicalRegister = (show: boolean) => {
        if (blurBackgroundRef.current === null) {
            return
        }

        if (show) {
            (blurBackgroundRef.current as HTMLElement).style.visibility = 'visible'
            setShowMedicalRegisterContainer(show)
        } else {
            (blurBackgroundRef.current as HTMLElement).style.visibility = 'hidden'
            setShowMedicalRegisterContainer(show)
        }
    }
    const showMedicalRegister = () => {
        setVisibilityMedicalRegister(true)
    }
    const hideMedicalRegister = () => {
        setVisibilityMedicalRegister(false)
    }

    return (
        <div className="relative bg-monochrome-white w-full h-[1024px]">
            <PatientVisitContainer
                productIds="/lefticon9.svg"
                productDimensions="/lefticon9.svg"
                onclick={showMedicalRegister}
            />
            <img
                className="absolute top-[0px] left-[1000px] w-[845px] h-[1024px]"
                alt=""
                src="/rectangle-15.svg"
            />
            <div
                id={'blur-background'}
                ref={blurBackgroundRef}
                style={{visibility: 'hidden'}}
                className="absolute top-[calc(50%_-_512px)] left-[0px] bg-blur-background w-[100%] h-[1024px]"
                // onClick={hideMedicalRegister}
            />
            {showMedicalRegisterContainer && (
                <MedicalRegisterContainer
                    maskGroup="/mask-group4.svg"
                    rightIcon="/righticon4.svg"
                    xRegular="/x-regular3.svg"
                    leftIcon="/lefticon8.svg"
                    rightIcon1="/lefticon8.svg"
                    xRegularClick={hideMedicalRegister}
                    saveClick={(k, b) => {
                        console.log(`k.benhNhanID ${k.benhNhanID}`)
                        console.log(`k.bacSyID ${k.bacSyID}`)
                        console.log(`k.ngayGio ${(k.ngayGio === undefined ? '' : k.ngayGio.toISOString())}`)
                        console.log(`k.thoiLuong ${(k.thoiLuong === undefined ? '' : k.thoiLuong)}`)
                        console.log(`k.loaiKhamID ${k.loaiKhamID}`)
                        console.log(`k.note ${k.note}`)

                        console.log(`b.email ${b.email}`)
                        console.log(`b.firstName ${b.firstName}`)
                        console.log(`b.lastName ${b.lastName}`)
                        console.log(`b.phone ${b.phone}`)
                    }}/>
            )}
        </div>
    )
}

export default MedicalRegister
