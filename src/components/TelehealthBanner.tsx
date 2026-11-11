import React from 'react';
import { Video, CalendarCheck, MessageSquare } from 'lucide-react';
import { useLang } from '../i18n';

export function TelehealthBanner() {
  const { lang } = useLang();

  return (
    <section className="bg-white pb-12 pt-4">
      <div className="shell">
        <div className="relative overflow-hidden rounded-[28px] border border-royal/15 bg-gradient-to-r from-royal/[0.04] via-mist to-royal-100/30 p-6 sm:p-10 shadow-soft">
          <div className="absolute -right-16 -top-16 h-48 w-48 rounded-full bg-royal/10 blur-3xl pointer-events-none" aria-hidden="true" />
          
          <div className="flex flex-col lg:flex-row items-center justify-between gap-8 relative z-10">
            <div className="space-y-3 text-center lg:text-left">
              <span className="inline-flex items-center gap-2 rounded-full border border-royal/20 bg-white px-3.5 py-1 text-[0.65rem] font-semibold uppercase tracking-[0.18em] text-royal shadow-sm">
                <Video className="h-3.5 w-3.5 text-royal animate-pulse" aria-hidden="true" />
                {lang === 'bn' ? 'অনলাইন ভিডিও কনসালটেশন' : 'Online Telehealth Consultation'}
              </span>
              <h3 className="font-display text-[1.75rem] sm:text-[2.1rem] leading-tight text-ink">
                {lang === 'bn' ? 'দূরদূরান্ত থেকে ভিডিও কলের মাধ্যমে পরামর্শ নিন' : 'Consult via Video Call from Anywhere'}
              </h3>
              <p className="max-w-xl text-[0.9rem] sm:text-[0.95rem] leading-relaxed text-muted">
                {lang === 'bn' 
                  ? 'সরাসরি চেম্বারে আসার সুযোগ না থাকলে বা জরুরি রিপোর্ট পর্যালোচনার জন্য ঘরে বসেই ভিডিও কল বা WhatsApp-এর মাধ্যমে সিরিয়াল বুক করতে পারেন।'
                  : 'Book an online session via video call or WhatsApp for quick report reviews and expert gynecological consultation from home.'}
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-3.5 w-full lg:w-auto shrink-0">
              <a
                href="https://wa.me/8801759945057?text=Hello,%20I%20want%20to%20book%20an%20online%20consultation."
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-primary text-center justify-center shadow-lg"
              >
                <MessageSquare className="h-4 w-4" aria-hidden="true" />
                {lang === 'bn' ? 'হোয়াটসঅ্যাপে বুক করুন' : 'Book on WhatsApp'}
              </a>
              <a
                href="#book"
                className="btn btn-outline text-center justify-center bg-white"
              >
                <CalendarCheck className="h-4 w-4" aria-hidden="true" />
                {lang === 'bn' ? 'সিরিয়াল নিয়মাবলী' : 'Booking Info'}
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}