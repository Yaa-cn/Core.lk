import Navbar from './componenets/Navbar'
import { Outlet } from 'react-router-dom'
import Footer from './componenets/Footer'
import Toast from './componenets/Toast'

function App() {
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