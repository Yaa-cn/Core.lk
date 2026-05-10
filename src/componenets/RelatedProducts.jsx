import ProductCard from "../componenets/ProductCard"
import Loader from "./Loader";
import Toast from "./Toast";
import { useProducts } from "../context/ProductsContext";
import { useCart } from "../context/CartContext";


function RelatedProducts({ category, id }) {

    const { items, loading } = useProducts()
    const { message } = useCart()

    const products = items.filter(item => item.category === category && item.id !== id).map((item) => (
        <ProductCard key={item.id} imgSrc={item.image} category={item.category} rating={item.rating} name={item.title} price={item.price} id={item.id} />
    ))

    return (
        <>
            {loading ? <div className='flex justify-center items-center min-h-50'><Loader /></div> :
                <div className='grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 sm:gap-6 mx-4 sm:mx-0'>
                    {products}
                </div>
            }
            {message && <Toast type={message.type} text={message.text} />}
        </>
    )
}
export default RelatedProducts