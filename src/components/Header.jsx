'use client';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useLanguage } from '@/context/LanguageContext';

export default function Header() {
  const { lang, setLang, t } = useLanguage();
  const [cartCount, setCartCount] = useState(0);
  const [user, setUser] = useState(null);
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');

  // Load user and cart count from localStorage
  useEffect(() => {
    const checkUser = () => {
      const savedUser = localStorage.getItem('user');
      if (savedUser) {
        setUser(JSON.parse(savedUser));
      } else {
        setUser(null);
      }
    };

    const updateCartCount = () => {
      const savedCart = localStorage.getItem('greenstore-cart');
      if (savedCart) {
        const cart = JSON.parse(savedCart);
        const count = cart.reduce((total, item) => total + item.quantity, 0);
        setCartCount(count);
      } else {
        setCartCount(0);
      }
    };

    // Check immediately on component mount
    checkUser();
    updateCartCount();

    // Listen for custom events
    const handleLoginEvent = () => {
      checkUser();
    };

    const handleCartUpdate = () => {
      updateCartCount();
    };

    window.addEventListener('userLogin', handleLoginEvent);
    window.addEventListener('cartUpdated', handleCartUpdate);
    window.addEventListener('storage', () => {
      checkUser();
      updateCartCount();
    });
    
    return () => {
      window.removeEventListener('userLogin', handleLoginEvent);
      window.removeEventListener('cartUpdated', handleCartUpdate);
      window.removeEventListener('storage', checkUser);
    };
  }, []);

  useEffect(() => {
    const onLang = () => setLang(localStorage.getItem('language') || 'en');
    window.addEventListener('languagechange', onLang);

    return () => {
      window.removeEventListener('languagechange', onLang);
    };
  }, [setLang]);

  function handleLangChange(e) {
    setLang(e.target.value);
  }

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/shop?q=${encodeURIComponent(searchQuery.trim())}`);
    }
    setSearchQuery('');
  };

  const handleLogout = () => {
    localStorage.removeItem('user');
    setUser(null);
    router.push('/');
  };

  return (
    <header className="bg-white shadow">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <Link href="/">
            <span className="text-2xl font-bold text-green-700 cursor-pointer">
              {t('heroTitle')}
            </span>
          </Link>
        </div>

        {/* Search bar (center) */}
        <form onSubmit={handleSearch} className="flex items-center flex-1 max-w-xl mx-4">
          <input
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={t('search')}
            className="w-full border rounded-l-lg px-3 py-2 focus:outline-none"
            aria-label="Search products"
          />
          <button
            type="submit"
            className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-r-lg"
            aria-label="Search"
          >
            🔍
          </button>
        </form>

        <nav className="flex items-center gap-4">
          {/* Welcome message for logged in users */}
          {user && (
            <span className="text-gray-700 font-medium">
              Welcome, {user.name}!
            </span>
          )}

          <Link href="/" className="text-gray-800 font-semibold hover:text-green-700">
            {t('home')}
          </Link>

          <Link href="/shop" className="text-gray-800 font-semibold hover:text-green-700">
            {t('shop')}
          </Link>

          <Link href="/cart" className="text-gray-800 font-semibold hover:text-green-700 flex items-center">
            {t('cart')}
            <span className="ml-2 bg-green-600 text-white px-2 py-0.5 rounded-full text-xs">
              {cartCount}
            </span>
          </Link>

          {/* Login/Logout button */}
          {user ? (
            <button
              onClick={handleLogout}
              className="text-gray-800 font-semibold hover:text-green-700"
            >
              Logout
            </button>
          ) : (
            <Link href="/login" className="text-gray-800 font-semibold hover:text-green-700">
              {t('login')}
            </Link>
          )}

          <select
            value={lang}
            onChange={handleLangChange}
            className="border border-gray-300 rounded px-2 py-1 text-sm font-medium text-gray-700"
          >
            <option value="en">English</option>
            <option value="hi">हिन्दी</option>
            <option value="fr">Français</option>
          </select>
        </nav>
      </div>
    </header>
  );
}