import ProductCard from "../components/ProductCard"
import Loader from "./Loader"
import TitleBar from "./TitleBar"
import { useProducts } from "../context/ProductsContext"


function RelatedProducts({ category, id }) {

    const { items, loading, error } = useProducts()

    const products = items.filter(item => item.category === category && item._id !== id).map(item => (
        <ProductCard key={item._id} imgSrc={item.image} category={item.category} rating={item.rating} name={item.name} price={item.price} slug={item.slug} item={item} />
    ))

    return (
        <>
            {loading ? <div className='flex justify-center items-center min-h-50'><Loader /></div> :
                <>
                    {/* <div className="pt-4 sm:pt-4 pb-3 sm:pb-1 mx-4 sm:mx-0"></div> */}
                    <div className="pt-4 sm:pb-1 sm:mx-0">
                        <TitleBar firstText='Related' secText=' Products' />
                    </div>
                    {!error ?
                        <div className='grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 sm:gap-6 sm:mx-0'>
                            {products}
                        </div> : <div><p className='text-sm my-5 text-[tomato]'>{error}</p></div>}
                </>
            }
        </>
    )
}
export default RelatedProducts