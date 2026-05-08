import { useProducts } from "../context/ProductsContext";
import ProductCard from "../componenets/ProductCard"
import { useCart } from "../context/CartContext";
import { Riple } from "react-loading-indicators";
import { Alert } from "@mui/material";

function RelatedProducts({ category, id }) {

    const { items, loading } = useProducts()
    const { message } = useCart()

    const products = items.filter(item => item.category === category && item.id !== id).map((item) => (
        <ProductCard key={item.id} imgSrc={item.image} category={item.category} rating={item.rating} name={item.title} price={item.price} id={item.id} />
    ))

    return (
        <>
            {loading ? <div className='flex justify-center items-center min-h-40'><Riple color='#936639' /></div> :
                <div className='grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 sm:gap-6 mb-10 mx-4 sm:mx-0'>
                    {products}
                </div>
            }
            {message && (<Alert severity={message.type} className="fixed bottom-10 right-3 sm:right-5 rounded! w-65 sm:w-80 text-xs! items-center! border border-neutral-400">
                {message.text}
            </Alert>)}
        </>
    )
}
export default RelatedProducts