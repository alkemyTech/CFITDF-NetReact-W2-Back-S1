<<<<<<< HEAD
import { Routes, Route } from 'react-router-dom';
import './App.css';
// import BrandingSignInPage from './Components/FormLogin/FormLogin';
import FormLogin from './Components/FormLogin/FormLogin';
=======
import { Routes, Route } from 'react-router-dom'
import './App.css'
import BrandingSignInPage from './Components/FormLogin/FormLogin'
import DashboardLayoutBasic from './Components/Dashboard/Dashboard'
import ConsultaAlias from './Components/Dashboard/ConsultaAlias'
import Transaccion from './Components/FormTransaccion/Transaccion'

>>>>>>> 92405497046202e197d6a4b170ae04ec5977c1ec

import DashboardLayoutBasic from './Components/Dashboard/Dashboard';
import RegisterPage from './Components/Register/RegisterPage';
import { CssBaseline, ThemeProvider } from '@mui/material';
import { useState, useMemo } from 'react';
import getTheme from '../theme';

function App() {
  const [darkMode, setDarkMode] = useState(false);
  const theme = useMemo(() => getTheme(darkMode), [darkMode]);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <div className="app">
        <Routes>
<<<<<<< HEAD
          <Route path="/" element={<FormLogin />} />
          <Route
            path="/dashboard"
            element={<DashboardLayoutBasic darkMode={darkMode} setDarkMode={setDarkMode} />}
          />
          <Route path="/register" element={<RegisterPage />} />
        </Routes>
      </div>
    </ThemeProvider>
  );
=======
          <Route path="/" element={<BrandingSignInPage />} />
          <Route path="/dashboard" element={<DashboardLayoutBasic />} />
          <Route path="/consulta-alias" element={<ConsultaAlias />} /> {/* Nueva ruta para ConsultaAlias */}
        <Route path="/transaccion" element={<Transaccion />} />
            </Routes>
           
    </div>
  )
>>>>>>> 92405497046202e197d6a4b170ae04ec5977c1ec
}

export default App;
