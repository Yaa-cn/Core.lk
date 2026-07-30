import TitleBar from '../components/TitleBar'
import { useCart } from '../context/CartContext'
import { useNavigate } from 'react-router-dom'
import CartIcon from '../assets/icons/cart.png'
import { useAuth } from '../context/AuthContext'
import Loader from '../components/Loader'

function Cart() {

  const { cart, subTotal, total, shippingFee, cartItems, loading } = useCart()
  const { user } = useAuth()
  const navigate = useNavigate()

  return (
    <>
      <div className='pt-4 sm:pt-5 pb-4 sm:pb-5 mx-4 sm:mx-10'>
        <TitleBar firstText={'Shopping'} secText={'Cart'} showLine />
      </div>

      <div className='flex flex-col md:flex-row gap-8 mb-10 mx-4 sm:mx-10'>

        {loading && user ? <div className='flex justify-center items-center w-full mt-30 mb-40'><Loader /></div> :
          <>
            <div className={`w-full ${cart.length === 0 ? 'w-full' : 'md:1/2 lg:w-4/7 xl:w-5/8'} overflow-y-auto`}>
              {cart.length === 0 ?
                <div className='flex flex-col justify-center items-center gap-3 mt-10 mb-10'>
                  <img src={CartIcon} alt='CartIcon' className='w-25 sm:w-30' />
                  <h1 className='text-xl sm:text-2xl text-secondary outfit font-bold'>Your Cart is Empty !</h1>
                  <p className='text-xs sm:text-sm text-gray-500 w-70 text-center sm:w-fit'>Looks like you haven’t added anything yet. Explore our products and find something you love.</p>
                  <button onClick={() => navigate('/shop')} className='text-[10px] sm:text-xs bg-accent border border-secondary/20 text-secondary px-4 py-2.5 mt-2 rounded-[3px] font-medium outfit uppercase hover:bg-secondary hover:text-light transition-colors duration-300 cursor-pointer' >Shop Now</button>
                </div> :
                <div className='flex flex-col gap-4'> {cartItems} </div>}
            </div>


            {cart.length > 0 &&
              <div className='flex flex-col border outfit bg-white border-neutral-200 w-full md:1/2 lg:w-3/7 xl:w-3/8 px-6 py-4 h-fit rounded'>
                <h1 className={'sm:text-lg uppercase text-secondary font-extrabold mb-2.5'} >Order Total</h1>
                <div className='flex flex-col gap-2'>
                  <div className='flex flex-col gap-2.5'>
                    {cart.map(item =>
                      <div key={item.product._id} className='flex justify-between gap-2 font-light text-xs xl:text-sm'>
                        <div className='flex gap-2 w-5/8'>
                          <p >{item.product.name} * {item.quantity}</p>
                        </div>
                        <span className='w-3/8 text-end'>LKR {(item.product.price * item.quantity).toFixed(2)}</span>
                      </div>
                    )}
                  </div>

                  <hr className='text-neutral-200 my-1 sm:my-2' />

                  <div className='flex justify-between text-xs xl:text-sm'>
                    <p>Subtotal</p>
                    <span>LKR {subTotal.toFixed(2)}</span>
                  </div>

                  <div className='flex justify-between text-xs xl:text-sm'>
                    <p>Shipping fee</p>
                    <span>LKR {shippingFee.toFixed(2)}</span>
                  </div>

                </div>

                <hr className='text-neutral-200 my-4 sm:my-3' />

                <div className='flex justify-between text-xs xl:text-sm font-medium'>
                  <p>Total</p>
                  <span>LKR {total.toFixed(2)}</span>
                </div>

                <button onClick={() => navigate('/checkout')} className='bg-primary outfit border border-secondary/50 rounded-[3px] text-xs text-white uppercase font-medium px-5 py-2.5 w-fit ml-auto mt-5 mb-2 hover:bg-secondary cursor-pointer transition-colors duration-300'>Go to Checkout</button>
              </div>}
          </>}
      </div>
    </>
  )
}
export default Cart