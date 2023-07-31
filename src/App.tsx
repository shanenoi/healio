import LogIn from './pages/LogIn'
import MedicalRegister from './pages/MedicalRegister'
import PatientDetailsView from './pages/PatientDetailsView'
import TimesheetDoctor from './pages/TimesheetDoctor'
import {Route, Routes, useLocation, useNavigationType} from 'react-router-dom'
import {useEffect} from 'react'

function App() {
    const action = useNavigationType()
    const location = useLocation()
    const pathname = location.pathname

    useEffect(() => {
        if (action !== 'POP') {
            window.scrollTo(0, 0)
        }
    }, [action, pathname])

    useEffect(() => {
        let title = ''
        let metaDescription = ''

        switch (pathname) {
            case '/':
                title = ''
                metaDescription = ''
                break
            case '/medical-register':
                title = 'Medical Register'
                metaDescription = ''
                break
            case '/log-in':
                title = 'LogIn'
                metaDescription = ''
                break
            case '/timesheet-doctor':
                title = 'Timesheet Doctor'
                metaDescription = ''
                break
        }

        if (title !== '') {
            document.title = title
        }

        if (metaDescription !== '') {
            const metaDescriptionTag: HTMLMetaElement | null = document.querySelector(
                'head > meta[name="description"]'
            )
            if (metaDescriptionTag != null) {
                metaDescriptionTag.content = metaDescription
            }
        }
    }, [pathname])

    return (
        <Routes>
            <Route path="/log-in" element={<LogIn/>}/>
            <Route path="/medical-register" element={<MedicalRegister/>}/>
            <Route path="/timesheet-doctor" element={<TimesheetDoctor/>}/>
            <Route path="/patient_details_view/:patientID/:khamBenhID" element={<PatientDetailsView/>}/>
        </Routes>
    )
}

export default App
