import { Routes, Route } from 'react-router-dom';
import './App.css';
import { useFrontendMetrics } from './hooks/useFrontendMetrics';
// MUI theme
import { CssBaseline, ThemeProvider } from '@mui/material';
import getTheme from '../theme';

// Páginas principales
import FormLogin from './Components/FormLogin/FormLogin';
import RegisterPage from './Components/Register/RegisterPage';
import DashboardLayout from './Components/Dashboard/Dashboard';
import InicioPage from './Components/Dashboard/Pages/HomePage';
import AhorrosPage from './Components/Dashboard/Pages/AhorrosPage';
import TransaccionesPage from './Components/Dashboard/Pages/TransaccionesPage';
import NuevaTransaccionPage from './Components/Dashboard/Pages/NuevaTransaccion/NuevaTransaccionPage';
import CrearPlazoFijo from './Components/CrearPlazoFIjo/CrearPlazoFijo';

// Dependencias de UI
import { useMemo } from 'react';
import 'react-toastify/dist/ReactToastify.css';
import AdminPage from './Components/Dashboard/Pages/Admin/AdminPage';
import AdminUsuariosPage from './Components/Dashboard/Pages/Admin/AdminUsuariosPage'; 
import AdminCuentasPage from './Components/Dashboard/Pages/Admin/AdminCuentasPage';

function App() {
  // Activa modo oscuro 
  // const [darkMode, setDarkMode] = useState(false);
  // const theme = useMemo(() => getTheme(darkMode), [darkMode]);
  useFrontendMetrics();
  // tema por defecto
  const theme = useMemo(() => getTheme(false), []);

  return (
    <ThemeProvider theme={ theme }>
      <CssBaseline />

      <div className="app">
        <Routes>
          <Route path="/" element={<FormLogin />} />
          <Route path="/register" element={<RegisterPage />} />

          {/* Rutas protegidas bajo el Dashboard */}
          <Route path="/dashboard" element={<DashboardLayout />}>
            <Route index element={<InicioPage />} />
            <Route path="nueva_transaccion" element={<NuevaTransaccionPage />} />
            <Route path="transacciones" element={<TransaccionesPage />} />
            <Route path="ahorros" element={<AhorrosPage />} />
            <Route path="plazofijo/crear" element={<CrearPlazoFijo />} />
            <Route path="admin" element={<AdminPage />}>
              <Route path="usuarios" element={<AdminUsuariosPage />} />
              <Route path="cuentas" element={<AdminCuentasPage />} />
            </Route>
          
          </Route>
        </Routes>
      </div>
    </ThemeProvider>
  );
}

export default App;
