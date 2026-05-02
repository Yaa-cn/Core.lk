import ProductCard from './ProductCard'
import { useShop } from '../context/ShopContext'

function RecentProducts() {

    const { items } = useShop();

    const products = items.map((item) => (
        <ProductCard key={item.id} imgSrc={item.image} category={item.category} rating={item.rating} name={item.title} price={item.price} id={item.id} />
    ))

    const recentProducts = products.slice(0, 10);

    return (
        <div className='grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 sm:gap-6 mb-10 mx-6 sm:mx-10'>
            {recentProducts}
        </div>
    )
}

export default RecentProducts