import { MessageCircle, PhoneCall } from "lucide-react";
import { CONTACT, useLang, whatsappHref } from "../i18n";

export function FloatingActions() {
  const { t } = useLang();

  return (
    <div className="fixed bottom-5 right-4 z-40 flex flex-col items-end gap-3 sm:bottom-7 sm:right-6">
      <a
        href={whatsappHref(t.floating.whatsappMessage)}
        target="_blank"
        rel="noreferrer"
        aria-label={t.floating.whatsappLabel}
        className="group relative grid h-[3.4rem] w-[3.4rem] place-items-center rounded-full bg-[#25D366] text-white shadow-[0_18px_38px_-14px_rgba(37,211,102,0.8)] transition-transform duration-300 hover:scale-105"
      >
        <span
          className="absolute inset-0 animate-ping rounded-full bg-[#25D366] opacity-30 [animation-duration:3s]"
          aria-hidden="true"
        />
        <MessageCircle className="relative h-5 w-5" aria-hidden="true" />
        <span className="pointer-events-none absolute right-full mr-3 hidden whitespace-nowrap rounded-full bg-ink px-3 py-1.5 text-[0.66rem] font-medium text-white opacity-0 shadow-lg transition-all duration-300 group-hover:opacity-100 group-focus-visible:opacity-100 md:block">
          {t.floating.whatsappLabel}
        </span>
      </a>

      <a
        href={CONTACT.phoneHref}
        aria-label={t.floating.callLabel}
        className="group relative grid h-[3.4rem] w-[3.4rem] place-items-center rounded-full bg-ink text-white shadow-[0_18px_38px_-14px_rgba(10,25,47,0.85)] transition-transform duration-300 hover:scale-105 hover:bg-royal"
      >
        <PhoneCall className="h-5 w-5" aria-hidden="true" />
        <span className="pointer-events-none absolute right-full mr-3 hidden whitespace-nowrap rounded-full bg-ink px-3 py-1.5 text-[0.66rem] font-medium text-white opacity-0 shadow-lg transition-all duration-300 group-hover:opacity-100 group-focus-visible:opacity-100 md:block">
          {t.floating.callLabel}
        </span>
      </a>
    </div>
  );
}
