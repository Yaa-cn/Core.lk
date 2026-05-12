import { useContext, createContext, useEffect, useState } from "react";
import { toast } from "sonner";

const CartContext = createContext()

export const CartProvider = ({ children }) => {

    const [message, setMessage] = useState(null)
    const [cart, setCart] = useState(() => {
        const data = localStorage.getItem('cart')
        return data ? JSON.parse(data) : []
    })

    const addToCart = (product) => {
        setCart(prevCart => {
            const exist = prevCart.find(item => item.id === product.id)
            if (exist) {
                toast.info('Item already in cart')
                return [...prevCart]
            } else {
                toast.success('Item added to cart')
                return [...prevCart, { ...product, quantity: 1 }]
            }
        })
    }

    const removeFromCart = (id) => {
        setCart(prevCart => prevCart.filter(item => item.id !== id))
    }

    const increaseQuantity = (id) => {
        setCart(prevCart => prevCart.map(item => item.id === id ? { ...item, quantity: item.quantity + 1 } : item))
    }

    const decreaseQuantity = (id) => {
        setCart(prevCart => prevCart.map(item => item.id === id ? { ...item, quantity: item.quantity - 1 } : item))
    }

    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(cart))
    }, [cart])


    return (
        <CartContext.Provider value={{ cart, addToCart, removeFromCart, increaseQuantity, decreaseQuantity, message }}>
            {children}
        </CartContext.Provider>
    )

}

export const useCart = () => (useContext(CartContext))

