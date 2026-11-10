// src/ScrollToTop.tsx
import React from 'react';

export const ScrollToTop: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <button
      onClick={scrollToTop}
      // এখানে bottom-6 এর বদলে bottom-20 বা প্রয়োজনমতো বাড়িয়ে দেওয়া হয়েছে যাতে ফ্লোটিং অ্যাকশন বাটনের উপরে থাকে
      className="fixed bottom-20 right-6 z-[9999] bg-teal-600 hover:bg-teal-700 text-white p-3 rounded-full shadow-2xl transition-all duration-300 flex items-center justify-center focus:outline-none cursor-pointer"
      title="Scroll to top"
    >
      <svg
        className="w-6 h-6"
        fill="none"
        stroke="currentColor"
        strokeWidth={2.5}
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path strokeLinecap="round" strokeLinejoin="round" d="M5 15l7-7 7 7" />
      </svg>
    </button>
  );
};