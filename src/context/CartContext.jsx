// src/context/CartContext.jsx
'use client';
import { createContext, useContext, useState, useEffect, useCallback } from 'react';

const CartContext = createContext(undefined);

// List of all your actual product images from public folder
const validProductImages = [
  '/bamboo-cutlery.jpg',
  '/bubble-wrap.jpg',
  '/cardboard-box.jpg',
  '/compost-bin.jpg',
  '/compostable-cups.jpg',
  '/cotton-tote.jpg',
  '/eco-notebook.jpg',
  '/glass-jars.jpg',
  '/jute-bags.jpg',
  '/mailer-bag.jpg',
  '/paper-tape.jpg',
  '/recycled-paper.jpg',
  '/solar-lantern.jpg',
  '/steel-straws.jpg',
  '/wooden-toothbrush.jpg'
];

// Function to ensure image path is valid
const ensureValidImage = (imagePath) => {
  if (!imagePath) return '/bamboo-cutlery.jpg';
  if (validProductImages.includes(imagePath)) {
    return imagePath;
  }
  if (imagePath.startsWith('/')) {
    return imagePath;
  }
  return '/bamboo-cutlery.jpg';
};

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState([]);
  const [isInitialized, setIsInitialized] = useState(false);

  // Load cart from localStorage on mount
  useEffect(() => {
    try {
      const savedCart = localStorage.getItem('greenstore-cart');
      if (savedCart) {
        const parsedCart = JSON.parse(savedCart);
        const cartWithValidData = parsedCart.map(item => ({
          ...item,
          price: Number(item.price),
          image: ensureValidImage(item.image),
          quantity: Number(item.quantity) || 1
        }));
        setCartItems(cartWithValidData);
      }
    } catch (error) {
      console.error('Error loading cart from localStorage:', error);
    } finally {
      setIsInitialized(true);
    }
  }, []);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    if (isInitialized) {
      localStorage.setItem('greenstore-cart', JSON.stringify(cartItems));
    }
  }, [cartItems, isInitialized]);

  const addToCart = useCallback((product, quantity = 1) => {
    setCartItems(prevItems => {
      const existingItem = prevItems.find(item => item.id === product.id);
      
      if (existingItem) {
        return prevItems.map(item =>
          item.id === product.id
            ? { 
                ...item, 
                quantity: item.quantity + quantity,
                price: Number(item.price),
                image: ensureValidImage(item.image)
              }
            : item
        );
      } else {
        return [...prevItems, {
          id: product.id,
          name: product.name,
          price: Number(product.price),
          image: ensureValidImage(product.image),
          category: product.category,
          quantity: quantity
        }];
      }
    });
  }, []);

  const updateQuantity = useCallback((productId, newQuantity) => {
    if (newQuantity < 1) {
      removeFromCart(productId);
      return;
    }

    setCartItems(prevItems =>
      prevItems.map(item =>
        item.id === productId 
          ? { 
              ...item, 
              quantity: newQuantity,
              price: Number(item.price),
              image: ensureValidImage(item.image)
            } 
          : item
      )
    );
  }, []);

  const removeFromCart = useCallback((productId) => {
    setCartItems(prevItems => prevItems.filter(item => item.id !== productId));
  }, []);

  const clearCart = useCallback(() => {
    setCartItems([]);
  }, []);

  const getCartTotal = useCallback(() => {
    return cartItems.reduce((total, item) => {
      const itemPrice = Number(item.price);
      const itemQuantity = Number(item.quantity);
      return total + (itemPrice * itemQuantity);
    }, 0);
  }, [cartItems]);

  const getCartItemsCount = useCallback(() => {
    return cartItems.reduce((total, item) => total + Number(item.quantity), 0);
  }, [cartItems]);

  const value = {
    cartItems,
    addToCart,
    updateQuantity,
    removeFromCart,
    clearCart,
    getCartTotal,
    getCartItemsCount
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  
  return context;
}