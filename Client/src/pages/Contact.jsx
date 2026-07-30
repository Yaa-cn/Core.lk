import Newsletter from '../components/Newsletter'
import TitleBar from "../components/TitleBar"
import { RiMapPinFill, RiBallPenFill, RiPhoneFill } from "@remixicon/react"

function Contact() {

  return (
    <>
      <div className="flex flex-col lg:flex-row gap-10 my-5 sm:my-10 mx-4 sm:mx-20 md:mx-30 xl:mx-40">

        {/* Form Section */}
        <div className="flex flex-col gap-5 sm:gap-6 py-6 px-7 sm:px-12 sm:py-10 bg-white rounded-sm border border-secondary/20 w-full">
          <div className="flex flex-col gap-2 sm:gap-3">
            <h1 className={'text-xl sm:text-[22px] text-primary uppercase font-extrabold'} >Get Support <span className='tracking-tight text-primary' >______</span></h1>
            <p className="text-xs sm:text-sm text-secondary">Have a specific inquiry Our
              experienced team is ready to engage with you.</p>
          </div>

          <form className="flex flex-col gap-7 text-xs nunito">
            <div className="flex flex-col gap-5">
              <input type="text" placeholder="Full Name"
                className="px-3 py-2.5 bg-white rounded-[3px] w-full border border-secondary/20 focus:border-primary outline-0" />
              <input type="number" placeholder="Phone No"
                className="px-3 py-2.5 bg-white rounded-[3px] w-full border border-secondary/20 focus:border-primary outline-0" />
              <input type="email" placeholder="Email"
                className="px-3 py-2.5 bg-white rounded-[3px] w-full border border-secondary/20 focus:border-primary outline-0" />
              <input type="text" placeholder="Subject"
                className="px-3 py-2.5 bg-white rounded-[3px] w-full border border-secondary/20 focus:border-primary outline-0" />
              <textarea placeholder="Write Message" rows="5"
                className="px-3 pt-2.5 bg-white rounded-[3px] w-full border border-secondary/20 focus:border-primary outline-0"></textarea>
            </div>
            <button type="button" className="w-full px-4 py-2.5 border border-secondary/20 rounded-[3px] bg-accent hover:bg-secondary hover:text-white transition-colors cursor-pointer">
              Send message
            </button>
          </form>
        </div>

        {/* Contact Section */}
        <div className="flex flex-col gap-6 sm:gap-10 lg:justify-between w-full">
          <div className="relative flex bg-white border border-secondary/20 rounded overflow-hidden">
            <RiPhoneFill size={60} className="text-secondary mt-8 mr-1 ml-4" />
            <div className="flex flex-col mt-4 mb-12 ml-5">
              <h2 className='text-lg text-primary uppercase font-extrabold'>Call Us <span className='tracking-tight text-secondary' >______</span></h2>
              <p className="nunito font-extrabold text-lg text-secondary" >Phone Number</p>
              <p className="nunito text-sm mb-5 text-neutral-500">+94542050700</p>
            </div>
            <h1 className="absolute -bottom-5.5 sm:-bottom-1.5 -right-1 text-[52px] sm:text-6xl font-black sm:font-extrabold opacity-20">PHONE</h1>
          </div>

          <div className="relative flex bg-white border border-secondary/20 rounded overflow-hidden">
            <RiBallPenFill size={60} className="text-secondary mt-8 mr-1 ml-4" />
            <div className="flex flex-col mt-4 mb-12 ml-5">
              <h2 className='text-lg text-primary uppercase font-extrabold'>Write to Us <span className='tracking-tight text-secondary' >______</span></h2>
              <p className="nunito font-extrabold text-lg text-secondary" >Email Address</p>
              <p className="nunito text-sm mb-5 text-neutral-500">Core.lk@store.com</p>
            </div>
            <h1 className="absolute -bottom-5.5 sm:-bottom-1.5 -right-1 text-[52px] sm:text-6xl font-black sm:font-extrabold opacity-20">EMAIL</h1>
          </div>

          <div className="relative flex bg-white border border-secondary/20 rounded overflow-hidden">
            <RiMapPinFill size={60} className="text-secondary mt-8 mr-1 ml-4" />
            <div className="flex flex-col mt-4 mb-12 ml-5">
              <h2 className='text-lg text-primary uppercase font-extrabold'>Visit Us <span className='tracking-tight text-secondary' >______</span></h2>
              <p className="nunito font-extrabold text-lg text-secondary">Location</p>
              <p className="nunito text-sm mb-5 text-neutral-500">No 100, Colombo Road, Nawalapitiya</p>
            </div>
            <h1 className="absolute -bottom-5.5 sm:-bottom-1.5 -right-1 text-[52px] sm:text-6xl font-black sm:font-extrabold opacity-20">LOCATION</h1>
          </div>
        </div>

      </div>

      {/* Newsletter */}
      <Newsletter />
    </>
  )
}
export default Contact