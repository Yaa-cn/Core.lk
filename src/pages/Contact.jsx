import { RiMapPinFill, RiBallPenFill, RiPhoneFill } from "@remixicon/react"
import Newsletter from '../componenets/Newsletter'
import TitleBar from "../componenets/TitleBar"

function Contact() {

  const titleColor = 'text-secondary'

  return (
    <>
      <div className="flex flex-col lg:flex-row gap-10 my-10 mx-4 sm:mx-20 md:mx-30 xl:mx-40">

        {/* Form Section */}
        <div className="flex flex-col gap-2 py-8 px-8 sm:px-12 sm:py-10 bg-white rounded-sm border border-gray w-full">
          <div className="flex flex-col gap-3">
            <TitleBar firstText={'Get'} secText={'Support'} className={'text-2xl font-bold'} color={titleColor} />
            <p className="text-sm text-gray-600">Have a specific inquiry Our
              experienced team is ready to engage with you.</p>
          </div>

          <form className="flex flex-col gap-7 text-xs nunito">
            <div className="flex flex-col gap-5 mt-6">
              <input type="text" placeholder="Full Name"
                className="px-4 py-2.5 bg-white rounded-[3px] w-full border border-gray focus:border-primary outline-0" />
              <input type="number" placeholder="Phone No"
                className="px-4 py-2.5 bg-white rounded-[3px] w-full border border-gray focus:border-primary outline-0" />
              <input type="email" placeholder="Email"
                className="px-4 py-2.5 bg-white rounded-[3px] w-full border border-gray focus:border-primary outline-0" />
              <input type="text" placeholder="Subject"
                className="px-4 py-2.5 bg-white rounded-[3px] w-full border border-gray focus:border-primary outline-0" />
              <textarea placeholder="Write Message" rows="5"
                className="px-4 pt-2.5 bg-white rounded-[3px] w-full border border-gray focus:border-primary outline-0"></textarea>
            </div>
            <button type="button" className="w-full px-4 py-2.5 border-[1.5px] border-gray rounded-[3px] bg-accent hover:bg-secondary hover:text-white transition-colors cursor-pointer">
              Send message
            </button>
          </form>
        </div>

        {/* Contact Section */}
        <div className="flex flex-col gap-10 lg:justify-between w-full">
          <div className="relative flex bg-white border border-gray rounded overflow-hidden">
            <RiPhoneFill size={60} className="text-secondary mt-8 mr-1 ml-4" />
            <div className="flex flex-col mt-4 mb-12 ml-5">
              <TitleBar firstText={'Call'} secText={'Us'} className={'text-xl font-extrabold mb-0.5'} color={titleColor} />
              <p className="nunito font-extrabold text-lg" >Phone Number</p>
              <p className="nunito text-sm mb-5">+94542050700</p>
            </div>
            <h1 className="absolute -bottom-3 sm:-bottom-1.5 -right-1 text-6xl font-extrabold opacity-20">PHONE</h1>
          </div>

          <div className="relative flex bg-white border border-gray rounded overflow-hidden">
            <RiBallPenFill size={60} className="text-secondary mt-8 mr-1 ml-4" />
            <div className="flex flex-col mt-4 mb-12 ml-5">
              <TitleBar firstText={'Write to'} secText={'Us'} className={'text-xl font-extrabold mb-0.5'} color={titleColor} />
              <p className="nunito font-extrabold text-lg" >Email Address</p>
              <p className="nunito text-sm mb-5">Core.lk@store.com</p>
            </div>
            <h1 className="absolute -bottom-3 sm:-bottom-1.5 -right-1 text-6xl font-extrabold opacity-20">EMAIL</h1>
          </div>

          <div className="relative flex bg-white border border-gray rounded overflow-hidden">
            <RiMapPinFill size={60} className="text-secondary mt-8 mr-1 ml-4" />
            <div className="flex flex-col mt-4 mb-12 ml-5">
              <TitleBar firstText={'Visit'} secText={'Us'} className={'text-xl font-extrabold mb-0.5'} color={titleColor} />
              <p className="nunito font-extrabold text-lg">Location</p>
              <p className="nunito text-sm mb-5">No 100, Colombo Road, Nawalapitiya</p>
            </div>
            <h1 className="absolute -bottom-3 sm:-bottom-1.5 -right-1 text-6xl font-extrabold opacity-20">LOCATION</h1>
          </div>
        </div>

      </div>

      {/* Newsletter */}
      <Newsletter />
    </>
  )
}
export default Contact