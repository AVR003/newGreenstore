'use client';
import React, { Suspense } from 'react';
import SuccessContent from './SuccessContent';

export const dynamic = 'force-dynamic';

export default function SuccessPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center">
          <p className="text-gray-500 text-lg">Loading confirmation...</p>
        </div>
      }
    >
      <SuccessContent />
    </Suspense>
  );
}
