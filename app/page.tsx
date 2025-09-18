'use client'

import { useState, useEffect } from 'react'
import { useCart } from './cart/CartContext';
import Link from 'next/link'

interface Product {
  id: number
  name: string
  description: string
  price: number
  imageUrl: string
}

interface AIProduct {
  id: number
  name: string
  description: string
  price: number
  imageUrl: string
}

export default function Home() {
  const { dispatch } = useCart();
  const [products, setProducts] = useState<Product[]>([])
  const [aiProducts, setAiProducts] = useState<AIProduct[]>([])
  const [loading, setLoading] = useState(true)
  const [aiLoading, setAiLoading] = useState(true)

  useEffect(() => {
    fetchProducts()
    fetchAIProducts()
  }, [])

  const fetchProducts = async () => {
    try {
      const response = await fetch('/api/products')
      const data = await response.json()
      setProducts(data)
    } catch (error) {
      console.error('Error fetching products:', error)
    } finally {
      setLoading(false)
    }
  }

  const fetchAIProducts = async () => {
    try {
      const response = await fetch('/api/ai-products')
      const data = await response.json()
      setAiProducts(data)
    } catch (error) {
      console.error('Error fetching AI products:', error)
    } finally {
      setAiLoading(false)
    }
  }

  const handleAddToCart = (product: Product) => {
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

  const handleAddAIToCart = (product: AIProduct) => {
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

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-primary text-xl">Loading products...</div>
      </div>
    )
  }

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary to-primary-dark text-white">
        <div className="container py-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="hero-title text-white">
                Premium Gaming & Tech Products
              </h1>
              <p className="hero-subtitle text-blue-100">
                Discover the latest in gaming peripherals, tech gadgets, and accessories. 
                Quality products with fast shipping and excellent customer service.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <button className="btn-primary bg-white text-primary hover:bg-gray-100">
                  Shop Now
                </button>
                <button className="btn-secondary border-white hover:bg-white hover:text-primary">
                  View Categories
                </button>
              </div>
            </div>
            <div className="relative">
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8">
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-white/20 rounded-lg p-4 text-center">
                    <div className="text-2xl font-bold">500+</div>
                    <div className="text-sm text-blue-100">Products</div>
                  </div>
                  <div className="bg-white/20 rounded-lg p-4 text-center">
                    <div className="text-2xl font-bold">10K+</div>
                    <div className="text-sm text-blue-100">Happy Customers</div>
                  </div>
                  <div className="bg-white/20 rounded-lg p-4 text-center">
                    <div className="text-2xl font-bold">24/7</div>
                    <div className="text-sm text-blue-100">Support</div>
                  </div>
                  <div className="bg-white/20 rounded-lg p-4 text-center">
                    <div className="text-2xl font-bold">Free</div>
                    <div className="text-sm text-blue-100">Shipping</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-16 bg-gray-50">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="section-title">Shop by Category</h2>
            <p className="section-subtitle">
              Find exactly what you're looking for in our organized categories
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
            <div className="category-card">
              <div className="text-3xl mb-3">🎮</div>
              <h3 className="font-semibold">Gaming</h3>
            </div>
            <div className="category-card">
              <div className="text-3xl mb-3">⌨️</div>
              <h3 className="font-semibold">Keyboards</h3>
            </div>
            <div className="category-card">
              <div className="text-3xl mb-3">🖱️</div>
              <h3 className="font-semibold">Mice</h3>
            </div>
            <div className="category-card">
              <div className="text-3xl mb-3">🎧</div>
              <h3 className="font-semibold">Audio</h3>
            </div>
            <div className="category-card">
              <div className="text-3xl mb-3">🖥️</div>
              <h3 className="font-semibold">Monitors</h3>
            </div>
            <div className="category-card">
              <div className="text-3xl mb-3">🪑</div>
              <h3 className="font-semibold">Furniture</h3>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="py-16">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="section-title">Featured Products</h2>
            <p className="section-subtitle">
              Handpicked products that our customers love
            </p>
          </div>

          {products.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-text-secondary text-xl mb-4">No products available</div>
              <a href="/admin" className="btn-primary">
                Add Your First Product
              </a>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {products.slice(0, 8).map((product) => (
                <div key={product.id} className="product-card group">
                  <Link href={`/products/${product.id}`} className="block">
                    <div className="aspect-square overflow-hidden">
                      <img
                        src={product.imageUrl}
                        alt={product.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                    <div className="p-6">
                      <h3 className="text-lg font-semibold text-text-primary mb-2 group-hover:text-primary transition-colors line-clamp-2">
                        {product.name}
                      </h3>
                      <p className="text-text-secondary text-sm mb-4 line-clamp-2">
                        {product.description}
                      </p>
                      <div className="flex items-center justify-between mb-4">
                        <span className="text-2xl font-bold text-primary">
                          ${product.price.toFixed(2)}
                        </span>
                        <div className="flex items-center">
                          <div className="flex text-yellow-400">
                            {[...Array(5)].map((_, i) => (
                              <svg key={i} className="w-4 h-4 fill-current" viewBox="0 0 20 20">
                                <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z"/>
                              </svg>
                            ))}
                          </div>
                          <span className="text-sm text-gray-500 ml-1">(4.8)</span>
                        </div>
                      </div>
                    </div>
                  </Link>
                  <div className="px-6 pb-6">
                    <div className="flex space-x-2">
                      <button
                        onClick={() => handleAddToCart(product)}
                        className="btn-primary text-sm px-4 py-2 flex-1"
                      >
                        Add to Cart
                      </button>
                      <Link
                        href={`/products/${product.id}`}
                        className="btn-outline text-sm px-4 py-2 flex-1 text-center"
                      >
                        View Details
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-gray-50">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="section-title">Why Choose GizmoTech?</h2>
            <p className="section-subtitle">
              We're committed to providing the best shopping experience
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="feature-card text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold mb-2">Free Shipping</h3>
              <p className="text-gray-600">Free shipping on orders over $50</p>
            </div>
            <div className="feature-card text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold mb-2">Quality Guarantee</h3>
              <p className="text-gray-600">100% authentic products with warranty</p>
            </div>
            <div className="feature-card text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192L5.636 18.364M12 2.25a9.75 9.75 0 100 19.5 9.75 9.75 0 000-19.5z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold mb-2">24/7 Support</h3>
              <p className="text-gray-600">Round-the-clock customer support</p>
            </div>
            <div className="feature-card text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold mb-2">Easy Returns</h3>
              <p className="text-gray-600">30-day hassle-free return policy</p>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-16 bg-primary text-white">
        <div className="container text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Stay Updated</h2>
          <p className="text-blue-100 mb-8 max-w-2xl mx-auto">
            Subscribe to our newsletter and be the first to know about new products, 
            exclusive deals, and special offers.
          </p>
          <div className="max-w-md mx-auto flex gap-4">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-white"
            />
            <button className="btn-primary bg-white text-primary hover:bg-gray-100 px-6">
              Subscribe
            </button>
          </div>
        </div>
      </section>
    </div>
  )
}
