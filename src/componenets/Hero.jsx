import { useNavigate } from "react-router-dom"
import heroBg from "../assets/images/heroBg.webp"

function Hero() {

  const navigate = useNavigate();

  const styles = {
    backgroundImage: `url(${heroBg})`,
  }

  return (
    <div style={styles} className='heroCon flex md:h-[75vh] lg:h-[85vh] xl:h-[95vh] bg-cover border-b bg-center bg-no-repeat border-secondary/50'>
      <div className="flex items-center bg-white/12 backdrop-blur-[2px] border border-s-transparent border-white/50 w-fit h-fit my-[10%] md:mt-[10%] lg:mt-[8%] xl:mt-[6%] rounded-br-4xl rounded-tr-4xl">
        <div className='flex flex-col gap-6 py-10 sm:py-11.75 mx-4 sm:mx-10'>
          <h1 className='text-4xl text-white sm:text-5xl md:text-6xl lg:text-7xl font-medium tracking-tight -translate-x-1 sm:-translate-x-1 md:-translate-x-1.5'>Everything to <br /> <span>enhance your setup.</span> </h1>
          <h6 className='text-xs text-white sm:text-sm lg:text-base'>Smarter accessories for work, gaming, and <br /> More all in one place.</h6>
          <button className='bg-white w-fit text-xs sm:text-sm font-bold nunito px-2.5 sm:px-3 py-2.25 rounded-[3px] hover:translate-x-0.5 transition-transform cursor-pointer' onClick={() => navigate("/shop")}>Explore Now</button>
        </div>
      </div>
    </div>
  )
}
export default Hero