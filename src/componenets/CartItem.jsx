import { RiArrowLeftSFill, RiArrowRightSFill, RiCloseLine } from "@remixicon/react"
import { useState } from "react"
import { useCart } from "../context/CartContext"

function CartItem({ id, imgSrc, imgAlt, name, price, quantity }) {

    const { removeFromCart, increaseQuantity, decreaseQuantity } = useCart()

    return (
        <div className='flex justify-between gap-2 nunito h-25 bg-white border border-gray overflow-hidden rounded'>

            <div className="flex gap-5 overflow-hidden w-5/7">
                <img className='aspect-5/4 object-cover border-r border-gray' src={imgSrc} alt={imgAlt} loading="lazy" />
                <div className="flex flex-col py-3">
                    <h5 className='text-xs xl:text-sm font-medium mb-2 line-clamp-3'>{name}</h5>
                    <div className="flex gap-1">
                        <p className="text-[10px] mt-[1.5px]">Quantity</p>
                        <div className="flex gap-2 w-fit">
                            <button disabled={quantity === 1} type="submit" onClick={() => decreaseQuantity(id)} className="cursor-pointer"><RiArrowLeftSFill className="text-secondary" size={18} /></button>
                            <span className="text-[10px] mt-0.5">{quantity}</span>
                            <button type="submit" onClick={() => increaseQuantity(id)} className="cursor-pointer"><RiArrowRightSFill className="text-secondary" size={18} /></button>
                        </div>
                    </div>
                </div>
            </div>

            <div className="flex flex-col justify-between py-3 pr-5 w-2/7">
                <p className='text-xs xl:text-sm ml-auto'>{price} LKR</p>
                <button onClick={() => removeFromCart(id)} className='flex cursor-pointer text-[tomato] text-[10px] uppercase ml-auto font-medium'>Remove</button>
            </div>

        </div>
    )
}
export default CartItem