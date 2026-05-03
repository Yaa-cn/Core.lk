import { useNavigate } from "react-router-dom"

function Hero() {

  const navigate = useNavigate();

  return (
    <div className='heroCon'>
      <div className='flex flex-col gap-6 py-10 sm:py-11.75 mx-6 sm:mx-10'>
        <h1 className='text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-medium tracking-tighter -translate-x-1 sm:-translate-x-1 md:-translate-x-1.5'>Everything to <br /> <span className='text-primary'>enhance your setup.</span> </h1>
        <h6 className='text-xs sm:text-sm lg:text-base'>Smarter accessories for work, gaming, and <br /> More all in one place.</h6>
        <button className='bg-secondary border border-light w-fit text-xs sm:text-sm text-light font-bold nunito px-2.5 sm:px-3 py-2.25 rounded-[3px] hover:translate-x-0.5 transition-transform cursor-pointer' onClick={() => navigate("/shop")}>Explore Now</button>
      </div>
    </div>
  )
}
export default Hero