"use client";
import React from "react";
import { useCart } from "./CartContext";

export default function CartNav() {
  const { state, isHydrated } = useCart();
  const totalItems = state.items.reduce((sum, item) => sum + item.quantity, 0);
  return (
    <a href="/cart" className="nav-link flex items-center text-neon-blue font-bold">
      <span role="img" aria-label="cart">🛒</span>
      <span className="ml-1">{isHydrated ? totalItems : 0}</span>
    </a>
  );
}
