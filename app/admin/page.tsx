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
    <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="text-center mb-8">
        <h1 className="section-title">Admin Panel</h1>
        <p className="section-subtitle">Add new products to your store</p>
      </div>

      <div className="card p-8">
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
              className="w-full px-3 py-2 bg-bg-card border border-border rounded-lg text-text-primary placeholder-text-muted focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
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
              className="w-full px-3 py-2 bg-bg-card border border-border rounded-lg text-text-primary placeholder-text-muted focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
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
              className="w-full px-3 py-2 bg-bg-card border border-border rounded-lg text-text-primary placeholder-text-muted focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
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
              className="w-full px-3 py-2 bg-bg-card border border-border rounded-lg text-text-primary placeholder-text-muted focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              placeholder="https://example.com/image.jpg"
            />
          </div>

          {message && (
            <div className={`p-4 rounded-lg ${
              message.includes('Error') 
                ? 'bg-red-900/20 border border-red-700 text-red-300' 
                : 'bg-green-900/20 border border-green-700 text-green-300'
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
              className="px-6 py-2 border border-border text-text-secondary rounded-lg hover:border-primary hover:text-primary transition-colors"
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
  )
}
