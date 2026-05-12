import { useContext, createContext, useEffect, useState } from "react";
import { toast } from "sonner";

const WishlistContext = createContext()

export const WishlistProvider = ({ children }) => {

    const [wishlist, setWishlist] = useState(() => {
        const data = localStorage.getItem('wishlist')
        return data ? JSON.parse(data) : []
    })

    const addToWishlist = (product) => {
        setWishlist(prevCart => {
            const exist = prevCart.find(item => item.id === product.id)
            if (exist) {
                toast.info('Item already added to wishlist')
                return [...prevCart]
            } else {
                toast.success('Item added to wishlist')
                return [...prevCart, { ...product, quantity: 1 }]
            }
        })
    }

    const removeFromWishlist = (id) => {
        setWishlist(prevCart => prevCart.filter(item => item.id !== id))
    }

    useEffect(() => {
        localStorage.setItem('wishlist', JSON.stringify(wishlist))
    }, [wishlist])


    return (
        <WishlistContext.Provider value={{ wishlist, addToWishlist, removeFromWishlist }}>
            {children}
        </WishlistContext.Provider>
    )

}

export const useWishlist = () => (useContext(WishlistContext))