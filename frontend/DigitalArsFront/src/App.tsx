import { Routes, Route } from 'react-router-dom';
import './App.css';
// import BrandingSignInPage from './Components/FormLogin/FormLogin';
import FormLogin from './Components/FormLogin/FormLogin';

import Dashboard from './Components/Dashboard/Dashboard';
import RegisterPage from './Components/Register/RegisterPage';
import { CssBaseline, ThemeProvider } from '@mui/material';
import { useState, useMemo } from 'react';
import getTheme from '../theme';
// import ConsultaAlias from './Components/Dashboard/ConsultaAlias';
import Transaccion from './Components/FormTransaccion/Transaccion';

function App() {
  const [darkMode, setDarkMode] = useState(false);
  const theme = useMemo(() => getTheme(darkMode), [darkMode]);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <div className="app">
        <Routes>
          <Route path="/" element={<FormLogin />} />
          <Route
            path="/dashboard"
            element={< Dashboard />}
          />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/transaccion" element={<Transaccion/>} />
        </Routes>
      </div>
    </ThemeProvider>
  );
}

export default App;
