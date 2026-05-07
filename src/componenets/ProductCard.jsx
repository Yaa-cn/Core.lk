import { RiShoppingCart2Fill, RiStarFill } from "@remixicon/react";
import { useCart } from "../context/CartContext";
import { useLocation, useNavigate } from "react-router-dom";

function ProductCard({ id, imgSrc, imgAlt, category, name, price, rating }) {

  const location = useLocation()
  const navigate = useNavigate()
  const { addToCart } = useCart()

  const product = {
    id,
    name,
    image: imgSrc,
    price,
  }

  return (
    <div className='productCard flex flex-col bg-white shadow-xs nunito'>
      <div onClick={() => navigate(`/product/${id}`, scrollTo(0, 0))} className="overflow-hidden aspect-5/4">
        <img className='aspect-5/4 object-cover' src={imgSrc} alt={imgAlt} loading="lazy" />
      </div>
      <div className='flex flex-col gap-2.5 lg:gap-4 m-3.5 grow justify-between'>
        <div className="flex justify-between">
          <p className={`cardCat text-[10px] sm:text-xs`}>{category}</p>
          <div className="flex gap-1"><RiStarFill className="w-2.5 h-2.5 sm:w-3 sm:h-3 mt-[1.5px] sm:mt-0.5 text-yellow-500" /><p className="text-[10px] sm:text-[12px] font-semibold">{rating}</p></div>
        </div>

        <h5 className={`text-sm ${location.pathname.includes('/shop') ? 'xl:text-sm' : 'xl:text-base'} font-bold line-clamp-2 min-h-10`}>{name}</h5>

        <div className="flex justify-between">
          <p className={`text-xs ${location.pathname.includes('/shop') ? 'xl:text-xs' : 'xl:text-sm'} font-medium my-auto`}>{price} LKR</p>
          <button onClick={() => addToCart(product)} className='rounded-full bg-accent w-7 sm:w-8 h-7 sm:h-8 border border-gray cursor-pointer hover:bg-secondary hover:text-white transition ease-in duration-200'><RiShoppingCart2Fill className="m-auto w-3.5 h-3.5 sm:w-4 sm:h-4" /></button>
        </div>
      </div>
    </div>
  )
}
export default ProductCard