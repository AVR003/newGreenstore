'use client';
import Image from 'next/image';
import { useState, useMemo } from 'react';
import { useCart } from '@/context/CartContext';
import { useSearchParams } from 'next/navigation';

const products = [ /* your full products array here */ ];

export default function ShopContent() {
  const [quantities, setQuantities] = useState({});
  const searchParams = useSearchParams();
  const searchQuery = searchParams.get('q') || '';
  const cart = useCart();
  const { addToCart } = cart;

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
    <div> 
      {/* Your full JSX goes here */}
    </div>
  );
}
