import { useNavigate } from "react-router-dom"
import heroBg from "../assets/images/heroBg1.webp"

function Hero() {

  const navigate = useNavigate();

  const styles = {
    backgroundImage: `url(${heroBg})`,
  }

  return (
    <div style={styles} className='heroCon flex h-full bg-cover border-b bg-center bg-no-repeat border-secondary/50'>
      <div className="bg-black/25 w-full">
        <div className="flex w-fit my-10 sm:mt-20 sm:mb-30 md:mt-20 md:mb-40 lg:mt-20 lg:mb-50 xl:mt-20 xl:mb-60 bg-white/12 backdrop-blur-[2px] border border-s-transparent border-white/40 h-fit rounded-br-4xl rounded-tr-4xl">
          <div className='flex flex-col gap-6 py-10 sm:py-15 mx-4 sm:mx-10'>
            <h1 className='outfit text-4xl text-white sm:text-5xl md:text-6xl lg:text-7xl xl:text-[86px] font-medium tracking-tight -translate-x-1 sm:-translate-x-1 md:-translate-x-1.5'>Everything to <br /> <span>enhance your setup.</span> </h1>
            <h6 className='text-xs text-white sm:text-sm lg:text-base'>Smarter accessories for work, gaming, and <br /> More all in one place.</h6>
            <button className='bg-white border border-secondary/20 w-fit text-[10px] text-primary sm:text-xs font-semibold uppercase outfit px-2.5 sm:px-3 py-2.25 rounded-[3px] hover:translate-x-0.5 transition-transform cursor-pointer' onClick={() => navigate("/shop")}>Explore Now</button>
          </div>
        </div>
      </div>
    </div>
  )
}
export default Hero
