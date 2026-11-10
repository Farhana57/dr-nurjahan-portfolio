import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { bn } from "./content/bn";
import { en } from "./content/en";

export type Lang = "en" | "bn";
export type Dictionary = typeof en;

type LangContextValue = {
  lang: Lang;
  setLang: (lang: Lang) => void;
  t: Dictionary;
};

const dictionaries: Record<Lang, Dictionary> = { en, bn };
const STORAGE_KEY = "drnurjahan.lang";

const LangContext = createContext<LangContextValue | null>(null);

function getInitialLang(): Lang {
  if (typeof window === "undefined") return "en";
  try {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    if (stored === "en" || stored === "bn") return stored;
  } catch {
    /* private mode — fall back to the browser preference */
  }
  return window.navigator.language?.toLowerCase().startsWith("bn") ? "bn" : "en";
}

export function LangProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>(getInitialLang);
  const t = dictionaries[lang];

  const setLang = useCallback((next: Lang) => setLangState(next), []);

  useEffect(() => {
    document.documentElement.lang = lang;
    /* Also mark the body so portalled content (the success modal) inherits
       the Bangla typeface instead of the Latin display font. */
    document.body.classList.toggle("lang-bn", lang === "bn");
    document.title = t.meta.title;
    document
      .querySelector('meta[name="description"]')
      ?.setAttribute("content", t.meta.description);
    try {
      window.localStorage.setItem(STORAGE_KEY, lang);
    } catch {
      /* storage may be unavailable */
    }
  }, [lang, t]);

  const value = useMemo(() => ({ lang, setLang, t }), [lang, setLang, t]);

  return <LangContext.Provider value={value}>{children}</LangContext.Provider>;
}

export function useLang() {
  const context = useContext(LangContext);
  if (!context) {
    throw new Error("useLang must be used inside a LangProvider");
  }
  return context;
}

export const CONTACT = {
  phoneDisplay: "+880 1712-345678",
  phoneHref: "tel:+8801712345678",
  email: "appointments@drnurjahan.com",
  emailHref: "mailto:appointments@drnurjahan.com",
  whatsapp: "https://wa.me/8801712345678",
} as const;

export function mapHref(query: string) {
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`;
}

export function whatsappHref(message: string) {
  return `${CONTACT.whatsapp}?text=${encodeURIComponent(message)}`;
}
