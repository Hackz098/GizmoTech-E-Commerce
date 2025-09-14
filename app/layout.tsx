"use client";
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { CartProvider, useCart } from "./cart/CartContext";
import CartNav from "./cart/CartNav";
import { useEffect } from 'react';

const inter = Inter({ subsets: ['latin'] })

function CartToast() {
  const { state, dispatch } = useCart();
  
  useEffect(() => {
    if (state.message) {
      const timer = setTimeout(() => {
        dispatch({ type: 'CLEAR_MESSAGE' });
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [state.message, dispatch]);

  if (!state.message) return null;

  return (
    <div className="fixed top-20 right-4 z-50 bg-bg-card border border-primary rounded-lg shadow-lg p-4 max-w-sm">
      <div className="flex items-center justify-between">
        <span className="text-text-primary">{state.message}</span>
        <button
          onClick={() => dispatch({ type: 'CLEAR_MESSAGE' })}
          className="ml-4 text-text-secondary hover:text-text-primary"
        >
          ×
        </button>
      </div>
    </div>
  );
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {

  return (
    <html lang="en">
      <body className={inter.className}>
        <CartProvider>
          {/* Top Bar */}
          <div className="bg-gray-50 border-b border-gray-200">
            <div className="container">
              <div className="flex justify-between items-center py-2 text-sm text-gray-600">
                <div className="flex items-center space-x-4">
                  <span>📞 +1 (555) 123-4567</span>
                  <span>✉️ support@gizmotech.com</span>
                </div>
                <div className="flex items-center space-x-4">
                  <span>🚚 Free shipping on orders over $50</span>
                </div>
              </div>
            </div>
          </div>

          {/* Main Navigation */}
          <nav className="bg-white border-b border-gray-200 shadow-sm sticky top-0 z-50">
            <div className="container">
              <div className="flex justify-between items-center h-16">
                {/* Logo */}
                <div className="flex items-center">
                  <a href="/" className="flex items-center space-x-2">
                    <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                      <span className="text-white font-bold text-lg">G</span>
                    </div>
                    <span className="text-2xl font-bold text-text-primary">GizmoTech</span>
                  </a>
                </div>

                {/* Search Bar */}
                <div className="flex-1 max-w-lg mx-8">
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="Search products..."
                      className="search-input pl-10 pr-4"
                    />
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                      </svg>
                    </div>
                  </div>
                </div>

                {/* Navigation Links */}
                <div className="flex items-center space-x-8">
                  <a href="/" className="nav-link">
                    Home
                  </a>
                  <div className="relative group">
                    <button className="nav-link flex items-center">
                      Categories
                      <svg className="ml-1 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </button>
                    {/* Dropdown would go here */}
                  </div>
                  <a href="/admin" className="nav-link">
                    Admin
                  </a>
                  <CartNav />
                </div>
              </div>
            </div>
          </nav>
          <main className="min-h-screen">
            {children}
          </main>
          
          {/* Footer */}
          <footer className="bg-gray-900 text-white">
            <div className="container py-12">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {/* Company Info */}
                <div>
                  <div className="flex items-center space-x-2 mb-4">
                    <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                      <span className="text-white font-bold text-lg">G</span>
                    </div>
                    <span className="text-xl font-bold">GizmoTech</span>
                  </div>
                  <p className="text-gray-400 mb-4">
                    Your trusted destination for premium gaming and tech products. 
                    Quality guaranteed with fast shipping and excellent customer service.
                  </p>
                  <div className="flex space-x-4">
                    <a href="#" className="text-gray-400 hover:text-white transition-colors">
                      <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
                      </svg>
                    </a>
                    <a href="#" className="text-gray-400 hover:text-white transition-colors">
                      <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M22.46 6c-.77.35-1.6.58-2.46.69.88-.53 1.56-1.37 1.88-2.38-.83.5-1.75.85-2.72 1.05C18.37 4.5 17.26 4 16 4c-2.35 0-4.27 1.92-4.27 4.29 0 .34.04.67.11.98C8.28 9.09 5.11 7.38 3 4.79c-.37.63-.58 1.37-.58 2.15 0 1.49.75 2.81 1.91 3.56-.71 0-1.37-.2-1.95-.5v.03c0 2.08 1.48 3.82 3.44 4.21a4.22 4.22 0 0 1-1.93.07 4.28 4.28 0 0 0 4 2.98 8.521 8.521 0 0 1-5.33 1.84c-.34 0-.68-.02-1.02-.06C3.44 20.29 5.7 21 8.12 21 16 21 20.33 14.46 20.33 8.79c0-.19 0-.37-.01-.56.84-.6 1.56-1.36 2.14-2.23z"/>
                      </svg>
                    </a>
                    <a href="#" className="text-gray-400 hover:text-white transition-colors">
                      <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.174-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.957 1.406-5.957s-.359-.72-.359-1.781c0-1.663.967-2.911 2.168-2.911 1.024 0 1.518.769 1.518 1.688 0 1.029-.653 2.567-.992 3.992-.285 1.193.6 2.165 1.775 2.165 2.128 0 3.768-2.245 3.768-5.487 0-2.861-2.063-4.869-5.008-4.869-3.41 0-5.409 2.562-5.409 5.199 0 1.033.394 2.143.889 2.741.099.12.112.225.085.345-.09.375-.293 1.199-.334 1.363-.053.225-.172.271-.402.165-1.495-.69-2.433-2.878-2.433-4.646 0-3.776 2.748-7.252 7.92-7.252 4.158 0 7.392 2.967 7.392 6.923 0 4.135-2.607 7.462-6.233 7.462-1.214 0-2.357-.629-2.746-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24.009 12.017 24.009c6.624 0 11.99-5.367 11.99-11.988C24.007 5.367 18.641.001.012.001z"/>
                      </svg>
                    </a>
                  </div>
                </div>

                {/* Quick Links */}
                <div>
                  <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
                  <ul className="space-y-2">
                    <li><a href="/" className="text-gray-400 hover:text-white transition-colors">Home</a></li>
                    <li><a href="#" className="text-gray-400 hover:text-white transition-colors">About Us</a></li>
                    <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Products</a></li>
                    <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Contact</a></li>
                    <li><a href="/admin" className="text-gray-400 hover:text-white transition-colors">Admin</a></li>
                  </ul>
                </div>

                {/* Customer Service */}
                <div>
                  <h3 className="text-lg font-semibold mb-4">Customer Service</h3>
                  <ul className="space-y-2">
                    <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Shipping Info</a></li>
                    <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Returns</a></li>
                    <li><a href="#" className="text-gray-400 hover:text-white transition-colors">FAQ</a></li>
                    <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Support</a></li>
                    <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Warranty</a></li>
                  </ul>
                </div>

                {/* Contact Info */}
                <div>
                  <h3 className="text-lg font-semibold mb-4">Contact Info</h3>
                  <div className="space-y-2 text-gray-400">
                    <p>📞 +1 (555) 123-4567</p>
                    <p>✉️ support@gizmotech.com</p>
                    <p>📍 123 Tech Street, Digital City, DC 12345</p>
                    <p>🕒 Mon-Fri: 9AM-6PM EST</p>
                  </div>
                </div>
              </div>
              
              <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
                <p>&copy; 2024 GizmoTech. All rights reserved. | Privacy Policy | Terms of Service</p>
              </div>
            </div>
          </footer>
          
          <CartToast />
        </CartProvider>
      </body>
    </html>
  );
}
