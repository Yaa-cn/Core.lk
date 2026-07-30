import { RiArrowLeftSFill, RiArrowRightSFill, RiCloseLine, RiDeleteBinLine } from "@remixicon/react"
import { useState } from "react"
import { useNavigate, Link } from "react-router-dom"
import { useWishlist } from "../context/WishlistContext"

function WishlistItem({ id, slug, imgSrc, name, price, stock }) {

    const { removeFromWishlist } = useWishlist()
    const navigate = useNavigate()

    return (
        <div className='flex justify-between nunito h-full max-h-25 bg-white border border-neutral-200 overflow-hidden rounded'>
            <Link to={`/product/${id}`}>
                <img className='aspect-5/4 max-w-30 object-cover border-r border-neutral-200' src={imgSrc} alt={`${slug}.jpg`} loading="lazy" />
            </Link>
            <div className="flex flex-col py-2.5 px-3 lg:p-3 w-full">
                <h5 className='text-xs xl:text-sm font-medium line-clamp-2 mb-1'>{name}</h5>
                <p className={`text-xs font-medium ${stock > 0 ? 'text-green-600' : 'text-[tomato]'} `}>{stock > 0 ? 'In Stock' : 'Out of Stock'}</p>
                <div className=" flex justify-between mt-auto">
                    <p className='text-xs font-bold'>{price} LKR</p>
                    <button onClick={() => removeFromWishlist(id)} className='flex cursor-pointer text-[tomato]/80'><RiDeleteBinLine size={14} /></button>
                </div>
            </div>
        </div>
    )
}
export default WishlistItem