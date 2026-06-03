import Uss from '../assets/images/Uss.webp'
import TitleBar from '../components/TitleBar'

function About() {
  return (
    <div className="flex flex-col gap-8 sm:gap-10 mx-4 my-5 sm:mx-10 sm:my-10">

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-10">
        <div className="flex flex-col gap-3">
          <h4 className='outfit sm:text-lg font-medium text-secondary m-0.5'>About Us</h4>
          <h1 className="text-3xl sm:text-4xl font-medium">Power Your Setup <br /> Trusted Tech Starts Here</h1>
        </div>
        <p className="nunito text-sm text-gray-600 ml-0.5 sm:ml-0">We are your trusted destination for high quality computer accessories. From everyday users to gamers and developers,
          we provide the essential gear that keeps your technology running smoothly and enhances your experience.
          We make upgrading and customizing your setup simple, affordable, and accessible online.
          Your satisfaction and trust are at the core of everything we do. With reliable products and a seamless shopping experience,
          we’re here to help you power your build and elevate your workspace.</p>
      </div>

      <div className="grid grid-cols-1 gap-5 sm:gap-10 md:grid-cols-2 nunito">
        <div style={{ backgroundImage: `url(${Uss})` }} className="flex row-span-2 bg-cover bg-center h-full min-h-100 rounded-sm overflow-hidden border border-neutral-600">
          <div className="flex p-8 bg-linear-to-t from-black h-full ">
            <div className="flex flex-col gap-2 mt-auto">
              <h4 className="font-medium text-white">Our Story</h4>
              <p className="text-sm text-white">We started with a simple passion for technology and building powerful computer systems.
                What began as a small idea has grown into a trusted platform for quality computer accessories.
                Today, we continue to help people turn their tech dreams into reality.</p>
            </div>
          </div>
        </div>

        <div className="flex flex-col justify-end gap-2 min-h-45 col-span-1 bg-accent p-8 rounded-sm border border-secondary/20">
          <h4 className="font-medium">Our Mission</h4>
          <p className="text-sm text-gray-600">To provide high-quality, affordable computer accessories while making technology accessible to everyone.</p>
        </div>

        <div className="flex flex-col justify-end gap-2 min-h-45 col-span-1 bg-primary p-8 rounded-sm border border-neutral-600">
          <h4 className="font-medium text-white">Our Vision</h4>
          <p className="text-sm text-gray-200">To become a leading and trusted name in the tech industry, empowering users to build and innovate with confidence.</p>
        </div>
      </div>
    </div>
  )
}
export default About