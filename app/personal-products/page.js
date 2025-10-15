'use client';
import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function PersonalProducts() {
  const [cartCount, setCartCount] = useState(0);

  const personalProducts = [
    { id: 1, name: 'Eco-Friendly Water Bottle', price: '$24.99', image: '💧', description: 'Reusable glass water bottle with silicone sleeve' },
    { id: 2, name: 'Bamboo Toothbrush Set', price: '$12.99', image: '🎋', description: '4-pack of biodegradable bamboo toothbrushes' },
    { id: 3, name: 'Reusable Shopping Bags', price: '$18.99', image: '🛍️', description: 'Set of 5 durable reusable grocery bags' },
    { id: 4, name: 'Organic Cotton Towels', price: '$29.99', image: '🧺', description: 'Soft organic cotton bath towels set of 3' },
    { id: 5, name: 'Bamboo Cutlery Set', price: '$15.99', image: '🍴', description: 'Portable bamboo cutlery set with carrying case' },
    { id: 6, name: 'Plant-Based Cleaning Kit', price: '$34.99', image: '🧼', description: 'Eco-friendly cleaning supplies for your home' }
  ];

  // Update cart count from localStorage
  useEffect(() => {
    const updateCartCount = () => {
      const savedCart = localStorage.getItem('greenstore-cart');
      if (savedCart) {
        const cart = JSON.parse(savedCart);
        setCartCount(cart.reduce((total, item) => total + item.quantity, 0));
      }
    };

    updateCartCount();
    window.addEventListener('storage', updateCartCount);
    
    return () => {
      window.removeEventListener('storage', updateCartCount);
    };
  }, []);

  const addToCart = (product) => {
    // Get current cart from localStorage
    const currentCart = JSON.parse(localStorage.getItem('greenstore-cart') || '[]');
    
    // Check if product already exists in cart
    const existingItem = currentCart.find(item => item.id === product.id);
    let newCart;
    
    if (existingItem) {
      newCart = currentCart.map(item =>
        item.id === product.id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      );
    } else {
      newCart = [...currentCart, { ...product, quantity: 1 }];
    }
    
    // Save to localStorage
    localStorage.setItem('greenstore-cart', JSON.stringify(newCart));
    
    // Update local state
    setCartCount(newCart.reduce((total, item) => total + item.quantity, 0));
    
    // Trigger storage event to update header counter
    window.dispatchEvent(new Event('storage'));
    
    console.log(`${product.name} added to cart`);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-6">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center">
            <Link href="/" className="text-green-600 hover:text-green-700 mr-4">
              ← Back to Home
            </Link>
            <h1 className="text-4xl font-bold text-gray-800">Personal Eco Products</h1>
          </div>
          <Link 
            href="/cart" 
            className="bg-green-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-green-700 transition-colors flex items-center"
          >
            🛒 Cart ({cartCount})
          </Link>
        </div>
        
        <p className="text-xl text-gray-600 mb-12">
          Sustainable products for your everyday life. Make your home eco-friendly with our carefully curated personal solutions.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {personalProducts.map((product) => (
            <div key={product.id} className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow flex flex-col h-full">
              <div className="text-6xl text-center mb-4">{product.image}</div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">{product.name}</h3>
              <p className="text-green-600 font-semibold text-lg mb-3">{product.price}</p>
              <p className="text-gray-600 text-sm mb-6 flex-grow">{product.description}</p>
              <button 
                onClick={() => addToCart(product)}
                className="w-full bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors mt-auto"
              >
                Add to Cart
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}