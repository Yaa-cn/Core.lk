import { useNavigate } from 'react-router-dom'
import { useWishlist } from '../context/WishlistContext'
import { useAuth } from '../context/AuthContext'
import TitleBar from '../components/TitleBar'
import HeartIcon from '../assets/icons/heart.png'
import Loader from '../components/Loader'

function Wishlist() {
  const { wishlist, loading, wishlistItems } = useWishlist()
  const { user } = useAuth()
  const navigate = useNavigate()

  return (
    <>
      <div className='pt-4 sm:pt-5 pb-4 sm:pb-5 mx-4 sm:mx-10'>
        <TitleBar firstText={'My'} secText={'Wishlist'} showLine />
      </div>

      <div className='flex flex-col md:flex-row gap-8 mb-10 mx-4 sm:mx-10'>

        {loading && user ? <div className='flex justify-center w-full items-center mt-30 mb-30'><Loader /></div> :
          <div className='w-full'>
            {wishlist.length === 0 ?
              <div className='flex flex-col justify-center items-center gap-3 mt-10 mb-10'>
                <img src={HeartIcon} alt="HeartIcon" className='w-25 sm:w-30' />
                <h1 className='text-xl sm:text-2xl text-secondary outfit font-bold'>Your Wishlist is Empty !</h1>
                <p className='text-xs sm:text-sm text-gray-500 w-70 text-center sm:w-fit'>You haven’t added any items yet. Start exploring and save your favorites here for quick access later</p>
                <button onClick={() => navigate('/shop')} className='text-[10px] sm:text-xs bg-accent border border-secondary/20 text-secondary px-4 py-2.5 mt-2 rounded-[3px] font-medium outfit uppercase hover:bg-secondary hover:text-light transition-colors duration-300 cursor-pointer'>Explore now</button>
              </div> :
              <div className='flex flex-col gap-4'> {wishlistItems} </div>}
          </div>}

      </div>
    </>
  )
}
export default Wishlist