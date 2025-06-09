import { Routes, Route } from 'react-router-dom'
import './App.css'
import getTheme from '../theme';
import { CssBaseline, ThemeProvider } from '@mui/material';
import FormLogin from './Components/FormLogin/FormLogin';
import RegisterPage from './Components/Register/RegisterPage';
import DashboardLayout from './Components/Dashboard/Dashboard';
import InicioPage from './Components/Dashboard/Pages/HomePage';
import { useMemo, useState } from 'react';
import AhorrosPage from './Components/Dashboard/Pages/AhorrosPage';
import TransaccionesPage from './Components/Dashboard/Pages/TransaccionesPage';
import NuevaTransaccionPage from './Components/Dashboard/Pages/NuevaTransaccion/NuevaTransaccionPage';
import CrearPlazoFijo from './Components/CrearPlazoFIjo/CrearPlazoFijo';
import DepositoModal from './Components/Dashboard/DepositoModal';
import AdminUsuariosPage from './Components/Dashboard/Pages/Admin/AdminUsuariosPage';
import AdminCuentasPage from './Components/Dashboard/Pages/Admin/AdminCuentasPage';
import AdminPage from './Components/Dashboard/Pages/Admin/AdminPage';
import { DialogsProvider, NotificationsProvider } from '@toolpad/core';


function App() {
  const [darkMode, setDarkMode] = useState(false);
  const theme = useMemo(() => getTheme(darkMode), [darkMode]);

  return (
    <ThemeProvider theme={ theme }>
      <CssBaseline />
      <DialogsProvider>
        <NotificationsProvider slotProps={ { snackbar: { autoHideDuration: 5000 } } }>
          <div className="app">
            <Routes>
              <Route path="/" element={ <FormLogin /> } />
              <Route path="/dashboard" element={ <DashboardLayout /> }>
                <Route path="/dashboard" element={ <InicioPage /> } />
                <Route path="/dashboard/nueva_transaccion" element={ <NuevaTransaccionPage /> } />
                <Route path="/dashboard/transacciones" element={ <TransaccionesPage /> } />
                <Route path="/dashboard/ahorros" element={ <AhorrosPage /> } />
                <Route path="/dashboard/plazofijo/crear" element={ <CrearPlazoFijo /> } />
                <Route path="/dashboard/depositar" element={ <DepositoModal /> } />

                <Route path="/dashboard/admin" element={ <AdminPage /> } />
                <Route path="/dashboard/admin/usuarios" element={ <AdminUsuariosPage /> } />
                <Route path="/dashboard/admin/cuentas" element={ <AdminCuentasPage /> } />
              </Route>
              <Route path="/register" element={ <RegisterPage /> } />
            </Routes>
          </div>
        </NotificationsProvider>
      </DialogsProvider>
    </ThemeProvider>
  );
}

export default App;
