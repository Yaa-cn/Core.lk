import { useContext, createContext, useEffect, useState } from "react"
import { toast } from "sonner"
import { useAuth } from "./AuthContext"
import CartItem from '../components/CartItem'
import { useOrders } from "./OrdersContext"

const CartContext = createContext()

export const CartProvider = ({ children }) => {

    const API_URL = import.meta.env.VITE_API_URL
    const { user } = useAuth()
    const [quantity, setQuantity] = useState(1)
    const [loading, setLoading] = useState(true)
    const { orders } = useOrders()
    const [cart, setCart] = useState(() => {
        const data = localStorage.getItem('cart')
        return data ? JSON.parse(data) : []
    })

    const fetchCart = async () => {
        try {
            const res = await fetch(API_URL + '/api/cart', {
                credentials: 'include'
            })

            const data = await res.json()

            if (res.ok) {
                setCart(data.cart.items || [])
            }
        } catch (err) {
            console.error(err.message)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        if (!user) {
            const existingCart = JSON.parse(localStorage.getItem('cart') || "[]")
            setCart(existingCart)
        } else {

            const mergeCart = async () => {
                try {
                    const cartItems = JSON.parse(
                        localStorage.getItem('cart') || '[]'
                    )

                    if (cartItems.length > 0) {
                        const res = await fetch(API_URL + '/api/cart/merge',
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
                } finally {
                    setLoading(false)
                }
            }

            mergeCart()
        }

    }, [user])


    const addToCart = async (product) => {
        if (user) {

            setCart(prevCart => {
                const exist = prevCart.find(item => item.product._id === product._id)
                if (exist) {
                    return [...prevCart]
                }

                if (quantity > product.stock) {
                    return [...prevCart]
                }

                return [...prevCart, { product, quantity: quantity }]
            })

            try {
                const res = await fetch(API_URL + '/api/cart', {
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

                if (data.success) {
                    toast.success(data.message)
                }

                if (data.status === "info" && res.status === 200) {
                    toast.info(data.message)
                }

                if (res.status === 409) {
                    toast.info(data.message)
                }

                if (res.status === 401) {
                    toast.error(data.message)
                }

            } catch (err) {
                console.error(err.message)
                toast.error('Somthing went wrong !')
            }


        } else {
            setCart(prevCart => {
                const exist = prevCart.find(item => item.product._id === product._id)
                if (exist) {
                    toast.info('Item already in cart')
                    return [...prevCart]
                }

                if (quantity > product.stock) {
                    toast.info(`Sorry ! only ${product.stock} left in stock`)
                    return [...prevCart]
                }

                toast.success('Item added to cart')
                return [...prevCart, { product, quantity: quantity }]

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
                stock={item.product.stock}
            />
        )
    })

    const removeFromCart = async (id) => {
        if (user) {
            setCart(cart =>
                cart.filter(item => item.product._id !== id)
            )

            try {
                const res = await fetch(API_URL + `/api/cart/${id}`, {
                    method: 'DELETE',
                    credentials: 'include'
                })

            } catch (err) {
                console.error(err.message)
                toast.error('Somthing went wrong !')
            }

        } else {
            setCart(prevCart =>
                prevCart.filter(item => item.product._id !== id)
            )
        }
    }

    const increaseQuantity = async (id) => {
        if (user) {

            setCart(prevCart =>
                prevCart.map(item => {
                    if (item.product._id === id) {

                        if (item.quantity >= item.product.stock) {
                            toast.info(`Max stock reached`)
                            return { ...item, quantity: item.product.stock }
                        }

                        return { ...item, quantity: item.quantity + 1 }
                    }
                    return item
                })
            )

            try {
                const res = await fetch(API_URL + `/api/cart/${id}`, {
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
                toast.error('Somthing went wrong !')
            }

        } else {

            setCart(prevCart =>
                prevCart.map(item => {
                    if (item.product._id === id) {

                        if (item.quantity >= item.product.stock) {
                            toast.info(`Max stock reached`)
                            return { ...item, quantity: item.product.stock }
                        }

                        return { ...item, quantity: item.quantity + 1 }
                    }
                    return item
                })
            )
        }
    }

    const decreaseQuantity = async (id) => {
        if (user) {

            setCart(prevCart =>
                prevCart.map(item => item.product._id === id && item.quantity > 1 ? { ...item, quantity: item.quantity - 1 } : item)
            )

            try {
                const res = await fetch(API_URL + `/api/cart/${id}`, {
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
                toast.error('Somthing went wrong !')
            }

        } else {
            setCart(prevCart =>
                prevCart.map(item => item.product._id === id && item.quantity > 1 ? { ...item, quantity: item.quantity - 1 } : item)
            )
        }
    }

    useEffect(() => {
        if (!user) {
            localStorage.setItem('cart', JSON.stringify(cart))
        }
    }, [cart])


    return (
        <CartContext.Provider value={{ cart, setCart, loading, quantity, setQuantity, addToCart, removeFromCart, increaseQuantity, decreaseQuantity, subTotal, total, shippingFee, cartItems, fetchCart }}>
            {children}
        </CartContext.Provider>
    )

}

export const useCart = () => (useContext(CartContext))

