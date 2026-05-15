import ProductCard from "../componenets/ProductCard"
import Loader from "./Loader"
import TitleBar from "./TitleBar"
import { useProducts } from "../context/ProductsContext"


function RelatedProducts({ category, id }) {

    const { items, loading } = useProducts()

    const products = items.filter(item => item.category === category && item.id !== id).map((item) => (
        <ProductCard key={item.id} imgSrc={item.image} category={item.category} rating={item.rating} name={item.title} price={item.price} id={item.id} stock={item.stock} />
    ))

    return (
        <>
            {loading ? <div className='flex justify-center items-center min-h-50'><Loader /></div> :
                <>
                    <div className="pt-4 sm:pt-5 pb-4 sm:pb-5 mx-4 sm:mx-0">
                        <TitleBar firstText='Related' secText=' Products' showLine className={'sm:text-lg lg:text-xl text-secondary font-extrabold'} />
                    </div>
                    <div className='grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 sm:gap-6 mx-4 sm:mx-0'>
                        {products}
                    </div>
                </>
            }
        </>
    )
}
export default RelatedProducts