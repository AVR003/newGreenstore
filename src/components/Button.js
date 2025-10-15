import React from 'react';

export default function Button({ children, className = '', ...props }) {
  return (
    <button
      className={
        `bg-gradient-to-r from-emerald-400 to-lime-400 text-white font-bold py-2 px-6 rounded-full shadow-md 
        transition-transform transform hover:scale-105 hover:from-emerald-500 hover:to-lime-500 
        focus:outline-none focus:ring-2 focus:ring-emerald-400 flex items-center gap-2 ` + className
      }
      {...props}
    >
      {/* Example: <span role="img" aria-label="leaf">🌱</span> */}
      {children}
    </button>
  );
}
