import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Toast from './components/Toast'
import { Outlet, useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import { MainProvider } from './context/MainContext'

function App() {

  const location = useLocation()

  useEffect(() => {
    scrollTo({ top: 0, behavior: 'smooth' })
  }, [location.key])

  return (
    <>
      <MainProvider>
        <Navbar />
        <Toast />
        <Outlet />
        <Footer />
      </MainProvider>
    </>
  )
}
export default App