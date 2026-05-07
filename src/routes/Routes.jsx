import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { Suspense, lazy } from 'react'
import { Riple } from 'react-loading-indicators'
import Home from '../pages/Home'
import Shop from '../pages/Shop'
import About from '../pages/About'
import Contact from '../pages/Contact'
import Profile from '../pages/Profile'
import Cart from '../pages/Cart'
import NotFound from '../pages/NotFound'
import ProductDetails from '../pages/ProductDetails'

const App = lazy(() => import('../App'))

const router = createBrowserRouter([
  {
    path: '/',
    element: <Suspense fallback={<div className='flex justify-center items-center h-dvh'><Riple color='#936639' /></div>} >
      <App />
    </Suspense>,
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