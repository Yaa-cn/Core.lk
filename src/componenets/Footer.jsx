import { RiFacebookCircleLine, RiInstagramLine, RiTwitterXLine, RiWhatsappLine } from "@remixicon/react"

function Footer() {
  return (

    <footer className="bg-white w-full nunito text-primary py-8 px-6 sm:px-10 border-t border-secondary">

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
              <li><a href="#" className="hover:text-secondary">Input devices</a></li>
              <li><a href="#" className="hover:text-secondary">Audio</a></li>
              <li><a href="#" className="hover:text-secondary">Network</a></li>
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-bold text-md mb-3">Quick Links</h3>
            <ul className="space-y-3 text-sm text-primary">
              <li><a href="#" className="hover:text-secondary">Shop</a></li>
              <li><a href="#" className="hover:text-secondary">Contact</a></li>
              <li><a href="#" className="hover:text-secondary">Profile</a></li>
            </ul>
          </div>

          {/* Company */}
          <div className="col-span-2 md:col-span-1">
            <h3 className="font-bold text-md mb-3">Company</h3>
            <ul className="space-y-3 text-sm text-primary">
              <li><a href="#" className="hover:text-secondary">About</a></li>
              <li><a href="#" className="hover:text-secondary">Vision</a></li>
              <li><a href="#" className="hover:text-secondary">Privacy policy</a></li>
            </ul>
          </div>
        </div>

      </div>

      <div className="mt-10 pt-5 border-t border-secondary flex justify-between items-center">
        <p className="text-sm text-primary">Copyright © 2026 Core.lk</p>
        <p className='text-sm text-primary'>All rights reserved.</p>
      </div>

    </footer>

  )
}

export default Footer