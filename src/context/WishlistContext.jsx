import { useContext, createContext, useEffect, useState } from "react";
import { toast } from "sonner";
import WishlistItem from '../components/WishlistItem'

const WishlistContext = createContext()

export const WishlistProvider = ({ children }) => {

    const [wishlist, setWishlist] = useState(() => {
        const data = localStorage.getItem('wishlist')
        return data ? JSON.parse(data) : []
    })

    const wishlistItems = wishlist.map((item) =>
        <WishlistItem key={item._id} imgSrc={item.image} slug={item.slug} name={item.name} price={item.price} id={item._id} stock={item.stock} />
    )

    const addToWishlist = (product) => {
        setWishlist(prevCart => {
            const exist = prevCart.find(item => item._id === product._id)
            if (exist) {
                toast.info('Item already in wishlist')
                return [...prevCart]
            } else {
                toast.success('Item added to wishlist')
                return [...prevCart, { ...product }]
            }
        })
    }

    const removeFromWishlist = (id) => {
        setWishlist(prevCart => prevCart.filter(item => item._id !== id))
    }

    useEffect(() => {
        localStorage.setItem('wishlist', JSON.stringify(wishlist))
    }, [wishlist])


    return (
        <WishlistContext.Provider value={{ wishlist, addToWishlist, removeFromWishlist, wishlistItems }}>
            {children}
        </WishlistContext.Provider>
    )

}

export const useWishlist = () => (useContext(WishlistContext))