import { RiShoppingCart2Fill, RiStarFill } from "@remixicon/react";
import { useShop } from "../context/ShopContext"

function ProductCard({ id, imgSrc, imgAlt, category, name, price, rating }) {

  const { deleteItem } = useShop();

  return (
    <div className='productCard flex flex-col bg-white shadow-xl nunito'>
      <div className="overflow-hidden aspect-5/4">
        <img className='aspect-5/4 object-cover' src={imgSrc} alt={imgAlt} loading="lazy" />
      </div>
      <div className='flex flex-col gap-2.5 lg:gap-4 m-3.5'>
        <div className="flex justify-between">
          <p className='cardCat text-[8px] sm:text-[10px] tracking-wider'>{category}</p>
          <div className="flex gap-1"><RiStarFill className="w-2.5 h-2.5 sm:w-3 sm:h-3 mt-[1.5px] sm:mt-0.5 text-yellow-600"/><p className="text-[10px] sm:text-[12px] font-bold">{rating}</p></div>
        </div>

        <h5 className='text-sm xl:text-base font-bold line-clamp-2'>{name}</h5>

        <div className="flex justify-between">
          <p className='text-xs xl:text-sm font-medium my-auto'>{price} LKR</p>
          <button onClick={() => deleteItem(id)} className='rounded-full bg-mainBlur w-7 sm:w-8 h-7 sm:h-8 border border-sec cursor-pointer hover:bg-sec hover:text-white transition ease-in duration-200'><RiShoppingCart2Fill className="m-auto w-3.5 h-3.5 sm:w-4 sm:h-4" /></button>
        </div>
      </div>
    </div>
  )
}
export default ProductCard