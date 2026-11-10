import {
   useCallback,
   useEffect,
   useRef,
  useState,
  type FormEvent,
  type ReactNode,
} from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "framer-motion";
import {
  AlertCircle,
  CalendarDays,
  Check,
  ChevronDown,
  Clock,
  Info,
  Loader2,
  Lock,
  MessageCircle,
  Phone,
  ShieldCheck,
  Sparkles,
  Trash2,
  ListOrdered,
} from "lucide-react";
import { CONTACT, useLang, whatsappHref } from "../i18n";
import { Reveal, SectionHeading } from "./ui";

type FormState = {
  name: string;
  phone: string;
  chamber: string;
  service: string;
  date: string;
  slot: string;
  notes: string;
};

type FormField = keyof FormState;
type FormErrors = Partial<Record<FormField, string>>;
type BookingSummary = FormState & { serial: string; id: string; createdAt: string };

const EMPTY_FORM: FormState = {
  name: "",
  phone: "",
  chamber: "",
  service: "",
  date: "",
  slot: "",
  notes: "",
};

const BOOKINGS_KEY = "drnurjahan.bookings";
const EASE = [0.22, 1, 0.36, 1] as const;

function todayISO() {
  const now = new Date();
  return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}-${String(
    now.getDate(),
  ).padStart(2, "0")}`;
}

function normalizeDigits(value: string) {
  return value.replace(/[০-৯]/g, (digit) =>
    String(digit.charCodeAt(0) - 0x09e6),
  );
}

function makeSerial() {
  const now = new Date();
  const stamp = `${String(now.getFullYear()).slice(-2)}${String(
    now.getMonth() + 1,
  ).padStart(2, "0")}${String(now.getDate()).padStart(2, "0")}`;
  return `NJ-${stamp}-${Math.floor(100 + Math.random() * 900)}`;
}

function Field({
  label,
  htmlFor,
  required,
  error,
  children,
  className = "",
}: {
  label: string;
  htmlFor: string;
  required?: boolean;
  error?: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={className}>
      <label className="label" htmlFor={htmlFor}>
        {label}
        {required ? (
          <span className="ml-1 text-royal" aria-hidden="true">
            *
          </span>
        ) : null}
      </label>
      {children}
      {error ? (
        <p
          id={`${htmlFor}-error`}
          role="alert"
          className="mt-1.5 flex items-start gap-1.5 text-[0.7rem] leading-snug text-red-600"
        >
          <AlertCircle
            className="mt-px h-3 w-3 shrink-0"
            aria-hidden="true"
          />
          {error}
        </p>
      ) : null}
    </div>
  );
}

export function Booking() {
  const { t, lang } = useLang();
  const [form, setForm] = useState<FormState>(EMPTY_FORM);
  const [errors, setErrors] = useState<FormErrors>({});
  const [submitting, setSubmitting] = useState(false);
  const [confirmed, setConfirmed] = useState<BookingSummary | null>(null);
  const [savedBookings, setSavedBookings] = useState<BookingSummary[]>([]);
  const timerRef = useRef<number | null>(null);
  const minDate = todayISO();

  // লোড করার সময় লোকালস্টোরেজ থেকে আগের বুকিংগুলো লোড করা
  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(BOOKINGS_KEY);
      if (raw) {
        const parsed = JSON.parse(raw);
        if (Array.isArray(parsed)) setSavedBookings(parsed);
      }
    } catch {
      // ignore
    }
  }, []);

  useEffect(
    () => () => {
      if (timerRef.current) window.clearTimeout(timerRef.current);
    },
    [],
  );

  const update = (field: FormField, value: string) => {
    setForm((current) => ({ ...current, [field]: value }));
    setErrors((current) => {
      if (!current[field]) return current;
      const next = { ...current };
      delete next[field];
      return next;
    });
  };

  const validate = (): FormErrors => {
    const next: FormErrors = {};
    const phone = normalizeDigits(form.phone).replace(/[\s()\-.]/g, "");
    const phonePattern = /^(?:\+?88)?01[3-9]\d{8}$/;

    if (form.name.trim().length < 2) next.name = t.booking.form.errors.name;
    if (!phonePattern.test(phone)) next.phone = t.booking.form.errors.phone;
    if (!form.chamber) next.chamber = t.booking.form.errors.chamber;
    if (!form.service) next.service = t.booking.form.errors.service;
    if (!form.date) {
      next.date = t.booking.form.errors.date;
    } else if (form.date < minDate) {
      next.date = t.booking.form.errors.datePast;
    }
    if (!form.slot) next.slot = t.booking.form.errors.slot;

    return next;
  };

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (submitting) return;

    const nextErrors = validate();
    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors);
      const firstField = Object.keys(nextErrors)[0];
      document.getElementById(`booking-${firstField}`)?.focus();
      return;
    }

    setSubmitting(true);
    timerRef.current = window.setTimeout(() => {
      const summary: BookingSummary = {
        ...form,
        id: Math.random().toString(36.2),
        chamber: chambers[Number(form.chamber)] ?? form.chamber,
        service: services[Number(form.service)] ?? form.service,
        slot: t.booking.slots[Number(form.slot)] ?? form.slot,
        serial: makeSerial(),
        createdAt: new Date().toLocaleTimeString(),
      };

      try {
        const next = [...savedBookings.slice(-19), summary];
        window.localStorage.setItem(BOOKINGS_KEY, JSON.stringify(next));
        setSavedBookings(next);
      } catch {
        // fallback
      }

      setSubmitting(false);
      setConfirmed(summary);
      setForm(EMPTY_FORM);
      setErrors({});
    }, 950);
  };

  const deleteBooking = (id: string) => {
    try {
      const next = savedBookings.filter((b) => b.id !== id);
      window.localStorage.setItem(BOOKINGS_KEY, JSON.stringify(next));
      setSavedBookings(next);
    } catch {
      // ignore
    }
  };

  const closeModal = useCallback(() => setConfirmed(null), []);

  const formatDate = (iso: string) => {
    const parsed = new Date(`${iso}T12:00:00`);
    if (Number.isNaN(parsed.getTime())) return iso;
    return parsed.toLocaleDateString(lang === "bn" ? "bn-BD" : "en-GB", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  const chambers = t.chambers.cards.map((card) => card.name);
  const services = t.services.items.map((service) => service.title);

  return (
    <section
      id="book"
      className="relative overflow-hidden border-t border-line bg-mist py-20 lg:py-28"
    >
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-72 bg-gradient-to-b from-white/70 to-transparent"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute -right-24 bottom-10 h-80 w-80 rounded-full bg-royal-100/70 blur-3xl"
        aria-hidden="true"
      />

      <div className="shell relative">
        <SectionHeading
          eyebrow={t.booking.eyebrow}
          title={t.booking.heading}
          intro={t.booking.intro}
          align="center"
        />

        <Reveal>
          <div className="mt-12 grid overflow-hidden rounded-[30px] border border-line bg-white shadow-lift lg:grid-cols-[0.82fr_1.18fr]">
            <aside className="relative order-2 flex flex-col justify-between overflow-hidden bg-ink p-7 text-white sm:p-9 lg:order-1">
              <div
                className="pointer-events-none absolute inset-0 bg-grid-dark opacity-40"
                aria-hidden="true"
              />
              <div
                className="pointer-events-none absolute -right-16 -top-20 h-56 w-56 rounded-full bg-royal/50 blur-[70px]"
                aria-hidden="true"
              />

              <div className="relative">
                <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.06] px-3 py-1.5 text-[0.58rem] font-semibold uppercase tracking-[0.16em] text-royal-300">
                  <Sparkles className="h-3 w-3" aria-hidden="true" />
                  {t.booking.eyebrow}
                </span>
                <h3 className="mt-5 font-display text-[1.85rem] leading-tight text-white">
                  {t.booking.panelTitle}
                </h3>

                <ol className="mt-7 space-y-5">
                  {t.booking.panelSteps.map((step, index) => (
                    <li
                      key={step}
                      className="flex items-start gap-3.5 text-[0.8rem] leading-[1.75] text-white/65"
                    >
                      <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full border border-white/15 bg-white/[0.06] text-[0.6rem] font-semibold text-royal-300">
                        0{index + 1}
                      </span>
                      {step}
                    </li>
                  ))}
                </ol>
              </div>

              {/* আমার সিরিয়াল বা বুকিং লিস্ট সেকশন */}
              {savedBookings.length > 0 && (
                <div className="relative mt-8 rounded-2xl border border-white/15 bg-white/[0.04] p-4 backdrop-blur">
                  <div className="flex items-center justify-between border-b border-white/10 pb-2.5">
                    <span className="flex items-center gap-1.5 text-[0.7rem] font-semibold uppercase tracking-wider text-royal-300">
                      <ListOrdered className="h-3.5 w-3.5" />
                      আপনার বুক করা সিরিয়াল ({savedBookings.length})
                    </span>
                  </div>
                  <div className="mt-3 max-h-40 space-y-2.5 overflow-y-auto pr-1">
                    {savedBookings.map((b, idx) => (
                      <div
                        key={b.id || idx}
                        className="flex items-center justify-between rounded-xl bg-white/5 p-2.5 text-xs text-white/90 border border-white/5"
                      >
                        <div>
                          <p className="font-semibold text-royal-200">
                            #{idx + 1} — {b.serial}
                          </p>
                          <p className="text-[0.68rem] text-white/60">
                            {b.name} ({formatDate(b.date)})
                          </p>
                        </div>
                        <button
                          type="button"
                          onClick={() => deleteBooking(b.id)}
                          title="সিরিয়াল বাতিল বা ডিলিট করুন"
                          className="rounded-lg p-1.5 text-red-400 hover:bg-red-500/20 transition"
                        >
                          <Trash2 className="h-3.5 w-3.5" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div className="relative mt-9 space-y-4 border-t border-white/10 pt-6">
                <div>
                  <p className="text-[0.55rem] font-semibold uppercase tracking-[0.2em] text-white/35">
                    {t.booking.panelHoursLabel}
                  </p>
                  <p className="mt-1.5 flex items-center gap-2 text-[0.8rem] text-white/85">
                    <Clock
                      className="h-3.5 w-3.5 text-royal-300"
                      aria-hidden="true"
                    />
                    {t.booking.panelHours}
                  </p>
                </div>

                <div>
                  <p className="text-[0.55rem] font-semibold uppercase tracking-[0.2em] text-white/35">
                    {t.booking.panelCallLabel}
                  </p>
                  <div className="mt-2 flex flex-col items-start gap-2">
                    <a
                      href={CONTACT.phoneHref}
                      className="inline-flex items-center gap-2 font-display text-[1.2rem] text-white transition hover:text-royal-300"
                    >
                      <Phone className="h-4 w-4" aria-hidden="true" />
                      {CONTACT.phoneDisplay}
                    </a>
                    <a
                      href={whatsappHref(t.floating.whatsappMessage)}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-2 text-[0.72rem] font-medium text-white/55 transition hover:text-white"
                    >
                      <MessageCircle className="h-3.5 w-3.5" aria-hidden="true" />
                      {t.floating.whatsappLabel}
                    </a>
                  </div>
                </div>
              </div>
            </aside>

            <div className="order-1 p-6 sm:p-9 lg:order-2">
              <form noValidate onSubmit={onSubmit} aria-label={t.booking.heading}>
                <div className="grid gap-4 sm:grid-cols-2 sm:gap-5">
                  <Field
                    label={t.booking.form.name}
                    htmlFor="booking-name"
                    required
                    error={errors.name}
                  >
                    <input
                      id="booking-name"
                      name="name"
                      type="text"
                      autoComplete="name"
                      value={form.name}
                      onChange={(event) => update("name", event.target.value)}
                      placeholder={t.booking.form.namePlaceholder}
                      className={`field ${errors.name ? "field-invalid" : ""}`}
                      aria-invalid={Boolean(errors.name)}
                      aria-describedby={errors.name ? "booking-name-error" : undefined}
                    />
                  </Field>

                  <Field
                    label={t.booking.form.phone}
                    htmlFor="booking-phone"
                    required
                    error={errors.phone}
                  >
                    <input
                      id="booking-phone"
                      name="phone"
                      type="tel"
                      inputMode="tel"
                      autoComplete="tel"
                      value={form.phone}
                      onChange={(event) => update("phone", event.target.value)}
                      placeholder={t.booking.form.phonePlaceholder}
                      className={`field ${errors.phone ? "field-invalid" : ""}`}
                      aria-invalid={Boolean(errors.phone)}
                      aria-describedby={errors.phone ? "booking-phone-error" : undefined}
                    />
                  </Field>

                  <Field
                    label={t.booking.form.chamber}
                    htmlFor="booking-chamber"
                    required
                    error={errors.chamber}
                  >
                    <div className="relative">
                      <select
                        id="booking-chamber"
                        name="chamber"
                        value={form.chamber}
                        onChange={(event) =>
                          update("chamber", event.target.value)
                        }
                        className={`field appearance-none pr-10 ${
                          errors.chamber ? "field-invalid" : ""
                        }`}
                        aria-invalid={Boolean(errors.chamber)}
                        aria-describedby={
                          errors.chamber ? "booking-chamber-error" : undefined
                        }
                      >
                        <option value="" disabled>
                          {t.booking.form.chamberPlaceholder}
                        </option>
                        {chambers.map((chamber, optionIndex) => (
                          <option
                            key={chamber}
                            value={String(optionIndex)}
                          >
                            {chamber}
                          </option>
                        ))}
                      </select>
                      <ChevronDown
                        className="pointer-events-none absolute right-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted/60"
                        aria-hidden="true"
                      />
                    </div>
                  </Field>

                  <Field
                    label={t.booking.form.service}
                    htmlFor="booking-service"
                    required
                    error={errors.service}
                  >
                    <div className="relative">
                      <select
                        id="booking-service"
                        name="service"
                        value={form.service}
                        onChange={(event) =>
                          update("service", event.target.value)
                        }
                        className={`field appearance-none pr-10 ${
                          errors.service ? "field-invalid" : ""
                        }`}
                        aria-invalid={Boolean(errors.service)}
                        aria-describedby={
                          errors.service ? "booking-service-error" : undefined
                        }
                      >
                        <option value="" disabled>
                          {t.booking.form.servicePlaceholder}
                        </option>
                        {services.map((service, optionIndex) => (
                          <option
                            key={service}
                            value={String(optionIndex)}
                          >
                            {service}
                          </option>
                        ))}
                      </select>
                      <ChevronDown
                        className="pointer-events-none absolute right-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted/60"
                        aria-hidden="true"
                      />
                    </div>
                  </Field>

                  <Field
                    label={t.booking.form.date}
                    htmlFor="booking-date"
                    required
                    error={errors.date}
                  >
                    <div className="relative">
                      <input
                        id="booking-date"
                        name="date"
                        type="date"
                        min={minDate}
                        value={form.date}
                        onChange={(event) => update("date", event.target.value)}
                        className={`field pr-10 ${
                          errors.date ? "field-invalid" : ""
                        }`}
                        aria-invalid={Boolean(errors.date)}
                        aria-describedby={
                          errors.date ? "booking-date-error" : undefined
                        }
                      />
                      <CalendarDays
                        className="pointer-events-none absolute right-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted/40"
                        aria-hidden="true"
                      />
                    </div>
                  </Field>

                  <Field
                    label={t.booking.form.slot}
                    htmlFor="booking-slot"
                    required
                    error={errors.slot}
                  >
                    <div className="relative">
                      <select
                        id="booking-slot"
                        name="slot"
                        value={form.slot}
                        onChange={(event) => update("slot", event.target.value)}
                        className={`field appearance-none pr-10 ${
                          errors.slot ? "field-invalid" : ""
                        }`}
                        aria-invalid={Boolean(errors.slot)}
                        aria-describedby={
                          errors.slot ? "booking-slot-error" : undefined
                        }
                      >
                        <option value="" disabled>
                          {t.booking.form.slotPlaceholder}
                        </option>
                        {t.booking.slots.map((slot, optionIndex) => (
                          <option
                            key={slot}
                            value={String(optionIndex)}
                          >
                            {slot}
                          </option>
                        ))}
                      </select>
                      <ChevronDown
                        className="pointer-events-none absolute right-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted/60"
                        aria-hidden="true"
                      />
                    </div>
                  </Field>

                  <Field
                    label={t.booking.form.notes}
                    htmlFor="booking-notes"
                    className="sm:col-span-2"
                  >
                    <textarea
                      id="booking-notes"
                      name="notes"
                      rows={3}
                      value={form.notes}
                      onChange={(event) => update("notes", event.target.value)}
                      placeholder={t.booking.form.notesPlaceholder}
                      className="field resize-none"
                    />
                  </Field>
                </div>

                <div className="mt-6 flex flex-col gap-4 border-t border-line pt-5 sm:flex-row sm:items-center sm:justify-between">
                  <div className="order-2 sm:order-1">
                    <p className="text-[0.6rem] font-medium uppercase tracking-[0.1em] text-muted/70">
                      {t.booking.form.required}
                    </p>
                    <p className="mt-1.5 flex items-start gap-1.5 text-[0.66rem] leading-relaxed text-muted">
                      <Lock
                        className="mt-px h-3 w-3 shrink-0 text-royal/70"
                        aria-hidden="true"
                      />
                      {t.booking.form.privacy}
                    </p>
                  </div>

                  <button
                    type="submit"
                    disabled={submitting}
                    className="btn btn-primary order-1 w-full shrink-0 disabled:cursor-not-allowed disabled:opacity-70 sm:order-2 sm:w-auto"
                  >
                    {submitting ? (
                      <Loader2 className="animate-spin" aria-hidden="true" />
                    ) : (
                      <CalendarDays aria-hidden="true" />
                    )}
                    {submitting
                      ? t.booking.form.submitting
                      : t.booking.form.submit}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </Reveal>
      </div>

      <SuccessModal
        summary={confirmed}
        onClose={closeModal}
        formatDate={formatDate}
      />
    </section>
  );
}

function SuccessModal({
  summary,
  onClose,
  formatDate,
}: {
  summary: BookingSummary | null;
  onClose: () => void;
  formatDate: (iso: string) => string;
}) {
  const { t } = useLang();
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!summary) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [summary, onClose]);

  if (typeof document === "undefined") return null;

  return createPortal(
    <AnimatePresence>
      {summary ? (
        <div
          className="fixed inset-0 z-[90] grid place-items-center overflow-y-auto p-4 sm:p-6"
          role="dialog"
          aria-modal="true"
          aria-labelledby="booking-success-title"
        >
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={onClose}
            className="absolute inset-0 bg-ink/65 backdrop-blur-sm"
            aria-hidden="true"
          />

          <motion.div
            initial={{ opacity: 0, y: 26, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.98 }}
            transition={{ duration: 0.4, ease: EASE }}
            className="relative my-auto w-full max-w-lg overflow-hidden rounded-[26px] bg-white shadow-lift"
          >
            <div className="relative overflow-hidden bg-ink px-6 pb-7 pt-8 text-center text-white">
              <div
                className="pointer-events-none absolute inset-0 bg-grid-dark opacity-30"
                aria-hidden="true"
              />
              <div
                className="pointer-events-none absolute left-1/2 top-0 h-40 w-40 -translate-x-1/2 rounded-full bg-royal/50 blur-[60px]"
                aria-hidden="true"
              />

              <motion.span
                initial={{ scale: 0.6, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ type: "spring", stiffness: 260, damping: 18, delay: 0.12 }}
                className="relative mx-auto grid h-16 w-16 place-items-center rounded-full bg-white/10 ring-1 ring-white/20"
              >
                <span
                  className="absolute inset-0 rounded-full bg-white/10"
                  aria-hidden="true"
                />
                <Check className="relative h-7 w-7" aria-hidden="true" />
              </motion.span>

              <h3
                id="booking-success-title"
                className="relative mt-5 font-display text-[1.7rem] leading-tight"
              >
                {t.booking.success.title}
              </h3>
              <p className="relative mx-auto mt-2 max-w-sm text-[0.78rem] leading-relaxed text-white/60">
                {t.booking.success.subtitle}
              </p>

              <div className="relative mt-5 inline-flex flex-col items-center rounded-xl border border-dashed border-white/25 bg-white/[0.04] px-6 py-3">
                <span className="text-[0.53rem] font-semibold uppercase tracking-[0.22em] text-white/40">
                  {t.booking.success.serialLabel}
                </span>
                <span className="mt-1 font-display text-[1.65rem] tracking-[0.08em] text-white">
                  {summary.serial}
                </span>
              </div>
            </div>

            <div className="max-h-[52vh] overflow-y-auto p-6">
              <dl className="grid grid-cols-2 gap-4 text-[0.78rem]">
                <div>
                  <dt className="text-[0.55rem] font-semibold uppercase tracking-[0.16em] text-muted">
                    {t.booking.success.dateLabel}
                  </dt>
                  <dd className="mt-1 font-medium text-ink">
                    {formatDate(summary.date)}
                  </dd>
                </div>
                <div>
                  <dt className="text-[0.55rem] font-semibold uppercase tracking-[0.16em] text-muted">
                    {t.booking.success.slotLabel}
                  </dt>
                  <dd className="mt-1 font-medium text-ink">{summary.slot}</dd>
                </div>
                <div className="col-span-2">
                  <dt className="text-[0.55rem] font-semibold uppercase tracking-[0.16em] text-muted">
                    {t.booking.success.chamberLabel}
                  </dt>
                  <dd className="mt-1 font-medium text-ink">{summary.chamber}</dd>
                </div>
                <div className="col-span-2">
                  <dt className="text-[0.55rem] font-semibold uppercase tracking-[0.16em] text-muted">
                    {t.booking.success.serviceLabel}
                  </dt>
                  <dd className="mt-1 font-medium text-ink">{summary.service}</dd>
                </div>
              </dl>

              <p className="mt-5 flex items-start gap-2 rounded-xl bg-mist p-3 text-[0.7rem] leading-relaxed text-muted">
                <Info
                  className="mt-px h-3.5 w-3.5 shrink-0 text-royal"
                  aria-hidden="true"
                />
                {t.booking.success.note}
              </p>

              <button
                ref={closeRef}
                type="button"
                onClick={onClose}
                className="btn btn-primary mt-5 w-full"
              >
                {t.booking.success.close}
              </button>
            </div>
          </motion.div>
        </div>
      ) : null}
    </AnimatePresence>,
    document.body,
  );
}