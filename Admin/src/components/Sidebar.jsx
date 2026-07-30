import { LayoutDashboard, ShoppingBag, Receipt, Users, LogOut, RotateCcw, Truck, CheckCircle, XCircle } from 'lucide-react'

function Sidebar({ user, activeTab, setActiveTab, onLogout }) {
  const API_URL = import.meta.env.VITE_API_URL
  const menuItems = [
    { id: 'overview', name: 'Overview', icon: LayoutDashboard },
    { id: 'products', name: 'Products', icon: ShoppingBag },
    { id: 'orders', name: 'Orders', icon: Receipt },
    { id: 'returns', name: 'Returns', icon: RotateCcw },
    { id: 'users', name: 'Users', icon: Users },
  ]

  const handleLogout = async () => {
    try {
      const response = await fetch(API_URL + '/admin/auth/logout', { credentials: "include", method: 'POST' })
      if (response.ok) {
        onLogout()
      } else {
        console.error('Logout request failed')
      }
    } catch (err) {
      console.error('Error logging out:', err)
    }
  }

  return (
    <aside className="w-64 bg-bg-sidebar border-r border-secondary/30 flex flex-col min-h-screen sticky top-0 shrink-0 z-20">
      <div className="p-6 border-b border-secondary/30 flex items-center gap-3">
        <div className="w-11 h-11 rounded bg-secondary flex items-center justify-center text-light font-extrabold text-xl font-display">
          C
        </div>
        <div className='flex flex-col gap-1 my-auto'>
          <h1 className="text-lg font-bold font-nuni tracking-wide text-light m-0 p-0 leading-none">Core.lk</h1>
          <span className="text-[10px] text-gray font-semibold tracking-widest uppercase">Admin Hub</span>
        </div>
      </div>

      <nav className="flex-1 py-6 px-4 space-y-1.5">
        {menuItems.map((item) => {
          const Icon = item.icon
          const isActive = activeTab === item.id

          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center gap-3.5 px-4 py-3 rounded text-sm font-medium transition-all duration-200 cursor-pointer ${isActive
                ? 'bg-light text-primary shadow-sm'
                : 'text-gray hover:bg-secondary/50 hover:text-light'
                }`}
            >
              <Icon className={`w-5 h-5 shrink-0 ${isActive ? 'text-primary' : 'text-gray'}`} />
              <span>{item.name}</span>
            </button>
          )
        })}
      </nav>

      <div className="p-4 border-t border-secondary/30 bg-secondary/20">
        <div className="flex items-center gap-3 mb-4 p-2">
          <div className="relative">
            <div className="w-10 h-10 rounded-full bg-secondary border border-gray/30 flex items-center justify-center text-light font-bold">
              {user.name ? user.name.charAt(0).toUpperCase() : 'A'}
            </div>
            {/* <div className="absolute -bottom-1 -right-1 bg-light p-0.5 rounded-full border border-bg-sidebar">
              <Crown className="w-2.5 h-2.5 text-primary" />
            </div> */}
          </div>
          <div className="overflow-hidden">
            <h4 className="text-sm font-semibold text-light truncate m-0">{user.name}</h4>
            <span className="text-[10px] text-gray truncate block">{user.email}</span>
          </div>
        </div>

        <button
          onClick={handleLogout}
          className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded border border-gray/40 hover:border-brand-danger/40 hover:bg-brand-danger/10 hover:text-brand-danger text-gray text-sm font-medium transition-all duration-200 cursor-pointer"
        >
          <LogOut className="w-4 h-4" />
          <span>Sign Out</span>
        </button>
      </div>
    </aside>
  )
}

export default Sidebar
