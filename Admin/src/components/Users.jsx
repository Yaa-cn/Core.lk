import { useState, useEffect } from 'react'
import { Plus, Search, Trash2, Shield, User, X, Mail, ShieldAlert } from 'lucide-react'
import Modal from './Modal'

function Users() {
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')
  const [roleFilter, setRoleFilter] = useState('all')
  const API_URL = import.meta.env.VITE_API_URL

  // Modals
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    role: 'user',
  })
  const [formError, setFormError] = useState('')
  const [formSubmitting, setFormSubmitting] = useState(false)

  // Fetch Users
  const fetchUsers = async () => {
    try {
      const res = await fetch(API_URL + '/admin/users', { credentials: "include" })
      if (res.ok) {
        const data = await res.json()
        setUsers(data)
      }
    } catch (err) {
      console.error('Error fetching users:', err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchUsers()
  }, [])

  // Handle Form Change
  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  // Open Create Modal
  const openCreateModal = () => {
    setFormData({
      name: '',
      email: '',
      password: '',
      role: 'user',
    })
    setFormError('')
    setIsModalOpen(true)
  }

  // Submit Create User Form
  const handleSubmit = async (e) => {
    e.preventDefault()
    setFormError('')
    setFormSubmitting(true)

    // Validation
    if (!formData.name || !formData.email || !formData.password) {
      setFormError('Please fill out all fields.')
      setFormSubmitting(false)
      return
    }

    try {
      const response = await fetch(API_URL + '/admin/users', {
        credentials: "include",
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.message || 'Failed to create user.')
      }

      await fetchUsers()
      setIsModalOpen(false)
    } catch (err) {
      setFormError(err.message)
    } finally {
      setFormSubmitting(false)
    }
  }

  // Update Role (Promote / Demote)
  const handleUpdateRole = async (userId, currentRole) => {
    const newRole = currentRole === 'admin' ? 'user' : 'admin'
    const actionWord = newRole === 'admin' ? 'promote this user to Admin' : 'demote this user to Customer'

    if (!window.confirm(`Are you sure you want to ${actionWord}?`)) {
      return
    }

    try {
      const response = await fetch(API_URL + `/admin/users/${userId}`, {
        credentials: "include",
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ role: newRole }),
      })

      if (!response.ok) {
        const data = await response.json()
        throw new Error(data.message || 'Failed to update user role')
      }

      await fetchUsers()
    } catch (err) {
      alert(err.message)
    }
  }

  // Delete User
  const handleDeleteUser = async (userId) => {
    if (!window.confirm('Are you sure you want to delete this user? This action cannot be undone.')) {
      return
    }

    try {
      const response = await fetch(API_URL + `/admin/users/${userId}`, {
        credentials: "include",
        method: 'DELETE',
      })

      if (!response.ok) {
        const data = await response.json()
        throw new Error(data.message || 'Failed to delete user')
      }

      await fetchUsers()
    } catch (err) {
      alert(err.message)
    }
  }

  // Filters
  const filteredUsers = users.filter((u) => {
    const matchesSearch = u.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      u.email.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesRole = roleFilter === 'all' || u.role === roleFilter
    return matchesSearch && matchesRole
  })

  // Format Date Helper
  const formatDate = (dateString) => {
    if (!dateString) return 'N/A'
    return new Date(dateString).toLocaleDateString(undefined, {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    })
  }

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold font-display tracking-tight text-text-primary">Accounts</h2>
          <p className="text-text-secondary text-sm mt-1">Manage user database access roles and permissions</p>
        </div>
        <button
          onClick={openCreateModal}
          className="flex items-center justify-center gap-2 px-5 py-3 bg-brand-primary hover:bg-secondary text-light font-semibold rounded transition-all shadow-sm cursor-pointer text-sm"
        >
          <Plus className="w-5 h-5" />
          <span>Create Account</span>
        </button>
      </div>

      {/* Filters Bar */}
      <div className="glass-panel p-4 rounded flex flex-col md:flex-row items-center gap-4">
        <div className="relative flex-1 w-full">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-text-muted" />
          <input
            type="text"
            placeholder="Search accounts by name or email..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-12 pr-4 py-3 bg-light border border-border-custom rounded text-text-primary placeholder:text-text-muted focus:outline-none focus:border-brand-primary focus:ring-2 focus:ring-brand-primary/10 transition-all text-sm"
          />
        </div>
        <div className="flex items-center gap-2 shrink-0 w-full md:w-auto">
          <span className="text-xs font-semibold uppercase tracking-wider text-text-secondary whitespace-nowrap">Role Filter:</span>
          <select
            value={roleFilter}
            onChange={(e) => setRoleFilter(e.target.value)}
            className="w-full md:w-auto px-4 py-3 bg-light border border-border-custom rounded text-text-primary focus:outline-none focus:border-brand-primary focus:ring-2 focus:ring-brand-primary/10 transition-all text-sm capitalize"
          >
            <option value="all">All Roles</option>
            <option value="user">Customers (user)</option>
            <option value="admin">Administrators (admin)</option>
          </select>
        </div>
      </div>

      {/* Users Table */}
      <div className="glass-panel rounded overflow-hidden">
        {loading ? (
          <div className="text-center py-20 text-text-secondary">Loading account database...</div>
        ) : filteredUsers.length === 0 ? (
          <div className="text-center py-20 text-text-muted">No accounts match the criteria.</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-sm">
              <thead>
                <tr className="border-b border-border-custom bg-accent/60 text-text-muted font-semibold">
                  <th className="py-4 pl-6">Profile</th>
                  <th className="py-4">Email</th>
                  <th className="py-4">Role</th>
                  <th className="py-4">Registration Date</th>
                  <th className="py-4 pr-6 text-center w-40">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border-custom/40">
                {filteredUsers.map((u) => {
                  const isAdmin = u.role === 'admin'

                  return (
                    <tr key={u._id} className="hover:bg-accent/50 transition-colors group">
                      <td className="py-4 pl-6">
                        <div className="flex items-center gap-3">
                          <div className={`w-10 h-10 rounded-full flex items-center justify-center border font-bold ${isAdmin
                            ? 'bg-brand-primary/10 border-brand-primary/20 text-brand-primary'
                            : 'bg-accent/60 border-border-custom text-text-secondary'
                            }`}>
                            {u.name ? u.name.charAt(0).toUpperCase() : 'U'}
                          </div>
                          <div>
                            <h4 className="font-semibold text-text-primary group-hover:text-brand-primary transition-colors text-sm m-0">
                              {u.name}
                            </h4>
                          </div>
                        </div>
                      </td>
                      <td className="py-4 text-text-secondary font-mono text-xs">{u.email}</td>
                      <td className="py-4">
                        <span className={`inline-flex items-center justify-center gap-1.5 px-2.5 py-px rounded-full text-[10px] font-semibold border w-14 ${isAdmin
                          ? 'bg-green-500/10 text-green-800/90 border-green-700/35'
                          : 'text-primary/80 border-secondary/30 bg-secondary/10'
                          }`}>
                          <span className="capitalize">{u.role}</span>
                        </span>
                      </td>
                      <td className="py-4 text-text-secondary">{formatDate(u.createdAt)}</td>
                      <td className="py-4 pr-6 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <button
                            onClick={() => handleUpdateRole(u._id, u.role)}
                            className="px-2.5 py-1.5 w-25 bg-accent/60 hover:bg-brand-primary hover:text-light border border-border-custom hover:border-brand-primary text-text-secondary text-xs font-semibold rounded-sm transition-all cursor-pointer"
                          >
                            {isAdmin ? 'Make User' : 'Make Admin'}
                          </button>
                          <button
                            onClick={() => handleDeleteUser(u._id)}
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

      {/* Create User Modal */}
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} maxWidth="max-w-md">
        {/* Modal Header */}
        <div className="p-6 border-b border-border-custom flex items-center justify-between shrink-0">
          <h3 className="text-xl font-bold font-display text-text-primary">Create System Account</h3>
          <button
            onClick={() => setIsModalOpen(false)}
            className="p-1.5 rounded-sm border border-border-custom hover:bg-accent/50 text-text-muted hover:text-text-primary transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body / Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4 flex-1 min-h-0 overflow-y-auto">
          {formError && (
            <div className="flex items-start gap-3 bg-brand-danger/10 border border-brand-danger/25 text-brand-danger p-4 rounded text-sm">
              <ShieldAlert className="w-5 h-5 shrink-0 mt-0.5" />
              <div>{formError}</div>
            </div>
          )}

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-text-secondary mb-2">Account Name</label>
            <input
              type="text"
              name="name"
              required
              value={formData.name}
              onChange={handleInputChange}
              placeholder="e.g. John Doe"
              className="w-full px-4 py-3 bg-light border border-border-custom rounded text-text-primary placeholder:text-text-muted focus:outline-none focus:border-brand-primary transition-all text-sm"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-text-secondary mb-2">Email Address</label>
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-text-muted" />
              <input
                type="email"
                name="email"
                required
                value={formData.email}
                onChange={handleInputChange}
                placeholder="john@example.com"
                className="w-full pl-12 pr-4 py-3 bg-light border border-border-custom rounded text-text-primary placeholder:text-text-muted focus:outline-none focus:border-brand-primary transition-all text-sm"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-text-secondary mb-2">Access Password</label>
            <input
              type="password"
              name="password"
              required
              value={formData.password}
              onChange={handleInputChange}
              placeholder="••••••••"
              className="w-full px-4 py-3 bg-light border border-border-custom rounded text-text-primary placeholder:text-text-muted focus:outline-none focus:border-brand-primary transition-all text-sm"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-text-secondary mb-2">Access Role</label>
            <select
              name="role"
              value={formData.role}
              onChange={handleInputChange}
              className="w-full px-4 py-3 bg-light border border-border-custom rounded text-text-primary focus:outline-none focus:border-brand-primary transition-all text-sm capitalize"
            >
              <option value="user">Customer (user)</option>
              <option value="admin">Administrator (admin)</option>
            </select>
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
                'Register Account'
              )}
            </button>
          </div>
        </form>
      </Modal>
    </div>
  )
}

export default Users
