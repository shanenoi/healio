import MedicalRegisterPopup from '../components/MedicalRegisterPopup'
import PatientVisitContainer from '../components/PatientVisitContainer'
import PersonalInfoPopup from '../components/PersonalInfoPopup'
import {CtrlPopupVisibility} from '../utils/utils'
import {type FunctionComponent} from 'react'
import {v4 as uuidv4} from 'uuid'

const MedicalRegister: FunctionComponent = () => {
    const popupMedicalRegisterVisibility = CtrlPopupVisibility()
    const medicalRegisterBlurBackgroundRef = popupMedicalRegisterVisibility.blurBackgroundRef
    const medicalRegisterShowMedicalRegisterContainer = popupMedicalRegisterVisibility.showPp
    const medicalRegisterShowMedicalRegister = popupMedicalRegisterVisibility.showP
    const medicalRegisterHideMedicalRegister = popupMedicalRegisterVisibility.hideP

    const popupPersonalInfoVisibility = CtrlPopupVisibility()
    const personalInfoBlurBackgroundRef = popupPersonalInfoVisibility.blurBackgroundRef
    const medicalPersonalInfoPopupMedicalRegisterContainer = popupPersonalInfoVisibility.showPp
    const personalInfoShowMedicalRegister = popupPersonalInfoVisibility.showP
    const personalInfoHideMedicalRegister = popupPersonalInfoVisibility.hideP

    return (
        <div className="relative bg-monochrome-white w-full h-[1024px]">
            <PatientVisitContainer
                productIds="/lefticon9.svg"
                productDimensions="/lefticon9.svg"
                onclickRegister={medicalRegisterShowMedicalRegister}
                onclickProfile={personalInfoShowMedicalRegister}
            />
            <img
                className="absolute top-[0px] left-[1000px] w-[845px] h-[1024px]"
                alt=""
                src="/rectangle-15.svg"
            />
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
                <MedicalRegisterPopup
                    formID={uuidv4()}
                    onCloseClick={medicalRegisterHideMedicalRegister}
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

export default MedicalRegister
