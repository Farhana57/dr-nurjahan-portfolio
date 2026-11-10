import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowUpRight,
  CalendarPlus,
  Clock,
  MapPin,
  Phone,
  X,
} from "lucide-react";
import { CONTACT, useLang, type Lang } from "../i18n";
import { Monogram } from "./ui";

export function LangSwitch({
  tone = "dark",
  onChange,
}: {
  tone?: "light" | "dark";
  onChange?: () => void;
}) {
  const { lang, setLang, t } = useLang();

  const handle = (code: Lang) => {
    setLang(code);
    onChange?.();
  };

  return (
    <div
      role="group"
      aria-label={t.language.label}
      className={`inline-flex items-center rounded-full border p-1 ${
        tone === "dark"
          ? "border-white/20 bg-white/[0.08]"
          : "border-sky-200 bg-sky-100/90"
      }`}
    >
      {(["en", "bn"] as const).map((code) => {
        const active = lang === code;
        return (
          <button
            key={code}
            type="button"
            onClick={() => handle(code)}
            aria-pressed={active}
            title={code === "en" ? "English" : "বাংলা"}
            className={`rounded-full px-3 py-1 text-[0.68rem] font-semibold transition-all duration-300 ${
              active
                ? "bg-white text-slate-950 shadow"
                : "text-white/60 hover:text-white"
            }`}
          >
            {code === "en" ? "EN" : "বাংলা"}
          </button>
        );
      })}
    </div>
  );
}

function BrandLink({
  tone = "dark",
  onClick,
}: {
  tone?: "light" | "dark";
  onClick?: () => void;
}) {
  const { t } = useLang();
  return (
    <a
      href="#home"
      onClick={onClick}
      className="flex items-center gap-3"
      aria-label={`${t.brand.name} ${t.brand.alias} — home`}
    >
      <Monogram tone={tone} />
      <span className="leading-none">
        <span className="block font-display text-[1.25rem] tracking-[-0.01em] sm:text-[1.35rem] text-white">
          {t.brand.name}{" "}
          <span className="hidden sm:inline text-white/50">
            {t.brand.alias}
          </span>
        </span>
        <span className="mt-1.5 block text-[0.5rem] font-semibold uppercase tracking-[0.24em] text-white/40">
          {t.brand.tagline}
        </span>
      </span>
    </a>
  );
}

export function Header() {
  const { t } = useLang();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const closeRef = useRef<HTMLButtonElement>(null);

  const links = [
    { id: "home", label: t.nav.home },
    { id: "about", label: t.nav.about },
    { id: "chambers", label: t.nav.chambers },
    { id: "services", label: t.nav.services },
    { id: "stories", label: t.nav.stories },
    { id: "faq", label: t.nav.faq },
  ];

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    const focusTimer = window.setTimeout(() => closeRef.current?.focus(), 150);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
      window.clearTimeout(focusTimer);
    };
  }, [open]);

  return (
    <>
      <div className="bg-[#070B19] text-white/85">
        <div className="shell flex h-9 items-center justify-between gap-4 text-[0.6rem] font-medium uppercase tracking-[0.16em]">
          <span className="hidden items-center gap-1.5 sm:flex">
            <MapPin className="h-3 w-3 text-sky-400" aria-hidden="true" />
            {t.topbar.location}
          </span>
          <span className="flex items-center gap-1.5">
            <Clock className="h-3 w-3 text-sky-400" aria-hidden="true" />
            <span className="sm:hidden">{t.topbar.hoursShort}</span>
            <span className="hidden sm:inline">{t.topbar.hours}</span>
          </span>
          <a
            href={CONTACT.phoneHref}
            className="flex items-center gap-1.5 transition hover:text-white"
          >
            <Phone className="h-3 w-3 text-sky-400" aria-hidden="true" />
            {CONTACT.phoneDisplay}
          </a>
        </div>
      </div>

      {/* ডাইনামিক ফ্লোটিং হেডার যা ভিডিওর মতো স্ক্রোল করলে ছোট ও ফ্লোটিং হবে */}
      <header className="fixed inset-x-0 top-9 z-50 flex justify-center px-4 pt-3 transition-all duration-500">
        <div
          className={`transition-all duration-500 ease-in-out flex items-center justify-between border border-white/10 bg-[#070B19]/95 backdrop-blur-md shadow-2xl ${
            scrolled
              ? "w-full max-w-4xl rounded-full px-6 py-2.5 text-white shadow-[0_20px_50px_rgba(0,0,0,0.4)]"
              : "w-full max-w-7xl rounded-2xl px-6 py-3.5 text-white"
          }`}
        >
          <BrandLink />

          <nav
            aria-label="Primary"
            className="hidden items-center gap-6 lg:flex text-sm font-medium text-white/80"
          >
            {links.map((link) => (
              <a
                key={link.id}
                href={`#${link.id}`}
                className="transition-colors hover:text-white py-1"
              >
                {link.label}
              </a>
            ))}
          </nav>

          <div className="hidden items-center gap-3 lg:flex">
            <LangSwitch tone="dark" />
            <a href="#book" className="rounded-full bg-royal px-4 py-2 text-xs font-semibold text-white shadow transition hover:bg-royal-600 inline-flex items-center gap-1.5">
              <CalendarPlus className="h-3.5 w-3.5" aria-hidden="true" />
              {t.nav.book}
            </a>
          </div>

          <div className="flex items-center gap-2.5 lg:hidden">
            <LangSwitch tone="dark" />
            <button
              type="button"
              onClick={() => setOpen(true)}
              aria-expanded={open}
              aria-controls="mobile-menu"
              aria-label={t.common.openMenu}
              className="relative grid h-10 w-10 place-items-center rounded-full border border-white/20 bg-white/5 text-white transition hover:bg-white/10"
            >
              <span className="flex flex-col gap-[4px]" aria-hidden="true">
                <span className="block h-[1.5px] w-4 rounded-full bg-current" />
                <span className="block h-[1.5px] w-3 rounded-full bg-current" />
                <span className="block h-[1.5px] w-4 rounded-full bg-current" />
              </span>
            </button>
          </div>
        </div>
      </header>

      {/* মোবাইল ফুলস্ক্রিন মেনু ড্রপডাউন */}
      <AnimatePresence>
        {open ? (
          <motion.div
            key="mobile-menu"
            id="mobile-menu"
            role="dialog"
            aria-modal="true"
            aria-label="Menu"
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 z-[80] flex flex-col overflow-hidden bg-[#070B19] text-white lg:hidden"
          >
            <div className="relative flex items-center justify-between px-5 py-5 sm:px-8 border-b border-white/10">
              <BrandLink tone="dark" onClick={() => setOpen(false)} />
              <button
                ref={closeRef}
                type="button"
                onClick={() => setOpen(false)}
                className="grid h-11 w-11 place-items-center rounded-full border border-white/15 text-white transition hover:bg-white/5"
                aria-label={t.common.close}
              >
                <X className="h-5 w-5" aria-hidden="true" />
              </button>
            </div>

            <nav aria-label="Mobile" className="relative flex-1 overflow-y-auto px-5 pt-6 sm:px-8">
              <ul className="flex flex-col gap-4">
                {links.map((link, index) => (
                  <li key={link.id} className="border-b border-white/10 pb-3">
                    <a
                      href={`#${link.id}`}
                      onClick={() => setOpen(false)}
                      className="flex items-center justify-between text-xl font-display text-white/90 hover:text-white"
                    >
                      <span>{link.label}</span>
                      <ArrowUpRight className="h-4 w-4 text-white/40" />
                    </a>
                  </li>
                ))}
              </ul>
            </nav>

            <div className="p-6 border-t border-white/10">
              <a
                href="#book"
                onClick={() => setOpen(false)}
                className="w-full rounded-full bg-royal py-3 text-sm font-semibold text-white flex items-center justify-center gap-2 shadow"
              >
                <CalendarPlus className="h-4 w-4" />
                {t.nav.book}
              </a>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}