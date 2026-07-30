import { useState, useEffect } from 'react'
import { DollarSign, ShoppingCart, Package, Users, ArrowUpRight, TrendingUp } from 'lucide-react'

function Overview({ setActiveTab }) {
  const [stats, setStats] = useState({
    revenue: 0,
    ordersCount: 0,
    productsCount: 0,
    customersCount: 0,
  })
  const [recentOrders, setRecentOrders] = useState([])
  const [categoryData, setCategoryData] = useState([])
  const [salesTrend, setSalesTrend] = useState([])
  const [loading, setLoading] = useState(true)
  const API_URL = import.meta.env.VITE_API_URL

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [prodRes, userRes, orderRes] = await Promise.all([
          fetch(API_URL + '/api/products'),
          fetch(API_URL + '/admin/users', { credentials: "include" }),
          fetch(API_URL + '/admin/orders', { credentials: "include" }),
        ])

        const products = await prodRes.json()
        const users = await userRes.json()
        const ordersData = await orderRes.json()

        const orders = ordersData.orders || []

        // Calculate Revenue — sum of non-cancelled items across all orders
        const revenue = orders.reduce((total, o) => {
          const orderRevenue = o.items
            .filter(item => item.orderStatus !== 'cancelled')
            .reduce((sum, item) => sum + item.price * item.quantity, 0)
          return total + orderRevenue
        }, 0)

        // Count Customers (users with 'user' role)
        const customersCount = users.filter((u) => u.role === 'user').length

        setStats({
          revenue,
          ordersCount: orders.length,
          productsCount: products.length,
          customersCount,
        })

        // Recent Orders (last 5)
        setRecentOrders(orders.slice(0, 5))

        // Process categories
        const catMap = {}
        products.forEach((p) => {
          catMap[p.category] = (catMap[p.category] || 0) + 1
        })
        const catArray = Object.keys(catMap).map((cat) => ({
          name: cat,
          count: catMap[cat],
          percentage: Math.round((catMap[cat] / products.length) * 100),
        }))
        setCategoryData(catArray)

        // Process Sales Trend (grouped by last 7 days)
        const dayMap = {}
        const days = Array.from({ length: 7 }, (_, i) => {
          const d = new Date()
          d.setDate(d.getDate() - i)
          return d.toISOString().split('T')[0]
        }).reverse()

        days.forEach((day) => {
          dayMap[day] = 0
        })

        orders.forEach((o) => {
          const hasNonCancelledItem = o.items.some(item => item.orderStatus !== 'cancelled')
          if (hasNonCancelledItem) {
            const dateStr = o.createdAt.split('T')[0]
            if (dayMap[dateStr] !== undefined) {
              // Revenue = sum of non-cancelled items
              const orderRevenue = o.items
                .filter(item => item.orderStatus !== 'cancelled')
                .reduce((sum, item) => sum + item.price * item.quantity, 0)
              dayMap[dateStr] += orderRevenue
            }
          }
        })

        const trendArray = days.map((day) => {
          const dateObj = new Date(day)
          return {
            label: dateObj.toLocaleDateString(undefined, { weekday: 'short', day: 'numeric' }),
            value: dayMap[day],
          }
        })
        setSalesTrend(trendArray)
      } catch (err) {
        console.error('Error fetching dashboard statistics:', err)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  if (loading) {
    return (
      <div className="space-y-6 animate-fade-in">
        <h2 className="text-3xl font-bold font-display tracking-tight text-text-primary">Overview</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="h-32 glass-panel rounded animate-pulse"></div>
          ))}
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 h-96 glass-panel rounded animate-pulse"></div>
          <div className="h-96 glass-panel rounded animate-pulse"></div>
        </div>
      </div>
    )
  }

  // Find max value in trend for SVG scaling
  const maxSalesVal = Math.max(...salesTrend.map((t) => t.value), 100)

  // SVG Chart Dimensions
  const chartWidth = 500
  const chartHeight = 200
  const padding = 30

  // Build line points
  const points = salesTrend
    .map((t, idx) => {
      const x = padding + (idx * (chartWidth - padding * 2)) / (salesTrend.length - 1)
      const y = chartHeight - padding - (t.value * (chartHeight - padding * 2)) / maxSalesVal
      return `${x},${y}`
    })
    .join(' ')

  const fillPoints = points
    ? `${padding},${chartHeight - padding} ${points} ${chartWidth - padding},${chartHeight - padding}`
    : ''

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold font-display tracking-tight text-text-primary">Overview Dashboard</h2>
          <p className="text-text-secondary text-sm mt-1">Operational summary</p>
        </div>
        {/* <div className="flex items-center gap-2 text-xs font-semibold px-3 py-1.5 rounded-full bg-accent border border-border-custom text-brand-primary">
          <span className="w-2 h-2 rounded-full bg-brand-primary animate-ping"></span>
          Live Sync Active
        </div> */}
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Sales Card */}
        <div className="glass-panel p-6 rounded relative overflow-hidden group hover:border-secondary/30 transition-all duration-300">
          <div className="absolute top-0 right-0 w-24 h-24 bg-accent/60 rounded-bl-full pointer-events-none group-hover:bg-accent transition-colors"></div>
          <div className="flex items-center justify-between mb-4">
            <span className="text-xs font-bold uppercase tracking-wider text-text-secondary">Total Revenue</span>
            <div className="p-2.5 rounded bg-accent border border-border-custom text-brand-primary">
              <DollarSign className="w-5 h-5" />
            </div>
          </div>
          <h3 className="text-2xl font-bold font-display text-text-primary">LKR {stats.revenue.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</h3>
          <p className="text-xs text-text-muted mt-2 flex items-center gap-1.5">
            {/* <span className="text-brand-accent flex items-center font-medium"><ArrowUpRight className="w-3.5 h-3.5" /> +12.4%</span> */}
            From checkouts
          </p>
        </div>

        {/* Orders Card */}
        <div className="glass-panel p-6 rounded relative overflow-hidden group hover:border-secondary/30 transition-all duration-300">
          <div className="absolute top-0 right-0 w-24 h-24 bg-accent/60 rounded-bl-full pointer-events-none group-hover:bg-accent transition-colors"></div>
          <div className="flex items-center justify-between mb-4">
            <span className="text-xs font-bold uppercase tracking-wider text-text-secondary">Total Orders</span>
            <div className="p-2.5 rounded bg-accent border border-border-custom text-secondary">
              <ShoppingCart className="w-5 h-5" />
            </div>
          </div>
          <h3 className="text-2xl font-bold font-display text-text-primary">{stats.ordersCount}</h3>
          <p className="text-xs text-text-muted mt-2 flex items-center gap-1.5">
            {/* <span className="text-brand-accent flex items-center font-medium"><ArrowUpRight className="w-3.5 h-3.5" /> +8.1%</span> */}
            From checkouts
          </p>
        </div>

        {/* Products Card */}
        <div className="glass-panel p-6 rounded relative overflow-hidden group hover:border-secondary/30 transition-all duration-300">
          <div className="absolute top-0 right-0 w-24 h-24 bg-accent/60 rounded-bl-full pointer-events-none group-hover:bg-accent transition-colors"></div>
          <div className="flex items-center justify-between mb-4">
            <span className="text-xs font-bold uppercase tracking-wider text-text-secondary">Products Active</span>
            <div className="p-2.5 rounded bg-accent border border-border-custom text-brand-accent">
              <Package className="w-5 h-5" />
            </div>
          </div>
          <h3 className="text-2xl font-bold font-display text-text-primary">{stats.productsCount}</h3>
          <p className="text-xs text-text-muted mt-2">Inventory catalog items</p>
        </div>

        {/* Customers Card */}
        <div className="glass-panel p-6 rounded relative overflow-hidden group hover:border-secondary/30 transition-all duration-300">
          <div className="absolute top-0 right-0 w-24 h-24 bg-accent/60 rounded-bl-full pointer-events-none group-hover:bg-accent transition-colors"></div>
          <div className="flex items-center justify-between mb-4">
            <span className="text-xs font-bold uppercase tracking-wider text-text-secondary">Registered Customers</span>
            <div className="p-2.5 rounded bg-accent border border-border-custom text-secondary">
              <Users className="w-5 h-5" />
            </div>
          </div>
          <h3 className="text-2xl font-bold font-display text-text-primary">{stats.customersCount}</h3>
          <p className="text-xs text-text-muted mt-2 flex items-center gap-1.5">
            {/* <span className="text-brand-accent flex items-center font-medium"><ArrowUpRight className="w-3.5 h-3.5" /> +4.2%</span> */}
            Signups
          </p>
        </div>
      </div>

      {/* Charts & Categorization Breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Sales Chart Container */}
        <div className="lg:col-span-2 glass-panel p-6 rounded flex flex-col">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-brand-primary" />
              <h4 className="font-bold font-display text-text-primary">Sales Velocity (Last 7 Days)</h4>
            </div>
            <span className="text-xs text-text-muted">Filtered: Completed Orders</span>
          </div>

          <div className="flex-1 w-full relative">
            <svg viewBox={`0 0 ${chartWidth} ${chartHeight}`} className="w-full h-full overflow-visible">
              {/* Gradients */}
              <defs>
                <linearGradient id="chartGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#323031" stopOpacity="0.15" />
                  <stop offset="100%" stopColor="#323031" stopOpacity="0.0" />
                </linearGradient>
              </defs>

              {/* Grid Lines */}
              {[...Array(4)].map((_, i) => {
                const yVal = padding + (i * (chartHeight - padding * 2)) / 3
                return (
                  <line
                    key={i}
                    x1={padding}
                    y1={yVal}
                    x2={chartWidth - padding}
                    y2={yVal}
                    stroke="rgba(50,48,49,0.08)"
                    strokeWidth="1"
                    strokeDasharray="4 4"
                  />
                )
              })}

              {/* Area */}
              {fillPoints && <polygon points={fillPoints} fill="url(#chartGradient)" />}

              {/* Path Line */}
              {points && (
                <polyline
                  points={points}
                  fill="none"
                  stroke="#323031"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              )}

              {/* Dots */}
              {salesTrend.map((t, idx) => {
                const x = padding + (idx * (chartWidth - padding * 2)) / (salesTrend.length - 1)
                const y = chartHeight - padding - (t.value * (chartHeight - padding * 2)) / maxSalesVal
                return (
                  <g key={idx} className="group/dot cursor-pointer">
                    <circle
                      cx={x}
                      cy={y}
                      r="4"
                      fill="#f8f9fa"
                      stroke="#323031"
                      strokeWidth="2"
                      className="transition-all group-hover/dot:r-6"
                    />
                    {/* Tooltip on hover */}
                    <title>{`${t.label}: $${t.value}`}</title>
                  </g>
                )
              })}

              {/* Labels X Axis */}
              {salesTrend.map((t, idx) => {
                const x = padding + (idx * (chartWidth - padding * 2)) / (salesTrend.length - 1)
                return (
                  <text
                    key={idx}
                    x={x}
                    y={chartHeight - 8}
                    fill="var(--text-muted)"
                    fontSize="9"
                    textAnchor="middle"
                  >
                    {t.label}
                  </text>
                )
              })}
            </svg>
          </div>
        </div>

        {/* Category Breakdown Card */}
        <div className="glass-panel p-6 rounded flex flex-col justify-between">
          <div>
            <h4 className="font-bold font-display text-text-primary mb-6">Catalog Breakdown</h4>
            <div className="space-y-4">
              {categoryData.length === 0 ? (
                <div className="text-center py-10 text-text-muted text-sm">No category distribution data</div>
              ) : (
                categoryData.map((cat, idx) => {
                  const barColors = [
                    'bg-brand-primary',
                    'bg-secondary',
                    'bg-gray',
                    'bg-brand-accent',
                    'bg-brand-primary/70',
                  ]
                  // const color = barColors[idx % barColors.length]
                  const color = 'bg-brand-primary'

                  return (
                    <div key={idx} className="space-y-1.5">
                      <div className="flex items-center justify-between text-xs font-semibold">
                        <span className="text-text-primary capitalize">{cat.name}</span>
                        <span className="text-text-secondary">{cat.count} items ({cat.percentage}%)</span>
                      </div>
                      <div className="h-2 w-full bg-accent rounded-full overflow-hidden">
                        <div className={`h-full ${color} rounded-full`} style={{ width: `${cat.percentage}%` }}></div>
                      </div>
                    </div>
                  )
                })
              )}
            </div>
          </div>
          <div className="text-center border-t border-border-custom pt-4 mt-4 text-[10px] text-text-muted uppercase tracking-wider font-semibold">
            Product Portfolio Distribution
          </div>
        </div>
      </div>

      {/* Recent Items List */}
      <div className="glass-panel rounded p-6">
        <div className="flex items-center justify-between mb-6">
          <h4 className="font-bold font-display text-text-primary">Recent Order Items</h4>
          <button
            onClick={() => setActiveTab('orders')}
            className="text-xs font-semibold text-brand-primary hover:text-brand-primary/80 transition-colors flex items-center gap-1 cursor-pointer"
          >
            Manage All Orders <ArrowUpRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {recentOrders.length === 0 ? (
          <div className="text-center py-10 text-text-muted text-sm">No orders registered yet.</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-sm">
              <thead>
                <tr className="border-b border-border-custom text-text-muted font-semibold">
                  <th className="pb-3 pl-2 w-40">Order ID</th>
                  <th className="pb-3">Customer</th>
                  <th className="pb-3 w-90">Product / Qty</th>
                  <th className="pb-3">Subtotal</th>
                  <th className="pb-3">Item Status</th>
                  <th className="pb-3 w-fit">Payment</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border-custom/40">
                {recentOrders.flatMap((o) => {
                  return o.items.map((item, idx) => {
                    const statusColors = {
                      delivered: 'bg-green-500/10 text-green-800/90 border-green-700/35',
                      processing: 'bg-warning/10 text-warning border-warning/30',
                      shipped: 'text-blue-900/90 border-blue-400/60 bg-blue-100/70',
                      cancelled: 'bg-danger/10 text-danger border-danger/25',
                    }

                    const badgeStyle = statusColors[item.orderStatus] || 'bg-accent text-text-primary'
                    const payStyle = o.paymentStatus === 'completed' || o.paymentStatus === 'paid' ? 'bg-green-500/10 text-green-800/90 border-green-700/35'
                      : o.paymentStatus === 'pending'
                        ? 'bg-warning/10 text-warning border-warning/30'
                        : o.paymentStatus === 'cancelled' ? 'bg-danger/10 text-danger border-danger/25' : 'text-primary/80 border-secondary/30 bg-secondary/10'

                    return (
                      <tr key={`${o.orderId}-${item._id || idx}`} className="hover:bg-accent/50 transition-colors">
                        <td className="py-3.5 pl-2 font-mono text-xs font-semibold text-brand-primary">
                          <div>{o.orderId.split('-').slice(0, 2).join('-')}...</div>
                          <div className="text-[10px] text-text-muted font-normal font-sans">
                            {new Date(o.createdAt).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}
                          </div>
                        </td>
                        <td className="py-3.5">
                          <div className="font-medium text-text-primary text-xs">{o.user?.name || 'Guest'}</div>
                          <div className="text-[10px] text-text-muted">{o.user?.email || 'N/A'}</div>
                        </td>
                        <td className="py-3.5 text-text-secondary text-xs">
                          <div className="font-medium text-text-primary capitalize">{item.product?.name || 'Unknown Product'}</div>
                          <div className="text-[10px] text-text-muted">Qty: {item.quantity} × LKR {item.price.toFixed(2)}</div>
                        </td>
                        <td className="py-3.5 font-semibold text-text-primary text-xs">
                          LKR {(item.price * item.quantity).toFixed(2)}
                        </td>
                        <td className="py-3.5">
                          <span className={`inline-flex min-w-20 justify-center items-center px-2 py-px rounded-full text-[10px] font-medium border capitalize ${badgeStyle}`}>
                            {item.orderStatus}
                          </span>
                        </td>
                        <td className="py-3.5">
                          <span className={`inline-flex min-w-20 justify-center items-center px-2 py-px rounded-full text-[10px] capitalize font-medium border ${payStyle}`}>
                            {o.paymentStatus}
                          </span>
                        </td>
                      </tr>
                    )
                  })
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  )
}

export default Overview
