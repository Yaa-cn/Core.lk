import { useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import { RiStarFill } from "@remixicon/react"
import { Riple } from "react-loading-indicators"

function ProductDetails() {

    const [item, setItem] = useState(null)
    const { id } = useParams()

    console.log(item)

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

    return (
        <div className="flex justify-center items-center my-10 mx-4 sm:mx-10 md:mx-20 xl:mx-40">
            {item ?
                <div className='flex gap-8 nunito flex-col md:flex-row'>
                    <img className='aspect-square max-w-75 max-h-75 rounded-xs border border-gray object-cover' src={item.image} alt={item.image} loading="lazy" />
                    <div className="flex flex-col">
                        <p className="text-xs text-secondary font-medium">{item.category}</p>
                        <div className="flex justify-between mb-2">
                            <h2 className={`text-lg font-bold`}>{item.title}</h2>
                            <div className="flex gap-2 justify-center"><RiStarFill size={16} className="text-yellow-400 mt-0.75" /><p className="font-bold">{item.rating}</p></div>
                        </div>
                        <p className={`font-bold mb-3`}>LKR {item.price}</p>
                        <div className="flex flex-col gap-1 mb-4">
                            <h6 className="text-sm font-medium">Description :</h6>
                            <h6 className="text-sm text-neutral-600">{item.description}</h6>
                        </div>
                        <div className="flex gap-5">
                            <button className="text-sm text-white font-bold border border-secondary bg-secondary px-5 py-2 rounded-xs hover:bg-transparent hover:text-secondary hover:border-secondary cursor-pointer transition-colors">Add to Cart</button>
                            <button className="text-sm text-secondary font-bold border border-secondary bg-transparent px-5 py-2 rounded-xs hover:bg-secondary hover:text-white cursor-pointer hover:border-secondary transition-colors">Buy Now</button>
                        </div>

                    </div>
                </div> : <Riple color="#936639" size="large" />}
        </div>
    )
}
export default ProductDetails