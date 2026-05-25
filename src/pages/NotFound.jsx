import { useNavigate } from 'react-router-dom';
import pageNotFoundIcon from '../assets/icons/warning.png'

function NotFound() {

  const navigate = useNavigate()

  return (
    <div className='flex flex-col justify-center items-center gap-3 mx-4 sm:mx-10 h-110'>
      <img src={pageNotFoundIcon} alt="PageNotFound" className='w-25 sm:w-30' />
      <h1 className='text-xl sm:text-2xl text-secondary outfit font-bold'>Oops! Page Not Found</h1>
      <p className='text-xs sm:text-sm text-gray-500 w-70 text-center sm:w-fit'>It looks like the page you’re trying to reach doesn’t exist or may have been moved. Don’t worry you can head back and find what you’re looking for.</p>
      <button onClick={() => navigate('/')} className='text-[10px] sm:text-xs bg-accent border border-secondary/20 text-secondary px-4 py-2.5 mt-2 rounded-[3px] font-medium outfit uppercase hover:bg-secondary hover:text-light transition-colors duration-300 cursor-pointer'>Go back home</button>
    </div>
  )
}
export default NotFound