'use client';
import React, { createContext, useState, useEffect, useContext } from 'react';

export const LanguageContext = createContext({
  lang: 'en',
  setLang: () => {},
  t: (k) => k
});

const translations = {
  en: {
    heroTitle: "GreenStore",
    heroSubtitle: "Eco Packaging for a Sustainable Future 🌱",
    shopNow: "Shop Now",
    categories: "Shop by Category",
    ourProducts: "Our Products",
    newsletterTitle: "Stay Updated",
    newsletterDesc: "Get eco tips & special offers straight to your inbox.",
    subscribe: "Subscribe",
    footerAbout: "Eco-friendly packaging for every business.",
    quickLinks: "Quick Links",
    followUs: "Follow Us",
    home: "Home",
    shop: "Shop",
    cart: "Cart",
    login: "Login",
    addToCart: "Add",
    search: "Search products..."
  },
  hi: {
    heroTitle: "ग्रीनस्टोर",
    heroSubtitle: "एक स्थायी भविष्य के लिए इको पैकेजिंग 🌱",
    shopNow: "अभी खरीदें",
    categories: "श्रेणी के अनुसार खरीदें",
    ourProducts: "हमारे उत्पाद",
    newsletterTitle: "अपडेट रहें",
    newsletterDesc: "ईको टिप्स और विशेष ऑफर सीधे अपने इनबॉक्स में प्राप्त करें।",
    subscribe: "सदस्यता लें",
    footerAbout: "हर व्यवसाय के लिए पर्यावरण के अनुकूल पैकेजिंग।",
    quickLinks: "त्वरित लिंक",
    followUs: "हमें फॉलो करें",
    home: "होम",
    shop: "दुकान",
    cart: "कार्ट",
    login: "लॉगिन",
    addToCart: "जोड़ें",
    search: "उत्पाद खोजें..."
  },
  fr: {
    heroTitle: "GreenStore",
    heroSubtitle: "Emballage écologique pour un avenir durable 🌱",
    shopNow: "Acheter maintenant",
    categories: "Acheter par catégorie",
    ourProducts: "Nos Produits",
    newsletterTitle: "Restez Informé",
    newsletterDesc: "Recevez des conseils écologiques et des offres spéciales par e-mail.",
    subscribe: "S'abonner",
    footerAbout: "Emballage écologique pour chaque entreprise.",
    quickLinks: "Liens Rapides",
    followUs: "Suivez-nous",
    home: "Accueil",
    shop: "Boutique",
    cart: "Panier",
    login: "Connexion",
    addToCart: "Ajouter",
    search: "Rechercher des produits..."
  }
};

export function LanguageProvider({ children }) {
  const [lang, setLang] = useState('en');

  useEffect(() => {
    const saved = localStorage.getItem('language');
    if (saved) setLang(saved);
  }, []);

  useEffect(() => {
    localStorage.setItem('language', lang);
    // small event so other listeners can react if needed
    window.dispatchEvent(new Event('languagechange'));
  }, [lang]);

  const t = (key) => {
    return (translations[lang] && translations[lang][key]) || translations.en[key] || key;
  };

  return (
    <LanguageContext.Provider value={{ lang, setLang, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

// ✅ ADD THIS HOOK - This was missing!
export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
