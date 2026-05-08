import { useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import { RiStarFill } from "@remixicon/react"
import { Riple } from "react-loading-indicators"
import TitleBar from "../componenets/TitleBar"
import Newsletter from "../componenets/Newsletter"
import RelatedProducts from "../componenets/RelatedProducts"
import { Skeleton, Alert } from "@mui/material"
import { useCart } from "../context/CartContext"

function ProductDetails() {

    const [item, setItem] = useState(null)
    const [hide, setHide] = useState(true)
    const [loaded, setLoaded] = useState(false)
    const { addToCart, message } = useCart()
    const { id } = useParams()

    useEffect(() => {
        const getItem = async () => {
            try {
                const res = await fetch(`https://69eb2c9497482ad5c5273fa1.mockapi.io/api/products/${id}`);
                const data = await res.json();
                setItem(data);
            } catch (err) {
                console.log(err.message)
            }
        }
        getItem()
    }, [id])

    const product = item && {
        id: item.id,
        name: item.title,
        image: item.image,
        price: item.price,
    }

    return (
        <div className="flex flex-col sm:my-6 md:my-10 sm:mx-6 md:mx-10 lg:mx-20">
            {item ?
                <div className='flex gap-4 sm:gap-6 nunito flex-col sm:flex-row'>
                    {!loaded &&
                        <Skeleton animation='wave' width={300} height={300} variant="rectangular" className="aspect-square w-full! sm:max-w-75! sm:max-h-75! rounded-xs! border-none! sm:border! border-gray" />}
                    <img onLoad={() => setLoaded(true)} className={`aspect-square ${loaded ? 'block' : 'none'} w-full sm:max-w-75 sm:max-h-75 sm:rounded-xs sm:border border-gray object-cover`} src={item.image} alt={item.image} loading="lazy" />
                    <div className="flex flex-col mx-4 sm:mx-0">
                        <div className="flex justify-between">
                            <p className="text-xs text-secondary font-medium">{item.category}</p>
                            <div className="flex gap-1 "><RiStarFill size={12} className="text-yellow-400 mt-px sm:mt-[1.5px]" /><p className="text-xs font-bold">{item.rating}</p></div>
                        </div>
                        <h2 className={`text-lg font-bold mb-2 sm:mb-1`}>{item.title}</h2>
                        <p className={`text-base font-bold mb-2 sm:mb-1.5`}>LKR {item.price}</p>
                        <div className="flex flex-col gap-0.5 mb-4 select-none">
                            <h6 className="text-sm font-medium">Description </h6>
                            <h6 onClick={() => setHide(prev => !prev)} className={`text-sm text-neutral-600 ${hide ? 'line-clamp-3' : 'line-clamp-none'} cursor-pointer`}>{item.description}</h6>
                        </div>
                        <div className="flex gap-5">
                            <button onClick={() => addToCart(product)} className="text-sm text-white font-bold border border-primary bg-secondary px-7 py-2 rounded-xs hover:bg-transparent hover:text-secondary hover:border-secondary cursor-pointer transition-colors">Add to Cart</button>
                            <button className="text-sm text-secondary font-bold border border-primary bg-transparent px-5 py-2 rounded-xs hover:bg-secondary hover:text-white cursor-pointer hover:border-secondary transition-colors">Buy Now</button>
                        </div>
                        <hr className="text-gray mt-5 mb-3" />
                        <div className="flex flex-col text-xs text-neutral-500">
                            <p>Cash on Delivery Support.</p>
                            <p>Safe & Secure Checkout.</p>
                            <p>24/7 Customer Support.</p>
                        </div>
                    </div>
                </div> : <div className="flex justify-center items-center min-h-100"><Riple color="#936639" size="large" /></div>
            }
            {item && <><TitleBar firstText='Related' secText=' Products' className={'sm:text-lg font-bold pt-4 sm:pt-5 pb-4 sm:pb-5 mx-4 sm:mx-0'} />
                <RelatedProducts category={item.category} id={id} /></>}
            {message && (<Alert severity={message.type} className="fixed bottom-10 right-3 sm:right-5 rounded! w-65 sm:w-80 text-xs! items-center! border border-neutral-400">
                {message.text}
            </Alert>)}
            <Newsletter/>
        </div >

    )
}
export default ProductDetails