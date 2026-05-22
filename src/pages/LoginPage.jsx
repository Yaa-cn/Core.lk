import loginPic from '../assets/images/loginPic.webp'
import TitleBar from '../componenets/TitleBar'
import { Link, useNavigate } from 'react-router-dom'

function LoginPage() {

    const navigate = useNavigate()

    return (
        <div className='flex flex-col sm:flex-row w-full'>
            <div style={{ backgroundImage: `url(${loginPic})` }} className='bg-cover bg-center h-40 sm:h-auto w-full sm:w-2/5 md:w-2/4 lg:w-4/7 xl:w-3/5' >
                <div className='bg-black/40 h-full'></div>
            </div>
            <div className='flex flex-col justify-center gap-8 sm:w-3/5 md:w-2/4 lg:w-3/7 xl:w-2/5 mx-6 sm:mx-10 md:mx-15 h-100 sm:h-110 md:h-130 lg:h-150 xl:h-170'>
                <div className='flex flex-col gap-2'>
                    <TitleBar firstText={'Welcome'} secText={'Back'} className={'text-xl sm:text-2xl! font-semibold!'} showLine />
                    <p className='text-xs text-primary/50'>Please enter your details</p>
                </div>
                <form className="flex flex-col gap-5">
                    <input type="text" placeholder='Email Address' className='text-primary text-xs border-b border-primary/40 nunito py-2 px-1 outline-none ' />
                    <input type="password" placeholder='Password' className='text-primary text-xs border-b border-primary/40 nunito py-2 px-1 outline-none ' />
                    <p className='text-xs text-secondary cursor-pointer hover:text-primary/60 transition-colors ml-auto'>Forget password ? </p>
                    <button onClick={(e) => { navigate('/profile'); e.preventDefault() }} className='text-xs text-white uppercase font-medium border outfit border-primary/50 bg-primary px-5 py-2.5 rounded-[3px] hover:bg-transparent hover:text-secondary hover:border-secondary/50 cursor-pointer transition-colors duration-300'>Login</button>
                    <p className='text-xs text-secondary cursor-pointer'>Don't you have an account ? <span className='cursor-pointer hover:text-primary/60 transition-colors'><Link to={'/register'}>Register</Link></span> </p>
                </form>
            </div>
        </div >
    )
}
export default LoginPage