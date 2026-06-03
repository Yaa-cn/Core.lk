import { useCart } from '../context/CartContext'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import TitleBar from '../components/TitleBar'
import CartIcon from '../assets/icons/cart.png'
import { RiCheckboxCircleFill } from '@remixicon/react'

function Checkout() {

    const [paymentMethod, setPaymentMethod] = useState('cashOnDelivery')
    const { cart, subTotal, total, shippingFee, cartItems } = useCart()
    const navigate = useNavigate()

    return (

        <div className='flex flex-col md:flex-row gap-8 mt-4 sm:mt-10 mb-10 mx-4 sm:mx-10'>

            <div className={`w-full ${cart.length === 0 ? 'w-full' : 'md:1/2 lg:w-4/7 xl:w-5/8'} overflow-y-auto`}>

                <div className='mb-4'>
                    <TitleBar firstText={'Shipping'} secText={'Address'} showLine />
                </div>

                <div className='flex gap-2 mb-4'>
                    <p className='text-[10px] nunito font-bold text-primary/80 border border-secondary/20 bg-secondary/5 px-3 py-0.5 rounded-full select-none cursor-pointer '>Home</p>
                    <p className='text-[10px] nunito font-bold text-primary/80 border border-secondary/20 bg-secondary/5 px-3 py-0.5 rounded-full select-none cursor-pointer '>Office</p>
                </div>

                <form className="flex flex-col gap-4">

                    <div className="flex flex-col gap-0.5">
                        <label htmlFor="name" className="text-[10px] uppercase text-neutral-500">Name</label>
                        <input type="text" name="name" id="name" placeholder="Name" className="text-xs text-primary/80 border border-secondary/20 rounded-[3px] px-4 py-3 outline-none " />
                    </div>

                    <div className="flex flex-col gap-0.5">
                        <label htmlFor="phone" className="text-[10px] uppercase text-neutral-500">Phone Number</label>
                        <input type="number" name="phone" id="phone" placeholder="Number" className="text-xs text-primary/80 border border-secondary/20 rounded-[3px] px-4 py-3 outline-none " />
                    </div>

                    <div className="flex flex-col gap-0.5">
                        <label htmlFor="address" className="text-[10px] uppercase text-neutral-500">Address</label>
                        <input type="text" name="address" id="address" placeholder="Address" className="text-xs text-primary/80 border border-secondary/20 rounded-[3px] px-4 py-3 outline-none " />
                    </div>

                    <div className="flex flex-col gap-0.5">
                        <label htmlFor="city" className="text-[10px] uppercase text-neutral-500">City</label>
                        <input type="text" name="city" id="city" placeholder="City" className="text-xs text-primary/80 border border-secondary/20 rounded-[3px] px-4 py-3 outline-none " />
                    </div>

                    <div className="flex flex-col gap-0.5">
                        <label htmlFor="district" className="text-[10px] uppercase text-neutral-500">District</label>
                        <input type="text" name="district" id="district" placeholder="District" className="text-xs text-primary/80 border border-secondary/20 rounded-[3px] px-4 py-3 outline-none " />
                    </div>
                </form>

                {/* Payment method select Sec */}

                <div>
                    <div className='mb-4 mt-10'>
                        <TitleBar firstText={'Payment'} secText={'Method'} showLine />
                    </div>

                    <div className='flex gap-3'>
                        {[['cashOnDelivery', 'Cash on delivery'], ['cardPayment', 'Card payment']].map(([value, label]) =>
                            <div key={value} onClick={() => setPaymentMethod(value)} className={`flex gap-1.25 text-xs uppercase outfit font-medium ${paymentMethod === value ? 'border-secondary/50 bg-secondary/10' : 'border-secondary/20 bg-secondary/5'} border text-primary/80 w-fit px-4 py-2 rounded-[3px] select-none cursor-pointer`}>{label}{paymentMethod === value && <RiCheckboxCircleFill className='text-green-600' size={15} />}</div>)}
                    </div>

                    {/* setPaymentMethod(prev => prev === value ? null : value) */}

                </div>

            </div>


            <div className='w-full md:1/2 lg:w-3/7 xl:w-3/8'>

                {/* Order Summary Sec */}

                <div className='flex flex-col border outfit bg-white border-neutral-200 px-6 py-4 h-fit rounded'>
                    <h1 className={'sm:text-lg uppercase text-secondary font-extrabold mb-2.5'} >Order Details</h1>
                    <div className='flex flex-col gap-2'>
                        <div className='flex flex-col gap-2.5'>
                            {cart.map(item =>

                                <div key={item.id} className='flex justify-between gap-2 font-light text-xs xl:text-sm'>
                                    <div className='flex gap-2 w-5/8'>
                                        <p >{item.name} * {item.quantity}</p>
                                    </div>
                                    <span className='w-3/8 text-end'>LKR {(item.price * item.quantity).toFixed(2)}</span>
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

                    <button onClick={() => navigate('/orderstatus')} className='mt-6 ml-auto bg-primary outfit border border-secondary/50 rounded-[3px] text-xs text-white uppercase font-medium px-5 py-2.5 hover:bg-secondary cursor-pointer transition-colors duration-300'>Complete Order</button>

                </div>



            </div>
        </div>
    )
}
export default Checkout