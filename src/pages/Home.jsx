import Category from '../componenets/Category'
import Hero from '../componenets/Hero'
import Newsletter from '../componenets/Newsletter'
import RecentProducts from '../componenets/RecentProducts'
import TitleBar from '../componenets/TitleBar'

function Home() {

  const titleColor = 'text-secondary'
  const titleStyles = 'sm:text-lg font-bold pt-4 sm:pt-5 pb-4 sm:pb-5 mx-4 sm:mx-10'

  return (
    <>
    <Hero/>
    <TitleBar firstText='Products' secText=' categories' className={titleStyles} color={titleColor} />
    <Category/>
    <TitleBar firstText='Recent' secText=' Products' className={titleStyles} color={titleColor}/>
    <RecentProducts/>
    <Newsletter/>
    </>
  )
}
export default Home