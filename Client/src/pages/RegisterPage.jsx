import loginPic from '../assets/images/loginPic.webp'
import TitleBar from '../components/TitleBar'
import { Link } from 'react-router-dom'
import { useState } from 'react'
import { useAuth } from '../context/AuthContext'
import { RiEyeLine, RiEyeOffLine } from '@remixicon/react'

function RegisterPage() {

  const { registerUser } = useAuth()
  const [formData, setFormData] = useState({ name: "", email: "", password: "" })
  const [inputType, setInputType] = useState("password")

  const handleSubmit = async (e) => {
    e.preventDefault()
    const data = await registerUser(formData)
    e.target.reset()
  }

  return (
    <div className='flex flex-col sm:flex-row w-full'>
      <div style={{ backgroundImage: `url(${loginPic})` }} className='bg-cover bg-center h-40 sm:h-auto w-full sm:w-2/5 md:w-2/4 lg:w-4/7 xl:w-3/5' >
        <div className='bg-black/40 h-full'></div>
      </div>
      <div className='flex flex-col justify-center gap-8 sm:w-3/5 md:w-2/4 lg:w-3/7 xl:w-2/5 mx-6 sm:mx-10 md:mx-15 h-100 sm:h-110 md:h-130 lg:h-150 xl:h-170'>
        <div className='flex flex-col gap-2'>
          <TitleBar firstText={'Create'} secText={'Account'} className={'text-xl sm:text-2xl! font-semibold!'} showLine />
          <p className='text-xs text-primary/50'>Please enter your details</p>
        </div>
        <form onSubmit={handleSubmit} className="flex flex-col gap-5">

          <input
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            type="text"
            placeholder='Name'
            required
            pattern='[A-Za-z\s]+'
            title='Numbers and special characters are not allowed.'
            className='text-primary text-xs border-b border-primary/40 nunito py-2 px-1 outline-none ' />

          <input
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            type="email" placeholder='Email Address'
            required
            className='text-primary text-xs border-b border-primary/40 nunito py-2 px-1 outline-none ' />

          <div className='relative'>
            <input
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              type={inputType} placeholder='Password'
              required
              minLength={6}
              title='Minimum 6 characters required.'
              className='text-primary text-xs border-b border-primary/40 nunito py-2 px-1 outline-none w-full h-fit' />
            <span onClick={() => setInputType(prev => prev == 'text' ? 'password' : 'text')} className='absolute text-[11px] text-secondary/80 top-2.5 right-2.5 cursor-pointer hover:text-secondary transition-colors select-none'>{inputType === 'password' ? <RiEyeLine size={15} /> : <RiEyeOffLine size={15} />}</span>
          </div>

          <button
            type='submit'
            className='text-xs text-white uppercase mt-2 font-medium border outfit border-primary/50 bg-primary px-5 py-2.5 rounded-[3px] hover:bg-transparent hover:text-secondary hover:border-secondary/50 cursor-pointer transition-colors duration-300'>Register</button>

          <p className='text-xs text-secondary cursor-pointer'>Already have an account ? <span className='cursor-pointer hover:text-primary/60 transition-colors'><Link to={'/login'}>Login</Link></span> </p>

        </form>
      </div>
    </div >
  )
}
export default RegisterPage