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
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="text-center mb-12">
        <h1 className="section-title">
          Welcome to <span className="text-primary">GizmoTech</span>
        </h1>
        <p className="section-subtitle">
          Discover amazing products with our professional design
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
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {products.map((product) => (
            <div key={product.id} className="card p-6 group">
                             <Link href={`/products/${product.id}`} className="block mb-4 product-link">
                 <div className="aspect-square mb-4 overflow-hidden rounded-lg">
                   <img
                     src={product.imageUrl}
                     alt={product.name}
                     className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                   />
                 </div>
                 <h3 className="text-xl font-semibold text-text-primary mb-2 group-hover:text-primary transition-colors">
                   {product.name}
                 </h3>
                 <p className="text-text-secondary text-sm mb-3 line-clamp-2">
                   {product.description}
                 </p>
                 <span className="text-2xl font-bold text-primary">
                   ${product.price.toFixed(2)}
                 </span>
               </Link>
               <div className="flex space-x-2">
                 <button
                   onClick={() => handleAddToCart(product)}
                   className="btn-primary text-sm px-3 py-2 flex-1"
                 >
                   Add to Cart
                 </button>
                 <Link
                   href={`/products/${product.id}`}
                   className="btn-secondary text-sm px-3 py-2 flex-1 text-center"
                 >
                   View Details
                 </Link>
               </div>
            </div>
          ))}
                 </div>
       )}

       {/* AI Products Section */}
       <div className="mt-16">
         <div className="text-center mb-12">
           <h2 className="section-title">
             🚀 AI Subscriptions & Tools
           </h2>
           <p className="section-subtitle">
             Discover cutting-edge AI-powered tools and subscriptions
           </p>
         </div>

         {aiLoading ? (
           <div className="text-center py-12">
             <div className="text-primary text-xl">Loading AI products...</div>
           </div>
         ) : aiProducts.length === 0 ? (
           <div className="text-center py-12">
             <div className="text-text-secondary text-xl mb-4">No AI products available</div>
           </div>
         ) : (
           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6">
             {aiProducts.map((product) => (
               <div key={product.id} className="ai-card p-6 group relative">
                 <div className="absolute top-4 right-4 bg-accent text-white text-xs px-2 py-1 rounded-full font-medium">
                   AI
                 </div>
                 <div className="aspect-square mb-4 overflow-hidden rounded-lg">
                   <img
                     src={product.imageUrl}
                     alt={product.name}
                     className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                   />
                 </div>
                 <h3 className="text-xl font-semibold text-text-primary mb-2 group-hover:text-primary transition-colors">
                   {product.name}
                 </h3>
                 <p className="text-text-secondary text-sm mb-3 line-clamp-2">
                   {product.description}
                 </p>
                 <div className="flex justify-between items-center">
                   <span className="text-2xl font-bold text-primary">
                     ${product.price.toFixed(2)}
                   </span>
                   <button
                     onClick={() => handleAddAIToCart(product)}
                     className="btn-primary text-sm px-3 py-2"
                   >
                     Add to Cart
                   </button>
                 </div>
               </div>
             ))}
           </div>
         )}
       </div>
     </div>
   )
 }
