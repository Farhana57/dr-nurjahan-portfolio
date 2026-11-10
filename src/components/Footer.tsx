import {
  ArrowUpRight,
  Clock,
  Mail,
  MapPin,
  MessageCircle,
  Phone,
  ShieldAlert,
} from "lucide-react";
import { CONTACT, useLang, whatsappHref } from "../i18n";
import { LangSwitch } from "./Header";
import { Monogram } from "./ui";

export function Footer() {
  const { t } = useLang();
  const year = new Date().getFullYear();

  const links = [
    { id: "home", label: t.nav.home },
    { id: "about", label: t.nav.about },
    { id: "chambers", label: t.nav.chambers },
    { id: "services", label: t.nav.services },
    { id: "stories", label: t.nav.stories },
    { id: "faq", label: t.nav.faq },
    { id: "book", label: t.nav.book },
  ];

  return (
    <footer className="relative overflow-hidden bg-ink text-white">
      <div
        className="pointer-events-none absolute inset-0 bg-grid-dark opacity-30"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute -left-24 -top-24 h-80 w-80 rounded-full bg-royal/25 blur-[100px]"
        aria-hidden="true"
      />

      <div className="shell relative">
        <div className="grid gap-10 py-14 sm:grid-cols-2 lg:grid-cols-[1.5fr_0.9fr_1.1fr_1fr] lg:gap-8 lg:py-16">
          <div>
            <a
              href="#home"
              className="flex items-center gap-3"
              aria-label={`${t.brand.name} ${t.brand.alias} — home`}
            >
              <Monogram tone="dark" />
              <span className="leading-none">
                <span className="block font-display text-[1.4rem] tracking-[-0.01em] text-white">
                  {t.brand.name}{" "}
                  <span className="text-white/40">{t.brand.alias}</span>
                </span>
                <span className="mt-1.5 block text-[0.54rem] font-semibold uppercase tracking-[0.24em] text-white/35">
                  {t.brand.tagline}
                </span>
              </span>
            </a>

            <p className="mt-5 max-w-xs text-[0.78rem] leading-[1.9] text-white/45">
              {t.footer.blurb}
            </p>

            <a
              href="#book"
              className="mt-6 inline-flex items-center gap-2 border-b border-white/20 pb-1 text-[0.72rem] font-semibold text-white/80 transition hover:border-royal-300 hover:text-white"
            >
              {t.nav.book}
              <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
            </a>
          </div>

          <div>
            <h3 className="text-[0.58rem] font-semibold uppercase tracking-[0.22em] text-white/35">
              {t.footer.exploreTitle}
            </h3>
            <ul className="mt-5 space-y-3">
              {links.map((link) => (
                <li key={link.id}>
                  <a
                    href={`#${link.id}`}
                    className="group inline-flex items-center gap-2 text-[0.78rem] text-white/55 transition hover:text-white"
                  >
                    <span className="h-px w-0 bg-royal-300 transition-all duration-300 group-hover:w-3" />
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-[0.58rem] font-semibold uppercase tracking-[0.22em] text-white/35">
              {t.footer.contactTitle}
            </h3>
            <ul className="mt-5 space-y-4 text-[0.76rem] text-white/55">
              <li>
                <a
                  href={CONTACT.phoneHref}
                  className="flex items-start gap-2.5 transition hover:text-white"
                >
                  <Phone className="mt-0.5 h-3.5 w-3.5 shrink-0 text-royal-300" aria-hidden="true" />
                  {CONTACT.phoneDisplay}
                </a>
              </li>
              <li>
                <a
                  href={whatsappHref(t.floating.whatsappMessage)}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-start gap-2.5 transition hover:text-white"
                >
                  <MessageCircle className="mt-0.5 h-3.5 w-3.5 shrink-0 text-royal-300" aria-hidden="true" />
                  {t.floating.whatsappLabel}
                </a>
              </li>
              <li>
                <a
                  href={CONTACT.emailHref}
                  className="flex items-start gap-2.5 break-all transition hover:text-white"
                >
                  <Mail className="mt-0.5 h-3.5 w-3.5 shrink-0 text-royal-300" aria-hidden="true" />
                  {CONTACT.email}
                </a>
              </li>
              <li className="flex items-start gap-2.5 leading-relaxed">
                <MapPin className="mt-0.5 h-3.5 w-3.5 shrink-0 text-royal-300" aria-hidden="true" />
                {t.chambers.cards[0]?.address}
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-[0.58rem] font-semibold uppercase tracking-[0.22em] text-white/35">
              {t.footer.hoursTitle}
            </h3>
            <div className="mt-5 space-y-1.5 text-[0.78rem] text-white/60">
              {t.footer.hoursLines.map((line) => (
                <p key={line} className="flex items-center gap-2">
                  <Clock className="h-3.5 w-3.5 shrink-0 text-royal-300" aria-hidden="true" />
                  {line}
                </p>
              ))}
              <p className="pl-[1.4rem] text-[0.68rem] text-white/30">
                {t.footer.closed}
              </p>
            </div>

            <div className="mt-6 rounded-xl border border-white/10 bg-white/[0.04] p-3.5">
              <p className="flex items-start gap-2 text-[0.66rem] leading-relaxed text-white/45">
                <ShieldAlert className="mt-px h-3.5 w-3.5 shrink-0 text-royal-300/80" aria-hidden="true" />
                {t.footer.emergency}
              </p>
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 py-6">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-[0.65rem] text-white/30">
              © {year} {t.brand.name} {t.brand.alias}. {t.footer.rights}
            </p>
            <div className="flex flex-wrap items-center gap-x-5 gap-y-3">
              <span className="text-[0.6rem] text-white/25">
                {t.footer.credit}
              </span>
              <LangSwitch tone="dark" />
            </div>
          </div>
          <p className="mt-3 max-w-3xl text-[0.6rem] leading-relaxed text-white/25">
            {t.footer.disclaimer}
          </p>
        </div>
      </div>
    </footer>
  );
}
