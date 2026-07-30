import Skeleton from "./Skeleton"
import { RiHeartFill, RiStarFill } from "@remixicon/react"
import { useWishlist } from "../context/WishlistContext"
import { Link, useLocation, useNavigate } from "react-router-dom"
import { useState } from "react"

function ProductCard({ slug, imgSrc, category, name, price, rating, item }) {

  const [loaded, setLoaded] = useState(false)
  const location = useLocation()
  const navigate = useNavigate()
  const { addToWishlist } = useWishlist()

  const product = {
    ...item
  }

  return (
    <div className='productCard flex flex-col bg-white nunito border border-gray/70 shadow-xs rounded overflow-hidden'>
      <Link to={`/product/${slug}`} className="overflow-hidden aspect-7/5 sm:aspect-5/4">
        {!loaded &&
          <Skeleton />}
        <img onLoad={() => setLoaded(true)} className={`aspect-7/5 sm:aspect-5/4 object-cover ${loaded ? 'block' : 'none'} w-full`} src={imgSrc} alt={`${slug}.jpg`} />
      </Link>
      <div className='flex flex-col gap-2 sm:gap-1.5 lg:gap-2.5 m-2.5 sm:m-3.5 grow justify-between'>
        <div className="flex justify-between">
          <p className={`cardCat text-[10px] sm:text-xs`}>{category}</p>
          <div className="flex gap-1"><RiStarFill className="w-2.5 h-2.5 sm:w-3 sm:h-3 mt-[1.5px] sm:mt-0.5 text-yellow-500" /><p className="text-[10px] sm:text-[12px] font-semibold">{rating.toFixed(1)}</p></div>
        </div>

        <h5 className={`text-xs sm:text-sm ${location.pathname.includes('/shop') ? 'xl:text-sm' : 'xl:text-base'} font-bold line-clamp-2 h-full`}>{name}</h5>

        <div className="flex justify-between">
          <p className={`text-xs ${location.pathname.includes('/shop') ? 'xl:text-xs' : 'xl:text-sm'} font-medium my-auto`}>{price} LKR</p>
          <button onClick={() => addToWishlist(product)} className='rounded-full bg-accent w-7 sm:w-8 h-7 sm:h-8 border border-secondary/20 cursor-pointer hover:bg-secondary/30 hover:text-white transition ease-in duration-200'><RiHeartFill className="m-auto w-3.5 h-3.5 sm:w-4 sm:h-4 text-primary" /></button>
        </div>
      </div>
    </div>
  )
}
export default ProductCard