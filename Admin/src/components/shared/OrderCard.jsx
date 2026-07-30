import { useState, useEffect } from 'react'
import { Mail, Phone, MapPin, Calendar, CreditCard, ChevronDown, ChevronUp, Check, Loader2, Package, User } from 'lucide-react'

export const ORDER_STATUSES = ['processing', 'shipped', 'cancelled', 'delivered']

export const STATUS_STYLES = {
  delivered: 'bg-green-500/10 text-green-800/90 border-green-700/35',
  processing: 'bg-warning/10 text-warning border-warning/30',
  shipped: 'text-blue-900/90 border-blue-400/60 bg-blue-100/70',
  cancelled: 'bg-danger/10 text-danger border-danger/25',
}

export const RETURN_STATUS_STYLES = {
  requested: 'text-primary/80 border-secondary/30 bg-secondary/10',
  approved: 'text-primary/80 border-secondary/30 bg-secondary/10',
  rejected: 'text-primary/80 border-secondary/30 bg-secondary/10',
  returned: 'bg-purple-100 text-purple-700 border-purple-400/70',
}

export const PAYMENT_STYLES = {
  paid: 'bg-green-50 text-green-700 border-green-200',
  completed: 'bg-green-50 text-green-700 border-green-200',
  pending: 'bg-amber-50 text-amber-700 border-amber-200',
  refunded: 'bg-purple-50 text-purple-700 border-purple-200',
  'partially refunded': 'bg-purple-50 text-purple-700 border-purple-200',
  cancelled: 'bg-red-50 text-red-600 border-red-200',
}

export function StatusBadge({ status, isReturn = false }) {
  const styles = isReturn ? RETURN_STATUS_STYLES : STATUS_STYLES
  const style = styles[status] || 'bg-gray-50 text-gray-600 border-gray-200'
  return (
    <span className={`inline-flex items-center px-2 py-px rounded-full text-[10px] font-medium min-w-20 justify-center border capitalize whitespace-nowrap ${style}`}>
      {status}
    </span>
  )
}

// Single item card inside an order card
export function ItemCard({ item, orderId, onUpdated }) {
  const API_URL = import.meta.env.VITE_API_URL
  const [selectedStatus, setSelectedStatus] = useState(item.orderStatus)
  const [selectedRefundStatus, setSelectedRefundStatus] = useState(item.refundStatus || 'none')
  const [saving, setSaving] = useState(false)
  const [savedMsg, setSavedMsg] = useState('')
  const isDirty = selectedStatus !== item.orderStatus || selectedRefundStatus !== (item.refundStatus || 'none')

  // Keep in sync if parent refreshes
  useEffect(() => {
    setSelectedStatus(item.orderStatus)
    setSelectedRefundStatus(item.refundStatus || 'none')
  }, [item.orderStatus, item.refundStatus])

  const handleSave = async () => {
    setSaving(true)
    setSavedMsg('')
    try {
      const res = await fetch(`${API_URL}/admin/orders/${orderId}/items/${item._id}/status`, {
        credentials: 'include',
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          orderStatus: selectedStatus,
          refundStatus: selectedRefundStatus === 'none' ? null : selectedRefundStatus,
        }),
      })
      const data = await res.json()
      if (!res.ok || !data.success) throw new Error(data.message || 'Update failed')
      setSavedMsg('Saved!')
      setTimeout(() => setSavedMsg(''), 2500)
      onUpdated(data.order)
    } catch (err) {
      alert(err.message)
      setSelectedStatus(item.orderStatus) // revert on error
      setSelectedRefundStatus(item.refundStatus || 'none')
    } finally {
      setSaving(false)
    }
  }

  const productImage = item.product?.images?.[0] || item.product?.image || null

  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 bg-bg-main border border-border-custom rounded hover:border-secondary/30 transition-all">
      {/* Product Info */}
      <div className="flex items-center gap-3 flex-1 min-w-0">
        {/* Product Image or Icon */}
        <div className="w-14 h-14 rounded border border-border-custom bg-accent/60 flex items-center justify-center shrink-0 overflow-hidden">
          {productImage
            ? <img src={productImage} alt={item.product?.name} className="w-full h-full object-cover" />
            : <Package className="w-5 h-5 text-text-muted" />
          }
        </div>
        <div className="min-w-0">
          <div className="font-semibold text-text-primary text-sm capitalize truncate">
            {item.product?.name || 'Unknown Product'}
          </div>
          <div className="text-xs text-text-muted mt-0.5">
            {item.quantity} × LKR {item.price.toFixed(2)}
            <span className="mx-1.5 text-border-custom">·</span>
            <span className="font-semibold text-text-secondary">LKR {(item.price * item.quantity).toFixed(2)}</span>
          </div>
          <div className='flex gap-3 mt-0.5'>
            {item.returnStatus && (
              <span className="font-medium text-xs text-text-secondary/70 block mt-0.5">Return Status <span className='capitalize text-orange-700'>( {item.returnStatus} )</span></span>
            )}
            {item.refundStatus && (
              <span className="font-medium text-xs text-text-secondary/70 block mt-0.5">Refund Status <span className='capitalize text-purple-700'>( {item.refundStatus} )</span></span>
            )}
          </div>
        </div>
      </div>

      {/* Current Status Badges */}
      <div className="shrink-0 flex flex-wrap gap-2 items-center">
        <StatusBadge status={item.orderStatus} />
        {/* {item.returnStatus && (
          <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-medium border capitalize bg-purple-50 text-purple-700 border-purple-200">
            Return: {item.returnStatus}
          </span>
        )}
        {item.refundStatus && (
          <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-medium border capitalize ${
            item.refundStatus === 'refunded' ? 'bg-green-50 text-green-700 border-green-200' :
            item.refundStatus === 'pending' ? 'bg-amber-50 text-amber-700 border-amber-200' :
            'bg-red-50 text-red-750 border-red-200'
          }`}>
            Refund: {item.refundStatus}
          </span>
        )} */}
      </div>

      {/* Status Changer */}
      <div className="flex flex-wrap items-center gap-2 shrink-0">
        <div className="relative" title="Order Status">
          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            className="appearance-none pl-3 pr-8 py-2 bg-light border border-border-custom rounded text-text-primary focus:outline-none focus:border-brand-primary focus:ring-2 focus:ring-brand-primary/10 transition-all text-xs font-medium capitalize cursor-pointer"
          >
            {ORDER_STATUSES.map(s => (
              <option key={s} value={s}>{s.charAt(0).toUpperCase() + s.slice(1)}</option>
            ))}
          </select>
          <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 w-3 h-3 text-text-muted pointer-events-none" />
        </div>

        {item.returnStatus && <div className="relative" title="Refund Status">
          <select
            value={selectedRefundStatus}
            onChange={(e) => setSelectedRefundStatus(e.target.value)}
            className="appearance-none pl-3 pr-8 py-2 bg-light border border-border-custom rounded text-text-primary focus:outline-none focus:border-brand-primary focus:ring-2 focus:ring-brand-primary/10 transition-all text-xs font-medium capitalize cursor-pointer"
          >
            <option value="none">No Refund</option>
            <option value="pending">Pending</option>
            <option value="refunded">Refunded</option>
            <option value="rejected">Rejected</option>
          </select>
          <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 w-3 h-3 text-text-muted pointer-events-none" />
        </div>}

        {isDirty && !saving && (
          <button
            onClick={handleSave}
            className="px-3 py-2 bg-brand-primary hover:bg-secondary text-light text-xs font-bold rounded transition-all cursor-pointer flex items-center gap-1.5 shrink-0"
          >
            <Check className="w-3.5 h-3.5" />
            Save
          </button>
        )}
        {saving && <Loader2 className="w-4 h-4 text-brand-primary animate-spin shrink-0" />}
        {savedMsg && !saving && (
          <span className="text-green-600 text-xs font-semibold shrink-0">{savedMsg}</span>
        )}
      </div>
    </div>
  )
}

// Single expandable order card
export function OrderCard({ order, onUpdated }) {
  const API_URL = import.meta.env.VITE_API_URL
  const [expanded, setExpanded] = useState(false)
  const [updatePayment, setUpdatePayment] = useState(order.paymentStatus)
  const [paymentSaving, setPaymentSaving] = useState(false)

  // Keep in sync on re-render
  useEffect(() => {
    setUpdatePayment(order.paymentStatus)
  }, [order.paymentStatus])

  const formatDate = (d) => new Date(d).toLocaleDateString(undefined, {
    year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit'
  })

  // Collect all unique item statuses
  const uniqueStatuses = [...new Set(order.items.map(i => i.orderStatus))]
  const payStyle = PAYMENT_STYLES[order.paymentStatus] || 'bg-accent text-text-secondary border-border-custom'

  const handleUpdatePayment = async () => {
    if (updatePayment === order.paymentStatus) return
    setPaymentSaving(true)
    try {
      const firstItemId = order.items[0]?._id
      if (!firstItemId) throw new Error('No items in order')
      const res = await fetch(`${API_URL}/admin/orders/${order.orderId}/items/${firstItemId}/status`, {
        credentials: 'include',
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ paymentStatus: updatePayment }),
      })
      const data = await res.json()
      if (!res.ok || !data.success) throw new Error(data.message || 'Failed')
      onUpdated(data.order)
    } catch (err) {
      alert(err.message)
    } finally {
      setPaymentSaving(false)
    }
  }

  return (
    <div className="glass-panel rounded overflow-hidden transition-shadow hover:shadow-sm">
      {/* Order Header Row - always visible */}
      <div
        className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-5 cursor-pointer select-none group"
        onClick={() => setExpanded(e => !e)}
      >
        {/* Left: order meta */}
        <div className="flex flex-col sm:flex-row sm:items-center gap-6">
          {/* Order ID + Date */}
          <div className="min-w-0">
            <div className="font-mono text-xs font-bold text-brand-primary">{order.orderId}</div>
            <div className="text-xs text-text-muted mt-0.5 flex items-center gap-1">
              <Calendar className="w-3 h-3" />
              {formatDate(order.createdAt)}
            </div>
          </div>

          <div className="hidden sm:block w-px h-8 bg-border-custom" />

          {/* Customer */}
          <div className="min-w-0">
            <div className="flex items-center gap-1.5">
              <User className="w-3.5 h-3.5 text-text-muted shrink-0" />
              <span className="font-semibold text-text-primary text-sm truncate">{order.user?.name || 'Guest'}</span>
            </div>
            <div className="text-xs text-text-muted truncate">{order.user?.email || 'N/A'}</div>
          </div>

          <div className="hidden sm:block w-px h-8" />
        </div>

        {/* Right: statuses + expand */}
        <div className="flex items-center gap-3 shrink-0">
          {/* Expand toggle */}
          <div className="p-1.5 rounded border border-border-custom bg-accent/40 group-hover:bg-accent transition-colors">
            {expanded
              ? <ChevronUp className="w-4 h-4 text-text-muted" />
              : <ChevronDown className="w-4 h-4 text-text-muted" />
            }
          </div>
        </div>
      </div>

      {/* Expanded Body */}
      {expanded && (
        <div className="border-t border-border-custom">
          {/* Shipping + Customer detail strip */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-0 divide-y sm:divide-y-0 sm:divide-x divide-border-custom bg-accent/30">
            <div className="flex items-center gap-2.5 px-5 py-3.5 text-xs text-text-secondary">
              <Mail className="w-4 h-4 text-brand-primary shrink-0" />
              <div>
                <div className="text-[10px] uppercase font-bold text-text-muted">Email</div>
                <div className="font-medium text-text-primary">{order.user?.email || 'N/A'}</div>
              </div>
            </div>
            <div className="flex items-center gap-2.5 px-5 py-3.5 text-xs text-text-secondary">
              <Phone className="w-4 h-4 text-brand-primary shrink-0" />
              <div>
                <div className="text-[10px] uppercase font-bold text-text-muted">Phone</div>
                <div className="font-medium text-text-primary">{order.shippingAddress?.phoneNo || 'N/A'}</div>
              </div>
            </div>
            <div className="flex items-center gap-2.5 px-5 py-3.5 text-xs text-text-secondary">
              <MapPin className="w-4 h-4 text-brand-primary shrink-0" />
              <div>
                <div className="text-[10px] uppercase font-bold text-text-muted">Address</div>
                <div className="font-medium text-text-primary">
                  {order.shippingAddress
                    ? `${order.shippingAddress.address}, ${order.shippingAddress.city}, ${order.shippingAddress.district}`
                    : 'N/A'}
                </div>
              </div>
            </div>
          </div>

          {/* Items section */}
          <div className="p-5 space-y-2.5">
            <div className="flex items-center justify-between mb-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-text-muted">
                Items — Change Status Individually
              </h4>
              <span className="text-[10px] text-text-muted bg-accent px-2 py-0.5 rounded border border-border-custom">
                {order.items.length} item(s) · LKR {order.totalAmount.toFixed(2)} total
              </span>
            </div>

            <div className="space-y-2">
              {order.items.map((item) => (
                <ItemCard
                  key={item._id}
                  item={item}
                  orderId={order.orderId}
                  onUpdated={onUpdated}
                />
              ))}
            </div>

            <p className="text-[10px] text-text-muted pt-1">
              Select a new status from the dropdown on each item and click <strong>Save</strong> to update individually.
            </p>
          </div>

          {/* Payment footer */}
          <div className="border-t border-border-custom px-5 py-4 bg-accent/20 flex flex-col sm:flex-row sm:items-center gap-3">
            <div className="flex items-center gap-2 text-xs text-text-secondary flex-1">
              <CreditCard className="w-4 h-4 text-brand-primary shrink-0" />
              <span>
                Payment via <strong className="uppercase">{order.paymentMethod}</strong>
              </span>
            </div>
            <div className="flex items-center gap-2 shrink-0">
              <label className="text-xs font-semibold text-text-secondary uppercase tracking-wider whitespace-nowrap">
                Payment:
              </label>
              <div className="relative">
                <select
                  value={updatePayment}
                  onChange={(e) => setUpdatePayment(e.target.value)}
                  className="appearance-none pl-3 pr-8 py-2 bg-light border border-border-custom rounded text-text-primary focus:outline-none focus:border-brand-primary transition-all text-xs font-medium capitalize cursor-pointer"
                >
                  <option value="pending">Pending</option>
                  <option value="paid">Paid</option>
                  <option value="refunded">Refunded</option>
                  <option value="partially refunded">Partially refunded</option>
                  <option value="cancelled">Cancelled</option>
                </select>
                <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 w-3 h-3 text-text-muted pointer-events-none" />
              </div>
              <button
                onClick={handleUpdatePayment}
                disabled={paymentSaving || updatePayment === order.paymentStatus}
                className="px-3 py-2 bg-brand-primary hover:bg-secondary text-light text-xs font-bold rounded transition-all cursor-pointer disabled:opacity-40 flex items-center gap-1.5 shrink-0"
              >
                {paymentSaving ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Check className="w-3.5 h-3.5" />}
                Update
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
