import { useState } from 'react'
import loginPic from '../assets/images/loginPic.webp'
import { Lock, Mail, ShieldAlert, Eye, EyeOff } from 'lucide-react'

function Login({ onLoginSuccess }) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const API_URL = import.meta.env.VITE_API_URL

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      const response = await fetch(API_URL + '/admin/auth/login', {
        method: 'POST',
        credentials: "include",
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      })

      const data = await response.json()

      if (!response.ok || !data.success) {
        throw new Error(data.message || 'Login failed. Please try again.')
      }

      // Check if user has admin privileges
      if (data.user && data.user.role === 'admin') {
        onLoginSuccess(data.user)
      } else {
        // Log them out immediately if they aren't admin to clear the session cookie
        await fetch(API_URL + '/admin/auth/logout', { credentials: "include", method: 'POST' })
        throw new Error('Access Denied: Administrator role required.')
      }
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (

    // <div className='flex flex-col sm:flex-row w-full'>
    //   <div style={{ backgroundImage: `url(${loginPic})` }} className='bg-cover bg-center h-40 sm:h-auto w-full sm:w-2/5 md:w-2/4 lg:w-4/7 xl:w-3/5' >
    //     <div className='bg-black/40 h-full'></div>
    //   </div>
    //   <div className='flex flex-col justify-center gap-8 sm:w-3/5 md:w-2/4 lg:w-3/7 xl:w-2/5 mx-6 sm:mx-10 md:mx-15 h-100 sm:h-110 md:h-130 lg:h-150 xl:h-170'>
    //     <div className='flex flex-col gap-2'>
    //       {/* <TitleBar firstText={'Welcome'} secText={'Back'} className={'text-xl sm:text-2xl! font-semibold!'} showLine /> */}
    //       <p className='text-xs text-primary/50'>Please enter your details</p>
    //     </div>
    //     <form onSubmit={handleSubmit} className="flex flex-col gap-5">

    //       <input
    //         // onChange={(e) => setFormData({ ...formData, email: e.target.value })}
    //         // type="email" placeholder='Email Address'
    //         // required
    //         type="email"
    //         required
    //         value={email}
    //         onChange={(e) => setEmail(e.target.value)}
    //         placeholder="Email"
    //         className='text-primary text-xs border-b border-primary/40 nunito py-2 px-1 outline-none ' />

    //       <div className='relative'>
    //         <input
    //           // onChange={(e) => setFormData({ ...formData, password: e.target.value })}
    //           // type={inputType} placeholder='Password'
    //           // required
    //           // minLength={6}
    //           // title='Minimum 6 characters required.'
    //           type={showPassword ? 'text' : 'password'}
    //           required
    //           value={password}
    //           onChange={(e) => setPassword(e.target.value)}
    //           placeholder="Password"
    //           className='text-primary text-xs border-b border-primary/40 nunito py-2 px-1 outline-none w-full h-fit' />
    //         {formData.password && <span onMouseDown={() => setInputType('text')} onMouseLeave={() => setInputType('password')} onMouseUp={() => setInputType('password')} onTouchStart={() => setInputType('text')} onTouchEnd={() => setInputType('password')} className='absolute text-[11px] text-secondary top-1.75 right-2 cursor-pointer hover:text-secondary/80 transition-colors select-none'>Show</span>}
    //       </div>

    //       <p className='text-xs text-secondary cursor-pointer hover:text-primary/60 transition-colors ml-auto'>Forget password ? </p>

    //       <button type='submit' className='text-xs text-white uppercase font-medium border outfit border-primary/50 bg-primary px-5 py-2.5 rounded-[3px] hover:bg-transparent hover:text-secondary hover:border-secondary/50 cursor-pointer transition-colors duration-300'>Login</button>

    //       <p className='text-xs text-secondary cursor-pointer'>Don't you have an account ? <span className='cursor-pointer hover:text-primary/60 transition-colors'><Link to={'/register'}>Register</Link></span> </p>

    //     </form>
    //   </div>
    // </div >


    <div className="flex items-center justify-center min-h-screen bg-bg-main relative px-4">
      {/* Background decoration */}
      <div className="absolute top-1/4 left-1/4 w-100 h-100 bg-gray/30 rounded-full blur-[100px] pointer-events-none animate-pulse-slow"></div>
      <div className="absolute bottom-1/4 right-1/4 w-87.5 h-87.5 bg-accent/50 rounded-full blur-[90px] pointer-events-none animate-pulse-slow"></div>

      <div className="w-full max-w-md glass-panel px-10 py-10 rounded shadow-lg relative z-10 animate-fade-in">
        <div className=" mb-8">
          {/* <div className="inline-flex items-center justify-center w-14 h-14 rounded bg-accent text-brand-primary mb-4 border border-border-custom">
            <Lock className="w-7 h-7" />
          </div> */}
          <h2 className="text-2xl font-bold font-display text-text-primary tracking-tight">Admin Console <span className='tracking-tight'>______</span></h2>
          {/* <p className="text-text-secondary mt-2 text-sm">Sign in to manage your e-commerce operations</p> */}
        </div>

        {/* Error Alert */}
        {error && (
          <div className="flex items-start gap-3 bg-brand-danger/10 border border-brand-danger/25 text-brand-danger p-4 rounded mb-6 text-sm">
            <ShieldAlert className="w-5 h-5 shrink-0 mt-0.5" />
            <div>
              <span className="font-semibold">Security Alert:</span> {error}
            </div>
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-[10px] font-semibold uppercase tracking-wider text-text-secondary mb-2">Email Address</label>
            <div className="relative">
              {/* <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-text-muted" /> */}
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
                className="text-primary text-xs border-b border-primary/40 nunito py-2 px-1 outline-none w-full"
              />
            </div>
          </div>

          <div>
            <label className="block text-[10px] font-semibold uppercase tracking-wider text-text-secondary mb-2">Password</label>
            <div className="relative">
              {/* <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-text-muted" /> */}
              <input
                type={showPassword ? 'text' : 'password'}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                className="text-primary text-xs border-b border-primary/40 nunito py-2 px-1 outline-none w-full"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-text-muted hover:text-text-primary transition-colors focus:outline-none"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-brand-primary mt-8 hover:bg-secondary text-light font-semibold rounded transition-all shadow-sm flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed text-sm"
          >
            {loading ? (
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
            ) : (
              'Access Dashboard'
            )}
          </button>
        </form>

        <div className="text-center mt-6 text-xs text-text-muted">
          Secured with Express Sessions & Role-Based Auth
        </div>
      </div>
    </div>
  )
}

export default Login
