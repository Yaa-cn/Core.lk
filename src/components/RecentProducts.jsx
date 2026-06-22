import Loader from './Loader'
import ProductCard from './ProductCard'
import { useProducts } from '../context/ProductsContext'
import TitleBar from './TitleBar'

function RecentProducts() {

    const { items, loading, error } = useProducts()

    const products = items.map((item) => (
        <ProductCard key={item._id} imgSrc={item.image} category={item.category} rating={item.rating} name={item.name} price={item.price} slug={item.slug} item={item} />
    ))

    const recentProducts = products.slice(0, 10)

    return (
        <>
            {loading ? <div className='flex justify-center items-center min-h-50'><Loader /></div> :
                <div className='mb-10 mx-4 sm:mx-10'>
                    <div className='mt-4 mb-3 sm:mt-6 sm:mb-4'>
                        <TitleBar firstText={'Recent'} secText={'Products'} />
                    </div>
                    {!error ?
                        <div className='grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 sm:gap-6'>
                            {recentProducts}
                        </div> : <div><p className='text-sm my-5 text-[tomato]'>{error}</p></div>}
                </div>
            }
        </>
    )
}

export default RecentProducts