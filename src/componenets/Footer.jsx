import { RiFacebookCircleLine, RiInstagramLine, RiTwitterXLine, RiWhatsappLine } from "@remixicon/react"
import { useLocation, useNavigate } from "react-router-dom"
import { useFilter } from "../context/FilterContext"
import { useUi } from "../context/UiContext"

function Footer() {

  const navigate = useNavigate()
  const location = useLocation()
  const { setCategory } = useFilter()
  const { visible } = useUi()

  return (

    <footer className={`bg-white w-full nunito text-primary py-8 px-4 sm:px-10 border-t border-secondary/20 ${location.pathname.includes('/shop') && visible ? 'blur-3xl' : ''} sm:blur-none`}>

      <div className="grid grid-cols-1 lg:grid-cols-6 gap-8 md:gap-12">

        <div className="lg:col-span-3 space-y-4">
          <a href="#" className="block">
            <div className='text-primary text-xl font-bold'>Core.lk</div>
          </a>
          <p className="text-sm/6 text-secondary max-w-96">We transform your setup vision into reality with trusted accessories that enhance comfort and performance.</p>
          <div className="flex gap-5 md:gap-6 order-1 md:order-2">

            {/* Twitter */}
            <a href="#" className="text-primary hover:text-secondary">
              <RiTwitterXLine size={20} />
            </a>

            {/* Instagram */}
            <a href="#" className="text-primary hover:text-secondary">
              <RiInstagramLine size={20} />
            </a>

            {/* Whatsapp */}
            <a href="#" className="text-primary hover:text-secondary">
              <RiWhatsappLine size={20} />
            </a>

            {/* Facebook */}
            <a href="#" className="text-primary hover:text-secondary">
              <RiFacebookCircleLine size={20} />
            </a>

          </div>
        </div>

        <div className="lg:col-span-3 grid grid-cols-2 md:grid-cols-3 gap-8 md:gap-12 lg:gap-28 items-start">
          {/* Products */}
          <div>
            <h3 className="font-bold text-md mb-3">Products</h3>
            <ul className="space-y-3 text-sm text-primary">
              <li><a onClick={() => { setCategory('input devices'); navigate('/shop') }} className="hover:text-secondary cursor-pointer">Input devices</a></li>
              <li><a onClick={() => { setCategory('audio'); navigate('/shop') }} className="hover:text-secondary cursor-pointer">Audio</a></li>
              <li><a onClick={() => { setCategory('networking'); navigate('/shop') }} className="hover:text-secondary cursor-pointer">Networking</a></li>
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-bold text-md mb-3">Quick Links</h3>
            <ul className="space-y-3 text-sm text-primary">
              <li><a onClick={() => { navigate("/shop") }} className="hover:text-secondary cursor-pointer">Shop</a></li>
              <li><a onClick={() => { navigate("/contact") }} className="hover:text-secondary cursor-pointer">Contact</a></li>
              <li><a onClick={() => { navigate("/profile") }} className="hover:text-secondary cursor-pointer">Profile</a></li>
            </ul>
          </div>

          {/* Company */}
          <div className="col-span-2 md:col-span-1">
            <h3 className="font-bold text-md mb-3">Company</h3>
            <ul className="space-y-3 text-sm text-primary">
              <li><a onClick={() => { navigate("/about") }} className="hover:text-secondary cursor-pointer">About</a></li>
              <li><a onClick={() => { navigate("/about") }} className="hover:text-secondary cursor-pointer">Vision</a></li>
              <li><a onClick={() => { navigate("") }} className="hover:text-secondary cursor-pointer">Privacy policy</a></li>
            </ul>
          </div>
        </div>

      </div>

      <div className="mt-10 pt-5 border-t border-secondary/20 flex justify-between items-center">
        <p className="text-sm text-primary">Copyright © 2026 Core.lk</p>
        <p className='text-sm text-primary'>All rights reserved.</p>
      </div>

    </footer>

  )
}

export default Footer