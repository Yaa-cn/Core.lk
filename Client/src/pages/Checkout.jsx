import { useCart } from '../context/CartContext'
import { Navigate, useNavigate } from 'react-router-dom'
import { useEffect, useState, useRef } from 'react'
import { RiCheckboxCircleFill } from '@remixicon/react'
import { useAuth } from '../context/AuthContext'
import { toast } from 'sonner'
import { useProfile } from '../context/ProfileContext'
import { useCheckout } from '../context/CheckoutContext'
import TitleBar from '../components/TitleBar'
import Loader from '../components/Loader'

function Checkout() {

    const [paymentMethod, setPaymentMethod] = useState('cashOnDelivery')
    const [buttonLable, setButtonLabel] = useState('Complete Order')
    const [disabled, setDisabled] = useState(false)
    const { cart, setCart, loading, subTotal, total, shippingFee, cartItems } = useCart()
    const { addresses, checkoutAddress, setCheckoutAddress } = useProfile()
    const { checkout, loading: isLoading } = useCheckout()
    const { user } = useAuth()
    const API_URL = import.meta.env.VITE_API_URL
    const navigate = useNavigate()

    const nameInput = useRef()
    const phoneInput = useRef()
    const addressInput = useRef()
    const cityInput = useRef()
    const districtInput = useRef()

    const payMethod = paymentMethod === 'cashOnDelivery' ? 'Cash On Delivery' : 'Card Payment'

    if (!loading && cart.length === 0) {
        // toast.info('Please add items before checkout !')
        return <Navigate to={'/'} replace />
    }

    if (loading) {
        return <div className='center'><Loader /></div>
    }

    const nameArray = checkoutAddress?.name.split(' ') || ''
    const fname = nameArray[0]
    const lname = nameArray[1]

    const checkoutPayhere = async () => {
        try {

            if (nameInput.current.value === '', phoneInput.current.value === '', addressInput.current.value === '', cityInput.current.value === '', districtInput.current.value === '') {
                toast.info("Form fields cannot be empty !")
                return
            }

            const response = await fetch(`${API_URL}/api/checkout`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                credentials: "include",
                body: JSON.stringify({
                    firstName: fname,
                    lastName: lname,
                    email: user.email,
                    phone: checkoutAddress.phoneNo,
                    address: checkoutAddress.address,
                    city: checkoutAddress.city,
                    shippingAddress: checkoutAddress,
                    paymentMethod: payMethod
                }),
            })

            if (!response.ok) {
                throw new Error("Failed to create payment")
            }

            const payment = await response.json()

            payhere.onCompleted = async function () {
                await fetch(`${API_URL}/api/onsuccess`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        order_id: payment.order_id
                    })
                })
                setCart([])
                window.location.href = `/orderstatus/${payment.order_id}`
            }

            payhere.onDismissed = async function () {
                await fetch(`${API_URL}/api/oncancel`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        order_id: payment.order_id
                    })
                })
                toast.warning("Payment Cancelled")
            }

            payhere.onError = function (error) {
                toast.error("PayHere Error:", error)
            }

            payhere.startPayment(payment)

        } catch (error) {
            console.error(error)
        }
    }

    const handleCompleteOrder = () => {

        if (nameInput.current.value === '', phoneInput.current.value === '', addressInput.current.value === '', cityInput.current.value === '', districtInput.current.value === '') {
            toast.info("Form fields cannot be empty !")
            return
        }

        checkout({
            shippingAddress: checkoutAddress,
            paymentMethod: payMethod
        })
        setDisabled(true)
        isLoading && setButtonLabel('Completing ....')
    }

    return (

        <div className='flex flex-col md:flex-row gap-8 mt-4 sm:mt-10 mb-10 mx-4 sm:mx-10'>

            <div className={`w-full ${cart.length === 0 ? 'w-full' : 'md:1/2 lg:w-4/7 xl:w-5/8'} overflow-y-auto`}>

                <div className='mb-4'>
                    <TitleBar firstText={'Shipping'} secText={'Address'} showLine />
                </div>

                {addresses.length > 0 &&
                    <div className='flex gap-2 mb-4'>
                        {addresses.map(addrs =>
                            <p onClick={() => setCheckoutAddress(addrs)} key={addrs._id} className={`text-[10px] nunito font-bold text-primary/80 border border-secondary/20 ${checkoutAddress?._id === addrs._id ? 'bg-primary/9' : 'bg-secondary/1'} px-3 py-0.5 rounded-full select-none cursor-pointer`}>{addrs.label}</p>
                        )}
                    </div>
                }

                <form className="flex flex-col gap-4">

                    <div className="flex flex-col gap-0.5">
                        <label htmlFor="name" className="text-[10px] uppercase text-neutral-500">Name</label>
                        <input
                            onChange={(e) => setCheckoutAddress(prev => ({ ...prev, name: e.target.value }))}
                            required
                            pattern='[A-Za-z\s]+'
                            title="Please enter letters and spaces only"
                            ref={nameInput}
                            value={checkoutAddress?.name} type="text" name="name" id="name" placeholder="Name" className="text-xs text-primary/80 border border-secondary/20 rounded-[3px] px-4 py-3 outline-none " />
                    </div>

                    <div className="flex flex-col gap-0.5">
                        <label htmlFor="phone" className="text-[10px] uppercase text-neutral-500">Phone Number</label>
                        <input onChange={(e) => setCheckoutAddress(prev => ({ ...prev, phoneNo: e.target.value }))}
                            required
                            pattern="^\+?\d{7,15}$"
                            title="Enter a valid phone number"
                            ref={phoneInput}
                            value={checkoutAddress?.phoneNo} type="text" name="phone" id="phone" placeholder="Number" className="text-xs text-primary/80 border border-secondary/20 rounded-[3px] px-4 py-3 outline-none " />
                    </div>

                    <div className="flex flex-col gap-0.5">
                        <label htmlFor="address" className="text-[10px] uppercase text-neutral-500">Address</label>
                        <input onChange={(e) => setCheckoutAddress(prev => ({ ...prev, address: e.target.value }))}
                            required
                            value={checkoutAddress?.address}
                            ref={addressInput}
                            type="text" name="address" id="address" placeholder="Address" className="text-xs text-primary/80 border border-secondary/20 rounded-[3px] px-4 py-3 outline-none " />
                    </div>

                    <div className="flex flex-col gap-0.5">
                        <label htmlFor="city" className="text-[10px] uppercase text-neutral-500">City</label>
                        <input onChange={(e) => setCheckoutAddress(prev => ({ ...prev, city: e.target.value }))}
                            required
                            pattern='[A-Za-z\s]+'
                            title="Please enter letters and spaces only"
                            ref={cityInput}
                            value={checkoutAddress?.city} type="text" name="city" id="city" placeholder="City" className="text-xs text-primary/80 border border-secondary/20 rounded-[3px] px-4 py-3 outline-none " />
                    </div>

                    <div className="flex flex-col gap-0.5">
                        <label htmlFor="district" className="text-[10px] uppercase text-neutral-500">District</label>
                        <input onChange={(e) => setCheckoutAddress(prev => ({ ...prev, district: e.target.value }))}
                            required
                            pattern='[A-Za-z\s]+'
                            title="Please enter letters and spaces only"
                            ref={districtInput}
                            value={checkoutAddress?.district} type="text" name="district" id="district" placeholder="District" className="text-xs text-primary/80 border border-secondary/20 rounded-[3px] px-4 py-3 outline-none " />
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

                                <div key={item.product._id} className='flex justify-between gap-2 font-light text-xs xl:text-sm'>
                                    <div className='flex gap-2 w-5/8'>
                                        <p>{item.product.name} - <span className='text-red-400'>( {item.product.price} * {item.quantity} )</span></p>
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

                    <button onClick={() => { paymentMethod === 'cashOnDelivery' ? handleCompleteOrder() : checkoutPayhere() }} disabled={disabled} className='mt-6 ml-auto bg-primary outfit border border-secondary/50 rounded-[3px] text-xs text-white uppercase font-medium px-5 py-2.5 hover:bg-secondary w-40 cursor-pointer transition-colors duration-300'>{buttonLable}</button>

                </div>

            </div>
        </div>
    )
}
export default Checkout