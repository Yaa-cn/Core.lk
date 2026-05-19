import TitleBar from '../componenets/TitleBar'
import WishlistItem from '../componenets/WishlistItem'
import { useNavigate } from 'react-router-dom'
import { useWishlist } from '../context/WishlistContext'
import HeartIcon from '../assets/icons/heart.png'

function Wishlist() {
  const { wishlist } = useWishlist()
  const navigate = useNavigate()

  const wishlistItems = wishlist.map((item) =>
    <WishlistItem key={item.id} imgSrc={item.image} imgAlt={item.image} name={item.name} price={item.price} quantity={item.quantity} id={item.id} stock={item.stock} />
  )

  return (
    <>
      <div className='pt-4 sm:pt-5 pb-4 sm:pb-5 mx-4 sm:mx-10'>
        <TitleBar firstText={'My'} secText={'Wishlist'} showLine />
      </div>

      <div className='flex flex-col md:flex-row gap-8 mb-10 mx-4 sm:mx-10'>

        <div className='w-full'>
          {wishlist.length === 0 ?
            <div className='flex flex-col justify-center items-center gap-3 mt-10 mb-10'>
              <img src={HeartIcon} alt="HeartIcon" className='w-25 sm:w-30' />
              <h1 className='text-2xl sm:text-3xl text-secondary outfit font-bold'>Your Wishlist is Empty !</h1>
              <p className='text-sm text-gray-500 w-70 text-center sm:w-fit'>You haven’t added any items yet. Start exploring and save your favorites here for quick access later</p>
              <button onClick={() => { navigate('/shop'); scrollTo({ top: 0, behavior: 'smooth' }) }} className='text-[10px] sm:text-xs bg-accent border border-secondary/50 text-secondary px-4 py-2.5 mt-2 rounded-[3px] font-medium outfit uppercase hover:bg-secondary hover:text-light transition-colors duration-300 cursor-pointer'>Explore now</button>
            </div> :
            <div className='flex flex-col gap-4'> {wishlistItems} </div>}
        </div>

      </div>
    </>
  )
}
export default Wishlist