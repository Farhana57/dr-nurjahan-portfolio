import {
  ArrowUpRight,
  Clock,
  Info,
  MapPin,
  Navigation,
  Phone,
} from "lucide-react";
import { CONTACT, mapHref, useLang } from "../i18n";
import { Reveal, SectionHeading } from "./ui";

function MapArtwork({ variant }: { variant: number }) {
  return (
    <svg
      viewBox="0 0 640 260"
      preserveAspectRatio="none"
      className="absolute inset-0 h-full w-full"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id={`map-bg-${variant}`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#F1F5FC" />
          <stop offset="1" stopColor="#DFE9F8" />
        </linearGradient>
        <pattern
          id={`map-grid-${variant}`}
          width="32"
          height="32"
          patternUnits="userSpaceOnUse"
        >
          <path
            d="M32 0H0V32"
            fill="none"
            stroke="#1E3A8A"
            strokeOpacity="0.07"
            strokeWidth="1"
          />
        </pattern>
      </defs>

      <rect width="640" height="260" fill={`url(#map-bg-${variant})`} />
      <rect width="640" height="260" fill={`url(#map-grid-${variant})`} />

      <g fill="#1E3A8A" opacity={variant === 0 ? "0.09" : "0.07"}>
        <rect x="46" y="34" width="70" height="44" rx="5" />
        <rect x="132" y="24" width="48" height="54" rx="5" />
        <rect x="196" y="44" width="60" height="34" rx="5" />
        <rect x="292" y="30" width="74" height="48" rx="5" />
        <rect x="388" y="42" width="52" height="36" rx="5" />
        <rect x="466" y="26" width="84" height="52" rx="5" />
        <rect x="572" y="44" width="46" height="34" rx="5" />
        <rect x="44" y="188" width="62" height="42" rx="5" />
        <rect x="126" y="198" width="76" height="32" rx="5" />
        <rect x="238" y="188" width="54" height="42" rx="5" />
        <rect x="356" y="196" width="82" height="34" rx="5" />
        <rect x="462" y="188" width="58" height="42" rx="5" />
        <rect x="548" y="198" width="70" height="32" rx="5" />
      </g>

      <g
        stroke="#ffffff"
        strokeWidth="14"
        strokeLinecap="round"
        fill="none"
      >
        <path d="M-30 158C96 150 168 178 268 146S436 100 670 128" />
        <path d="M112 -20C136 56 104 110 158 210 176 246 178 258 178 280" />
        <path d="M430 -20C408 74 470 142 448 280" />
        <path d="M-20 92C90 84 160 104 250 88" strokeWidth="8" />
      </g>

      <g
        stroke="#93AEE8"
        strokeOpacity="0.7"
        strokeWidth="2"
        strokeDasharray="7 9"
        fill="none"
      >
        <path d="M-30 158C96 150 168 178 268 146S436 100 670 128" />
        <path d="M112 -20C136 56 104 110 158 210 176 246 178 258 178 280" />
      </g>
    </svg>
  );
}

export function Chambers() {
  const { t } = useLang();

  return (
    <section
      id="chambers"
      className="relative overflow-hidden border-y border-line bg-mist py-20 lg:py-28"
    >
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-64 bg-gradient-to-b from-white/60 to-transparent"
        aria-hidden="true"
      />
      <div className="shell relative">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeading
            eyebrow={t.chambers.eyebrow}
            title={t.chambers.heading}
            intro={t.chambers.intro}
            className="max-w-2xl"
          />
          <Reveal delay={0.15}>
            <a
              href={CONTACT.phoneHref}
              className="btn btn-outline bg-white/80"
            >
              <Phone aria-hidden="true" />
              {t.chambers.footerCta}
            </a>
          </Reveal>
        </div>

        <div className="mt-12 grid gap-6 lg:grid-cols-2">
          {t.chambers.cards.map((card, index) => (
            <Reveal key={card.name} delay={index * 0.1} className="h-full">
              <article className="group flex h-full flex-col overflow-hidden rounded-[26px] border border-line bg-white shadow-soft transition-all duration-500 hover:-translate-y-1 hover:border-royal/25 hover:shadow-lift">
                <a
                  href={mapHref(card.mapQuery)}
                  target="_blank"
                  rel="noreferrer"
                  className="relative block h-44 overflow-hidden bg-royal-100 sm:h-48"
                  aria-label={`${card.name} — ${t.chambers.directionsLabel}`}
                >
                  <div className="absolute inset-0 transition-transform duration-[900ms] ease-out group-hover:scale-[1.04]">
                    <MapArtwork variant={index} />
                  </div>

                  <span className="absolute left-4 top-4 inline-flex items-center gap-2 rounded-full border border-white/70 bg-white/90 px-3 py-1.5 text-[0.58rem] font-semibold uppercase tracking-[0.14em] text-royal backdrop-blur">
                    <MapPin className="h-3 w-3" aria-hidden="true" />
                    {card.tag}
                  </span>

                  <span className="absolute right-4 top-4 inline-flex items-center gap-1.5 rounded-full bg-ink/90 px-3 py-1.5 text-[0.55rem] font-semibold uppercase tracking-[0.12em] text-white backdrop-blur">
                    <Clock className="h-3 w-3 text-royal-300" aria-hidden="true" />
                    {card.badge}
                  </span>

                  <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
                    <span className="relative grid h-11 w-11 place-items-center rounded-full bg-royal text-white shadow-[0_14px_30px_-10px_rgba(30,58,138,0.8)]">
                      <span
                        className="map-pulse absolute inset-0 rounded-full text-royal/60"
                        aria-hidden="true"
                      />
                      <MapPin className="relative h-5 w-5" aria-hidden="true" />
                    </span>
                  </span>

                  <span className="absolute inset-x-4 bottom-3.5 flex items-center justify-between text-[0.56rem] font-medium tracking-[0.08em] text-ink/55">
                    <span>{card.coords}</span>
                    <span className="inline-flex items-center gap-1 rounded-full bg-white/80 px-2.5 py-1 opacity-0 backdrop-blur transition-all duration-300 group-hover:opacity-100">
                      {t.chambers.directionsLabel}
                      <ArrowUpRight className="h-3 w-3" aria-hidden="true" />
                    </span>
                  </span>
                </a>

                <div className="flex flex-1 flex-col p-6 sm:p-7">
                  <h3 className="font-display text-[1.7rem] leading-tight text-ink">
                    {card.name}
                  </h3>
                  <p className="mt-2 flex items-start gap-2 text-[0.8rem] leading-relaxed text-muted">
                    <MapPin
                      className="mt-0.5 h-3.5 w-3.5 shrink-0 text-royal/70"
                      aria-hidden="true"
                    />
                    {card.address}
                  </p>

                  <div className="mt-5 rounded-2xl border border-line bg-cloud p-4">
                    <div className="flex items-center justify-between gap-3 border-b border-line pb-3">
                      <span className="text-[0.57rem] font-semibold uppercase tracking-[0.2em] text-muted">
                        {t.chambers.hoursLabel}
                      </span>
                      <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-2.5 py-1 text-[0.55rem] font-semibold uppercase tracking-[0.1em] text-emerald-700">
                        <Clock className="h-2.5 w-2.5" aria-hidden="true" />
                        {card.badge}
                      </span>
                    </div>
                    <div className="flex items-end justify-between gap-4 pt-3">
                      <div>
                        <p className="font-display text-[1.45rem] leading-none text-ink">
                          {card.hours}
                        </p>
                        <p className="mt-2 text-[0.72rem] text-muted">
                          {card.days}
                        </p>
                      </div>
                      <p className="text-right">
                        <span className="block text-[0.52rem] font-semibold uppercase tracking-[0.14em] text-muted">
                          {t.chambers.closedLabel}
                        </span>
                        <span className="mt-1 block text-[0.72rem] text-ink/80">
                          {card.closed}
                        </span>
                      </p>
                    </div>
                  </div>

                  <p className="mt-3 flex items-center gap-2 text-[0.7rem] text-muted">
                    <span
                      className="h-1 w-1 shrink-0 rounded-full bg-royal/40"
                      aria-hidden="true"
                    />
                    {card.note}
                  </p>

                  <div className="mt-auto flex flex-wrap items-center gap-2.5 pt-6">
                    <a
                      href={mapHref(card.mapQuery)}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-2 rounded-full bg-ink px-4 py-2.5 text-[0.72rem] font-semibold text-white transition hover:bg-royal"
                    >
                      <Navigation className="h-3.5 w-3.5" aria-hidden="true" />
                      {t.chambers.directionsLabel}
                    </a>
                    <a
                      href={`tel:${card.phone}`}
                      className="inline-flex items-center gap-2 rounded-full border border-line px-4 py-2.5 text-[0.72rem] font-semibold text-royal transition hover:border-royal/40 hover:bg-mist"
                    >
                      <Phone className="h-3.5 w-3.5" aria-hidden="true" />
                      {t.chambers.callLabel}
                    </a>
                    <span className="ml-auto hidden items-center gap-1.5 text-[0.56rem] text-muted/80 sm:flex">
                      <MapPin className="h-3 w-3" aria-hidden="true" />
                      {t.chambers.mapNote}
                    </span>
                  </div>
                </div>
              </article>
            </Reveal>
          ))}
        </div>

        <Reveal>
          <div className="mt-8 flex flex-col gap-5 rounded-3xl border border-line bg-white/75 p-6 backdrop-blur sm:flex-row sm:items-center sm:justify-between sm:px-8">
            <p className="flex items-start gap-3 text-[0.82rem] leading-relaxed text-muted">
              <Info
                className="mt-0.5 h-4 w-4 shrink-0 text-royal"
                aria-hidden="true"
              />
              {t.chambers.footerNote}
            </p>
            <a
              href={CONTACT.phoneHref}
              className="btn btn-primary shrink-0"
            >
              <Phone aria-hidden="true" />
              {t.chambers.footerCta}
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
