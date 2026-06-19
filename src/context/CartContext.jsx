import { useContext, createContext, useEffect, useState } from "react"
import { toast } from "sonner"
import CartItem from '../components/CartItem'
import { useAuth } from "./AuthContext"

const CartContext = createContext()

export const CartProvider = ({ children }) => {

    const { user } = useAuth()
    const [quantity, setQuantity] = useState(1)
    const [loading, setLoading] = useState(true)
    const [cart, setCart] = useState(() => {
        const data = localStorage.getItem('cart')
        return data ? JSON.parse(data) : []
    })

    const fetchCart = async () => {
        try {
            const res = await fetch('http://localhost:3000/api/cart', {
                credentials: 'include'
            })

            const data = await res.json()

            if (res.ok) {
                setCart(data.items || [])
                setLoading(false)
            }
        } catch (err) {
            console.error(err.message)
        }
    }

    useEffect(() => {
        if (!user) {
            const existingCart = JSON.parse(localStorage.getItem('cart') || "[]")
            setCart(existingCart)
        }

        const mergeCart = async () => {
            try {
                const cartItems = JSON.parse(
                    localStorage.getItem('cart') || '[]'
                )

                if (cartItems.length > 0) {
                    const res = await fetch(
                        'http://localhost:3000/api/cart/merge',
                        {
                            method: 'POST',
                            credentials: 'include',
                            headers: {
                                'Content-Type': 'application/json'
                            },
                            body: JSON.stringify({ cartItems })
                        }
                    )

                    if (!res.ok) {
                        console.error('Cart merge failed!', res.status)
                        return
                    }

                    localStorage.removeItem('cart')
                }

                await fetchCart()

            } catch (err) {
                console.error(err.message)
            }
        }

        mergeCart()

    }, [user])


    const addToCart = async (product) => {
        if (user) {
            try {
                const res = await fetch('http://localhost:3000/api/cart', {
                    method: 'POST',
                    credentials: 'include',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        product,
                        quantity: quantity
                    })
                })

                const data = await res.json()

                if (res.ok) {
                    toast.success(data.message)
                }

                if (res.status === 409) {
                    toast.info(data.message)
                }

            } catch (err) {
                console.error(err.message)
            }

            fetchCart()

        } else {
            setCart(prevCart => {
                const exist = prevCart.find(item => item.product._id === product._id)
                if (exist) {
                    toast.info('Item already in cart')
                    return [...prevCart]
                } else {
                    toast.success('Item added to cart')
                    return [...prevCart, { product, quantity: quantity }]
                }
            })
        }
    }

    const subTotal = cart.reduce((sum, item) => {
        return sum + item.product.price * item.quantity
    }, 0)

    const shippingFee = 0

    const total = subTotal + shippingFee

    const cartItems = cart.map((item) => {
        return (
            <CartItem
                key={item.product._id}
                imgSrc={item.product.image}
                name={item.product.name}
                price={item.product.price}
                quantity={item.quantity}
                slug={item.product.slug}
                id={item.product._id}
            />
        )
    })

    const removeFromCart = async (id) => {
        if (user) {
            try {
                const res = await fetch(`http://localhost:3000/api/cart/${id}`, {
                    method: 'DELETE',
                    credentials: 'include'
                })

            } catch (err) {
                console.error(err.message)
            }

            fetchCart()

        } else {
            setCart(prevCart => prevCart.filter(item => item.product._id !== id))
        }
    }

    const increaseQuantity = async (id) => {
        if (user) {
            try {
                const res = await fetch(`http://localhost:3000/api/cart/${id}`, {
                    method: 'PATCH',
                    credentials: 'include',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        action: 'inc'
                    })
                })

            } catch (err) {
                console.error(err.message)
            }

            fetchCart()

        } else {
            setCart(prevCart => prevCart.map(item => item.product._id === id ? { ...item, quantity: item.quantity + 1 } : item))
        }
    }

    const decreaseQuantity = async (id) => {
        if (user) {
            try {
                const res = await fetch(`http://localhost:3000/api/cart/${id}`, {
                    method: 'PATCH',
                    credentials: 'include',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        action: 'dec'
                    })
                })

            } catch (err) {
                console.error(err.message)
            }

            fetchCart()

        } else {
            setCart(prevCart => prevCart.map(item => item.product._id === id && item.quantity > 1 ? { ...item, quantity: item.quantity - 1 } : item))
        }
    }

    useEffect(() => {
        if (!user) {
            localStorage.setItem('cart', JSON.stringify(cart))
        }
    }, [cart])


    return (
        <CartContext.Provider value={{ cart, setCart, loading, quantity, setQuantity, addToCart, removeFromCart, increaseQuantity, decreaseQuantity, subTotal, total, shippingFee, cartItems }}>
            {children}
        </CartContext.Provider>
    )

}

export const useCart = () => (useContext(CartContext))

