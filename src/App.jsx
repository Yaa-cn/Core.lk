import Navbar from './componenets/Navbar'
import { Outlet } from 'react-router-dom'
import Footer from './componenets/Footer'

function App() {
  return (
    <>
      <Navbar />
      <Outlet />
      <Footer />
    </>
  )
}
export default App