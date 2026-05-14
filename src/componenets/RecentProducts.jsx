import Loader from './Loader';
import ProductCard from './ProductCard'
import { useProducts } from '../context/ProductsContext';
import TitleBar from './TitleBar';

function RecentProducts() {

    const { items, loading } = useProducts()

    const products = items.map((item) => (
        <ProductCard key={item.id} imgSrc={item.image} category={item.category} rating={item.rating} name={item.title} price={item.price} id={item.id} stock={item.stock} />
    ))

    const recentProducts = products.slice(0, 10);

    return (
        <>
            {loading ? <div className='flex justify-center items-center min-h-50'><Loader /></div> :
                <div className='mb-10 mx-4 sm:mx-10'>
                    <TitleBar firstText={'Our latest'} secText={'arrivels'} desc={'Browse our newest arrivals, thoughtfully selected to bring you the latest in quality, style, and innovation.'} className={'mt-6 mb-4 sm:mt-8 sm:mb-6'} />
                    <div className='grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 sm:gap-6'>
                        {recentProducts}
                    </div>
                </div>
            }
        </>
    )
}

export default RecentProducts