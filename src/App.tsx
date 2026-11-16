import React, { useState } from "react";
import { About } from "./components/About";
import { Booking } from "./components/Booking";
import { Chambers } from "./components/Chambers";
import { Faq } from "./components/Faq";
import { SuccessStories } from "./components/Stories";
import { FloatingActions } from "./components/FloatingActions";
import { Footer } from "./components/Footer";
import { Header } from "./components/Header";
import { Hero } from "./components/Hero";
import { Services } from "./components/Services";
import { Testimonials } from "./components/Testimonials";
import { TelehealthBanner } from "./components/TelehealthBanner"; 
import { ScrollToTop } from "./ScrollToTop"; 
import { LangProvider, useLang } from "./i18n";

function Site() {
  const { t, lang } = useLang();
  
  // পেজ ভিউ কন্ট্রোল করার জন্য স্টেট (home অথবা success)
  const [currentView, setCurrentView] = useState<"home" | "success">("home");

  // পেজ বা সেকশন পরিবর্তন করার হ্যান্ডলার
  const handleNavigate = (view: "home" | "success") => {
    setCurrentView(view);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className={lang === "bn" ? "lang-bn" : "lang-en"}>
      <a
        href="#home"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-ink focus:px-4 focus:py-2 focus:text-sm focus:text-white"
      >
        {t.common.skipToContent}
      </a>
      
      {/* Header এ currentView এবং onNavigate পাস করা হলো */}
      <Header currentView={currentView} onNavigate={handleNavigate} />

      <main id="home">
        {currentView === "home" ? (
          <>
            <Hero />
            <TelehealthBanner /> 
            <About />
            <Chambers />
            <Services />

            {/* কেস স্টাডি প্রিভিউ সেকশন */}
            <div className="py-12 bg-royal/5 text-center">
              <div className="shell max-w-2xl mx-auto space-y-4">
                <h3 className="text-xl sm:text-2xl font-display font-bold text-royal">
                  {lang === "bn" ? "আমাদের বিশেষ সফল অস্ত্রোপচার কেস স্টাডি" : "Featured Medical Success Story"}
                </h3>
                <p className="text-sm text-muted">
                  {lang === "bn"
                    ? "পূর্বের ৩ সিজারিয়ানের পর চতুর্থ সিজারে জটিল সেন্ট্রাল প্লাসেন্টা প্রিভিয়ার সফল অস্ত্রোপচার সম্পর্কে বিস্তারিত পড়ুন।"
                    : "Read about the successful complex central placenta previa surgery after 3 previous C-sections."}
                </p>
                <button
                  onClick={() => handleNavigate("success")}
                  className="btn btn-primary px-6 py-2.5 text-sm"
                >
                  {lang === "bn" ? "সম্পূর্ণ কেস স্টাডি পড়ুন" : "Read Full Case Study"}
                </button>
              </div>
            </div>

            <Testimonials />
            <Faq />
            <Booking />
          </>
        ) : (
          // যখন Success Story পেজে থাকবে
          <SuccessStories onBackToHome={() => handleNavigate("home")} />
        )}
      </main>

      <Footer />
      <FloatingActions />
      <ScrollToTop /> 
    </div>
  );
}

export default function App() {
  return (
    <LangProvider>
      <Site />
    </LangProvider>
  );
}