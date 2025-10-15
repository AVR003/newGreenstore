'use client';
import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function PremiumProducts() {
  const [cartCount, setCartCount] = useState(0);

  const premiumProducts = [
    { id: 13, name: 'Luxury Bamboo Dinnerware Set', price: '$199.99', image: '🍽️', description: 'Handcrafted bamboo dinnerware for 6 people' },
    { id: 14, name: 'Artisanal Recycled Glassware', price: '$149.99', image: '🥂', description: 'Elegant glassware made from recycled materials' },
    { id: 15, name: 'Premium Organic Bedding Set', price: '$289.99', image: '🛏️', description: 'Luxury organic cotton bedding collection' },
    { id: 16, name: 'Designer Eco Office Furniture', price: '$599.99', image: '💼', description: 'Sustainable designer desk and chair set' },
    { id: 17, name: 'Handcrafted Sustainable Decor', price: '$179.99', image: '🖼️', description: 'Artisanal home decor from natural materials' },
    { id: 18, name: 'Executive Green Workspace Kit', price: '$399.99', image: '⭐', description: 'Complete eco-friendly executive office setup' }
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
    
    // Silent add to cart (no popup)
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
            <h1 className="text-4xl font-bold text-gray-800">Premium Eco Products</h1>
          </div>
          <Link 
            href="/cart" 
            className="bg-green-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-green-700 transition-colors flex items-center"
          >
            🛒 Cart ({cartCount})
          </Link>
        </div>
        
        <p className="text-xl text-gray-600 mb-12">
          Exclusive, high-quality sustainable products with personalized service and premium materials for the discerning eco-conscious consumer.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {premiumProducts.map((product) => (
            <div key={product.id} className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow flex flex-col h-full border-2 border-yellow-400">
              <div className="text-6xl text-center mb-4">{product.image}</div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">{product.name}</h3>
              <p className="text-green-600 font-semibold text-lg mb-3">{product.price}</p>
              <div className="bg-yellow-100 text-yellow-800 text-sm font-semibold px-3 py-1 rounded-full mb-3 inline-block">
                ⭐ Premium
              </div>
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