'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function Admin() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    imageUrl: ''
  })
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setMessage('')

    try {
      const response = await fetch('/api/products/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          price: parseFloat(formData.price)
        }),
      })

      if (response.ok) {
        setMessage('Product added successfully!')
        setFormData({ name: '', description: '', price: '', imageUrl: '' })
        setTimeout(() => {
          router.push('/')
        }, 2000)
      } else {
        const error = await response.json()
        setMessage(`Error: ${error.message || 'Failed to add product'}`)
      }
    } catch (error) {
      setMessage('Error: Failed to add product')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container py-8">
        <div className="max-w-4xl mx-auto">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-3xl font-bold text-text-primary">Admin Panel</h1>
              <p className="text-text-secondary mt-2">Manage your store and add new products</p>
            </div>
            <button
              onClick={async () => {
                try {
                  await fetch('/api/admin/logout', { method: 'POST' });
                  router.push('/admin/login');
                } catch (error) {
                  console.error('Logout failed:', error);
                }
              }}
              className="btn-outline text-red-600 border-red-600 hover:bg-red-600 hover:text-white"
            >
              Logout
            </button>
          </div>

          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
            <h2 className="text-xl font-semibold text-text-primary mb-6">Add New Product</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-text-primary mb-2">
                  Product Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg text-text-primary placeholder-text-muted focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                  placeholder="Enter product name"
                />
              </div>

              <div>
                <label htmlFor="description" className="block text-sm font-medium text-text-primary mb-2">
                  Description
                </label>
                <textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  required
                  rows={4}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg text-text-primary placeholder-text-muted focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                  placeholder="Enter product description"
                />
              </div>

              <div>
                <label htmlFor="price" className="block text-sm font-medium text-text-primary mb-2">
                  Price ($)
                </label>
                <input
                  type="number"
                  id="price"
                  name="price"
                  value={formData.price}
                  onChange={handleChange}
                  required
                  step="0.01"
                  min="0"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg text-text-primary placeholder-text-muted focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                  placeholder="0.00"
                />
              </div>

              <div>
                <label htmlFor="imageUrl" className="block text-sm font-medium text-text-primary mb-2">
                  Image URL
                </label>
                <input
                  type="url"
                  id="imageUrl"
                  name="imageUrl"
                  value={formData.imageUrl}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg text-text-primary placeholder-text-muted focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                  placeholder="https://example.com/image.jpg"
                />
              </div>

              {message && (
                <div className={`p-4 rounded-lg ${
                  message.includes('Error') 
                    ? 'bg-red-50 border border-red-200 text-red-700' 
                    : 'bg-green-50 border border-green-200 text-green-700'
                }`}>
                  {message}
                </div>
              )}

              <div className="flex space-x-4">
                <button
                  type="submit"
                  disabled={loading}
                  className="btn-primary flex-1 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? 'Adding Product...' : 'Add Product'}
                </button>
                <button
                  type="button"
                  onClick={() => router.push('/')}
                  className="btn-outline flex-1"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>

          <div className="mt-8 text-center">
            <a href="/" className="text-primary hover:text-primary-hover transition-colors">
              ← Back to Store
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
