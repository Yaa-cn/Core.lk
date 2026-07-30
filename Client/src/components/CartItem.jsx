import { RiArrowLeftSFill, RiArrowRightSFill, RiCloseLine, RiDeleteBinLine } from "@remixicon/react"
import { useState } from "react"
import { useCart } from "../context/CartContext"
import { useNavigate, Link } from "react-router-dom"

function CartItem({ id, slug, imgSrc, name, price, quantity, stock }) {

    const { removeFromCart, increaseQuantity, decreaseQuantity } = useCart()
    const navigate = useNavigate()

    return (
        <div className='flex justify-between nunito h-full max-h-25 bg-white border border-neutral-200 overflow-hidden rounded'>
            <Link to={`/product/${slug}`}>
                <img className='aspect-5/4 max-w-30 object-cover border-r border-neutral-200' src={imgSrc} alt={`${slug}.jpg`} loading="lazy" />
            </Link>
            <div className="flex flex-col py-2.5 px-3 lg:p-3 w-full">
                <h5 className='text-xs xl:text-sm font-medium line-clamp-2 mb-1'>{name}</h5>
                <div className="flex gap-1 mb-1">
                    <p className="text-[10px] mt-[1.5px]">Quantity</p>
                    <div className="flex gap-2 w-fit">
                        <button disabled={quantity === 1} type="submit" onClick={() => decreaseQuantity(id)} className="cursor-pointer"><RiArrowLeftSFill className="text-secondary" size={18} /></button>
                        <span className="text-[10px] mt-0.5">{quantity}</span>
                        <button type="submit" onClick={() => increaseQuantity(id)} className="cursor-pointer"><RiArrowRightSFill className="text-secondary" size={18} /></button>
                    </div>
                </div>
                <div className=" flex justify-between mt-auto">
                    <p className='text-xs font-bold'>{price} LKR</p>
                    <button onClick={() => removeFromCart(id)} className='flex cursor-pointer text-[tomato]/80'><RiDeleteBinLine size={14} /></button>
                </div>
            </div>
        </div>
    )
}
export default CartItem