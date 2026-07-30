import { useState, useEffect } from 'react'
import { Plus, Search, Edit2, Trash2, X, Star, FileImage } from 'lucide-react'
import Modal from './Modal'

function Products() {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')
  const [categoryFilter, setCategoryFilter] = useState('all')

  // Modals
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [modalMode, setModalMode] = useState('add') // 'add' | 'edit'
  const [editingId, setEditingId] = useState(null)
  const API_URL = import.meta.env.VITE_API_URL

  // Form State
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    stock: '',
    category: '',
    discount: '0',
    image: '',
    isFeatured: false,
  })
  const [formError, setFormError] = useState('')
  const [formSubmitting, setFormSubmitting] = useState(false)

  // Fetch Products
  const fetchProducts = async () => {
    try {
      const res = await fetch(API_URL + '/api/products')
      if (res.ok) {
        const data = await res.json()
        setProducts(data)
      }
    } catch (err) {
      console.error('Error fetching products:', err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchProducts()
  }, [])

  // Categories list for filter
  const categories = ['all', ...new Set(products.map((p) => p.category))]

  // Generate simple slug
  const generateSlug = (name) => {
    return name
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/[\s_-]+/g, '-')
      .replace(/^-+|-+$/g, '')
  }

  // Handle Form Input Changes
  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }))
  }

  // Open Modal
  const openAddModal = () => {
    setModalMode('add')
    setFormData({
      name: '',
      description: '',
      price: '',
      stock: '',
      category: '',
      discount: '0',
      image: '',
      isFeatured: false,
    })
    setFormError('')
    setIsModalOpen(true)
  }

  const openEditModal = (product) => {
    setModalMode('edit')
    setEditingId(product._id)
    setFormData({
      name: product.name,
      description: product.description,
      price: product.price,
      stock: product.stock,
      category: product.category,
      discount: product.discount || 0,
      image: product.image,
      isFeatured: product.isFeatured || false,
    })
    setFormError('')
    setIsModalOpen(true)
  }

  // Submit Form
  const handleSubmit = async (e) => {
    e.preventDefault()
    setFormError('')
    setFormSubmitting(true)

    // Basic Validation
    if (!formData.name || !formData.price || !formData.stock || !formData.category || !formData.image) {
      setFormError('Please fill out all required fields.')
      setFormSubmitting(false)
      return
    }

    const payload = {
      ...formData,
      price: parseFloat(formData.price),
      stock: parseInt(formData.stock),
      discount: parseFloat(formData.discount),
      slug: generateSlug(formData.name),
    }

    try {
      let response
      if (modalMode === 'add') {
        response = await fetch(API_URL + '/admin/products', {
          credentials: "include",
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        })
      } else {
        response = await fetch(API_URL + `/admin/products/${editingId}`, {
          credentials: "include",
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        })
      }

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.message || 'Operation failed. Please try again.')
      }

      await fetchProducts()
      setIsModalOpen(false)
    } catch (err) {
      setFormError(err.message)
    } finally {
      setFormSubmitting(false)
    }
  }

  // Delete Product
  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this product? This action is permanent.')) {
      return
    }

    try {
      const response = await fetch(API_URL + `/admin/products/${id}`, {
        credentials: "include",
        method: 'DELETE',
      })

      if (!response.ok) {
        const data = await response.json()
        throw new Error(data.message || 'Failed to delete product')
      }

      await fetchProducts()
    } catch (err) {
      alert(err.message)
    }
  }

  // Filter products based on search query and category
  const filteredProducts = products.filter((p) => {
    const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.category.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = categoryFilter === 'all' || p.category === categoryFilter
    return matchesSearch && matchesCategory
  })

  return (
    <div className="relative space-y-8 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold font-display tracking-tight text-text-primary">Catalog</h2>
          <p className="text-text-secondary text-sm mt-1">Manage, add, and inspect e-commerce products</p>
        </div>
        <button
          onClick={openAddModal}
          className="flex items-center justify-center gap-2 px-5 py-3 bg-brand-primary hover:bg-secondary text-light font-semibold rounded transition-all shadow-sm cursor-pointer text-sm"
        >
          <Plus className="w-5 h-5" />
          <span>Add New Product</span>
        </button>
      </div>

      {/* Filters Bar */}
      <div className="glass-panel p-4 rounded flex flex-col md:flex-row items-center gap-4">
        <div className="relative flex-1 w-full">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-text-muted" />
          <input
            type="text"
            placeholder="Search products by name or category..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-12 pr-4 py-3 bg-light border border-border-custom rounded text-text-primary placeholder:text-text-muted focus:outline-none focus:border-brand-primary focus:ring-2 focus:ring-brand-primary/10 transition-all text-sm"
          />
        </div>
        <div className="flex items-center gap-2 shrink-0 w-full md:w-auto">
          <span className="text-xs font-semibold uppercase tracking-wider text-text-secondary whitespace-nowrap">Filter:</span>
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="w-full md:w-auto px-4 py-3 bg-light border border-border-custom rounded text-text-primary focus:outline-none focus:border-brand-primary focus:ring-2 focus:ring-brand-primary/10 transition-all text-sm capitalize"
          >
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Grid/List Table */}
      <div className="glass-panel rounded overflow-hidden">
        {loading ? (
          <div className="text-center py-20 text-text-secondary">Loading product inventory...</div>
        ) : filteredProducts.length === 0 ? (
          <div className="text-center py-20 text-text-muted">No products found matching the criteria.</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-sm">
              <thead>
                <tr className="border-b border-border-custom bg-accent/60 text-text-muted font-semibold">
                  <th className="py-4 pl-6">Product details</th>
                  <th className="py-4 w-32">Category</th>
                  <th className="py-4 w-40">Price</th>
                  <th className="py-4 w-22">Stock</th>
                  <th className="py-4 w-20">Rating</th>
                  <th className="py-4 w-25">Featured</th>
                  <th className="py-4 pr-6 text-center w-20">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border-custom/40">
                {filteredProducts.map((p) => {
                  const isLowStock = p.stock <= 5
                  const isOutOfStock = p.stock === 0

                  return (
                    <tr key={p._id} className="hover:bg-accent/50 transition-colors group">
                      <td className="py-4 pl-6">
                        <div className="flex items-center gap-4">
                          <div className="w-14 h-14 rounded overflow-hidden bg-accent/80 border border-border-custom flex items-center justify-center shrink-0">
                            {p.image ? (
                              <img src={p.image} alt={p.name} className="w-full h-full object-cover" />
                            ) : (
                              <FileImage className="w-6 h-6 text-text-muted" />
                            )}
                          </div>
                          <div>
                            <h4 className="font-semibold text-text-primary group-hover:text-brand-primary transition-colors text-sm m-0 leading-tight">
                              {p.name}
                            </h4>
                            <span className="font-mono text-xs text-text-muted block mt-1">{p.slug}</span>
                          </div>
                        </div>
                      </td>
                      <td className="py-4 text-text-secondary capitalize text-xs">{p.category}</td>
                      <td className="py-4">
                        <div className="font-semibold text-sm text-text-primary">LKR {p.price.toFixed(2)}</div>
                        {/* {p.discount > 0 && (
                          <span className="text-[10px] bg-brand-accent/15 text-brand-accent px-1.5 py-0.5 rounded-sm font-semibold mt-1 inline-block">
                            -{p.discount}% Off
                          </span>
                        )} */}
                      </td>
                      <td className="py-4">
                        <div className={`font-semibold text-sm ${isOutOfStock ? 'text-brand-danger' : isLowStock ? 'text-brand-warning' : 'text-text-primary'}`}>
                          {p.stock} units
                        </div>
                        {isOutOfStock ? (
                          <span className="text-[10px] text-brand-danger font-semibold mt-1 block">Sold Out</span>
                        ) : isLowStock ? (
                          <span className="text-[10px] text-brand-warning font-semibold mt-1 block">Restock Alert</span>
                        ) : (
                          <span className="text-[10px] text-brand-accent font-semibold mt-1 block">Available</span>
                        )}
                      </td>
                      <td className="py-4">
                        <div className="flex items-center gap-1 text-amber-400 font-semibold text-xs">
                          <Star className="w-3 h-3 fill-current" />
                          <span>{p.rating ? p.rating.toFixed(1) : '0.0'}</span>
                        </div>
                      </td>
                      <td className="py-4">
                        <span className={`inline-flex px-2.5 py-px rounded-full text-[10px] font-semibold border ${p.isFeatured
                          ? 'bg-blue-100/70 text-blue-900/80 border-blue-300/80'
                          : 'text-primary/80 border-secondary/30 bg-secondary/10'
                          }`}>
                          {p.isFeatured ? 'Featured' : 'Standard'}
                        </span>
                      </td>
                      <td className="py-4 pr-6 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <button
                            onClick={() => openEditModal(p)}
                            className="p-2 text-text-secondary hover:text-brand-primary hover:bg-brand-primary/10 rounded transition-all cursor-pointer"
                          >
                            <Edit2 className="w-4.5 h-4.5" />
                          </button>
                          <button
                            onClick={() => handleDelete(p._id)}
                            className="p-2 text-text-secondary hover:text-brand-danger hover:bg-brand-danger/10 rounded transition-all cursor-pointer"
                          >
                            <Trash2 className="w-4.5 h-4.5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Add / Edit Modal */}
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} maxWidth="max-w-2xl">
        {/* Modal Header */}
        <div className="p-6 border-b border-border-custom flex items-center justify-between shrink-0">
          <h3 className="text-xl font-bold font-display text-text-primary">
            {modalMode === 'add' ? 'Add Catalog Product' : 'Edit Catalog Product'}
          </h3>
          <button
            onClick={() => setIsModalOpen(false)}
            className="p-1.5 rounded-sm border border-border-custom hover:bg-accent/50 text-text-muted hover:text-text-primary transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body / Form */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-5 p-6 flex-1 min-h-0 overflow-y-auto">
          {formError && (
            <div className="bg-brand-danger/10 border border-brand-danger/25 text-brand-danger px-4 py-3 rounded text-sm">
              {formError}
            </div>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="sm:col-span-2">
              <label className="block text-xs font-semibold uppercase tracking-wider text-text-secondary mb-2">Product Name *</label>
              <input
                type="text"
                name="name"
                required
                value={formData.name}
                onChange={handleInputChange}
                placeholder="e.g. Premium Wireless Headphones"
                className="w-full px-4 py-3 bg-light border border-border-custom rounded text-text-primary placeholder:text-text-muted focus:outline-none focus:border-brand-primary transition-all text-sm"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-text-secondary mb-2">Category *</label>
              <input
                type="text"
                name="category"
                required
                value={formData.category}
                onChange={handleInputChange}
                placeholder="e.g. electronics"
                className="w-full px-4 py-3 bg-light border border-border-custom rounded text-text-primary placeholder:text-text-muted focus:outline-none focus:border-brand-primary transition-all text-sm capitalize"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-text-secondary mb-2">Image URL *</label>
              <input
                type="url"
                name="image"
                required
                value={formData.image}
                onChange={handleInputChange}
                placeholder="https://images.unsplash.com/..."
                className="w-full px-4 py-3 bg-light border border-border-custom rounded text-text-primary placeholder:text-text-muted focus:outline-none focus:border-brand-primary transition-all text-sm"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-text-secondary mb-2">Price (LKR) *</label>
              <input
                type="number"
                name="price"
                required
                min="0"
                step="0.01"
                value={formData.price}
                onChange={handleInputChange}
                placeholder="99.99"
                className="w-full px-4 py-3 bg-light border border-border-custom rounded text-text-primary placeholder:text-text-muted focus:outline-none focus:border-brand-primary transition-all text-sm"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-text-secondary mb-2">Stock Inventory *</label>
              <input
                type="number"
                name="stock"
                required
                min="0"
                value={formData.stock}
                onChange={handleInputChange}
                placeholder="50"
                className="w-full px-4 py-3 bg-light border border-border-custom rounded text-text-primary placeholder:text-text-muted focus:outline-none focus:border-brand-primary transition-all text-sm"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-text-secondary mb-2">Discount (%)</label>
              <input
                type="number"
                name="discount"
                min="0"
                max="100"
                value={formData.discount}
                onChange={handleInputChange}
                placeholder="0"
                className="w-full px-4 py-3 bg-light border border-border-custom rounded text-text-primary placeholder:text-text-muted focus:outline-none focus:border-brand-primary transition-all text-sm"
              />
            </div>

            <div className="flex items-center mt-6">
              <label className="flex items-center gap-3 cursor-pointer select-none">
                <input
                  type="checkbox"
                  name="isFeatured"
                  checked={formData.isFeatured}
                  onChange={handleInputChange}
                  className="w-5 h-5 rounded-sm border-border-custom text-brand-primary focus:ring-brand-primary/20 bg-light transition-all"
                />
                <span className="text-sm text-text-primary font-medium">Highlight as Featured Product</span>
              </label>
            </div>

            <div className="sm:col-span-2">
              <label className="block text-xs font-semibold uppercase tracking-wider text-text-secondary mb-2">Description *</label>
              <textarea
                name="description"
                required
                rows="4"
                value={formData.description}
                onChange={handleInputChange}
                placeholder="Describe the product details, specs, and highlights..."
                className="w-full px-4 py-3 bg-light border border-border-custom rounded text-text-primary placeholder:text-text-muted focus:outline-none focus:border-brand-primary transition-all text-sm resize-none"
              ></textarea>
            </div>
          </div>

          {/* Form Actions Footer */}
          <div className="border-t border-border-custom pt-5 flex items-center justify-end gap-3 bg-transparent">
            <button
              type="button"
              onClick={() => setIsModalOpen(false)}
              className="px-4 py-2.5 rounded border border-border-custom hover:bg-accent/50 text-text-secondary hover:text-text-primary transition-all text-sm font-medium cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={formSubmitting}
              className="px-5 py-2.5 bg-brand-primary hover:bg-secondary text-light font-semibold rounded transition-all shadow-sm flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 text-sm"
            >
              {formSubmitting ? (
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              ) : (
                modalMode === 'add' ? 'Publish Product' : 'Save Changes'
              )}
            </button>
          </div>
        </form>
      </Modal>
    </div>
  )
}

export default Products
