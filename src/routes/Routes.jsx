import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { Suspense, lazy } from 'react'
import Home from '../pages/Home'
import Shop from '../pages/Shop'
import About from '../pages/About'
import Contact from '../pages/Contact'
import Profile from '../pages/Profile'
import Cart from '../pages/Cart'
import NotFound from '../pages/NotFound'
import ProductDetails from '../pages/ProductDetails'
import Wishlist from '../pages/Wishlist'
import Loader from '../componenets/Loader'

const App = lazy(() => import('../App'))

const router = createBrowserRouter([
  {
    // path: '/',
    // element: <Suspense fallback={<div className='flex justify-center items-center h-dvh'><Loader /></div>} >
    //   <App />
    // </Suspense>,
    
    path: '/',
    element: <App />,
    children: [
      {
        path: '/',
        element: < Home />
      },
      {
        path: '/shop',
        element: <Shop />
      },
      {
        path: '/about',
        element: <About />
      },
      {
        path: '/contact',
        element: <Contact />
      },
      {
        path: '/profile',
        element: <Profile />
      },
      {
        path: '/cart',
        element: <Cart />
      },
      {
        path: '/wishlist',
        element: <Wishlist />
      },
      {
        path: '/product/:id',
        element: <ProductDetails />
      },
      {
        path: '*',
        element: <NotFound />
      },

    ]
  }
])

function Routes() {
  return (
    <RouterProvider router={router} />
  )
}
export default Routes