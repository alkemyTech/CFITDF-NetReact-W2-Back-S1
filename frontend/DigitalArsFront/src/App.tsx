import { Routes, Route } from 'react-router-dom'
import './App.css'
import BrandingSignInPage from './Components/FormLogin/FormLogin'
import DashboardLayoutBasic from './Components/Dashboard/Dashboard'


function App() {

  return (
    <div className='app'>
        <Routes>
          <Route path="/" element={<BrandingSignInPage />} />
          <Route path="/dashboard" element={<DashboardLayoutBasic />} />
        </Routes>
    </div>
  )
}

export default App
