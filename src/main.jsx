import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./App.jsx";
import Guide from "./Guide.jsx";
import About from "./components/About.jsx";
import Layout from "./components/Layout.jsx";
import Training from "./components/Training/Training.jsx";
import ModuleContent from "./components/ModuleContent.jsx";
import ISO27001 from "./components/ISO27001.jsx";
import Contact from "./components/Contact.jsx";
import { TrainingProvider } from "./context/TrainingContext";
import { LanguageProvider } from "./contexts/LanguageContext";
import InformationClassificationBasics from "./components/Training/InformationClassificationBasics";
import UnderstandingSecurityLevels from "./components/Training/InformationClassificationBasics/UnderstandingSecurityLevels.jsx";
import IdentifyingSensitiveInformation from "./components/Training/InformationClassificationBasics/IdentifyingSensitiveInformation.jsx";
import HandlingClassifiedInformation from "./components/Training/InformationClassificationBasics/HandlingClassifiedInformation.jsx";
import ISO27001Fundamentals from "./components/Training/ISO27001Fundamentals";
import ISMSBasics from "./components/Training/ISO27001Fundamentals/ISMSBasics.jsx";
import RiskAssessment from "./components/Training/ISO27001Fundamentals/RiskAssessment.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <LanguageProvider>
      <TrainingProvider>
        <BrowserRouter>
          <Routes>
            <Route element={<Layout />}>
              <Route path="/" element={<App />} />
              <Route path="/guide" element={<Guide />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />

              {/* Training routes */}
              <Route path="/training" element={<Training />} />

              {/* Information Classification Basics routes */}
              <Route
                path="/training/information-classification-basics"
                element={<InformationClassificationBasics />}
              />
              <Route
                path="/training/information-classification-basics/understanding-security-levels"
                element={<UnderstandingSecurityLevels />}
              />
              <Route
                path="/training/information-classification-basics/identifying-sensitive-information"
                element={<IdentifyingSensitiveInformation />}
              />
              <Route
                path="/training/information-classification-basics/handling-classified-information"
                element={<HandlingClassifiedInformation />}
              />

              {/* ISO 27001 Fundamentals routes */}
              <Route
                path="/training/iso27001-fundamentals"
                element={<ISO27001Fundamentals />}
              />
              <Route
                path="/training/iso27001-fundamentals/isms-basics"
                element={<ISMSBasics />}
              />
              <Route
                path="/training/iso27001-fundamentals/risk-assessment"
                element={<RiskAssessment />}
              />

              <Route path="/iso27001" element={<ISO27001 />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </TrainingProvider>
    </LanguageProvider>
  </StrictMode>
);
