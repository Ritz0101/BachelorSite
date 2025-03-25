import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import App from './App.jsx';
import Guide from './Guide.jsx';
import About from './components/About.jsx';
import Layout from './components/Layout.jsx';
import Training from './components/Training.jsx';
import ModuleContent from './components/ModuleContent.jsx';
import ISO27001 from './components/ISO27001.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<App />} />
          <Route path="/guide" element={<Guide />} />
          <Route path="/about" element={<About />} />
          <Route path="/training" element={<Training />} />
          <Route path="/training/:moduleId" element={<ModuleContent />} />
          <Route path="/iso27001" element={<ISO27001 />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>,
);