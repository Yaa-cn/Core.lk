import TitleBar from '../componenets/TitleBar'
import CartItem from '../componenets/CartItem'
import { useCart } from '../context/CartContext'
import { RiShoppingCartLine } from '@remixicon/react'
import { useNavigate } from 'react-router-dom'

function Cart() {

  const { cart } = useCart()
  const navigate = useNavigate()

  const subTotal = cart.reduce((sum, item) =>
    sum + item.price * item.quantity, 0
  )
  const shippingFee = 200

  const total = subTotal + shippingFee

  const cartItems = cart.map((item) =>
    <CartItem key={item.id} imgSrc={item.image} imgAlt={item.image} name={item.name} price={item.price} quantity={item.quantity} id={item.id} />
  )

  return (
    <>
      <TitleBar firstText={'Shopping'} secText={'Cart'} className={'sm:text-lg font-bold pt-4 sm:pt-5 pb-4 sm:pb-5 mx-4 sm:mx-10'} />

      <div className='flex flex-col md:flex-row gap-8 mx-4 sm:mx-10 mb-10'>

        <div className={`w-full ${cart.length === 0 ? 'w-full' : 'md:w-3/5 xl:w-4/6'} overflow-y-auto`}>
          {cart.length === 0 ?
            <div className='flex flex-col justify-center items-center gap-3 h-[40vh]'>
              <RiShoppingCartLine size={100} />
              <h1 className='text-2xl sm:text-3xl text-secondary font-extrabold'>Your Cart is Empty</h1>
              <p className='text-sm text-gray-500 w-70 text-center sm:w-fit'>Your cart is empty, but your next favorite find is just a click away !</p>
              <button onClick={() => navigate('/shop')} className='text-xs bg-accent border border-secondary text-primary px-4 py-2 mt-2 rounded-xs font-bold nunito hover:bg-secondary hover:text-light transition-colors cursor-pointer'>Shop Now</button>
            </div> :
            <div className='flex flex-col gap-4'> {cartItems} </div>}
        </div>


        {cart.length > 0 &&
          <div className='flex flex-col border bg-white border-gray w-full md:w-2/5 xl:w-2/6 px-6 py-4 h-fit rounded'>
            <TitleBar firstText={'Order'} secText={'Total'} className='sm:text-lg font-bold mb-3' />
            <div className='flex flex-col gap-2 nunito'>
              <div className='flex justify-between text-xs xl:text-sm'><p className='font-medium'>Subtotal</p><span>LKR {subTotal.toFixed(2)}</span></div>
              <div className='flex justify-between text-xs xl:text-sm'><p className='font-medium'>Shipping fee</p><span>LKR {shippingFee.toFixed(2)}</span></div>
            </div>
            <hr className='text-gray my-4 sm:my-3' />
            <div className='flex justify-between text-xs xl:text-sm nunito font-bold'><p>Total</p><span>LKR {total.toFixed(2)}</span></div>
            <button className='bg-accent border border-gray text-secondary rounded-[3px] uppercase text-xs font-bold px-4 py-2 w-fit ml-auto mt-5 mb-2 hover:bg-secondary hover:text-light cursor-pointer transition-colors tracking-wide'>Proceed to Checkout</button>
          </div>}

      </div>
    </>
  )
}
export default Cart