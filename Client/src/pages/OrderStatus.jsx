import { useNavigate, useParams, Navigate } from 'react-router-dom'
import { RiCheckboxCircleFill, RiCloseCircleFill } from '@remixicon/react'
import { useState, useEffect } from "react"
import { useCheckout } from '../context/CheckoutContext'
import { useOrders } from '../context/OrdersContext'
import Loader from '../components/Loader'

function OrderStatus() {

    const API_URL = import.meta.env.VITE_API_URL
    const { orderId } = useParams()
    const { getOrderStatus, orderStatus, orderStatusLoading } = useOrders()
    const navigate = useNavigate()
    let title, description

    useEffect(() => {
        getOrderStatus(orderId)
    }, [])

    if (orderStatusLoading) {
        return <div className='center'><Loader /></div>
    }

    if (orderStatus) {
        title = 'Order Successful'
        description = 'Your order has been confirmed successfully. It will arrive at your doorstop soon.'
    }

    if (!orderStatus) {
        return <Navigate to={'/'} replace />
    }

    return (
        <div className='flex flex-col justify-center items-center gap-3 mx-4 sm:mx-10 h-110'>
            <RiCheckboxCircleFill className='text-green-600 w-25 h-25 sm:w-30 sm:h-30' />
            {/* <RiCloseCircleFill className='text-red-600 w-25 h-25 sm:w-30 sm:h-30' /> */}
            <h1 className='text-xl sm:text-2xl text-secondary outfit font-bold'>{title}</h1>
            <p className='text-xs sm:text-sm text-gray-500 w-70 text-center sm:w-fit'>Your order Number is <span className='text-green-600 text-[11px] sm:text-[13px]'>{orderId}</span></p>
            <p className='text-xs sm:text-sm text-gray-500 w-70 text-center sm:w-fit'>{description}</p>
            <button onClick={() => navigate('/')} className='text-[10px] sm:text-xs bg-accent border border-secondary/20 text-secondary px-4 py-2.5 mt-2 rounded-[3px] font-medium outfit uppercase hover:bg-secondary hover:text-light transition-colors duration-300 cursor-pointer'>Go Home</button>
        </div>
    )
}

export default OrderStatus