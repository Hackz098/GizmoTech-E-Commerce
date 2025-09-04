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
          <nav className="bg-bg-card border-b border-border shadow-sm">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex justify-between h-16">
                <div className="flex items-center">
                  <a href="/" className="text-2xl font-bold text-primary">
                    GizmoTech
                  </a>
                </div>
                <div className="flex items-center space-x-6">
                  <a href="/" className="nav-link">
                    Home
                  </a>
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
          <CartToast />
        </CartProvider>
      </body>
    </html>
  );
}
