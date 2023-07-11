import { Route, Routes, useLocation, useNavigationType } from 'react-router-dom'
import MedicalRegister from './pages/MedicalRegister'
import LogIn from './pages/LogIn'
import { useEffect } from 'react'

function App () {
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
        title = ''
        metaDescription = ''
        break
      case '/medical-register1':
        title = ''
        metaDescription = ''
        break
      case '/medical-register2':
        title = ''
        metaDescription = ''
        break
      case '/medical-register3':
        title = ''
        metaDescription = ''
        break
      case '/medical-register4':
        title = ''
        metaDescription = ''
        break
      case '/medical-register5':
        title = ''
        metaDescription = ''
        break
      case '/medical-register6':
        title = ''
        metaDescription = ''
        break
      case '/medical-register7':
        title = ''
        metaDescription = ''
        break
      case '/log-in':
        title = ''
        metaDescription = ''
        break
    }

    if (title) {
      document.title = title
    }

    if (metaDescription) {
      const metaDescriptionTag: HTMLMetaElement | null = document.querySelector(
        'head > meta[name="description"]'
      )
      if (metaDescriptionTag != null) {
        metaDescriptionTag.content = metaDescription
      }
    }
  }, [pathname])

  /*
    login -> login
    medical-register -> medical-register7
     */
  return (
        <Routes>
            <Route path="/log-in" element={<LogIn/>}/>
            <Route path="/medical-register" element={<MedicalRegister/>}/>
        </Routes>
  )
}

export default App
