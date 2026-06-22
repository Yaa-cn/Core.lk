import RecentProducts from "../components/RecentProducts"
import TitleBar from "../components/TitleBar"
import ProductCard from "../components/ProductCard"
import Loader from "../components/Loader"
import { useEffect, useMemo, useState } from "react"
import { useProducts } from "../context/ProductsContext"
import { useFilter } from "../context/FilterContext"
import { RiCloseLine, RiFilter3Line, RiArrowUpWideLine } from "@remixicon/react"
import { useUi } from "../context/UiContext"

function Shop() {

  const { visible, setVisible } = useUi()
  const { visibleSearchBar, setVisibleSearchBar } = useUi()
  const [query, setQuery] = useState('')
  const [searchTerm, setSearchTerm] = useState('')
  const { category, setCategory, sortBy, sortList } = useFilter()
  const { items, loading, setLoading, error } = useProducts()

  useEffect(() => {
    if (!visible) return
    document.body.style.overflow = 'hidden'
    document.body.classList.add('autoOverflow')
    return () => document.body.style.overflow = 'auto'
  }, [visible])

  useEffect(() => {
    const timeout = setTimeout(() => setSearchTerm(query), 500)
    return () => clearTimeout(timeout)
  }, [query])

  const products = useMemo(() => {
    return items.filter(item => category === 'all' ? true : item.category.toLowerCase() === category.toLowerCase())
      .sort((a, b) => {
        switch (sortBy) {
          case 'newest': return new Date(b.createdAt) - new Date(a.createdAt);
          case 'high to low': return b.price - a.price;
          case 'low to high': return a.price - b.price;
          case 'rating': return b.rating - a.rating;
          default: return 0;
        }
      }).filter(item =>
        item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.description.toLowerCase().includes(searchTerm.toLowerCase())
      )


  }, [items, category, sortBy, searchTerm])

  const productsList = products.map((item) => (
    <ProductCard key={item._id} imgSrc={item.image} category={item.category} rating={item.rating} name={item.name} price={item.price} slug={item.slug} item={item} />
  ))

  return (
    <div className="relative sm:flex">
      {/* Sidebar */}
      <div className={`sideBar ${visible ? 'translate-x-0' : '-translate-x-full'} sm:translate-x-0 fixed z-10 left-0 top-14 h-screen bg-light sm:sticky sm:top-14.25 flex flex-col gap-5 p-5 w-full max-w-65 sm:max-w-60 border-r border-secondary/20 overflow-y-auto hideBar transition-transform ease`}>
        <div className="flex justify-between">
          <h6 className="outfit font-medium">Filter</h6>
          <div onClick={() => setVisible(false)} className='block sm:hidden cursor-pointer'><RiCloseLine size={16} /></div>
        </div>
        <div>
          <h6 className="text-xs outfit mb-2 text-primary font-medium">Categories</h6>
          <ul className="categoryFilter flex flex-col nunito text-xs gap-2">
            <li onClick={() => { setCategory('all'); setVisible(false) }} className={`border border-secondary/20 px-4 py-2.5 rounded-xs ${category === "all" ? 'bg-accent' : 'bg-transparent'} cursor-pointer hover:bg-accent transition ease-in duration-200`}>All</li>
            <li onClick={() => { setCategory('input devices'); setVisible(false) }} className={`border border-secondary/20 px-4 py-2.5 rounded-xs ${category === "input devices" ? 'bg-accent' : 'bg-transparent'} cursor-pointer hover:bg-accent transition ease-in duration-200`}>Input Devices</li>
            <li onClick={() => { setCategory('audio'); setVisible(false) }} className={`border border-secondary/20 px-4 py-2.5 rounded-xs ${category === "audio" ? 'bg-accent' : 'bg-transparent'} cursor-pointer hover:bg-accent transition ease-in duration-200`}>Audio</li>
            <li onClick={() => { setCategory('storage'); setVisible(false) }} className={`border border-secondary/20 px-4 py-2.5 rounded-xs ${category === "storage" ? 'bg-accent' : 'bg-transparent'} cursor-pointer hover:bg-accent transition ease-in duration-200`}>Storage</li>
            <li onClick={() => { setCategory('networking'); setVisible(false) }} className={`border border-secondary/20 px-4 py-2.5 rounded-xs ${category === "networking" ? 'bg-accent' : 'bg-transparent'} cursor-pointer hover:bg-accent transition ease-in duration-200`}>Networking</li>
            <li onClick={() => { setCategory('display'); setVisible(false) }} className={`border border-secondary/20 px-4 py-2.5 rounded-xs ${category === "display" ? 'bg-accent' : 'bg-transparent'} cursor-pointer hover:bg-accent transition ease-in duration-200`}>Display</li>
            <li onClick={() => { setCategory('accessories'); setVisible(false) }} className={`border border-secondary/20 px-4 py-2.5 rounded-xs ${category === "accessories" ? 'bg-accent' : 'bg-transparent'} cursor-pointer hover:bg-accent transition ease-in duration-200`}>Accessories</li>
          </ul>
        </div>

        <div>
          <h6 className="text-xs outfit mb-2 text-primary font-medium">Sort By</h6>
          <ul className="sortFilter flex flex-col nunito text-xs gap-2">
            <li onClick={() => { sortList('newest'); setVisible(false) }} className={`border border-secondary/20 px-4 py-2.5 rounded-xs ${sortBy === "newest" ? 'bg-accent' : 'bg-transparent'}  cursor-pointer hover:bg-accent transition ease-in duration-200`}>Newest</li>
            <li onClick={() => { sortList('high to low'); setVisible(false) }} className={`border border-secondary/20 px-4 py-2.5 rounded-xs ${sortBy === "high to low" ? 'bg-accent' : 'bg-transparent'}  cursor-pointer hover:bg-accent transition ease-in duration-200`}>High to Low (Price)</li>
            <li onClick={() => { sortList('low to high'); setVisible(false) }} className={`border border-secondary/20 px-4 py-2.5 rounded-xs ${sortBy === "low to high" ? 'bg-accent' : 'bg-transparent'}  cursor-pointer hover:bg-accent transition ease-in duration-200`}>Low to High (Price)</li>
            <li onClick={() => { sortList('rating'); setVisible(false) }} className={`border border-secondary/20 px-4 py-2.5 rounded-xs ${sortBy === "rating" ? 'bg-accent' : 'bg-transparent'}  cursor-pointer hover:bg-accent transition ease-in duration-200`}>Rating</li>
          </ul>
        </div>
      </div>

      {/* primary Section */}
      <div className={`mainSection flex flex-col w-full ${visible ? 'blur-3xl' : ''} sm:blur-none`}>

        <div className={`${visibleSearchBar ? 'flex' : 'hidden'} shopSearchBar sm:flex bg-light mx-4 xl:mx-10 mt-6 mb-1 xl:mt-8 transition-all`}>
          <input type="search" name="search" onChange={(e) => setQuery(e.target.value)} placeholder="Search" className="border border-secondary/20 rounded-s-[3px] sm:rounded-e-[3px] px-4 py-3 text-xs w-full outline-0 nunito" />
          <span onClick={() => setVisibleSearchBar(false)} className="border-e border-b border-t border-secondary/20 rounded-e-[3px] px-3.5 py-3 bg-accent my-auto sm:hidden cursor-pointer"><RiArrowUpWideLine size={18} className="text-secondary" /></span>
        </div>

        <div className="productsListSection">
          <div className="flex justify-between items-center  pt-4 sm:pt-5 pb-4 sm:pb-5 mx-4 xl:mx-10">
            <TitleBar secText={category} showLine />
            <div onClick={() => setVisible(true)} className={`${visible ? 'hidden' : 'flex'} gap-1.5 mr-0.75 cursor-pointer sm:hidden`}><RiFilter3Line size={16} className="mt-px" /><span className="text-sm outfit font-medium tracking-wide">Filter</span></div>
          </div>
          {loading ? <div className='flex justify-center items-center h-full min-h-dvh'><Loader /></div> : !error ?
            <div className="grid grid-cols-2 gap-3 xl:gap-4 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 mb-4 xl:mb-10 mx-4 xl:mx-10">
              {productsList}
            </div> : <div><p className='text-sm my-2 mx-4 xl:mx-10 text-[tomato]'>{error}</p></div>
          }
        </div>

      </div>

    </div>
  )
}


export default Shop