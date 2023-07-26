import MedicalRegisterPopup from '../components/MedicalRegisterPopup'
import PatientVisitContainer from '../components/PatientVisitContainer'
import {CtrlPopupVisibility} from '../utils/utils'
import {type FunctionComponent} from 'react'
import {v4 as uuidv4} from 'uuid'

const MedicalRegister: FunctionComponent = () => {
    const popupVisibility = CtrlPopupVisibility()
    const blurBackgroundRef = popupVisibility.blurBackgroundRef
    const showMedicalRegisterContainer = popupVisibility.showPp
    const showMedicalRegister = popupVisibility.showP
    const hideMedicalRegister = popupVisibility.hideP

    return (
        <div className="relative bg-monochrome-white w-full h-[1024px]">
            <PatientVisitContainer
                productIds="/lefticon9.svg"
                productDimensions="/lefticon9.svg"
                onclickRegister={showMedicalRegister}
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
                onClick={hideMedicalRegister}
            />
            {showMedicalRegisterContainer && (
                <MedicalRegisterPopup
                    formID={uuidv4()}
                    onCloseClick={hideMedicalRegister}
                />
            )}
        </div>
    )
}

export default MedicalRegister
