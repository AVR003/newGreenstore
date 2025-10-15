'use client';
import Image from 'next/image';
import Link from 'next/link';
import { useCart } from '@/context/CartContext';
import { useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';

const USD_TO_INR_RATE = 83;

const convertToINR = (usdAmount) => {
  return (usdAmount * USD_TO_INR_RATE).toFixed(2);
};

const CartImage = ({ src, alt, className }) => {
  const [imgSrc, setImgSrc] = useState(src);
  
  return (
    <Image
      src={imgSrc}
      alt={alt || 'Product image'}
      fill
      className={className}
      onError={() => setImgSrc('/bamboo-cutlery.jpg')}
    />
  );
};

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);

export default function CartPage() {
  const { cartItems, updateQuantity, removeFromCart, getCartTotal, getCartItemsCount } = useCart();
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [checkoutError, setCheckoutError] = useState('');

  const getShippingEstimate = () => 5.99;
  const getTaxEstimate = () => getCartTotal() * 0.08;
  const getTotal = () => getCartTotal() + getShippingEstimate() + getTaxEstimate();

  const handleCheckout = async () => {
    if (cartItems.length === 0) {
      setCheckoutError('Your cart is empty!');
      return;
    }

    setIsCheckingOut(true);
    setCheckoutError('');

    try {
      const stripeItems = cartItems.map(item => ({
        name: item.name,
        price: item.price,
        quantity: item.quantity,
      }));

      const response = await fetch('/api/create-checkout-session', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          items: stripeItems,
          success_url: `${window.location.origin}/success?session_id={CHECKOUT_SESSION_ID}`,
          cancel_url: `${window.location.origin}/cart`,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData?.error || 'Failed to create checkout session');
      }

      const { sessionId } = await response.json();
      const stripe = await stripePromise;
      const { error } = await stripe.redirectToCheckout({ sessionId });

      if (error) {
        console.error('Stripe error:', error);
        setCheckoutError(error.message);
      }
    } catch (error) {
      console.error('Checkout error:', error);
      setCheckoutError(error.message);
    } finally {
      setIsCheckingOut(false);
    }
  };

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Your Cart</h1>
          <p className="text-gray-600 mb-8">Your cart is empty</p>
          <Link 
            href="/shop"
            className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-green-600 hover:bg-green-700 transition-colors"
          >
            Continue Shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Your Cart</h1>
          <p className="text-gray-600 mt-2">{getCartItemsCount()} items in your cart</p>
          <p className="text-sm text-gray-500 mt-1">
            Prices displayed in USD. Payments processed in INR (₹) at current exchange rate.
          </p>
        </div>

        <div className="lg:grid lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-8">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
              <div className="divide-y divide-gray-200">
                {cartItems.map(item => (
                  <div key={item.id} className="p-6 flex items-center space-x-4">
                    <div className="flex-shrink-0">
                      <div className="relative h-20 w-20 rounded-lg overflow-hidden">
                        <CartImage src={item.image} alt={item.name} className="object-cover" />
                      </div>
                    </div>

                    <div className="flex-1 min-w-0">
                      <h3 className="text-lg font-medium text-gray-900">{item.name}</h3>
                      <p className="text-sm text-green-600 mt-1">{item.category}</p>
                      <p className="text-gray-600 mt-1">
                        ${Number(item.price).toFixed(2)} each
                        <span className="text-xs text-gray-500 ml-2">
                          (₹{convertToINR(item.price)})
                        </span>
                      </p>
                    </div>

                    <div className="flex items-center space-x-2">
                      <button onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="w-8 h-8 flex items-center justify-center border border-gray-300 rounded hover:bg-gray-50 transition-colors">−</button>
                      <span className="w-8 text-center font-medium text-gray-900">{item.quantity}</span>
                      <button onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="w-8 h-8 flex items-center justify-center border border-gray-300 rounded hover:bg-gray-50 transition-colors">+</button>
                    </div>

                    <div className="text-right min-w-24">
                      <p className="text-lg font-semibold text-gray-900">
                        ${(Number(item.price) * item.quantity).toFixed(2)}
                      </p>
                      <p className="text-sm text-gray-500">
                        ₹{convertToINR(Number(item.price) * item.quantity)}
                      </p>
                    </div>

                    <button onClick={() => removeFromCart(item.id)}
                      className="text-red-600 hover:text-red-800 transition-colors flex-shrink-0"
                      title="Remove item">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="lg:col-span-4 mt-8 lg:mt-0">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Order Summary</h2>
              
              {checkoutError && (
                <div className="bg-red-100 text-red-700 p-3 rounded mb-4 text-sm">
                  {checkoutError}
                </div>
              )}

              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Subtotal ({getCartItemsCount()} items)</span>
                  <div className="text-right">
                    <div className="text-gray-900">${getCartTotal().toFixed(2)}</div>
                    <div className="text-xs text-gray-500">₹{convertToINR(getCartTotal())}</div>
                  </div>
                </div>

                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Shipping</span>
                  <div className="text-right">
                    <div className="text-gray-900">${getShippingEstimate().toFixed(2)}</div>
                    <div className="text-xs text-gray-500">₹{convertToINR(getShippingEstimate())}</div>
                  </div>
                </div>

                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Tax</span>
                  <div className="text-right">
                    <div className="text-gray-900">${getTaxEstimate().toFixed(2)}</div>
                    <div className="text-xs text-gray-500">₹{convertToINR(getTaxEstimate())}</div>
                  </div>
                </div>

                <div className="border-t border-gray-200 pt-3">
                  <div className="flex justify-between text-base font-semibold">
                    <span className="text-gray-900">Total</span>
                    <div className="text-right">
                      <div className="text-gray-900">${getTotal().toFixed(2)}</div>
                      <div className="text-sm text-gray-600">₹{convertToINR(getTotal())}</div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-6 space-y-3">
                <button onClick={handleCheckout}
                  disabled={isCheckingOut}
                  className="w-full bg-green-600 text-white py-3 px-4 rounded-lg hover:bg-green-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors duration-200 font-medium flex items-center justify-center">
                  {isCheckingOut ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Processing...
                    </>
                  ) : (
                    `Proceed to Checkout - ₹${convertToINR(getTotal())}`
                  )}
                </button>

                <Link href="/shop"
                  className="w-full inline-flex items-center justify-center px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors">
                  Continue Shopping
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
