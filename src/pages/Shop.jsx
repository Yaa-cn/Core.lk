import RecentProducts from "../componenets/RecentProducts"
import TitleBar from "../componenets/TitleBar"
import ProductCard from "../componenets/ProductCard"
import { useEffect, useMemo, useState } from "react"
import { useShop } from "../context/ShopContext"
import { useFilter } from "../context/FilterContext"
import { RiCloseLine, RiFilter3Line, RiCloseCircleFill } from "@remixicon/react"
import { useUi } from "../context/UiContext"

function Shop() {

  const [visible, setVisible] = useState(false)
  const { visibleSearchBar, setVisibleSearchBar } = useUi()
  const [searchTerm, setSearchTerm] = useState('')
  const { category, setCategory, sortBy, sortList } = useFilter()
  const {
    items,
    loading,
    setLoading
  } = useShop()

  const products = useMemo(() => {
    return items.filter(item => category === 'all' ? true : item.category.toLowerCase() === category.toLowerCase())
      .sort((a, b) => {
        switch (sortBy) {
          case 'newest': return b.id - a.id;
          case 'high to low': return b.price - a.price;
          case 'low to high': return a.price - b.price;
          case 'rating': return b.rating - a.rating;
          default: return 0;
        }
      }).filter(item => item.title.toLowerCase().includes(searchTerm.toLowerCase()))

  }, [items, category, sortBy, searchTerm])

  const productsList = products.map((item) => (
    <ProductCard key={item.id} imgSrc={item.image} category={item.category} rating={item.rating} name={item.title} price={item.price} id={item.id} />
  ))

  return (
    <div className="relative sm:flex">

      {/* Sidebar */}
      <div className={`sideBar ${visible ? 'translate-x-0' : '-translate-x-full'} sm:translate-x-0 fixed top-14 h-screen bg-light z-30 sm:sticky sm:top-14.25 flex flex-col gap-5 p-5 w-60 lg:w-70 sm:h-screen border-r border-secondary overflow-y-auto hideBar transition-transform ease-in`}>
        <div className="flex justify-between">
          <TitleBar secText={'Filter'} className={'text-xs font-medium tracking-wide my-auto'} />
          <div onClick={() => setVisible(false)} className='block sm:hidden cursor-pointer'><RiCloseLine size={16} /></div>
        </div>
        <div>
          <h6 className="text-xs font-medium uppercase mb-2 text-primary tracking-wide">Categories</h6>
          <ul className="categoryFilter flex flex-col nunito text-xs gap-2">
            <li onClick={() => { setCategory('all'); setVisible(false) }} className={`border border-secondary px-4 py-2 rounded-xs ${category === "all" ? 'bg-accent' : 'bg-transparent'} cursor-pointer hover:bg-accent transition ease-in duration-200`}>All</li>
            <li onClick={() => { setCategory('input devices'); setVisible(false) }} className={`border border-secondary px-4 py-2 rounded-xs ${category === "input devices" ? 'bg-accent' : 'bg-transparent'} cursor-pointer hover:bg-accent transition ease-in duration-200`}>Input Devices</li>
            <li onClick={() => { setCategory('audio'); setVisible(false) }} className={`border border-secondary px-4 py-2 rounded-xs ${category === "audio" ? 'bg-accent' : 'bg-transparent'} cursor-pointer hover:bg-accent transition ease-in duration-200`}>Audio</li>
            <li onClick={() => { setCategory('storage'); setVisible(false) }} className={`border border-secondary px-4 py-2 rounded-xs ${category === "storage" ? 'bg-accent' : 'bg-transparent'} cursor-pointer hover:bg-accent transition ease-in duration-200`}>Storage</li>
            <li onClick={() => { setCategory('networking'); setVisible(false) }} className={`border border-secondary px-4 py-2 rounded-xs ${category === "networking" ? 'bg-accent' : 'bg-transparent'} cursor-pointer hover:bg-accent transition ease-in duration-200`}>Networking</li>
            <li onClick={() => { setCategory('display'); setVisible(false) }} className={`border border-secondary px-4 py-2 rounded-xs ${category === "display" ? 'bg-accent' : 'bg-transparent'} cursor-pointer hover:bg-accent transition ease-in duration-200`}>Display</li>
            <li onClick={() => { setCategory('accessories'); setVisible(false) }} className={`border border-secondary px-4 py-2 rounded-xs ${category === "accessories" ? 'bg-accent' : 'bg-transparent'} cursor-pointer hover:bg-accent transition ease-in duration-200`}>Accessories</li>
          </ul>
        </div>

        <div>
          <h6 className="text-xs font-medium uppercase mb-2 text-primary tracking-wide">Sort By</h6>
          <ul className="sortFilter flex flex-col nunito text-xs gap-2">
            <li onClick={() => { sortList('newest'); setVisible(false) }} className={`border border-secondary px-4 py-2 rounded-xs ${sortBy === "newest" ? 'bg-accent' : 'bg-transparent'}  cursor-pointer hover:bg-accent transition ease-in duration-200`}>Newest</li>
            <li onClick={() => { sortList('high to low'); setVisible(false) }} className={`border border-secondary px-4 py-2 rounded-xs ${sortBy === "high to low" ? 'bg-accent' : 'bg-transparent'}  cursor-pointer hover:bg-accent transition ease-in duration-200`}>High to Low (Price)</li>
            <li onClick={() => { sortList('low to high'); setVisible(false) }} className={`border border-secondary px-4 py-2 rounded-xs ${sortBy === "low to high" ? 'bg-accent' : 'bg-transparent'}  cursor-pointer hover:bg-accent transition ease-in duration-200`}>Low to High (Price)</li>
            <li onClick={() => { sortList('rating'); setVisible(false) }} className={`border border-secondary px-4 py-2 rounded-xs ${sortBy === "rating" ? 'bg-accent' : 'bg-transparent'}  cursor-pointer hover:bg-accent transition ease-in duration-200`}>Rating</li>
          </ul>
        </div>
      </div>

      {/* primary Section */}
      <div className="mainSection flex flex-col w-full">

        <div className={`${visibleSearchBar ? 'flex' : 'hidden'} shopSearchBar sm:flex bg-light mx-6 sm:mx-10 mt-6 mb-1 sm:mt-8 transition-all`}>
          <input type="search" onChange={(e) => setTimeout(() => setSearchTerm(e.target.value), 1000)} placeholder="Search" className="border border-secondary rounded-s sm:rounded-e px-4 py-2 text-xs w-full outline-0 placeholder:tracking-wide" />
          <span onClick={() => setVisibleSearchBar(false)} className="border-e border-b border-t border-secondary rounded-e px-2.5 py-2 bg-accent text-xs my-auto sm:hidden"><RiCloseCircleFill size={18} className="text-choco"/></span>
        </div>

        <div className="productsListSection">
          <div className="flex justify-between items-center">
            <TitleBar secText={category} className={'text-base sm:text-lg font-bold pt-4 sm:pt-5 pb-4 sm:pb-5 mx-6 sm:mx-10'} />
            <div onClick={() => setVisible(true)} className={`${visible ? 'hidden' : 'flex'} gap-1.5 mr-7 cursor-pointer sm:hidden`}><RiFilter3Line size={16} className="my-auto" /><span className="text-sm font-medium my-auto tracking-wide">Filter</span></div>
          </div>
          <div className="grid grid-cols-2 gap-4 sm:gap-5 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 mb-10 mx-6 sm:mx-10">
            {productsList}
          </div>
        </div>

      </div>

    </div>
  )
}


export default Shop