import { useNavigate } from 'react-router-dom';
import pageNotFoundIcon from '../assets/icons/warning.png'
import { RiCheckboxCircleFill } from '@remixicon/react';

function OrderStatus() {

    const navigate = useNavigate()

    return (
        <div className='flex flex-col justify-center items-center gap-3 mx-4 sm:mx-10 h-110'>

            <RiCheckboxCircleFill className='text-green-600 w-25 h-25 sm:w-30 sm:h-30' />
            {/* <img src={pageNotFoundIcon} alt="PageNotFound" className='w-25 sm:w-30' /> */}
            <h1 className='text-xl sm:text-2xl text-secondary outfit font-bold'>Order Successful</h1>
            <p className='text-xs sm:text-sm text-gray-500 w-70 text-center sm:w-fit'>Your order has been confirmed successfully. It will arrive at your doorstop soon. </p>
            <button onClick={() => navigate('/')} className='text-[10px] sm:text-xs bg-accent border border-secondary/20 text-secondary px-4 py-2.5 mt-2 rounded-[3px] font-medium outfit uppercase hover:bg-secondary hover:text-light transition-colors duration-300 cursor-pointer'>Go Home</button>
        </div>
    )
}
export default OrderStatus