'use client'

import { useState, useEffect } from 'react'
import { useCart } from '../../cart/CartContext';
import { useParams, useRouter } from 'next/navigation'
import Link from 'next/link'

interface Product {
  id: number
  name: string
  description: string
  price: number
  imageUrl: string
  createdAt: string
  updatedAt: string
}

export default function ProductDetail() {
  const { dispatch } = useCart();
  const params = useParams()
  const router = useRouter()
  const [product, setProduct] = useState<Product | null>(null)
  const [loading, setLoading] = useState(true)
  const [selectedImage, setSelectedImage] = useState('')
  const [quantity, setQuantity] = useState(1)

  useEffect(() => {
    if (params.id) {
      fetchProduct(Number(params.id))
    }
  }, [params.id])

  const fetchProduct = async (id: number) => {
    try {
      const response = await fetch(`/api/products/${id}`)
      if (response.ok) {
        const data = await response.json()
        setProduct(data)
        setSelectedImage(data.imageUrl)
      } else {
        router.push('/')
      }
    } catch (error) {
      console.error('Error fetching product:', error)
      router.push('/')
    } finally {
      setLoading(false)
    }
  }

  const handleAddToCart = () => {
    if (!product) return;
    
    dispatch({
      type: 'ADD_ITEM',
      item: {
        id: String(product.id),
        name: product.name,
        price: product.price,
        imageUrl: product.imageUrl,
      }
    });
  }

  const handleStartOrder = () => {
    console.log('Starting order for:', { product, quantity })
    // TODO: Implement order functionality
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-primary text-xl">Loading product...</div>
      </div>
    )
  }

  if (!product) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-red-500 text-xl">Product not found</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-bg-primary">
      {/* Breadcrumbs */}
      <div className="bg-bg-card border-b border-border py-3 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex text-sm text-text-secondary">
            <Link href="/" className="hover:text-primary transition-colors">
              Home
            </Link>
            <span className="mx-2">/</span>
            <Link href="/" className="hover:text-primary transition-colors">
              Products
            </Link>
            <span className="mx-2">/</span>
            <span className="text-text-primary">{product.name}</span>
          </nav>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Left Column - Product Images */}
          <div className="space-y-6">
            {/* Main Image */}
            <div className="aspect-square bg-bg-card rounded-xl overflow-hidden border border-border shadow-lg">
              <img
                src={selectedImage}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>
            
            {/* Thumbnail Gallery */}
            <div className="flex space-x-4">
              <div 
                className={`w-20 h-20 rounded-lg overflow-hidden border-2 cursor-pointer transition-all ${
                  selectedImage === product.imageUrl 
                    ? 'border-primary' 
                    : 'border-border hover:border-border-hover'
                }`}
                onClick={() => setSelectedImage(product.imageUrl)}
              >
                <img
                  src={product.imageUrl}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
              </div>
              {/* Additional image placeholders - you can extend this */}
              <div className="w-20 h-20 rounded-lg bg-bg-card-alt border-2 border-border flex items-center justify-center text-text-muted text-xs">
                + More
              </div>
            </div>
          </div>

          {/* Right Column - Product Info */}
          <div className="space-y-6">
            {/* Product Title */}
            <div>
              <h1 className="text-3xl font-bold text-text-primary mb-2 leading-tight">
                {product.name}
              </h1>
              <div className="flex items-center space-x-4 text-text-secondary">
                <div className="flex items-center">
                  <span className="text-yellow-400">★★★★★</span>
                  <span className="ml-2">5.0 (0 reviews)</span>
                </div>
                <span>•</span>
                <span>0 sold</span>
              </div>
            </div>

            {/* Shipping Banner */}
            <div className="bg-orange-600/20 border border-orange-600/30 rounded-lg p-4">
              <div className="text-orange-400 font-semibold">
                FREE shipping on orders over $50
              </div>
              <div className="text-orange-300 text-sm mt-1">
                Ready to ship • 2-3 day dispatch
              </div>
            </div>

            {/* Pricing */}
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <span className="text-3xl font-bold text-primary">
                  ${product.price.toFixed(2)}
                </span>
                <span className="text-text-muted line-through">
                  ${(product.price * 1.2).toFixed(2)}
                </span>
                <span className="bg-red-600 text-white text-sm px-2 py-1 rounded">
                  20% OFF
                </span>
              </div>
              
              {/* Quantity Discounts */}
              <div className="bg-bg-card border border-border rounded-lg p-4 shadow-sm">
                <div className="text-text-primary font-medium mb-2">Quantity Discounts:</div>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-text-secondary">1-9 pieces</span>
                    <span className="text-primary font-semibold">${product.price.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-text-secondary">10-49 pieces</span>
                    <span className="text-primary font-semibold">${(product.price * 0.9).toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-text-secondary">50+ pieces</span>
                    <span className="text-primary font-semibold">${(product.price * 0.8).toFixed(2)}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Product Variations */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-text-primary font-medium">Variations</span>
                <button className="text-primary hover:text-primary-hover text-sm font-medium">
                  Select now
                </button>
              </div>
              
              {/* Color Selection */}
              <div>
                <label className="block text-text-primary text-sm mb-2">Color:</label>
                <div className="flex space-x-3">
                  <div className="w-8 h-8 bg-gray-600 rounded-full border-2 border-primary cursor-pointer"></div>
                  <div className="w-8 h-8 bg-blue-600 rounded-full border-2 border-border hover:border-border-hover cursor-pointer"></div>
                  <div className="w-8 h-8 bg-purple-600 rounded-full border-2 border-border hover:border-border-hover cursor-pointer"></div>
                </div>
              </div>

              {/* Quantity Selection */}
              <div>
                <label className="block text-text-primary text-sm mb-2">Quantity:</label>
                <div className="flex items-center space-x-3">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-10 h-10 bg-bg-card border border-border rounded-lg text-text-primary hover:bg-bg-card-alt transition-colors"
                  >
                    -
                  </button>
                  <input
                    type="number"
                    value={quantity}
                    onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                    className="w-20 h-10 bg-bg-card border border-border rounded-lg text-text-primary text-center"
                    min="1"
                  />
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="w-10 h-10 bg-bg-card border border-border rounded-lg text-text-primary hover:bg-bg-card-alt transition-colors"
                  >
                    +
                  </button>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-3">
              <button
                onClick={handleStartOrder}
                className="w-full bg-orange-600 hover:bg-orange-700 text-white font-semibold py-4 px-6 rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
              >
                Start Order
              </button>
              <button
                onClick={handleAddToCart}
                className="w-full bg-neon-blue hover:bg-blue-700 text-white font-semibold py-4 px-6 rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
              >
                Add to Cart
              </button>
              <button className="w-full bg-accent hover:bg-accent-hover text-white font-semibold py-4 px-6 rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5">
                Chat Now
              </button>
            </div>

            {/* Product Description */}
            <div className="bg-bg-card border border-border rounded-lg p-6 shadow-sm">
              <h3 className="text-lg font-semibold text-text-primary mb-3">Product Description</h3>
              <p className="text-text-secondary leading-relaxed">
                {product.description}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
