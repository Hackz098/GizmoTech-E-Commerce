"use client";
import { CartProvider } from "./cart/CartContext";

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  return <CartProvider>{children}</CartProvider>;
}
