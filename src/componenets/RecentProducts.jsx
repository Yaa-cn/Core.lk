import { Riple } from 'react-loading-indicators';
import { useProducts } from '../context/ProductsContext';
import ProductCard from './ProductCard'


function RecentProducts() {

    const { items, loading } = useProducts()

    const products = items.map((item) => (
        <ProductCard key={item.id} imgSrc={item.image} category={item.category} rating={item.rating} name={item.title} price={item.price} id={item.id} />
    ))

    const recentProducts = products.slice(0, 10);

    return (
        <>
            {loading ? <div className='flex justify-center items-center min-h-40'><Riple color='#936639' /></div> :
                <div className='grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 sm:gap-6 mb-10 mx-4 sm:mx-10'>
                    {recentProducts}
                </div>
            }
        </>
    )
}

export default RecentProducts