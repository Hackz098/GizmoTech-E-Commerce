"use client";
import React, { useState } from "react";
import { useCart } from "./CartContext";
import CheckoutModal from "../components/CheckoutModal";

export default function CartPage() {
  const { state, dispatch, isHydrated } = useCart();
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const totalItems = state.items.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = state.items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  // Show loading state while hydrating
  if (!isHydrated) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center py-12">
          <div className="text-primary text-xl">Loading cart...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="text-center mb-12">
        <h1 className="section-title">
          Shopping <span className="text-primary">Cart</span>
        </h1>
        <p className="section-subtitle">
          Review your selected items before checkout
        </p>
      </div>

      {state.items.length === 0 ? (
        <div className="text-center py-12">
          <div className="text-text-secondary text-xl mb-4">Your cart is empty</div>
          <a href="/" className="btn-primary">
            Continue Shopping
          </a>
        </div>
      ) : (
        <>
          <div className="space-y-4 mb-8">
            {state.items.map(item => (
              <div key={item.id} className="card p-6">
                <div className="flex items-center space-x-6">
                  <div className="flex-shrink-0">
                    <div className="aspect-square w-24 h-24 overflow-hidden rounded-lg">
                      <img 
                        src={item.imageUrl} 
                        alt={item.name} 
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-xl font-semibold text-text-primary mb-2">
                      {item.name}
                    </h3>
                    <div className="text-2xl font-bold text-primary mb-4">
                      ${item.price.toFixed(2)}
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="flex items-center border border-border rounded-lg">
                        <button
                          className="px-3 py-2 text-text-primary hover:text-primary hover:bg-bg-secondary transition-colors"
                          onClick={() => dispatch({ type: "DECREASE_QUANTITY", id: item.id })}
                        >
                          -
                        </button>
                        <span className="px-4 py-2 text-text-primary border-x border-border">
                          {item.quantity}
                        </span>
                        <button
                          className="px-3 py-2 text-text-primary hover:text-primary hover:bg-bg-secondary transition-colors"
                          onClick={() => dispatch({ type: "INCREASE_QUANTITY", id: item.id })}
                        >
                          +
                        </button>
                      </div>
                      <button
                        className="btn-secondary text-sm px-4 py-2"
                        onClick={() => dispatch({ type: "REMOVE_ITEM", id: item.id })}
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                  <div className="flex-shrink-0 text-right">
                    <div className="text-2xl font-bold text-primary">
                      ${(item.price * item.quantity).toFixed(2)}
                    </div>
                    <div className="text-text-secondary text-sm">
                      {item.quantity} × ${item.price.toFixed(2)}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="card p-6">
            <div className="space-y-4">
              <div className="flex justify-between items-center text-lg">
                <span className="text-text-primary">Total Items:</span>
                <span className="text-text-primary font-semibold">{totalItems}</span>
              </div>
              <div className="flex justify-between items-center text-xl">
                <span className="text-text-primary">Total Price:</span>
                <span className="text-primary font-bold text-2xl">
                  ${totalPrice.toFixed(2)}
                </span>
              </div>
              <div className="pt-4 border-t border-border">
                <button
                  onClick={() => setIsCheckoutOpen(true)}
                  className="btn-primary w-full py-4 text-lg font-semibold"
                  disabled={state.items.length === 0}
                >
                  Proceed to Checkout
                </button>
              </div>
            </div>
          </div>
        </>
      )}
      
      <CheckoutModal 
        isOpen={isCheckoutOpen} 
        onClose={() => setIsCheckoutOpen(false)} 
      />
    </div>
  );
}
