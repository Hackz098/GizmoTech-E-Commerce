"use client";
import React, { createContext, useContext, useReducer, ReactNode, useEffect, useState } from 'react';

export type CartItem = {
  id: string;
  name: string;
  price: number;
  imageUrl: string;
  quantity: number;
};

export type CartState = {
  items: CartItem[];
  message?: string;
};

export type CartAction =
  | { type: 'ADD_ITEM'; item: Omit<CartItem, 'quantity'> }
  | { type: 'REMOVE_ITEM'; id: string }
  | { type: 'INCREASE_QUANTITY'; id: string }
  | { type: 'DECREASE_QUANTITY'; id: string }
  | { type: 'LOAD_CART'; items: CartItem[] }
  | { type: 'CLEAR_MESSAGE' }
  | { type: 'CLEAR_CART' };

const CartContext = createContext<{
  state: CartState;
  dispatch: React.Dispatch<CartAction>;
  isHydrated: boolean;
} | undefined>(undefined);

function cartReducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case 'LOAD_CART': {
      return { items: action.items };
    }
    case 'ADD_ITEM': {
      // Validate the item has all required fields
      if (!action.item.id || !action.item.name || action.item.price === undefined || !action.item.imageUrl) {
        console.error('Invalid item data:', action.item);
        return { ...state, message: 'Unable to add product to cart. Product data is incomplete.' };
      }
      
      const existing = state.items.find(i => i.id === action.item.id);
      if (existing) {
        // If item already exists, show message that it's already in cart
        return { ...state, message: `${action.item.name} is already in your cart.` };
      }
      return {
        items: [...state.items, { ...action.item, quantity: 1 }],
        message: `${action.item.name} added to cart!`,
      };
    }
    case 'REMOVE_ITEM': {
      return {
        items: state.items.filter(i => i.id !== action.id),
      };
    }
    case 'INCREASE_QUANTITY': {
      return {
        items: state.items.map(i =>
          i.id === action.id ? { ...i, quantity: i.quantity + 1 } : i
        ),
      };
    }
    case 'DECREASE_QUANTITY': {
      return {
        items: state.items
          .map(i =>
            i.id === action.id ? { ...i, quantity: i.quantity - 1 } : i
          )
          .filter(i => i.quantity > 0),
      };
    }
    case 'CLEAR_MESSAGE': {
      return { ...state, message: undefined };
    }
    case 'CLEAR_CART': {
      return { items: [], message: 'Cart cleared successfully!' };
    }
    default:
      return state;
  }
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(cartReducer, { items: [], message: undefined });
  const [isHydrated, setIsHydrated] = useState(false);

  // Load cart from localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem('gizmos_cart');
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        if (parsed && Array.isArray(parsed.items)) {
          dispatch({ type: 'LOAD_CART', items: parsed.items });
        }
      } catch {}
    }
    setIsHydrated(true);
  }, []);

  // Save cart to localStorage on change (only after hydration)
  useEffect(() => {
    if (isHydrated) {
      localStorage.setItem('gizmos_cart', JSON.stringify(state));
    }
  }, [state, isHydrated]);

  return (
    <CartContext.Provider value={{ state, dispatch, isHydrated }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) throw new Error('useCart must be used within CartProvider');
  return context;
}
