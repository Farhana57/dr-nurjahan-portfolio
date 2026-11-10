import { About } from "./components/About";
import { Booking } from "./components/Booking";
import { Chambers } from "./components/Chambers";
import { Faq } from "./components/Faq";
import { FloatingActions } from "./components/FloatingActions";
import { Footer } from "./components/Footer";
import { Header } from "./components/Header";
import { Hero } from "./components/Hero";
import { Services } from "./components/Services";
import { Testimonials } from "./components/Testimonials";
import { LangProvider, useLang } from "./i18n";

function Site() {
  const { t, lang } = useLang();

  return (
    <div className={lang === "bn" ? "lang-bn" : "lang-en"}>
      <a
        href="#home"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-ink focus:px-4 focus:py-2 focus:text-sm focus:text-white"
      >
        {t.common.skipToContent}
      </a>

      <Header />

      <main>
        <Hero />
        <About />
        <Chambers />
        <Services />
        <Testimonials />
        <Faq />
        <Booking />
      </main>

      <Footer />
      <FloatingActions />
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
