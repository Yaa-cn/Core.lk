import Navbar from './componenets/Navbar'
import Footer from './componenets/Footer'
import Toast from './componenets/Toast'
import { Outlet, useLocation } from 'react-router-dom'
import { useEffect } from 'react'

function App() {

  const location = useLocation()

  useEffect(() => {
    scrollTo({ top: 0, behavior: 'smooth' })
  }, [location.key])

  return (
    <>
      <Navbar />
      <Toast />
      <Outlet />
      <Footer />
    </>
  )
}
export default App