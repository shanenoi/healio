import {
  Routes,
  Route,
  useNavigationType,
  useLocation,
} from "react-router-dom";
import MedicalRegister from "./pages/MedicalRegister";
import MedicalRegister1 from "./pages/MedicalRegister1";
import MedicalRegister2 from "./pages/MedicalRegister2";
import MedicalRegister3 from "./pages/MedicalRegister3";
import MedicalRegister4 from "./pages/MedicalRegister4";
import MedicalRegister5 from "./pages/MedicalRegister5";
import MedicalRegister6 from "./pages/MedicalRegister6";
import MedicalRegister7 from "./pages/MedicalRegister7";
import MedicalRegister8 from "./pages/MedicalRegister8";
import LogIn from "./pages/LogIn";
import { useEffect } from "react";

function App() {
  const action = useNavigationType();
  const location = useLocation();
  const pathname = location.pathname;

  useEffect(() => {
    if (action !== "POP") {
      window.scrollTo(0, 0);
    }
  }, [action, pathname]);

  useEffect(() => {
    let title = "";
    let metaDescription = "";

    switch (pathname) {
      case "/":
        title = "";
        metaDescription = "";
        break;
      case "/medical-register":
        title = "";
        metaDescription = "";
        break;
      case "/medical-register1":
        title = "";
        metaDescription = "";
        break;
      case "/medical-register2":
        title = "";
        metaDescription = "";
        break;
      case "/medical-register3":
        title = "";
        metaDescription = "";
        break;
      case "/medical-register4":
        title = "";
        metaDescription = "";
        break;
      case "/medical-register5":
        title = "";
        metaDescription = "";
        break;
      case "/medical-register6":
        title = "";
        metaDescription = "";
        break;
      case "/medical-register7":
        title = "";
        metaDescription = "";
        break;
      case "/log-in":
        title = "";
        metaDescription = "";
        break;
    }

    if (title) {
      document.title = title;
    }

    if (metaDescription) {
      const metaDescriptionTag: HTMLMetaElement | null = document.querySelector(
        'head > meta[name="description"]'
      );
      if (metaDescriptionTag) {
        metaDescriptionTag.content = metaDescription;
      }
    }
  }, [pathname]);

  return (
    <Routes>
      <Route path="/" element={<MedicalRegister />} />
      <Route path="/medical-register" element={<MedicalRegister1 />} />
      <Route path="/medical-register1" element={<MedicalRegister2 />} />
      <Route path="/medical-register2" element={<MedicalRegister3 />} />
      <Route path="/medical-register3" element={<MedicalRegister4 />} />
      <Route path="/medical-register4" element={<MedicalRegister5 />} />
      <Route path="/medical-register5" element={<MedicalRegister6 />} />
      <Route path="/medical-register6" element={<MedicalRegister7 />} />
      <Route path="/medical-register7" element={<MedicalRegister8 />} />
      <Route path="/log-in" element={<LogIn />} />
    </Routes>
  );
}
export default App;
