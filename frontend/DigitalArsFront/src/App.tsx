import { Routes, Route } from 'react-router-dom'
import './App.css'
import BrandingSignInPage from './Components/FormLogin/FormLogin'
import DashboardLayout from './Components/Dashboard/Dashboard'
import InicioPage from './Components/Dashboard/Pages/HomePage'
import TransaccionesPage from './Components/Dashboard/Pages/TransaccionesPage'
import AhorrosPage from './Components/Dashboard/Pages/AhorrosPage'


function App() {

  return (
    <div className='app'>
        <Routes>
          <Route path="/" element={<BrandingSignInPage />} />
          <Route path="/dashboard" element={<DashboardLayout />}>
              <Route path="/dashboard" element={<InicioPage/>}/>
              <Route path="/dashboard/transacciones" element={<TransaccionesPage/>}/>
              <Route path="/dashboard/ahorros" element={<AhorrosPage/>}/>
          </Route>
        </Routes>
    </div>
  )
}

export default App
