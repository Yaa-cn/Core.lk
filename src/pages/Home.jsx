import BrandsSlider from '../componenets/BrandsSlider'
import Category from '../componenets/Category'
import Hero from '../componenets/Hero'
import Newsletter from '../componenets/Newsletter'
import RecentProducts from '../componenets/RecentProducts'
import TitleBar from '../componenets/TitleBar'

function Home() {

  return (
    <>
    <Hero/>
    <Category/>
    <RecentProducts/>
    {/* <BrandsSlider/> */}
    <Newsletter/>
    </>
  )
}
export default Home