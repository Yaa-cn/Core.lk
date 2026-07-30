import { useState, useEffect } from 'react'
import { RotateCcw, CheckCircle, XCircle, Search, Package, User, Calendar, CreditCard, Loader2, RefreshCw } from 'lucide-react'

const PAYMENT_STYLES = {
  paid: 'bg-green-50 text-green-700 border-green-200',
  completed: 'bg-green-50 text-green-700 border-green-200',
  pending: 'bg-amber-50 text-amber-700 border-amber-200',
  refunded: 'bg-purple-50 text-purple-700 border-purple-200',
  cancelled: 'bg-red-50 text-red-600 border-red-200',
}

function Returns() {
  const API_URL = import.meta.env.VITE_API_URL
  const [returnItems, setReturnItems] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')
  const [actionLoading, setActionLoading] = useState({}) // itemId -> true/false

  // Confirmation state
  const [confirmAction, setConfirmAction] = useState(null) // { item, action }

  const fetchReturns = async () => {
    setLoading(true)
    try {
      const res = await fetch(API_URL + '/admin/orders/returns', {
        credentials: 'include',
      })
      if (res.ok) {
        const data = await res.json()
        setReturnItems(data.returnItems || [])
      }
    } catch (err) {
      console.error('Error fetching return requests:', err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchReturns()
  }, [])

  const handleAction = async (item, action) => {
    const key = `${item.orderId}-${item.itemId}`
    setActionLoading(prev => ({ ...prev, [key]: true }))
    setConfirmAction(null)

    try {
      const res = await fetch(`${API_URL}/admin/orders/${item.orderId}/items/${item.itemId}/return-action`, {
        credentials: 'include',
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action }),
      })
      const data = await res.json()
      if (!res.ok || !data.success) throw new Error(data.message || 'Action failed')

      // Find the updated item from the returned order
      const updatedItem = data.order?.items?.find(i => String(i._id) === String(item.itemId))

      // Update the processed item in the list instead of removing it
      setReturnItems(prev => prev.map(i => {
        if (i.orderId === item.orderId && String(i.itemId) === String(item.itemId)) {
          return {
            ...i,
            returnStatus: updatedItem ? updatedItem.returnStatus : i.returnStatus,
            refundStatus: updatedItem ? updatedItem.refundStatus : i.refundStatus,
          }
        }
        return i
      }))
    } catch (err) {
      alert(err.message)
    } finally {
      setActionLoading(prev => ({ ...prev, [key]: false }))
    }
  }

  const formatDate = (dateString) => {
    const date = new Date(dateString)
    return date.toLocaleDateString(undefined, {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    })
  }

  const filtered = returnItems.filter(item => {
    const q = searchQuery.toLowerCase()
    return (
      item.orderId.toLowerCase().includes(q) ||
      (item.user?.name || '').toLowerCase().includes(q) ||
      (item.user?.email || '').toLowerCase().includes(q) ||
      (item.product?.name || '').toLowerCase().includes(q)
    )
  })

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Header */}
      <div className="flex items-start justify-between gap-4">
        <div>
          <div className="flex items-center gap-3">

            <h2 className="text-3xl font-bold font-display tracking-tight text-text-primary">Return Requests</h2>
          </div>
          <p className="text-text-secondary text-sm mt-2">
            Items customers have requested to return. Accept to process a refund or reject to restore delivery status.
          </p>
        </div>
        <div className="flex items-center gap-3 shrink-0">
          {returnItems.filter(i => i.returnStatus === 'requested' || i.returnStatus === 'approved').length > 0 && (
            <span className="px-3 py-px bg-orange-50 border border-orange-200 text-orange-700 text-[10px] font-semibold rounded-full">
              {returnItems.filter(i => i.returnStatus === 'requested' || i.returnStatus === 'approved').length} &nbsp; Pending
            </span>
          )}
          <button
            onClick={fetchReturns}
            className="p-2 rounded border border-border-custom hover:bg-accent/60 text-text-muted hover:text-text-primary transition-all cursor-pointer"
            title="Refresh"
          >
            <RefreshCw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Search */}
      <div className="glass-panel p-4 rounded">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-text-muted" />
          <input
            type="text"
            placeholder="Search by order ID, customer name, email, or product..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-12 pr-4 py-3 bg-light border border-border-custom rounded text-text-primary placeholder:text-text-muted focus:outline-none focus:border-brand-primary focus:ring-2 focus:ring-brand-primary/10 transition-all text-sm"
          />
        </div>
      </div>

      {/* Content */}
      {loading ? (
        <div className="glass-panel rounded p-20 flex items-center justify-center gap-3 text-text-secondary">
          <Loader2 className="w-6 h-6 animate-spin" />
          <span>Loading return requests...</span>
        </div>
      ) : filtered.length === 0 ? (
        <div className="glass-panel rounded p-20 flex flex-col items-center justify-center gap-4 text-center">
          <div>
            <h3 className="font-semibold text-text-primary">
              {searchQuery ? 'No results found' : 'No pending return requests'}
            </h3>
            <p className="text-sm text-text-muted mt-1">
              {searchQuery ? 'Try a different search term.' : 'All return requests have been processed.'}
            </p>
          </div>
        </div>
      ) : (
        <div className="space-y-4">
          {filtered.map((item) => {
            const key = `${item.orderId}-${item.itemId}`
            const isLoading = actionLoading[key]
            const payStyle = PAYMENT_STYLES[item.paymentStatus] || 'bg-accent text-text-secondary border-border-custom'

            return (
              <div
                key={key}
                className="glass-panel rounded overflow-hidden border-l-4 border-l-orange-400 hover:shadow-sm transition-shadow"
              >
                <div className="p-5">
                  <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                    {/* Left: Info */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 flex-1">
                      {/* Order Info */}
                      <div className="flex items-start gap-2.5">
                        <div className="w-8 h-8 rounded bg-accent/60 border border-border-custom flex items-center justify-center shrink-0 mt-0.5">
                          <Package className="w-4 h-4 text-brand-primary" />
                        </div>
                        <div>
                          <div className="text-[10px] text-text-muted uppercase font-bold tracking-wider">Order / Product</div>
                          <div className="font-mono text-xs font-semibold text-brand-primary">{item.orderId}</div>
                          <div className="font-medium text-text-primary text-sm capitalize mt-0.5">
                            {item.product?.name || 'Unknown Product'}
                          </div>
                          <div className="text-xs text-text-muted">
                            Qty: {item.quantity} · LKR {(item.price * item.quantity).toFixed(2)}
                          </div>
                        </div>
                      </div>

                      {/* Customer */}
                      <div className="flex items-start gap-2.5">
                        <div className="w-8 h-8 rounded bg-accent/60 border border-border-custom flex items-center justify-center shrink-0 mt-0.5">
                          <User className="w-4 h-4 text-brand-primary" />
                        </div>
                        <div>
                          <div className="text-[10px] text-text-muted uppercase font-bold tracking-wider">Customer</div>
                          <div className="font-medium text-text-primary text-sm">{item.user?.name || 'Unknown'}</div>
                          <div className="text-xs text-text-muted truncate max-w-40">{item.user?.email || 'N/A'}</div>
                        </div>
                      </div>

                      {/* Date */}
                      <div className="flex items-start gap-2.5">
                        <div className="w-8 h-8 rounded bg-accent/60 border border-border-custom flex items-center justify-center shrink-0 mt-0.5">
                          <Calendar className="w-4 h-4 text-brand-primary" />
                        </div>
                        <div>
                          <div className="text-[10px] text-text-muted uppercase font-bold tracking-wider">Order Date</div>
                          <div className="font-medium text-text-primary text-sm">{formatDate(item.createdAt)}</div>
                        </div>
                      </div>

                      {/* Payment */}
                      <div className="flex items-start gap-2.5">
                        <div className="w-8 h-8 rounded bg-accent/60 border border-border-custom flex items-center justify-center shrink-0 mt-0.5">
                          <CreditCard className="w-4 h-4 text-brand-primary" />
                        </div>
                        <div>
                          <div className="text-[10px] text-text-muted uppercase font-bold tracking-wider">Payment</div>
                          <div className="font-medium text-text-primary text-sm uppercase">{item.paymentMethod}</div>
                          {/* <span className={`inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-semibold border capitalize ${payStyle} mt-0.5`}>
                            {item.paymentStatus}
                          </span> */}
                        </div>
                      </div>
                    </div>

                    {/* Right: Actions */}
                    <div className="flex items-center gap-2 shrink-0 lg:flex-col lg:items-stretch">
                      {isLoading ? (
                        <div className="flex items-center justify-center p-3">
                          <Loader2 className="w-5 h-5 text-brand-primary animate-spin" />
                        </div>
                      ) : confirmAction?.item === item ? (
                        <div className="flex flex-col gap-2 p-3 bg-accent/60 rounded border border-border-custom">
                          <p className="text-xs font-semibold text-text-primary text-center">
                            {confirmAction.action === 'accept' ? '✓ Approve Return' : confirmAction.action === 'reject' ? '✗ Reject Return?' : '✓ Mark Returned'}
                          </p>
                          <p className="text-[10px] text-text-muted text-center">
                            {confirmAction.action === 'reject' ? 'Status will be "Return Rejected"' : confirmAction.action === 'accept' ? 'Status will be "Return Approved"' : 'Status will be "Returned"'}
                          </p>
                          <div className="flex gap-2">
                            <button
                              onClick={() => handleAction(item, confirmAction.action)}
                              className={`flex-1 px-3 py-1.5 text-xs font-bold rounded transition-all cursor-pointer text-light ${confirmAction.action === 'reject' ? 'bg-red-500 hover:bg-red-600' : 'bg-green-600 hover:bg-green-700'}`}
                            >
                              Confirm
                            </button>
                            <button
                              onClick={() => setConfirmAction(null)}
                              className="flex-1 px-3 py-1.5 text-xs font-medium rounded border border-border-custom hover:bg-accent/50 text-text-secondary transition-all cursor-pointer"
                            >
                              Cancel
                            </button>
                          </div>
                        </div>
                      ) : (
                        <>
                          {item.returnStatus === 'requested' && (
                            <>
                              <button
                                onClick={() => setConfirmAction({ item, action: 'accept' })}
                                className="flex items-center gap-2 px-4 py-2.5 bg-green-600 hover:bg-green-700 text-white text-xs font-bold rounded transition-all cursor-pointer"
                              >
                                <CheckCircle className="w-4 h-4" />
                                Approve Request
                              </button>
                              <button
                                onClick={() => setConfirmAction({ item, action: 'reject' })}
                                className="flex items-center gap-2 px-4 py-2.5 bg-red-50 hover:bg-red-100 border border-red-200 text-red-600 text-xs font-bold rounded transition-all cursor-pointer"
                              >
                                <XCircle className="w-4 h-4" />
                                Reject Request
                              </button>
                            </>
                          )}
                          {item.returnStatus === 'approved' && (
                            <button
                              onClick={() => setConfirmAction({ item, action: 'return' })}
                              className="flex items-center gap-2 px-4 py-2.5 bg-brand-primary hover:bg-brand-primary/90 text-white text-xs font-bold rounded transition-all cursor-pointer"
                            >
                              <CheckCircle className="w-4 h-4" />
                              Mark as Returned
                            </button>
                          )}
                          {(item.returnStatus === 'returned' || item.returnStatus === 'rejected') && (
                            <div className="px-4 py-2.5 bg-gray-100 text-gray-500 text-xs font-bold rounded text-center capitalize">
                              {item.returnStatus}
                            </div>
                          )}
                        </>
                      )}
                    </div>
                  </div>

                  {/* Return request notice */}
                  <div className="mt-4 pt-4 border-t border-border-custom/50">
                    <div className="flex items-center justify-between gap-2 text-xs text-orange-600 w-full">
                      <div className="flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-orange-400 animate-pulse shrink-0" />
                        <span className="font-semibold capitalize">{item.returnStatus}</span>
                        <span className="text-text-muted "> Customer return status <span className='capitalize'>( {item.returnStatus} )</span></span>
                      </div>
                      {item.refundStatus && (
                        <span className='text-xs text-primary/80'> Refund Status &nbsp;
                          <span className={` capitalize ${item.refundStatus === 'refunded' ? ' text-green-700' :
                            item.refundStatus === 'pending' ? ' text-amber-700 ' :
                              ' text-red-700 '
                            }`}>
                            ( {item.refundStatus} )
                          </span>
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}

export default Returns
