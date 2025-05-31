import { Routes, Route } from 'react-router-dom'
import './App.css'
import BrandingSignInPage from './Components/FormLogin/FormLogin'
import DashboardLayoutBasic from './Components/Dashboard/Dashboard'
import ConsultaAlias from './Components/Dashboard/ConsultaAlias'
import Transaccion from './Components/FormTransaccion/Transaccion'



function App() {

  return (
    <div className='app'>
        <Routes>
          <Route path="/" element={<BrandingSignInPage />} />
          <Route path="/dashboard" element={<DashboardLayoutBasic />} />
          <Route path="/consulta-alias" element={<ConsultaAlias />} /> {/* Nueva ruta para ConsultaAlias */}
        <Route path="/transaccion" element={<Transaccion />} />
            </Routes>
           
    </div>
  )
}

export default App
