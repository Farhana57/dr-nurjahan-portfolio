import {
  ArrowRight,
  Baby,
  HeartPulse,
  Scissors,
  ShieldCheck,
  Sprout,
  Waves,
  type LucideIcon,
} from "lucide-react";
import { useLang } from "../i18n";
import { Reveal, SectionHeading } from "./ui";
const ICONS: LucideIcon[] = [
  Baby,
  HeartPulse,
  Scissors,
  Sprout,
  Waves,
  ShieldCheck,
];
export function Services() {
  const { t } = useLang();
  return (
    <section
      id="services"
      className="relative overflow-hidden bg-white py-20 lg:py-28"
    >
      <div
        className="pointer-events-none absolute right-0 top-1/3 h-[420px] w-[420px] translate-x-1/2 rounded-full bg-mist/80 blur-3xl"
        aria-hidden="true"
      />
      <div className="shell relative">
        <div className="grid gap-8 lg:grid-cols-2 lg:items-end lg:gap-16">
          <SectionHeading
            eyebrow={t.services.eyebrow}
            title={t.services.heading}
          />
          <Reveal delay={0.12}>
            <p className="max-w-md text-[0.92rem] leading-[1.9] text-muted lg:ml-auto lg:border-l lg:border-line lg:pl-8">
              {t.services.intro}
            </p>
          </Reveal>
        </div>

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {t.services.items.map((service, index) => {
            const Icon = ICONS[index % ICONS.length];
            return (
              <Reveal
                key={service.title}
                delay={(index % 3) * 0.07}
                className="h-full"
              >
                <article className="group relative flex h-full flex-col overflow-hidden rounded-[22px] border border-line bg-white p-6 transition-all duration-500 hover:-translate-y-1.5 hover:border-royal/20 hover:shadow-lift sm:p-7">
                  <span
                    className="absolute inset-x-0 top-0 h-[2px] origin-left scale-x-0 bg-gradient-to-r from-royal via-royal-300 to-transparent transition-transform duration-500 group-hover:scale-x-100"
                    aria-hidden="true"
                  />
                  <span
                    className="pointer-events-none absolute -right-2 -top-5 font-display text-[5.2rem] leading-none text-royal/[0.055] transition-colors duration-500 group-hover:text-royal/[0.09]"
                    aria-hidden="true"
                  >
                    0{index + 1}
                  </span>

                  <span className="relative grid h-12 w-12 place-items-center rounded-[14px] bg-mist text-royal ring-1 ring-royal/10 transition-all duration-500 group-hover:bg-royal group-hover:text-white group-hover:shadow-[0_14px_28px_-14px_rgba(30,58,138,0.8)]">
                    <Icon className="h-5 w-5" aria-hidden="true" />
                  </span>

                  <h3 className="mt-6 font-display text-[1.42rem] leading-[1.25] text-ink">
                    {service.title}
                  </h3>
                  <p className="mt-2.5 text-[0.82rem] leading-[1.8] text-muted">
                    {service.description}
                  </p>

                  <div className="mt-auto flex flex-wrap gap-2 pt-5">
                    {service.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full border border-line bg-cloud px-2.5 py-1 text-[0.62rem] font-medium text-muted transition-colors duration-300 group-hover:border-royal/15 group-hover:text-royal"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </article>
              </Reveal>
            );
          })}
        </div>

        <Reveal>
          <div className="relative mt-10 flex flex-col gap-5 overflow-hidden rounded-[24px] border border-royal/15 bg-mist px-6 py-7 sm:flex-row sm:items-center sm:justify-between sm:px-9">
            <HeartPulse
              className="pointer-events-none absolute -bottom-10 right-20 h-44 w-44 text-royal/[0.06]"
              aria-hidden="true"
            />
            <div className="relative">
              <p className="font-display text-[1.55rem] leading-tight text-ink">
                {t.services.ctaTitle}
              </p>
              <p className="mt-1.5 max-w-lg text-[0.8rem] leading-relaxed text-muted">
                {t.services.ctaText}
              </p>
            </div>
            <a
              href="#book"
              className="btn btn-primary relative shrink-0"
            >
              {t.services.ctaButton}
              <ArrowRight aria-hidden="true" />
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
