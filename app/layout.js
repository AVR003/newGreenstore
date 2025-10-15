// src/app/layout.js
'use client'; // Add this at the top to make it a Client Component
import { Inter } from 'next/font/google'
import './globals.css'
import Header from '@/components/Header'
import { LanguageProvider } from '@/context/LanguageContext'
import { CartProvider } from '@/context/CartContext'

const inter = Inter({ subsets: ['latin'] })

// Remove metadata export since we're using a client component
// export const metadata = {
//   title: 'GreenStore',
//   description: 'Eco packaging store',
// }

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <title>GreenStore - Eco Friendly Shop</title>
        <meta name="description" content="Sustainable products for a greener lifestyle" />
      </head>
      <body className={`${inter.className} min-h-screen bg-gradient-to-br from-green-200 via-lime-100 to-emerald-300`}>
        {/* Remove the style jsx and use regular CSS classes */}
        <div className="h-2 w-full bg-gradient-to-r from-emerald-400 via-lime-400 to-green-400"></div>
        
        <svg className="absolute top-10 right-10 opacity-20 w-32 h-32 pointer-events-none" viewBox="0 0 64 64" fill="none">
          <path d="M32 2C18 18 2 32 32 62C62 32 46 18 32 2Z" fill="#34d399" stroke="#059669" strokeWidth="2"/>
        </svg>

        <LanguageProvider>
          <CartProvider>
            <div className="shadow-lg">
              <Header />
            </div>
            
            <main>
              {children}
            </main>
            
            <footer className="text-center text-white py-6 border-t bg-gradient-to-r from-emerald-500 to-lime-500 shadow-md">
              © 2025 GreenStore. All rights reserved.
            </footer>
          </CartProvider>
        </LanguageProvider>

        <link href="https://fonts.googleapis.com/css2?family=Pacifico&display=swap" rel="stylesheet" />
      </body>
    </html>
  )
}