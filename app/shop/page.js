'use client';
import React, { Suspense } from 'react';
import ShopContent from './ShopContent';

export default function ShopPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center">
          <p className="text-gray-500 text-lg">Loading shop...</p>
        </div>
      }
    >
      <ShopContent />
    </Suspense>
  );
}
