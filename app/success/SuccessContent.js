'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { useCart } from '@/context/CartContext';

export default function SuccessContent() {
  const searchParams = useSearchParams();
  const sessionId = searchParams.get('session_id');
  const { clearCart } = useCart();
  const [hasClearedCart, setHasClearedCart] = useState(false);

  useEffect(() => {
    if (sessionId && !hasClearedCart) {
      clearCart();
      setHasClearedCart(true);
      console.log('Cart cleared after successful payment');
    }
  }, [sessionId, clearCart, hasClearedCart]);

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-6 py-12">
      <div className="max-w-md w-full text-center">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
          <div className="text-green-500 text-6xl mb-4">✓</div>
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Payment Successful!</h1>
          <p className="text-gray-600 mb-8 text-lg">
            Thank you for your purchase. Your order has been confirmed and will be shipped soon.
          </p>
          <div className="space-y-4">
            <Link 
              href="/shop" 
              className="block w-full bg-green-600 text-white py-3 px-4 rounded-lg font-semibold hover:bg-green-700 transition-colors"
            >
              Continue Shopping
            </Link>
            <Link 
              href="/" 
              className="block w-full border border-green-600 text-green-600 py-3 px-4 rounded-lg font-semibold hover:bg-green-50 transition-colors"
            >
              Go to Homepage
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
