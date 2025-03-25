import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import App from './App.jsx';
import Guide from './Guide.jsx';
import About from './components/About.jsx';
import Layout from './components/Layout.jsx';
import Training from './components/Training.jsx';
import ModuleContent from './components/ModuleContent.jsx';
import ISO27001 from './components/ISO27001.jsx';

export default defineConfig({
  plugins: [react()],
  base: '/isotron/', // Hvis du bruker GitHub Pages
  esbuild: {
    loader: {
      '.js': 'jsx', // Aktiverer JSX-syntaks for .js-filer
      '.jsx': 'jsx', // Sørg for at .jsx-filer også er inkludert
    },
  },
});

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
          <Route path="/isotron" element={<Navigate to="/" />} /> {/* Redirect */}
        </Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>,
);