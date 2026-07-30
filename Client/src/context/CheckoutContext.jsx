import { createContext, useContext, useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { toast } from 'sonner'
import { useCart } from "./CartContext"
import { useOrders } from "./OrdersContext"
import { useProducts } from "./ProductsContext"

export const CheckoutContext = createContext()

export const CheckoutProvider = ({ children }) => {

    const API_URL = import.meta.env.VITE_API_URL
    const [loading, setLoading] = useState(true)
    const { getItems } = useProducts()
    const { setCart, fetchCart } = useCart()
    const { getOrders } = useOrders()
    const navigate = useNavigate()

    const checkout = async (formData) => {
        try {
            const res = await fetch(API_URL + '/api/orders', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                credentials: 'include',
                body: JSON.stringify({
                    ...formData
                })
            })

            const data = await res.json()

            if (data.success) {
                navigate(`/orderstatus/${data.orderId}`)
                fetchCart()
                getOrders()
                getItems()
            }

            if (res.status === 400) {
                toast.info(data.message)
            }

            if (res.status === 401) {
                toast.error(data.message)
            }

        } catch (err) {
            toast.error('Something went wrong !')
        } finally {
            setLoading(false)
        }
    }

    return (
        <CheckoutContext.Provider value={{ checkout, loading }}>
            {children}
        </CheckoutContext.Provider>
    )

}

export const useCheckout = () => {
    return useContext(CheckoutContext)
}