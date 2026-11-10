import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { MessageCircle, Phone, Plus } from "lucide-react";
import { CONTACT, useLang, whatsappHref } from "../i18n";
import { Reveal, SectionHeading } from "./ui";

const EASE = [0.22, 1, 0.36, 1] as const;

export function Faq() {
  const { t } = useLang();
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (index: number) => {
    setOpenIndex((current) => (current === index ? null : index));
  };

  return (
    <section id="faq" className="relative bg-white py-20 lg:py-28">
      <div className="shell grid gap-10 lg:grid-cols-[0.82fr_1.18fr] lg:gap-16">
        <div className="self-start lg:sticky lg:top-28">
          <SectionHeading
            eyebrow={t.faq.eyebrow}
            title={t.faq.heading}
            intro={t.faq.intro}
          />

          <Reveal delay={0.15}>
            <div className="mt-9 overflow-hidden rounded-2xl border border-line bg-mist/70">
              <div className="border-b border-line px-5 py-4">
                <p className="text-[0.82rem] font-semibold text-ink">
                  {t.faq.footerText}
                </p>
                <a
                  href={CONTACT.phoneHref}
                  className="mt-2 inline-flex items-center gap-2 font-display text-[1.25rem] text-royal transition hover:text-royal-600"
                >
                  <Phone className="h-4 w-4" aria-hidden="true" />
                  {CONTACT.phoneDisplay}
                </a>
              </div>
              <div className="flex items-center justify-between gap-3 px-5 py-3.5">
                <span className="text-[0.6rem] font-medium uppercase tracking-[0.14em] text-muted">
                  {t.topbar.hours}
                </span>
                <a
                  href={whatsappHref(t.floating.whatsappMessage)}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1.5 text-[0.7rem] font-semibold text-royal transition hover:text-royal-600"
                >
                  <MessageCircle className="h-3.5 w-3.5" aria-hidden="true" />
                  {t.floating.whatsapp}
                </a>
              </div>
            </div>
          </Reveal>
        </div>

        <Reveal delay={0.08}>
          <ul className="border-y border-line">
            {t.faq.items.map((item, index) => {
              const isOpen = openIndex === index;
              return (
                <li key={item.question} className="border-b border-line last:border-b-0">
                  <h3>
                    <button
                      type="button"
                      onClick={() => toggle(index)}
                      aria-expanded={isOpen}
                      aria-controls={`faq-panel-${index}`}
                      id={`faq-trigger-${index}`}
                      className="group flex w-full items-start justify-between gap-5 py-6 text-left"
                    >
                      <span className="flex items-start gap-4">
                        <span
                          className="mt-1 font-display text-[0.95rem] italic text-royal/45"
                          aria-hidden="true"
                        >
                          0{index + 1}
                        </span>
                        <span
                          className={`font-display text-[1.15rem] leading-snug transition-colors duration-300 sm:text-[1.3rem] ${
                            isOpen
                              ? "text-royal"
                              : "text-ink group-hover:text-royal"
                          }`}
                        >
                          {item.question}
                        </span>
                      </span>
                      <span
                        className={`mt-0.5 grid h-8 w-8 shrink-0 place-items-center rounded-full border transition-all duration-300 ${
                          isOpen
                            ? "rotate-45 border-royal bg-royal text-white"
                            : "border-line bg-white text-royal group-hover:border-royal/40 group-hover:bg-mist"
                        }`}
                        aria-hidden="true"
                      >
                        <Plus className="h-4 w-4" />
                      </span>
                    </button>
                  </h3>

                  <AnimatePresence initial={false}>
                    {isOpen ? (
                      <motion.div
                        key="content"
                        id={`faq-panel-${index}`}
                        role="region"
                        aria-labelledby={`faq-trigger-${index}`}
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.35, ease: EASE }}
                        className="overflow-hidden"
                      >
                        <p className="pb-6 pl-9 pr-10 text-[0.84rem] leading-[1.9] text-muted">
                          {item.answer}
                        </p>
                      </motion.div>
                    ) : null}
                  </AnimatePresence>
                </li>
              );
            })}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
