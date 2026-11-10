import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowLeft, ArrowRight, Quote } from "lucide-react";
import { useLang } from "../i18n";
import { Reveal, SectionHeading, Stars } from "./ui";

const EASE = [0.22, 1, 0.36, 1] as const;

export function Testimonials() {
  const { t } = useLang();
  const reduce = useReducedMotion();
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const count = t.testimonials.items.length;
  const active = t.testimonials.items[index] ?? t.testimonials.items[0];

  const goTo = (next: number) => {
    setIndex((next + count) % count);
  };

  useEffect(() => {
    if (reduce || paused) return;
    const timer = window.setTimeout(() => {
      setIndex((current) => (current + 1) % count);
    }, 8000);
    return () => window.clearTimeout(timer);
  }, [index, count, paused, reduce]);

  return (
    <section
      id="stories"
      className="relative overflow-hidden bg-ink py-20 text-white lg:py-28"
    >
      <div
        className="pointer-events-none absolute inset-0 bg-grid-dark opacity-40"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute -right-32 top-10 h-[420px] w-[420px] rounded-full bg-royal/30 blur-[100px]"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute -left-24 bottom-0 h-[320px] w-[320px] rounded-full bg-royal-500/20 blur-[100px]"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute left-1/2 top-24 h-[560px] w-[560px] -translate-x-1/2 rounded-full border border-white/[0.05]"
        aria-hidden="true"
      />

      <div className="shell relative">
        <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-end lg:gap-16">
          <SectionHeading
            eyebrow={t.testimonials.eyebrow}
            title={t.testimonials.heading}
            tone="dark"
          />
          <Reveal delay={0.12}>
            <p className="max-w-sm text-[0.92rem] leading-[1.9] text-white/55 lg:ml-auto lg:border-l lg:border-white/10 lg:pl-8">
              {t.testimonials.intro}
            </p>
          </Reveal>
        </div>

        <div
          className="mt-12"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          aria-roledescription="carousel"
          aria-label={t.testimonials.heading}
        >
          <div className="relative mx-auto max-w-3xl">
            <Quote
              className="pointer-events-none absolute -left-2 -top-8 h-20 w-20 text-white/[0.06] sm:-left-8 sm:-top-10"
              aria-hidden="true"
            />

            <div className="relative overflow-hidden rounded-[28px] border border-white/10 bg-white/[0.045] p-6 backdrop-blur-sm sm:p-10">
              <AnimatePresence mode="wait" initial={false}>
                <motion.figure
                  key={`${index}-${active.name}`}
                  initial={{ opacity: 0, y: 18 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -14 }}
                  transition={{ duration: 0.45, ease: EASE }}
                  aria-live="polite"
                >
                  <Stars rating={active.rating} />
                  <blockquote className="mt-5 font-display text-[clamp(1.35rem,2.4vw,1.85rem)] leading-[1.52] text-white/90">
                    “{active.quote}”
                  </blockquote>

                  <figcaption className="mt-7 flex flex-wrap items-center gap-4 border-t border-white/10 pt-6">
                    <span
                      className="grid h-11 w-11 place-items-center rounded-full bg-gradient-to-br from-royal to-royal-500 text-[0.95rem] font-semibold text-white ring-1 ring-white/20"
                      aria-hidden="true"
                    >
                      {active.name.trim().charAt(0)}
                    </span>
                    <div>
                      <p className="text-[0.88rem] font-semibold text-white">
                        {active.name}
                      </p>
                      <p className="mt-0.5 text-[0.7rem] text-white/45">
                        {active.meta}
                      </p>
                    </div>
                    <span className="ml-auto rounded-full border border-white/10 bg-white/[0.04] px-3 py-1.5 text-[0.58rem] font-medium uppercase tracking-[0.12em] text-royal-300">
                      {active.service}
                    </span>
                  </figcaption>
                </motion.figure>
              </AnimatePresence>
            </div>

            <div className="mt-6 flex items-center justify-between gap-4">
              <div className="flex items-center gap-2">
                {t.testimonials.items.map((story, dotIndex) => (
                  <button
                    key={story.name}
                    type="button"
                    onClick={() => goTo(dotIndex)}
                    aria-label={`${t.testimonials.slideLabel} ${dotIndex + 1}: ${story.name}`}
                    aria-current={dotIndex === index}
                    className={`h-1.5 rounded-full transition-all duration-300 ${
                      dotIndex === index
                        ? "w-8 bg-royal-300"
                        : "w-2.5 bg-white/20 hover:bg-white/40"
                    }`}
                  />
                ))}
              </div>

              <div className="flex items-center gap-3">
                <span className="font-display text-[0.95rem] text-white/50">
                  {String(index + 1).padStart(2, "0")}{" "}
                  <span className="text-white/25">
                    / {String(count).padStart(2, "0")}
                  </span>
                </span>
                <button
                  type="button"
                  onClick={() => goTo(index - 1)}
                  aria-label={t.testimonials.prev}
                  className="grid h-10 w-10 place-items-center rounded-full border border-white/15 text-white/70 transition hover:border-white/40 hover:bg-white/10 hover:text-white"
                >
                  <ArrowLeft className="h-4 w-4" aria-hidden="true" />
                </button>
                <button
                  type="button"
                  onClick={() => goTo(index + 1)}
                  aria-label={t.testimonials.next}
                  className="grid h-10 w-10 place-items-center rounded-full border border-white/15 text-white/70 transition hover:border-white/40 hover:bg-white/10 hover:text-white"
                >
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </button>
              </div>
            </div>
          </div>

          <p className="mt-8 text-center text-[0.6rem] uppercase tracking-[0.16em] text-white/30">
            {t.testimonials.footnote}
          </p>
        </div>
      </div>
    </section>
  );
}
