import { useContext, createContext, useEffect, useState } from "react"
import { toast } from "sonner"
import { useAuth } from "./AuthContext"
import WishlistItem from '../components/WishlistItem'

const WishlistContext = createContext()

export const WishlistProvider = ({ children }) => {

    const API_URL = import.meta.env.VITE_API_URL
    const { user } = useAuth()
    const [loading, setLoading] = useState(true)
    const [wishlist, setWishlist] = useState([])

    const fetchWishlist = async () => {
        try {
            const res = await fetch(API_URL + '/api/wishlist', {
                credentials: 'include'
            })

            const data = await res.json()

            if (res.ok) {
                setWishlist(data.wishlist.items)
            }
        } catch (err) {
            console.error(err.message)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        try {
            if (!user) {
                setWishlist([])
                return
            }

            fetchWishlist()

        } catch (err) {
            console.error(err.message)
        } finally {
            setLoading(false)
        }
    }, [user])

    const addToWishlist = async (product) => {
        if (user) {
            try {
                const res = await fetch(API_URL + '/api/wishlist', {
                    method: 'POST',
                    credentials: 'include',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        product,
                    })
                })

                const data = await res.json()

                if (res.ok) {
                    toast.success(data.message)
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

            fetchWishlist()
        } else {
            toast.info('Login required !')
        }
    }

    const removeFromWishlist = async (id) => {
        if (user) {

            setWishlist(wishlist =>
                wishlist.filter(item => item.product._id !== id)
            )

            try {
                const res = await fetch(API_URL + `/api/wishlist/${id}`, {
                    method: 'DELETE',
                    credentials: 'include'
                })

            } catch (err) {
                console.error(err.message)
                toast.error('Somthing went wrong !')
            }

        }
    }


    const wishlistItems = wishlist.map((item) =>
        <WishlistItem key={item.product._id}
            imgSrc={item.product.image}
            slug={item.product.slug}
            name={item.product.name}
            price={item.product.price}
            id={item.product._id}
            stock={item.product.stock} />
    )


    return (
        <WishlistContext.Provider value={{ wishlist, loading, addToWishlist, removeFromWishlist, wishlistItems }}>
            {children}
        </WishlistContext.Provider>
    )

}

export const useWishlist = () => (useContext(WishlistContext))