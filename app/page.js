'use client';
import { useContext, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { LanguageContext } from '@/context/LanguageContext';

export default function Home() {
  const { t } = useContext(LanguageContext);
  const router = useRouter();
  const [selectedService, setSelectedService] = useState('');

  const handleServiceChange = (e) => {
    const service = e.target.value;
    setSelectedService(service);
    
    // Navigate based on selected service
    if (service === 'business-packaging') {
      router.push('/shop?category=packaging');
    } else if (service === 'retail-solutions') {
      router.push('/shop?category=retail');
    } else if (service === 'custom-orders') {
      router.push('/contact');
    } else if (service === 'personal-solutions') {
      router.push('/personal-products');
    }
  };

  const handleCategoryClick = (category) => {
    if (category === 'personal') {
      router.push('/personal-products');
    } else if (category === 'business') {
      router.push('/business-products');
    } else if (category === 'premium') {
      router.push('/premium-products');
    } else {
      router.push(`/shop?category=${category}`);
    }
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section with Background Image */}
      <section 
        className="relative h-screen flex items-center justify-center text-center"
        style={{
          backgroundImage: "url('/homepage-bg.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat"
        }}
      >
        {/* Dark overlay for better text readability */}
        <div className="absolute inset-0 bg-black/40"></div>
        
        <div className="relative z-10 text-white px-6 max-w-4xl">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">GREENSTORE</h1>
          
          {/* Category Navigation - Now Functional */}
          <div className="flex items-center space-x-8 mb-8">
            <button 
              onClick={() => handleCategoryClick('packaging')}
              className="text-lg font-medium hover:text-green-200 transition-colors"
            >
              PACKAGING &gt;
            </button>
            <button 
              onClick={() => handleCategoryClick('food-service')}
              className="text-lg font-medium hover:text-green-200 transition-colors"
            >
              FOOD SERVICE &gt;
            </button>
            <button 
              onClick={() => handleCategoryClick('home-office')}
              className="text-lg font-medium hover:text-green-200 transition-colors"
            >
              HOME &amp; OFFICE &gt;
            </button>
          </div>
          
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 mb-8">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">SHOP ECO-FRIENDLY PRODUCTS ONLINE</h2>
            <p className="text-xl mb-6 opacity-90">
              Discover sustainable packaging solutions from wherever you are. Fast, simple, and completely online!
            </p>
            <Link 
              className="bg-white text-green-700 px-8 py-4 rounded-lg text-lg font-bold hover:bg-gray-100 transition-colors inline-block" 
              href="/shop"
            >
              GET STARTED!
            </Link>
          </div>
          
          {/* Functional Services Dropdown */}
          <div className="flex items-center space-x-4">
            <span className="text-lg">Services</span>
            <select 
              value={selectedService}
              onChange={handleServiceChange}
              className="bg-white/20 border border-white/30 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-white cursor-pointer"
            >
              <option value="" className="text-gray-800">Choose a service...</option>
              <option value="business-packaging" className="text-gray-800">Business Packaging</option>
              <option value="retail-solutions" className="text-gray-800">Retail Solutions</option>
              <option value="personal-solutions" className="text-gray-800">Personal Solutions</option>
              <option value="custom-orders" className="text-gray-800">Custom Orders</option>
            </select>
          </div>
        </div>
      </section>

      {/* Solutions Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">SUSTAINABLE SOLUTIONS YOU WANT</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              GreenStore covers all your unique needs by offering several eco-friendly product options for businesses and individuals.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Personal Solutions */}
            <div className="bg-gray-50 rounded-2xl p-8 hover:shadow-lg transition-all duration-300">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-6">
                <span className="text-2xl">🏠</span>
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-4">PERSONAL SOLUTIONS</h3>
              <p className="text-gray-600 mb-4">
                With GreenStore&apos;s personal eco-solutions, you can start your sustainable journey with our carefully curated home products.
              </p>
              <button 
                onClick={() => handleCategoryClick('personal')}
                className="text-green-600 font-semibold hover:underline"
              >
                Explore Personal Products →
              </button>
            </div>

            {/* Business Solutions */}
            <div className="bg-gray-50 rounded-2xl p-8 hover:shadow-lg transition-all duration-300">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-6">
                <span className="text-2xl">🏢</span>
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-4">BUSINESS SOLUTIONS</h3>
              <p className="text-gray-600 mb-4">
                GreenStore treats your business needs with the same care we do for the environment. We offer customized packaging solutions.
              </p>
              <button 
                onClick={() => handleCategoryClick('business')}
                className="text-green-600 font-semibold hover:underline"
              >
                Explore Business Products →
              </button>
            </div>

            {/* Premium Solutions */}
            <div className="bg-gray-50 rounded-2xl p-8 hover:shadow-lg transition-all duration-300">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-6">
                <span className="text-2xl">⭐</span>
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-4">PREMIUM SOLUTIONS</h3>
              <p className="text-gray-600 mb-4">
                Premium eco-products with GreenStore means getting personalized attention and access to exclusive sustainable benefits.
              </p>
              <button 
                onClick={() => handleCategoryClick('premium')}
                className="text-green-600 font-semibold hover:underline"
              >
                Explore Premium Products →
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-green-600 text-white">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-3xl mb-4">🚚</div>
              <h3 className="text-xl font-bold mb-2">Fast Shipping</h3>
              <p className="opacity-90">Carbon-neutral delivery across the country</p>
            </div>
            <div>
              <div className="text-3xl mb-4">🌍</div>
              <h3 className="text-xl font-bold mb-2">Eco-Certified</h3>
              <p className="opacity-90">All products meet environmental standards</p>
            </div>
            <div>
              <div className="text-3xl mb-4">💚</div>
              <h3 className="text-xl font-bold mb-2">Quality Guarantee</h3>
              <p className="opacity-90">30-day satisfaction guarantee on all products</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}