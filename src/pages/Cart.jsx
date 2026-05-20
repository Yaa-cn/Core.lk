import TitleBar from '../componenets/TitleBar'
import CartItem from '../componenets/CartItem'
import { useCart } from '../context/CartContext'
import { useNavigate } from 'react-router-dom'
import CartIcon from '../assets/icons/cart.png'

function Cart() {

  const { cart } = useCart()
  const navigate = useNavigate()

  const subTotal = cart.reduce((sum, item) =>
    sum + item.price * item.quantity, 0
  )
  const shippingFee = 0

  const total = subTotal + shippingFee

  const cartItems = cart.map((item) =>
    <CartItem key={item.id} imgSrc={item.image} imgAlt={item.image} name={item.name} price={item.price} quantity={item.quantity} id={item.id} />
  )

  return (
    <>
      <div className='pt-4 sm:pt-5 pb-4 sm:pb-5 mx-4 sm:mx-10'>
        <TitleBar firstText={'Shopping'} secText={'Cart'} showLine />
      </div>

      <div className='flex flex-col md:flex-row gap-8 mb-10 mx-4 sm:mx-10'>

        <div className={`w-full ${cart.length === 0 ? 'w-full' : 'md:w-3/5 xl:w-4/6'} overflow-y-auto`}>
          {cart.length === 0 ?
            <div className='flex flex-col justify-center items-center gap-3 mt-10 mb-10'>
              <img src={CartIcon} alt='CartIcon' className='w-25 sm:w-30' />
              <h1 className='text-xl sm:text-2xl text-secondary outfit font-bold'>Your Cart is Empty !</h1>
              <p className='text-xs sm:text-sm text-gray-500 w-70 text-center sm:w-fit'>Looks like you haven’t added anything yet. Explore our products and find something you love.</p>
              <button onClick={() => { navigate('/shop'); scrollTo({ top: 0, behavior: 'smooth' }) }} className='text-[10px] sm:text-xs bg-accent border border-secondary/50 text-secondary px-4 py-2.5 mt-2 rounded-[3px] font-medium outfit uppercase hover:bg-secondary hover:text-light transition-colors duration-300 cursor-pointer' >Shop Now</button>
            </div> :
            <div className='flex flex-col gap-4'> {cartItems} </div>}
        </div>


        {cart.length > 0 &&
          <div className='flex flex-col border bg-white border-neutral-200 w-full md:w-2/5 xl:w-2/6 px-6 py-4 h-fit rounded'>
            <h1 className={'sm:text-lg uppercase outfit text-secondary font-extrabold mb-2'} >Order Total</h1>
            <div className='flex flex-col gap-2 nunito'>
              <div className='flex justify-between text-xs xl:text-sm'><p className='font-medium'>Subtotal</p><span>LKR {subTotal.toFixed(2)}</span></div>
              <div className='flex justify-between text-xs xl:text-sm'><p className='font-medium'>Shipping fee</p><span>LKR {shippingFee.toFixed(2)}</span></div>
            </div>
            <hr className='text-neutral-200 my-4 sm:my-3' />
            <div className='flex justify-between text-xs xl:text-sm nunito font-bold'><p>Total</p><span>LKR {total.toFixed(2)}</span></div>
            <button className='bg-primary outfit border border-secondary/50 rounded-[3px] text-xs text-white uppercase font-medium px-5 py-2.5 w-fit ml-auto mt-5 mb-2 hover:bg-secondary cursor-pointer transition-colors duration-300'>Go to Checkout</button>
          </div>}

      </div>
    </>
  )
}
export default Cart