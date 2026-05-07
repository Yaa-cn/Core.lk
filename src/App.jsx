import Navbar from './componenets/Navbar'
import { Outlet } from 'react-router-dom'
import Footer from './componenets/Footer'
import { ToastContainer } from 'react-toastify'

function App() {

  return (
    <>
      <Navbar />
      <Outlet />
      <ToastContainer position='bottom-right' autoClose={1000} hideProgressBar={true} className={'toastCon'} closeButton={false} pauseOnHover={false} />
      <Footer />
    </>
  )
}
export default App