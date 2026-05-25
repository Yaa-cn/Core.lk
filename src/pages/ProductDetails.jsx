import TitleBar from "../componenets/TitleBar"
import Newsletter from "../componenets/Newsletter"
import RelatedProducts from "../componenets/RelatedProducts"
import Loader from "../componenets/Loader"
import Skeleton from "../componenets/Skeleton"
import BackButton from "../componenets/BackButton"
import { useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import { RiStarFill } from "@remixicon/react"
import { useCart } from "../context/CartContext"
import { useProducts } from "../context/ProductsContext"

function ProductDetails() {

    const [hide, setHide] = useState(true)
    const [loaded, setLoaded] = useState(false)
    const [rate, setRate] = useState(null)
    const [tab, setTab] = useState('reviews')
    const { items } = useProducts()
    const { addToCart } = useCart()
    const { id } = useParams()

    const item = items?.find(item => String(item.id) === id)

    const product = item && {
        id: item.id,
        name: item.title,
        image: item.image,
        price: item.price,
    }

    const renderStars = (rating) => {
        let stars = []
        for (let i = 1; i <= rating; i++) {
            stars.push(<RiStarFill size={10} className="text-yellow-400 mt-px sm:mt-[1.5px]" />)
        }
        return stars
    }

    return (

        item ? <div className="flex flex-col sm:mt-1 sm:mx-6 md:mx-10">
            <BackButton className={'absolute sm:relative bg-light sm:bg-transparent m-4 sm:m-0 sm:my-2 sm:-ml-2 pr-4 sm:pr-0 border sm:border-none border-secondary/50 rounded-full  '} />
            <div className='flex gap-4 sm:gap-6 flex-col sm:flex-row nunito'>
                <div className="aspect-square sm:min-w-80 sm:w-80 sm:h-80 sm:rounded sm:border border-gray sm:overflow-hidden ">
                    {!loaded && <Skeleton />}
                    <img onLoad={() => setLoaded(true)} className={`aspect-square ${loaded ? 'block' : 'none'} w-full object-cover`} src={item.image} alt={item.image} loading="lazy" />
                </div>
                <div className="flex flex-col mx-4 sm:mx-0">
                    <div className="flex justify-between mb-1">
                        <p className="text-xs text-secondary font-medium">{item.category}</p>
                        <div className="flex gap-1 "><RiStarFill size={12} className="text-yellow-400 mt-px sm:mt-[1.5px]" /><p className="text-xs font-bold">{item.rating}</p></div>
                    </div>
                    <h2 className={`text-lg font-extrabold mb-2.5 -ml-px`}>{item.title}</h2>
                    <p className={`text-base font-bold mb-2.5`}>LKR {item.price}</p>
                    <div className="flex flex-col gap-0.5 mb-5 select-none">
                        <h6 className="text-sm font-medium">Description </h6>
                        <h6 onClick={() => setHide(prev => !prev)} className={`text-sm text-neutral-600 ${hide ? 'line-clamp-3' : 'line-clamp-none'} cursor-pointer`}>{item.description}</h6>
                    </div>
                    <div className="flex gap-5 mb-1">
                        <button onClick={() => addToCart(product)} className="text-xs text-white uppercase font-medium border outfit border-primary/20 bg-primary px-5 py-2.5 rounded-[3px] hover:bg-transparent hover:text-secondary hover:border-secondary/20 cursor-pointer transition-colors duration-300">Add to Cart</button>
                        <button className="text-xs text-secondary outfit font-medium uppercase border border-secondary/20 bg-accent px-5 py-2.5 rounded-[3px] hover:bg-primary hover:text-white cursor-pointer hover:border-secondary/20 transition-colors duration-300">Buy Now</button>
                    </div>
                    <hr className="text-neutral-200 mt-4 mb-4" />
                    <div className="flex flex-col outfit uppercase text-[10px] gap-1 text-neutral-500/90 mb-1 ">
                        <p>We proudly offer Cash on Delivery support.</p>
                        <p>Our platform provides a safe and secure checkout process.</p>
                        <p>With our 24/7 customer support team.</p>
                    </div>
                </div>
            </div>

            <div className="flex flex-col gap-5 mt-4 mx-4 sm:mx-0">
                <div className="flex flex-col">
                    <div className="flex text-[10px] outfit font-medium text-secondary ml-1">
                        <button onClick={() => setTab('reviews')} className={`${tab === 'reviews' ? 'bg-accent' : ''} px-5 py-2 border-t border-x rounded-tl-[3px] border-secondary/20 cursor-pointer uppercase`}>Reviews</button>
                        <button onClick={() => setTab('addReview')} className={`${tab === 'addReview' ? 'bg-accent' : ''} px-5 py-2 border-t border-r rounded-tr-[3px] border-secondary/20 cursor-pointer uppercase`}>Write a Review</button>
                    </div>
                    <hr className=" border-secondary/20" />

                    {/* Review Sec */}
                    {tab === 'reviews' && <div className="flex flex-col gap-4 my-4">

                        <div className="flex flex-col gap-3">
                            <div className="flex flex-col gap-2">
                                <h5 className="text-xs outfit text-primary font-semibold">John Wick</h5>
                                <span className="flex gap-3 nunito">{renderStars(item.rating)}</span>
                            </div>
                            <p className="text-xs nunito text-primary/70">Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatem quae alias nisi, harum sint, ex sapiente commodi, cupiditate itaque asperiores quia doloribus ipsum provident rem quaerat tempore mollitia quas facere accusantium excepturi ipsam consectetur quod. Sit voluptates, ea minima, deserunt placeat unde ad cumque laudantium sint officiis hic, et temporibus.</p>
                            <hr className=" border-neutral-200 mt-3" />
                        </div>

                        <div className="flex flex-col gap-3">
                            <div className="flex flex-col gap-2">
                                <h5 className="text-xs outfit text-primary font-semibold">John Cooper</h5>
                                <span className="flex gap-3 nunito">{renderStars(item.rating)}</span>
                            </div>
                            <p className="text-xs nunito text-primary/70">Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatem quae alias nisi, harum sint, ex sapiente commodi, cupiditate itaque asperiores quia doloribus ipsum provident rem quaerat tempore mollitia quas facere accusantium excepturi ipsam consectetur quod. Sit voluptates, ea minima, deserunt placeat unde ad cumque laudantium sint officiis hic, et temporibus.</p>
                            <hr className=" border-neutral-200 mt-3" />
                        </div>

                        <div className="flex flex-col gap-3">
                            <div className="flex flex-col gap-2">
                                <h5 className="text-xs outfit text-primary font-semibold">William Butcher</h5>
                                <span className="flex gap-3 nunito">{renderStars(5)}</span>
                            </div>
                            <p className="text-xs nunito text-primary/70">Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatem quae alias nisi, harum sint, ex sapiente commodi, cupiditate itaque asperiores quia doloribus ipsum provident rem quaerat tempore mollitia quas facere accusantium excepturi ipsam consectetur quod. Sit voluptates, ea minima, deserunt placeat unde ad cumque laudantium sint officiis hic, et temporibus.</p>
                            <hr className=" border-neutral-200 mt-3" />
                        </div>

                    </div>}


                    {/* Add Review Sec */}
                    {tab === 'addReview' && <div className="flex flex-col gap-4 my-5">
                        <div>
                            <TitleBar firstText={'Write a Review'} className={'text-xs! sm:text-sm!'} showLine />
                        </div>
                        <div className="flex gap-3 place-items-center">
                            <div className="flex gap-1">
                                <span onClick={() => setRate(1)} className="cursor-pointer"><RiStarFill size={18} className={`${rate >= 1 ? 'text-yellow-400' : ''} text-secondary/20`} /></span>
                                <span onClick={() => setRate(2)} className="cursor-pointer"><RiStarFill size={18} className={`${rate >= 2 ? 'text-yellow-400' : ''} text-secondary/20`} /></span>
                                <span onClick={() => setRate(3)} className="cursor-pointer"><RiStarFill size={18} className={`${rate >= 3 ? 'text-yellow-400' : ''} text-secondary/20`} /></span>
                                <span onClick={() => setRate(4)} className="cursor-pointer"><RiStarFill size={18} className={`${rate >= 4 ? 'text-yellow-400' : ''} text-secondary/20`} /></span>
                                <span onClick={() => setRate(5)} className="cursor-pointer"><RiStarFill size={18} className={`${rate >= 5 ? 'text-yellow-400' : ''} text-secondary/20`} /></span>
                            </div>
                            <p className="text-xs text-secondary/60 outfit">Click stars to rate product</p>
                        </div>
                        <textarea name="" id="" placeholder="Write a Review" className="h-20 text-xs nunito px-4 py-2 border border-secondary/20 rounded-[3px] w-full "></textarea>
                        <button onClick={() => addToCart(product)} className="text-xs w-fit text-white uppercase font-medium border outfit border-primary/50 bg-primary px-5 py-2.5 rounded-[3px] hover:bg-transparent hover:text-secondary hover:border-secondary/20 cursor-pointer transition-colors duration-300">Add Review</button>
                    </div>}
                </div>

            </div>

            <>
                <RelatedProducts category={item.category} id={id} />
            </>
            <Newsletter />
        </div > : <div className='flex justify-center items-center min-h-100'><Loader /></div>
    )
}
export default ProductDetails