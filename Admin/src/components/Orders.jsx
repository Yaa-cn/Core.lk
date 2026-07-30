import { useState, useEffect } from 'react'
import { Search, Loader2, Package, RefreshCw } from 'lucide-react'
import { OrderCard, ORDER_STATUSES } from './shared/OrderCard'

function Orders() {
  const API_URL = import.meta.env.VITE_API_URL
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')
  const [statusTab, setStatusTab] = useState('all')

  const fetchOrders = async () => {
    setLoading(true)
    try {
      const res = await fetch(API_URL + '/admin/orders', { credentials: 'include' })
      if (res.ok) {
        const data = await res.json()
        setOrders(data.orders || [])
      }
    } catch (err) {
      console.error('Error fetching admin orders:', err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { fetchOrders() }, [])

  // When an item inside an order is updated, replace that order in state
  const handleOrderUpdated = (updatedOrder) => {
    setOrders(prev => prev.map(o => o.orderId === updatedOrder.orderId ? updatedOrder : o))
  }

  const filteredOrders = orders.filter((o) => {
    const q = searchQuery.toLowerCase()
    const matchesSearch =
      o.orderId.toLowerCase().includes(q) ||
      (o.user?.name || '').toLowerCase().includes(q) ||
      (o.user?.email || '').toLowerCase().includes(q)
    const matchesStatus =
      statusTab === 'all' ||
      (statusTab === 'returned'
        ? o.items.some(item => item.returnStatus === 'returned')
        : o.items.some(item => item.orderStatus === statusTab))
    return matchesSearch && matchesStatus
  })

  const tabs = [
    { id: 'all', label: 'All Orders' },
    { id: 'processing', label: 'New (Processing)' },
    { id: 'shipped', label: 'Shipped' },
    { id: 'delivered', label: 'Delivered' },
    { id: 'returned', label: 'Returned' },
    { id: 'cancelled', label: 'Cancelled' },
  ]

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Header */}
      <div className="flex items-start justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold font-display tracking-tight text-text-primary">Manage Orders</h2>
          <p className="text-text-secondary text-sm mt-1">
            Expand any order to manage each item's fulfillment status individually
          </p>
        </div>
        <div className="flex items-center gap-3 shrink-0">
          <span className="text-xs text-text-muted bg-accent px-3 py-1.5 rounded border border-border-custom font-semibold">
            {filteredOrders.length} order(s)
          </span>
          <button
            onClick={fetchOrders}
            className="p-2 rounded border border-border-custom hover:bg-accent/60 text-text-muted hover:text-text-primary transition-all cursor-pointer"
            title="Refresh"
          >
            <RefreshCw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Segmented Controls / Tabs */}
      <div className="flex overflow-x-auto gap-2 p-1 bg-accent/30 rounded border border-border-custom">
        {tabs.map(tab => (
          <button
            key={tab.id}
            onClick={() => setStatusTab(tab.id)}
            className={`px-4 py-2 text-sm font-semibold rounded whitespace-nowrap transition-all cursor-pointer ${
              statusTab === tab.id
                ? 'bg-light text-primary shadow-sm border border-border-custom/50'
                : 'text-text-secondary hover:text-text-primary hover:bg-accent/60'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Filters */}
      <div className="glass-panel p-4 rounded flex flex-col md:flex-row items-center gap-4">
        <div className="relative flex-1 w-full">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-text-muted" />
          <input
            type="text"
            placeholder="Search by Order ID, customer name or email..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-12 pr-4 py-3 bg-light border border-border-custom rounded text-text-primary placeholder:text-text-muted focus:outline-none focus:border-brand-primary focus:ring-2 focus:ring-brand-primary/10 transition-all text-sm"
          />
        </div>
      </div>

      {/* Orders List */}
      {loading ? (
        <div className="flex items-center justify-center gap-3 py-24 text-text-secondary">
          <Loader2 className="w-6 h-6 animate-spin" />
          <span>Loading orders...</span>
        </div>
      ) : filteredOrders.length === 0 ? (
        <div className="glass-panel rounded flex flex-col items-center justify-center py-24 gap-3 text-center">
          <Package className="w-10 h-10 text-text-muted" />
          <div>
            <h3 className="font-semibold text-text-primary">No orders found</h3>
            <p className="text-sm text-text-muted mt-1">Try a different search term or tab.</p>
          </div>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredOrders.map(order => (
            <OrderCard
              key={order.orderId}
              order={order}
              onUpdated={handleOrderUpdated}
            />
          ))}
        </div>
      )}
    </div>
  )
}

export default Orders
