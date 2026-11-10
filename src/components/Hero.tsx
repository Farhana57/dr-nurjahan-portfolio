import { motion, useReducedMotion, type Variants } from "framer-motion";
import {
  ArrowUpRight,
  BadgeCheck,
  CalendarPlus,
  Check,
  Clock,
  Languages,
  MapPin,
} from "lucide-react";
import portrait from "../assets/doctor.jpg";
import { useLang } from "../i18n";

const EASE = [0.22, 1, 0.36, 1] as const;

const container: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.11, delayChildren: 0.12 } },
};

const item: Variants = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: { duration: 0.9, ease: EASE } },
};

export function Hero() {
  const { t, lang } = useLang();
  const reduce = useReducedMotion();

  return (
    <section
      id="home"
      className="relative isolate overflow-hidden bg-white pb-16 pt-10 sm:pt-14 lg:pb-24 lg:pt-16"
    >
      <div
        className="pointer-events-none absolute inset-0 -z-10 bg-grid opacity-70 [mask-image:radial-gradient(ellipse_at_75%_20%,black,transparent_62%)]"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute -right-40 -top-32 -z-10 h-[520px] w-[520px] rounded-full bg-royal/[0.07] blur-[100px]"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute -bottom-40 left-1/4 -z-10 h-[380px] w-[380px] rounded-full bg-royal-100/60 blur-[110px]"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute left-0 top-0 -z-10 h-full w-px bg-gradient-to-b from-transparent via-line to-transparent lg:left-8"
        aria-hidden="true"
      />

      <div className="shell grid items-center gap-14 lg:grid-cols-[1.03fr_0.97fr] lg:gap-12">
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="relative z-10"
        >
          <motion.div
            variants={item}
            className="flex flex-wrap items-center gap-x-4 gap-y-3"
          >
            <span className="eyebrow">{t.hero.eyebrow}</span>
            <span className="inline-flex items-center gap-2 rounded-full border border-royal/15 bg-mist/80 px-3 py-1.5 text-[0.6rem] font-semibold uppercase tracking-[0.14em] text-royal">
              <span className="relative flex h-1.5 w-1.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-500 opacity-60" />
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-500" />
              </span>
              {t.topbar.note}
            </span>
          </motion.div>

          <motion.h1
            variants={item}
            className="display-hero hero-title mt-6 text-[clamp(2.9rem,6.3vw,4.85rem)] text-ink"
          >
            <span className="block">{t.hero.titleA}</span>
            <span
              className={`block text-royal ${lang === "bn" ? "" : "italic"}`}
            >
              {t.hero.titleB}
            </span>
            <span className="block">{t.hero.titleC}</span>
          </motion.h1>

          <motion.p
            variants={item}
            className="mt-7 max-w-[34rem] text-[0.94rem] leading-[1.9] text-muted sm:text-[0.98rem]"
          >
            {t.hero.description}
          </motion.p>

          <motion.div
            variants={item}
            className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center"
          >
            <a href="#book" className="btn btn-primary w-full sm:w-auto">
              <CalendarPlus aria-hidden="true" />
              {t.hero.primaryCta}
            </a>
            <a href="#chambers" className="btn btn-outline w-full sm:w-auto">
              {t.hero.secondaryCta}
              <ArrowUpRight aria-hidden="true" />
            </a>
          </motion.div>

          <motion.ul
            variants={item}
            className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3"
          >
            {t.hero.assurances.map((line) => (
              <li
                key={line}
                className="flex items-center gap-2 text-[0.75rem] font-medium text-muted"
              >
                <span className="grid h-5 w-5 place-items-center rounded-full bg-royal/10 text-royal">
                  <Check className="h-3 w-3" aria-hidden="true" />
                </span>
                {line}
              </li>
            ))}
          </motion.ul>

          <motion.div
            variants={item}
            className="mt-9 flex flex-wrap items-center gap-x-5 gap-y-3 border-t border-line pt-6 text-[0.68rem] font-medium text-muted"
          >
            <span className="flex items-center gap-1.5">
              <MapPin className="h-3.5 w-3.5 text-royal" aria-hidden="true" />
              {t.hero.experienceSub}
            </span>
            <span className="h-1 w-1 rounded-full bg-royal/30" aria-hidden="true" />
            <span className="flex items-center gap-1.5">
              <Languages className="h-3.5 w-3.5 text-royal" aria-hidden="true" />
              বাংলা · English
            </span>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.05, delay: 0.28, ease: EASE }}
          className="relative mx-auto w-full max-w-[410px] lg:mr-2 lg:max-w-[440px]"
        >
          <div
            className="absolute -inset-3 rounded-t-[999px] rounded-b-[46px] border border-royal/20"
            aria-hidden="true"
          />
          <div
            className="absolute -inset-7 rounded-t-[999px] rounded-b-[56px] bg-gradient-to-b from-royal/[0.08] via-transparent to-royal/[0.03] blur-2xl"
            aria-hidden="true"
          />

          <div className="group relative overflow-hidden rounded-t-[999px] rounded-b-[38px] bg-mist shadow-lift">
            <div className="aspect-[4/5] overflow-hidden">
              <motion.img
                src={portrait}
                alt={t.hero.imageAlt}
                initial={{
                  scale: reduce ? 1.02 : 1.16,
                  opacity: 0,
                }}
                animate={{ scale: 1.02, opacity: 1 }}
                transition={{ duration: 1.6, delay: 0.4, ease: EASE }}
                className="h-full w-full origin-top object-cover object-top transition-transform duration-[1200ms] ease-out group-hover:scale-[1.1]"
                draggable={false}
              />
            </div>

            <div
              className="pointer-events-none absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-ink/60 via-ink/15 to-transparent"
              aria-hidden="true"
            />

            <div className="absolute inset-x-4 bottom-4 rounded-2xl border border-white/40 bg-white/90 px-4 py-3.5 backdrop-blur-md transition-transform duration-500 group-hover:-translate-y-1 sm:inset-x-5 sm:bottom-5">
              <div className="flex items-center gap-2 text-[0.58rem] font-semibold uppercase tracking-[0.18em] text-royal">
                <BadgeCheck className="h-3.5 w-3.5" aria-hidden="true" />
                {t.hero.badge}
              </div>
              <p className="mt-1.5 font-display text-[1.35rem] leading-tight text-ink">
                Dr. Nurjahan (Mukti)
              </p>
              <p className="mt-0.5 text-[0.68rem] leading-relaxed text-muted">
                {t.hero.role}
              </p>
            </div>
          </div>

          <div className="float-soft absolute -right-3 top-16 hidden w-[9.5rem] rounded-2xl border border-line bg-white/95 p-4 text-center shadow-soft backdrop-blur sm:block lg:-right-7">
            <span className="mx-auto grid h-9 w-9 place-items-center rounded-full bg-mist text-royal">
              <BadgeCheck className="h-4 w-4" aria-hidden="true" />
            </span>
            <span className="mt-2 block font-display text-[2rem] leading-none text-ink">
              {t.hero.experienceValue}
            </span>
            <span className="mt-1 block text-[0.59rem] font-semibold uppercase leading-snug tracking-[0.12em] text-muted">
              {t.hero.experienceLabel}
            </span>
          </div>

          <div className="absolute -left-3 bottom-28 hidden w-[12.5rem] rounded-2xl border border-line bg-white/95 p-4 shadow-soft backdrop-blur-md sm:block lg:-left-8">
            <div className="flex items-center gap-2 text-[0.56rem] font-semibold uppercase tracking-[0.16em] text-royal">
              <Clock className="h-3.5 w-3.5" aria-hidden="true" />
              {t.hero.cardLabel}
            </div>
            <p className="mt-2 font-display text-[1.35rem] leading-none text-ink">
              {t.hero.cardHours}
            </p>
            <p className="mt-1.5 text-[0.65rem] text-muted">{t.hero.cardDays}</p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
