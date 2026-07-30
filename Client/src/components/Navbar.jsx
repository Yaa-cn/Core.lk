import { useState } from 'react'
import { NavLink, Link, useLocation } from 'react-router-dom'
import { RiCloseLine, RiMenu2Line, RiSearchLine, RiUserLine, RiHeartLine, RiShoppingCart2Line } from '@remixicon/react'
import { useUi } from '../context/UiContext'
import { useCart } from '../context/CartContext'
import { useWishlist } from '../context/WishlistContext'

function Navbar() {

  const [visible, setVisible] = useState(false)
  const [visibleSearchIcon, setVisibleSearchIcon] = useState(true)
  const { visibleSearchBar, setVisibleSearchBar } = useUi()
  const { cart } = useCart() || {}
  const { wishlist } = useWishlist()
  const location = useLocation()

  return (
    <>
      <nav className='flex gap-10 sm:gap-0 sticky top-0 left-0 right-0 justify-between nunito w-full py-3.5 px-4 sm:px-10 z-100 bg-light border-secondary/20 border-b'>

        <div className='flex sm:gap-[13.5%] md:gap-[45%]'>
          <div onClick={() => setVisible(false)} className='text-primary text-xl font-bold'><Link to='/'>Core.lk</Link></div>
          <ul className='hidden sm:flex no-underline text-sm font-medium'>
            <li className='flex items-center px-5' ><NavLink className='activeLine' to='/shop'>Shop</NavLink></li>
            <li className='flex items-center border-x border-secondary/20 px-5' ><NavLink className='activeLine' to='/about'>About</NavLink></li>
            <li className='flex items-center px-5' ><NavLink className='activeLine' to='/contact'>Contact</NavLink></li>
          </ul>
        </div>

        <ul className='flex gap-5 sm:gap-6 no-underline'>
          <li onClick={() => setVisible(false)} className='my-auto relative'><NavLink className='iconColor' to='/wishlist'><RiHeartLine size={18} /><span className={`absolute justify-center items-center rounded-full w-4 h-4 text-[10px] text-white font-medium -right-3.25 -top-2.25 sm:-top-2.5 ${wishlist?.length === 0 ? 'hidden' : 'flex'} ${location.pathname.includes('/wishlist') ? 'bg-black' : 'bg-primary'}`}>{wishlist?.length}</span></NavLink></li>
          <li onClick={() => setVisible(false)} className='my-auto relative'><NavLink className='iconColor' to='/cart'><RiShoppingCart2Line size={18} /><span className={`absolute justify-center items-center rounded-full w-4 h-4 text-[10px] text-white font-medium -right-3.25 -top-2.25 sm:-top-2.5 ${cart?.length === 0 ? 'hidden' : 'flex'} ${location.pathname.includes('/cart') ? 'bg-black' : 'bg-primary'}`}>{cart?.length}</span></NavLink></li>
          <li onClick={() => setVisible(false)} className='my-auto'><NavLink className='iconColor' to='/profile'><RiUserLine size={18} /></NavLink></li>
          <div className='sm:hidden flex items-center gap-5'>
            {location.pathname === '/shop' && <RiSearchLine size={15} onClick={() => { setVisibleSearchBar(true) }} className={` ${visible ? 'hidden' : 'block'} my-auto cursor-pointer`} />}
            {
              !visible ? <div onClick={() => setVisible(true)} className='iconColor cursor-pointer my-auto'><RiMenu2Line size={18} /></div> :
                <div onClick={() => setVisible(false)} className='iconColor cursor-pointer my-auto'><RiCloseLine size={18} /></div>
            }
          </div>
        </ul>

      </nav>

      <div className={`flex flex-col sm:hidden ${visible ? 'translate-x-0' : '-translate-x-full'} fixed top-14 left-0 right-0 h-screen nunito text-sm font-medium bg-light transition-transform duration-200 ease-in z-60`}>
        <NavLink onClick={() => setVisible(false)} className='py-4 px-6 border-b border-secondary/20 iconColor' to='/shop'>Shop</NavLink>
        <NavLink onClick={() => setVisible(false)} className='py-4 px-6 border-b border-secondary/20 iconColor' to='/about'>About</NavLink>
        <NavLink onClick={() => setVisible(false)} className='py-4 px-6 border-b border-secondary/20 iconColor' to='/contact'>Contact</NavLink>
      </div >

    </>
  )
}

export default Navbar