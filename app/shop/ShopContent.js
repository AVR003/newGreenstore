// src/app/shop/ShopContent.js
'use client';
import Image from 'next/image';
import { useState, useMemo } from 'react';
import { useCart } from '@/context/CartContext';
import { useSearchParams } from 'next/navigation';

const products = [
  { id: 1, name: 'Bamboo Cutlery Set', price: 12.99, image: '/bamboo-cutlery.jpg', category: 'Kitchen', description: 'Sustainable bamboo cutlery set for eco-friendly dining' },
  { id: 2, name: 'Compost Bin', price: 24.99, image: '/compost-bin.jpg', category: 'Home', description: 'Efficient compost bin for kitchen waste management' },
  { id: 3, name: 'Compostable Cups', price: 9.99, image: '/compostable-cups.jpg', category: 'Kitchen', description: 'Biodegradable cups for hot and cold beverages' },
  { id: 4, name: 'Cotton Tote Bag', price: 7.99, image: '/cotton-tote.jpg', category: 'Accessories', description: 'Reusable cotton tote bag for shopping' },
  { id: 5, name: 'Eco Notebook', price: 6.99, image: '/eco-notebook.jpg', category: 'Office', description: 'Recycled paper notebook for sustainable writing' },
  { id: 6, name: 'Glass Jars Set', price: 18.99, image: '/glass-jars.jpg', category: 'Kitchen', description: 'Set of reusable glass jars for storage' },
  { id: 7, name: 'Jute Bags', price: 9.99, image: '/jute-bags.jpg', category: 'Accessories', description: 'Natural jute bags for sustainable carrying' },
  { id: 8, name: 'Eco Mailer Bag', price: 4.99, image: '/mailer-bag.jpg', category: 'Shipping', description: 'Biodegradable mailer bags for shipping' },
  { id: 9, name: 'Paper Tape', price: 3.99, image: '/paper-tape.jpg', category: 'Office', description: 'Recycled paper tape for eco-friendly packaging' },
  { id: 10, name: 'Recycled Paper', price: 8.99, image: '/recycled-paper.jpg', category: 'Office', description: '100% recycled paper for printing and writing' },
  { id: 11, name: 'Solar Lantern', price: 19.99, image: '/solar-lantern.jpg', category: 'Outdoor', description: 'Solar-powered lantern for outdoor lighting' },
  { id: 12, name: 'Steel Straws Set', price: 8.99, image: '/steel-straws.jpg', category: 'Kitchen', description: 'Reusable stainless steel straws with cleaner' },
  { id: 13, name: 'Wooden Toothbrush', price: 4.99, image: '/wooden-toothbrush.jpg', category: 'Personal Care', description: 'Bamboo toothbrush with biodegradable bristles' },
  { id: 14, name: 'Bubble Wrap Alternative', price: 12.99, image: '/bubble-wrap.jpg', category: 'Shipping', description: 'Eco-friendly packaging material alternative' },
  { id: 15, name: 'Cardboard Boxes', price: 10.99, image: '/cardboard-box.jpg', category: 'Shipping', description: 'Recycled cardboard boxes for packaging' }
];

export default function ShopContent() {
  const [quantities, setQuantities] = useState({});
  const searchParams = useSearchParams();
  const searchQuery = searchParams.get('q') || '';
  const { addToCart } = useCart();

  const filteredProducts = useMemo(() => {
    if (!searchQuery) return products;
    const query = searchQuery.toLowerCase();
    return products.filter(product =>
      product.name.toLowerCase().includes(query) ||
      product.category.toLowerCase().includes(query) ||
      product.description.toLowerCase().includes(query)
    );
  }, [searchQuery]);

  const updateQuantity = (productId, newQuantity) => {
    if (newQuantity < 1) return;
    setQuantities(prev => ({ ...prev, [productId]: newQuantity }));
  };

  const handleAddToCart = (product) => {
    const quantity = quantities[product.id] || 1;
    addToCart(product, quantity);
    alert(`Added ${quantity} ${product.name}(s) to cart!`);
    setQuantities(prev => ({ ...prev, [product.id]: 1 }));
  };

  const getQuantity = (productId) => quantities[productId] || 1;

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Eco-Friendly Shop</h1>
          <p className="text-xl text-gray-600">Sustainable products for a greener lifestyle</p>

          {searchQuery && (
            <div className="mt-4">
              <p className="text-gray-600">
                {filteredProducts.length > 0
                  ? `Found ${filteredProducts.length} products for "${searchQuery}"`
                  : `No products found for "${searchQuery}"`
                }
              </p>
              {filteredProducts.length === 0 && (
                <button
                  onClick={() => window.location.href = '/shop'}
                  className="mt-2 text-green-600 hover:text-green-700 underline"
                >
                  View all products
                </button>
              )}
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProducts.map(product => (
            <div key={product.id} className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-all duration-300 flex flex-col">
              <div className="relative h-48 w-full">
                <Image src={product.image} alt={product.name} fill className="object-cover" sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw" />
              </div>

              <div className="p-4 flex-1 flex flex-col">
                <div className="mb-2">
                  <span className="inline-block px-2 py-1 text-xs font-medium text-green-700 bg-green-100 rounded">
                    {product.category}
                  </span>
                </div>

                <h3 className="text-lg font-semibold text-gray-900 mb-2">{product.name}</h3>
                <p className="text-gray-600 text-sm mb-3 flex-1">{product.description}</p>

                <div className="mb-3">
                  <span className="text-xl font-bold text-gray-900">${product.price}</span>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Qty:</span>
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => updateQuantity(product.id, getQuantity(product.id) - 1)}
                        className="w-7 h-7 flex items-center justify-center border border-gray-300 rounded hover:bg-gray-50 transition-colors text-sm"
                        disabled={getQuantity(product.id) <= 1}
                      >
                        −
                      </button>
                      <span className="w-6 text-center text-sm font-medium text-gray-900">{getQuantity(product.id)}</span>
                      <button
                        onClick={() => updateQuantity(product.id, getQuantity(product.id) + 1)}
                        className="w-7 h-7 flex items-center justify-center border border-gray-300 rounded hover:bg-gray-50 transition-colors text-sm"
                      >
                        +
                      </button>
                    </div>
                  </div>

                  <button
                    onClick={() => handleAddToCart(product)}
                    className="w-full bg-green-600 text-white py-2 px-3 rounded hover:bg-green-700 transition-colors duration-200 font-medium text-sm flex items-center justify-center"
                  >
                    <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-8 text-gray-600">
          Showing {filteredProducts.length} eco-friendly products
          {searchQuery && ` for "${searchQuery}"`}
        </div>
      </div>
    </div>
  );
}
