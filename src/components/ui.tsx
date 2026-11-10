import { useEffect, useRef, useState, type ReactNode } from "react";
import { animate, motion, useInView, useReducedMotion } from "framer-motion";
import { Star } from "lucide-react";

const EASE = [0.22, 1, 0.36, 1] as const;

export function Reveal({
  children,
  delay = 0,
  y = 26,
  className,
}: {
  children: ReactNode;
  delay?: number;
  y?: number;
  className?: string;
}) {
  const reduce = useReducedMotion();

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: reduce ? 0 : y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.85, delay, ease: EASE }}
    >
      {children}
    </motion.div>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  intro,
  align = "left",
  tone = "light",
  className = "",
}: {
  eyebrow: string;
  title: ReactNode;
  intro?: string;
  align?: "left" | "center";
  tone?: "light" | "dark";
  className?: string;
}) {
  const centered = align === "center";
  return (
    <div
      className={`${centered ? "mx-auto max-w-2xl text-center" : ""} ${className}`}
    >
      <Reveal>
        <span
          className={`eyebrow ${tone === "dark" ? "text-royal-300" : ""} ${
            centered ? "justify-center" : ""
          }`}
        >
          {eyebrow}
        </span>
      </Reveal>
      <Reveal delay={0.07}>
        <h2
          className={`display-section mt-5 text-balance text-[clamp(2.1rem,4.4vw,3.5rem)] ${
            tone === "dark" ? "text-white" : "text-ink"
          }`}
        >
          {title}
        </h2>
      </Reveal>
      {intro ? (
        <Reveal delay={0.13}>
          <p
            className={`mt-5 max-w-xl text-[0.93rem] leading-[1.85] ${
              centered ? "mx-auto" : ""
            } ${tone === "dark" ? "text-white/60" : "text-muted"}`}
          >
            {intro}
          </p>
        </Reveal>
      ) : null}
    </div>
  );
}

export function Counter({
  value,
  suffix = "",
  duration = 1.9,
}: {
  value: number;
  suffix?: string;
  duration?: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const reduce = useReducedMotion();
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!inView) return;
    if (reduce) {
      setDisplay(value);
      return;
    }
    const controls = animate(0, value, {
      duration,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (latest) => setDisplay(latest),
    });
    return () => controls.stop();
  }, [inView, value, duration, reduce]);

  return (
    <span ref={ref} className="tabular-nums">
      {Math.round(display).toLocaleString("en-US")}
      {suffix}
    </span>
  );
}

export function Stars({
  rating = 5,
  className = "",
}: {
  rating?: number;
  className?: string;
}) {
  return (
    <span
      className={`inline-flex items-center gap-1 ${className}`}
      aria-label={`${rating} out of 5 stars`}
    >
      {Array.from({ length: 5 }).map((_, index) => (
        <Star
          key={index}
          className={`h-3.5 w-3.5 ${
            index < rating ? "fill-gold text-gold" : "text-white/20"
          }`}
          aria-hidden="true"
        />
      ))}
    </span>
  );
}

export function Monogram({
  tone = "light",
  className = "",
}: {
  tone?: "light" | "dark";
  className?: string;
}) {
  return (
    <span
      className={`relative grid h-11 w-11 shrink-0 place-items-center rounded-full ${
        tone === "dark" ? "bg-white/10 text-white" : "bg-ink text-white"
      } ${className}`}
      aria-hidden="true"
    >
      <span className="font-display text-[1.35rem] leading-none">N</span>
      <span className="absolute -right-0.5 -top-0.5 h-2.5 w-2.5 rounded-full bg-royal-300 ring-2 ring-white/80" />
    </span>
  );
}
