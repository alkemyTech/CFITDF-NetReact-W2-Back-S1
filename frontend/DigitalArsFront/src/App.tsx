import { Routes, Route } from 'react-router-dom'
import './App.css'
import getTheme from '../theme';
import { CssBaseline, ThemeProvider } from '@mui/material';
import FormLogin from './Components/FormLogin/FormLogin';
import RegisterPage from './Components/Register/RegisterPage';
import DashboardLayout from './Components/Dashboard/Dashboard';
import InicioPage from './Components/Dashboard/Pages/HomePage';
import Transaccion from './Components/FormTransaccion/Transaccion';
import { useMemo, useState } from 'react';
import AhorrosPage from './Components/Dashboard/Pages/AhorrosPage';


function App() {
  const [darkMode, setDarkMode] = useState(false);
  const theme = useMemo(() => getTheme(darkMode), [darkMode]);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <div className="app">
        <Routes>
          <Route path="/" element={<FormLogin />} />
          <Route path="/dashboard" element={<DashboardLayout />}>
              <Route path="/dashboard" element={<InicioPage/>}/>
              <Route path="/dashboard/transacciones" element={<Transaccion/>}/>
              <Route path="/dashboard/ahorros" element={<AhorrosPage/>}/>
          </Route>
          <Route path="/register" element={<RegisterPage/>}/>
          <Route path="/transaccion"/>
        </Routes>
      </div>
    </ThemeProvider>
  );
}

export default App;
