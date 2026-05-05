import { useState } from 'react'
import { NavLink, Link, useLocation } from 'react-router-dom'
import { RiCloseLine, RiMenu2Line, RiShoppingCart2Fill, RiUserFill, RiSearchLine } from '@remixicon/react'
import { useUi } from '../context/UiContext'
import { useCart } from '../context/CartContext'

function Navbar() {

  const [visible, setVisible] = useState(false)
  const [visibleSearchIcon, setVisibleSearchIcon] = useState(true)
  const { visibleSearchBar, setVisibleSearchBar } = useUi()
  const location = useLocation()
  const { cart } = useCart()

  return (
    <>
      <nav className='flex gap-10 sm:gap-0 sticky top-0 left-0 right-0 justify-between nunito w-full py-3.5 px-6 sm:px-10 z-100 bg-light border-secondary border-b'>

        <div className='flex gap-16 md:gap-35'>
          <div onClick={() => setVisible(false)} className='text-primary text-xl font-bold'><Link to='/'>Core.lk</Link></div>
          <ul className='hidden sm:flex no-underline text-sm font-medium'>
            <li className='flex items-center px-5' ><NavLink className='activeLine' to='/shop'>Shop</NavLink></li>
            <li className='flex items-center border-x border-secondary px-5' ><NavLink className='activeLine' to='/about'>About</NavLink></li>
            <li className='flex items-center px-5' ><NavLink className='activeLine' to='/contact'>Contact</NavLink></li>
          </ul>
        </div>

        <ul className='hidden sm:flex gap-5 no-underline'>
          <li className={`navBtn cartBtn ${cart.length === 0 ? 'after:hidden' : 'after:block'} ${location.pathname.includes('/cart') ? 'text-primary' : ''}`} cartcount={cart.length} ><NavLink className='iconColor flex' to='/cart'><span className='navBtnText'>Cart</span><span className='navIcon'><RiShoppingCart2Fill size={16} /></span></NavLink></li>
          <li className='navBtn' ><NavLink className='iconColor flex' to='/profile'><span className='navBtnText'>Profile</span><span className='navIcon'><RiUserFill size={16} /></span></NavLink></li>
        </ul>

        <div className='sm:hidden flex items-center gap-4'>
          {location.pathname === '/shop' && <RiSearchLine size={15} onClick={() => { setVisibleSearchBar(true), scrollTo({ top: 0, behavior: 'smooth' }) }} className={` ${visible ? 'hidden' : 'block'} my-auto cursor-pointer`} />}
          {
            !visible ? <div onClick={() => setVisible(true)} className='iconColor cursor-pointer my-auto'><RiMenu2Line size={18} /></div> :
              <div onClick={() => setVisible(false)} className='iconColor cursor-pointer my-auto'><RiCloseLine size={18} /></div>
          }
        </div>
      </nav>

      <div className={`flex flex-col sm:hidden ${visible ? 'translate-x-0' : '-translate-x-full'} fixed top-14 left-0 right-0 h-screen nunito text-sm font-medium bg-light transition-transform duration-200 ease-in z-60`}>
        <NavLink onClick={() => setVisible(false)} className='py-4 px-8 border-b border-secondary iconColor' to='/shop'>Shop</NavLink>
        <NavLink onClick={() => setVisible(false)} className='py-4 px-8 border-b border-secondary iconColor' to='/about'>About</NavLink>
        <NavLink onClick={() => setVisible(false)} className='py-4 px-8 border-b border-secondary iconColor' to='/contact'>Contact</NavLink>
        <NavLink onClick={() => setVisible(false)} className='py-4 px-8 border-b border-secondary iconColor' to='/cart'>Cart</NavLink>
        <NavLink onClick={() => setVisible(false)} className='py-4 px-8 border-b border-secondary iconColor' to='/profile'>Profile</NavLink>
      </div >

    </>
  )
}

export default Navbar