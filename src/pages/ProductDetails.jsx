import TitleBar from "../componenets/TitleBar"
import Newsletter from "../componenets/Newsletter"
import RelatedProducts from "../componenets/RelatedProducts"
import Loader from "../componenets/Loader"
import { useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import { RiStarFill } from "@remixicon/react"
import { useCart } from "../context/CartContext"
import { useProducts } from "../context/ProductsContext"
import Skeleton from "../componenets/Skeleton"

function ProductDetails() {

    const [hide, setHide] = useState(true)
    const [loaded, setLoaded] = useState(false)
    const { items } = useProducts()
    const { addToCart, message } = useCart()
    const { id } = useParams()

    const item = items?.find(item => String(item.id) === id)

    const product = item && {
        id: item.id,
        name: item.title,
        image: item.image,
        price: item.price,
    }

    return (
        item ? <div className="flex flex-col sm:my-6 md:my-10 sm:mx-6 md:mx-10">
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
                        <button onClick={() => addToCart(product)} className="text-sm text-white font-bold border border-primary bg-secondary px-5 py-2 rounded-xs hover:bg-transparent hover:text-secondary hover:border-secondary cursor-pointer transition-colors">Add to Cart</button>
                        <button className="text-sm text-secondary font-bold border border-primary bg-transparent px-5 py-2 rounded-xs hover:bg-secondary hover:text-white cursor-pointer hover:border-secondary transition-colors">Buy Now</button>
                    </div>
                    <hr className="text-neutral-200 mt-4 mb-4" />
                    <div className="flex flex-col gap-1 text-xs text-neutral-500 mb-1">
                        <p>We proudly offer Cash on Delivery support.</p>
                        <p>Our platform provides a safe and secure checkout process.</p>
                        <p>With our 24/7 customer support team.</p>
                    </div>
                </div>
            </div>
            <>
                <TitleBar firstText='Related' secText=' Products' className={'sm:text-lg font-bold pt-4 sm:pt-5 pb-4 sm:pb-5 mx-4 sm:mx-0'} />
                <RelatedProducts category={item.category} id={id} />
            </>
            <Newsletter />
        </div > : <div className='flex justify-center items-center min-h-100'><Loader /></div>
    )
}
export default ProductDetails