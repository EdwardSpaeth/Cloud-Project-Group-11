"use client"

import { createContext, useContext, useState } from "react"

const CartContext = createContext(undefined)

// For demo: No backend cart URL exists, so we start with an empty cart
export function CartProvider({ children }) {
  const [items, setItems] = useState([])

  const addToCart = (product) => {
    setItems((prevItems) => {
      const existingItem = prevItems.find((item) => item.id === product.id);
      if (existingItem) {
        return prevItems.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      } else {
        return [...prevItems, { ...product, quantity: 1 }];
      }
    });
  };

  // Remove an item from the cart locally
  const removeFromCart = (id) => {
    setItems((prevItems) => prevItems.filter((item) => item.id !== id))
  }

  // Update the quantity of an item locally. If newQuantity < 1, remove the item.
  const updateQuantity = (id, newQuantity) => {
    if (newQuantity < 1) {
      removeFromCart(id)
    } else {
      setItems((prevItems) =>
        prevItems.map((item) =>
          item.id === id ? { ...item, quantity: newQuantity } : item
        )
      )
    }
  }

  // Clear the entire cart locally
  const clearCart = () => setItems([])

  const cartTotal = items.reduce(
    (total, item) => total + parseFloat(item.price) * item.quantity,
    0
  )
  const itemCount = items.reduce((count, item) => count + item.quantity, 0)

  return (
    <CartContext.Provider
      value={{
        items,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        cartTotal,
        itemCount,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const context = useContext(CartContext)
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider")
  }
  return context
}