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
      <TitleBar firstText={'My'} secText={'Wishlist'} showLine={true} className={'pt-4 sm:pt-5 pb-4 sm:pb-5 mx-4 sm:mx-10'} />
      <div className='flex flex-col md:flex-row gap-8 mx-4 mb-6 sm:mx-10 sm:mb-10'>

        <div className={`w-full`}>
          {wishlist.length === 0 ?
            <div className='flex flex-col justify-center items-center gap-3 h-[40vh]'>
              <img src={HeartIcon} alt="HeartIcon" className='w-25 sm:w-30' />
              <h1 className='text-2xl sm:text-3xl text-secondary font-extrabold'>Your Wishlist is Empty !</h1>
              <p className='text-sm text-gray-500 w-70 text-center sm:w-fit'>You haven’t added any items yet. Start exploring and save your favorites here for quick access later</p>
              <button onClick={() => navigate('/shop')} className='text-xs bg-accent border border-secondary/50 text-primary px-4 py-2 mt-2 rounded-xs font-bold nunito hover:bg-secondary hover:text-light transition-colors cursor-pointer'>Explore now</button>
            </div> :
            <div className='flex flex-col gap-4'> {wishlistItems} </div>}
        </div>

      </div>
    </>
  )
}
export default Wishlist