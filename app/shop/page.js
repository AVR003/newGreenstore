'use client';
export const dynamic = 'force-dynamic';

import React, { Suspense } from 'react';
import ShopContent from './ShopContent';

export default function ShopPage() {
  return (
    <Suspense fallback={<div>Loading shop...</div>}>
      <ShopContent />
    </Suspense>
  );
}
