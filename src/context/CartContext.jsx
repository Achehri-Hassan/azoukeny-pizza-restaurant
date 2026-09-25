import React, { createContext, useContext, useState, useMemo } from "react";

const CartContext = createContext(null);

export function CartProvider({ children }) {
 
  const [cart, setCart] = useState([]);

  const addToCart = (item, qty = 1) => {
    setCart((prev) => {
      const existing = prev.find((p) => p.id === item.id);
      if (existing) {
        return prev.map((p) =>
          p.id === item.id ? { ...p, qty: p.qty + qty } : p
        );
      }
      return [...prev, { ...item, qty }];
    });
  };

  const removeFromCart = (id) => {
    setCart((prev) => prev.filter((p) => p.id !== id));
  };

  const updateQty = (id, qty) => {
    if (qty <= 0) return removeFromCart(id);
    setCart((prev) => prev.map((p) => (p.id === id ? { ...p, qty } : p)));
  };

  const clearCart = () => setCart([]);

  const totalCount = useMemo(
    () => cart.reduce((sum, p) => sum + p.qty, 0),
    [cart]
  );

  const totalPrice = useMemo(
    () => cart.reduce((sum, p) => sum + p.qty * p.price, 0),
    [cart]
  );

  const value = {
    cart,
    addToCart,
    removeFromCart,
    updateQty,
    clearCart,
    totalCount,
    totalPrice,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used inside a <CartProvider>");
  return ctx;
}
