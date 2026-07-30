import { useState, useEffect } from 'react'
import Login from './components/Login'
import Sidebar from './components/Sidebar'
import Overview from './components/Overview'
import Products from './components/Products'
import Orders from './components/Orders'
import Returns from './components/Returns'
import Users from './components/Users'
import './App.css'

function App() {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState('overview')
  const API_URL = import.meta.env.VITE_API_URL

  // Check authentication on component mount
  useEffect(() => {
    fetch(API_URL + '/admin/auth/check', {
      credentials: "include"
    })
      .then((res) => {
        if (!res.ok) throw new Error('Unauthorized')
        return res.json()
      })
      .then((data) => {
        if (data.success && data.user) {
          setUser(data.user)
        } else {
          setUser(null)
        }
      })
      .catch(() => {
        setUser(null)
      })
      .finally(() => {
        setLoading(false)
      })
  }, [])

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-bg-main">
        <div className="relative flex items-center justify-center">
          <div className="w-12 h-12 border-4 border-brand-primary border-t-transparent rounded-full animate-spin"></div>
          <div className="absolute w-8 h-8 border-4 border-brand-accent border-b-transparent rounded-full animate-spin animate-reverse"></div>
        </div>
      </div>
    )
  }

  if (!user) {
    return <Login onLoginSuccess={(userData) => setUser(userData)} />
  }

  return (
    <div className="flex min-h-screen bg-bg-main text-text-primary">
      <div className="absolute top-0 left-1/4 w-125 h-125 bg-gray/40 rounded-full blur-[120px] pointer-events-none animate-pulse-slow"></div>
      <div className="absolute bottom-10 right-1/4 w-100 h-100 bg-accent/60 rounded-full blur-[100px] pointer-events-none animate-pulse-slow"></div>

      {/* Sidebar Navigation */}
      <div>
        <Sidebar
          user={user}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          onLogout={() => setUser(null)}
        />
      </div>

      {/* Main Content Area */}
      <main className="flex-1 overflow-y-auto p-8 lg:p-10 z-10">
        <div className="max-w-7xl mx-auto">
          {activeTab === 'overview' && <Overview setActiveTab={setActiveTab} />}
          {activeTab === 'products' && <Products />}
          {activeTab === 'orders' && <Orders />}
          {activeTab === 'returns' && <Returns />}
          {activeTab === 'users' && <Users />}
        </div>
      </main>
    </div>
  )
}

export default App
