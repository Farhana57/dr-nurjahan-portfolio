import { Award, Quote } from "lucide-react";
import { useLang } from "../i18n";
import { Counter, Reveal, SectionHeading } from "./ui";
export function About() {
  const { t } = useLang();
  return (
    <section
      id="about"
      className="relative overflow-hidden border-t border-line bg-white py-20 lg:py-28"
    >
      <div
        className="pointer-events-none absolute -left-32 top-24 h-[360px] w-[360px] rounded-full bg-mist blur-3xl"
        aria-hidden="true"
      />
      <div className="shell relative">
        <div className="grid gap-12 lg:grid-cols-[0.95fr_1.05fr] lg:gap-20">
          <div>
            <SectionHeading
              eyebrow={t.about.eyebrow}
              title={t.about.heading}
            />
            <Reveal delay={0.12}>
              <figure className="mt-10 max-w-md border-l border-royal/25 pl-6">
                <Quote
                  className="h-5 w-5 text-royal/40"
                  aria-hidden="true"
                />
                <blockquote className="mt-3 font-display text-[1.55rem] italic leading-[1.4] text-ink/85 sm:text-[1.8rem]">
                  {t.about.pullQuote}
                </blockquote>
                <figcaption className="mt-4 text-[0.6rem] font-semibold uppercase tracking-[0.2em] text-muted">
                  {t.about.signatureName}
                </figcaption>
              </figure>
            </Reveal>
          </div>

          <div className="lg:pt-12">
            {t.about.paragraphs.map((paragraph, index) => (
              <Reveal key={index} delay={0.06 * index}>
                <p
                  className={`max-w-[38rem] text-[0.94rem] leading-[1.95] text-muted ${
                    index > 0 ? "mt-5" : ""
                  }`}
                >
                  {paragraph}
                </p>
              </Reveal>
            ))}

            <Reveal delay={0.24}>
              <div className="mt-9 flex items-center gap-5">
                <span className="h-px w-16 bg-line" aria-hidden="true" />
                <div>
                  <p className="font-display text-[1.7rem] italic leading-none text-ink">
                    {t.about.signatureName}
                  </p>
                  <p className="mt-2 text-[0.58rem] font-semibold uppercase tracking-[0.18em] text-muted">
                    {t.about.signatureRole}
                  </p>
                </div>
              </div>
            </Reveal>
          </div>
        </div>

        <Reveal>
          <div className="relative mt-16 overflow-hidden rounded-[28px] bg-ink px-6 pb-10 pt-7 text-white sm:px-10 lg:mt-20">
            <div
              className="pointer-events-none absolute inset-0 bg-grid-dark opacity-40"
              aria-hidden="true"
            />
            <div
              className="pointer-events-none absolute -right-24 -top-28 h-72 w-72 rounded-full bg-royal/50 blur-[80px]"
              aria-hidden="true"
            />
            <div className="relative">
              <div className="flex items-center justify-between gap-4 border-b border-white/10 pb-5">
                <h3 className="text-[0.62rem] font-semibold uppercase tracking-[0.24em] text-white/50">
                  {t.about.statsTitle}
                </h3>
                <span className="h-px flex-1 bg-white/10" aria-hidden="true" />
                <span className="font-display text-[1rem] italic text-royal-300">
                  {t.topbar.location}
                </span>
              </div>

              <div className="mt-8 grid grid-cols-2 gap-y-9 sm:grid-cols-4 sm:gap-0">
                {t.about.stats.map((stat, index) => (
                  <div
                    key={stat.label}
                    className={`sm:px-6 ${
                      index > 0
                        ? "sm:border-l sm:border-white/10"
                        : "sm:pl-0"
                    }`}
                  >
                    <p className="font-display text-[clamp(2.2rem,4vw,2.9rem)] leading-none text-white">
                      <Counter value={stat.value} suffix={stat.suffix} />
                    </p>
                    <p className="mt-3 text-[0.6rem] font-semibold uppercase leading-relaxed tracking-[0.16em] text-white/45">
                      {stat.label}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Reveal>

        <div className="mt-14">
          <Reveal>
            <h3 className="flex items-center gap-3 font-sans text-[0.62rem] font-semibold uppercase tracking-[0.24em] text-muted">
              <Award className="h-3.5 w-3.5 text-royal" aria-hidden="true" />
              {t.about.credentialsTitle}
            </h3>
          </Reveal>
          <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {t.about.credentials.map((credential, index) => (
              <Reveal key={credential.title} delay={index * 0.05} className="h-full">
                <div className="group h-full rounded-2xl border border-line bg-cloud p-5 transition-all duration-300 hover:-translate-y-0.5 hover:border-royal/25 hover:bg-white hover:shadow-soft">
                  <span className="grid h-8 w-8 place-items-center rounded-full bg-mist text-royal transition group-hover:bg-royal group-hover:text-white">
                    <Award className="h-4 w-4" aria-hidden="true" />
                  </span>
                  <p className="mt-4 font-display text-[1.18rem] leading-tight text-ink">
                    {credential.title}
                  </p>
                  <p className="mt-1.5 text-[0.7rem] leading-relaxed text-muted">
                    {credential.detail}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
