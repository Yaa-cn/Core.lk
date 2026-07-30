import TitleBar from "../components/TitleBar"
import Newsletter from "../components/Newsletter"
import RelatedProducts from "../components/RelatedProducts"
import Loader from "../components/Loader"
import Skeleton from "../components/Skeleton"
import BackButton from "../components/BackButton"
import starsIcon from "../assets/icons/stars.png"
import { useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import { RiStarFill, RiArrowLeftSFill, RiArrowRightSFill } from "@remixicon/react"
import { useCart } from "../context/CartContext"
import { useProducts } from "../context/ProductsContext"
import { useLocation } from "react-router-dom"
import { useWishlist } from "../context/WishlistContext"
import { useOrders } from "../context/OrdersContext"

function ProductDetails() {

    const [hide, setHide] = useState(true)
    const [loaded, setLoaded] = useState(false)
    const [tab, setTab] = useState('relatedProducts')
    const { items } = useProducts()
    const { addToCart, quantity, setQuantity } = useCart()
    const { slug } = useParams()
    const { addToWishlist } = useWishlist()
    const { reviews, getReviews, reviewsLoading } = useOrders()
    const location = useLocation()

    useEffect(() => {
        setQuantity(1)
    }, [location])

    const item = items?.find(item => item.slug === slug)

    const product = item && {
        ...item
    }

    useEffect(() => {
        if (item) {
            getReviews(item._id)
        }
    }, [item])

    const getTime = (input) => {

        const date = new Date(input)
        const formatter = new Intl.DateTimeFormat("en-GB", {
            timeZone: "Asia/Colombo",
            weekday: "short",
            day: "2-digit",
            month: "short",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit",
            hour12: true
        })

        let createdAt = formatter.format(date)

        return createdAt = createdAt.replace(/\b(am|pm)\b/i, match => match.toUpperCase())
    }


    const renderStars = (rating) => {
        let stars = []
        for (let i = 1; i <= rating; i++) {
            stars.push(<RiStarFill key={i} size={10} className="text-yellow-400 mt-px sm:mt-[1.5px]" />)
        }
        return stars
    }

    return (

        item ? <div className="flex flex-col sm:mt-1 sm:mx-6 md:mx-10">
            <BackButton className={'absolute sm:relative bg-light sm:bg-transparent m-4 sm:m-0 sm:my-2 sm:-ml-2 pr-4 sm:pr-0 border sm:border-none border-secondary/50 rounded-full  '} />
            <div className='flex gap-4 sm:gap-6 flex-col md:flex-row nunito'>
                <div className="aspect-square md:min-w-100 md:w-100 md:h-100 sm:rounded sm:border border-gray sm:overflow-hidden ">
                    {!loaded && <Skeleton />}
                    <img onLoad={() => setLoaded(true)} className={`aspect-square ${loaded ? 'block' : 'none'} w-full object-cover`} src={item.image} alt={item.image} loading="lazy" />
                </div>
                <div className="flex flex-col mx-4 sm:mx-0">
                    <div className="flex justify-between mb-1">
                        <p className="text-xs text-secondary font-medium">{item.category}</p>
                    </div>
                    <h2 className={`text-lg font-extrabold mb-0.5 -ml-px`}>{item.name}</h2>
                    <span className="flex items-center gap-2.5 nunito mb-2">{renderStars(item.rating)} <span className="text-xs font-bold">( {item.rating.toFixed(1)} )</span></span>
                    {item.stock > 10 && <p className="text-xs text-green-600 font-medium mb-2">{item.stock} in Stock</p>}
                    {item.stock > 0 && item.stock < 10 && <p className="text-xs text-yellow-600 font-medium mb-2">Only {item.stock} left !</p>}
                    {item.stock === 0 && <p className="text-xs text-red-400 font-medium mb-2">Out of Stock</p>}
                    <p className={`text-base font-bold mb-2.5`}>LKR {item.price}</p>
                    <div className="flex flex-col gap-0.5 mb-3.5 select-none">
                        <h6 className="text-sm font-medium">Description </h6>
                        <h6 onClick={() => setHide(prev => !prev)} className={`text-sm/5.5 outfit text-secondary/65 ${hide ? 'line-clamp-3' : 'line-clamp-none'} cursor-pointer`}>{item.description}</h6>
                    </div>
                    <div className="flex gap-1 mb-5">
                        <p className="text-xs mt-[1.5px] font-medium">Quantity</p>
                        <div className="flex gap-2 w-fit">
                            <button disabled={quantity === 1} type="submit" onClick={() => setQuantity(prev => prev - 1)} className="cursor-pointer"><RiArrowLeftSFill className="text-secondary" size={20} /></button>
                            <span className="text-xs mt-0.5">{quantity}</span>
                            <button type="submit" onClick={() => setQuantity(prev => prev + 1)} className="cursor-pointer"><RiArrowRightSFill className="text-secondary" size={20} /></button>
                        </div>
                    </div>
                    <div className="flex gap-5 mb-1">
                        <button onClick={() => addToCart(product)} className="text-xs text-white uppercase font-medium border outfit border-primary/20 bg-primary px-5 py-2.5 rounded-[3px] hover:bg-transparent hover:text-secondary hover:border-secondary/20 cursor-pointer transition-colors duration-300">Add to Cart</button>
                        {/* <button className="text-xs text-secondary outfit font-medium uppercase border border-secondary/20 bg-accent px-5 py-2.5 rounded-[3px] hover:bg-primary hover:text-white cursor-pointer hover:border-secondary/20 transition-colors duration-300">Buy Now</button> */}
                        <button onClick={() => addToWishlist(product)} className="text-xs text-secondary outfit font-medium uppercase border border-secondary/20 bg-accent px-5 py-2.5 rounded-[3px] hover:bg-primary hover:text-white cursor-pointer hover:border-secondary/20 transition-colors duration-300">Add to Wishlist</button>
                    </div>
                    <hr className="text-neutral-200 mt-4 mb-3" />
                    <div className="flex flex-col text-xs gap-1 outfit text-secondary/65 mb-1">
                        <p>Cash on Delivery support.</p>
                        <p>Experience a safe and secure checkout process.</p>
                        <p>Customer support whenever you need.</p>
                    </div>
                </div>
            </div>

            <div className="flex flex-col gap-5 mt-4 mx-4 sm:mx-0">
                <div className="flex flex-col">
                    <div className="flex text-xs outfit font-medium text-secondary ml-1">
                        <button onClick={() => setTab('relatedProducts')} className={`${tab === 'relatedProducts' ? 'bg-accent' : ''} px-5 py-2 border-t border-x rounded-tl-[3px]  border-secondary/20 cursor-pointer`}>Related Products</button>
                        {/* <button onClick={() => setTab('addReview')} className={`${tab === 'addReview' ? 'bg-accent' : ''} px-5 py-2 border-t border-r rounded-tr-[3px] border-secondary/20 cursor-pointer`}>Write a review</button> */}
                        <button onClick={() => { setTab('reviews'); getReviews(item._id) }} className={`${tab === 'reviews' ? 'bg-accent' : ''} px-5 py-2 border-t border-r rounded-tr-[3px] border-secondary/20 cursor-pointer`}>Reviews</button>
                    </div>
                    <hr className=" border-secondary/20" />

                    {/* Related Pro Sec */}
                    {tab === 'relatedProducts' && <div className="flex flex-col gap-4 mb-4">
                        <RelatedProducts category={item.category} id={item._id} />
                    </div>}


                    {/* Review Sec */}
                    {tab === 'reviews' && <div className="flex flex-col gap-4 my-4">

                        {reviewsLoading ? <div className='flex justify-center items-center w-full mt-30 mb-20'><Loader /></div> :

                            <>
                                {reviews.length === 0 &&
                                    <><div className='flex flex-col justify-center items-center gap-3 mt-20 mb-20'>
                                        <img src={starsIcon} alt="HeartIcon" className='w-25 sm:w-30' />
                                        <h1 className='text-xl sm:text-2xl text-secondary outfit font-bold'>No Reviews Yet !</h1>
                                        <p className='text-xs sm:text-sm text-gray-500 w-70 text-center sm:w-fit'>Reviews are empty for now. Purchase it, try it out, and add your thoughts and set the tone for future buyers.</p>
                                    </div><hr className=" border-secondary/20" /></>}

                                <>
                                    {item && reviews.length !== 0 && reviews.map((review, index) => <div key={review._id} className="flex flex-col gap-3">
                                        <div className="flex flex-col gap-3">
                                            <div className="flex flex-col gap-1">
                                                <h5 className="text-xs outfit text-primary font-semibold">{review.user.name}</h5>
                                                <p className="text-xs outfit text-primary/70">{getTime(review.createdAt)}</p>
                                            </div>
                                            <span className="flex gap-3 nunito">{renderStars(review.rating)}</span>
                                        </div>
                                        <p className="text-xs nunito text-primary/60">{review.comment}</p>
                                        <hr className={`border-neutral-200 mt-3 `} />
                                        {/* ${index === reviews.length - 1 ? 'hidden' : ''} */}
                                    </div>)}
                                </>
                            </>
                        }

                    </div>}

                </div>

            </div>

            <Newsletter />
        </div > : <div className='flex justify-center items-center min-h-100'><Loader /></div>
    )
}
export default ProductDetails