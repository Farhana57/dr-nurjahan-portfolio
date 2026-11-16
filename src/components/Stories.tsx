import React from "react";
import { Award, Stethoscope, MapPin, Calendar, CheckCircle2, ArrowLeft, HeartPulse, UserCheck } from "lucide-react";
import { useLang } from "../i18n";

interface SuccessStoriesProps {
  onBackToHome?: () => void;
}

export function SuccessStories({ onBackToHome }: SuccessStoriesProps) {
  const { lang } = useLang();

  return (
    <div className="py-16 bg-gradient-to-b from-mist/50 to-white min-h-screen">
      <div className="shell max-w-4xl mx-auto space-y-8">
        
        {/* Top Back Navigation */}
        {onBackToHome && (
          <div>
            <button
              onClick={onBackToHome}
              className="inline-flex items-center gap-2 text-sm font-semibold text-royal hover:underline"
            >
              <ArrowLeft className="h-4 w-4" />
              {lang === "bn" ? "হোম পেজে ফিরে যান" : "Back to Home"}
            </button>
          </div>
        )}

        {/* Page Header Banner */}
        <div className="bg-royal text-white rounded-[28px] p-8 sm:p-10 shadow-xl relative overflow-hidden border-b-4 border-amber-400">
          <div className="absolute right-0 top-0 translate-x-8 -translate-y-8 w-48 h-48 bg-white/10 rounded-full blur-2xl pointer-events-none"></div>
          <div className="relative z-10 space-y-3">
            <span className="inline-block bg-white/20 text-white text-[0.7rem] font-bold uppercase tracking-widest px-3.5 py-1 rounded-full">
              {lang === "bn" ? "মেডিকেল সাকসেস স্টোরি ও কেস স্টাডি" : "Medical Success Story & Case Study"}
            </span>
            <h1 className="text-2xl sm:text-4xl font-display font-bold leading-snug">
              {lang === "bn"
                ? "পূর্বের ৩ সিজারিয়ানের পর চতুর্থ সিজারে জটিল সেন্ট্রাল প্লাসেন্টা প্রিভিয়ার সফল অস্ত্রোপচার"
                : "Successful Complex Central Placenta Previa Surgery After 3 Previous C-Sections"}
            </h1>
            <p className="text-sm text-white/85 flex items-center gap-2 pt-2">
              <Stethoscope className="h-4 w-4 text-amber-300 shrink-0" />
              <span>
                {lang === "bn"
                  ? "ডাঃ নূরজাহান (মুক্তি) — এমবিবিএস, এফসিপিএস (গাইনি এন্ড অবস্), ল্যাপারোস্কোপিক সার্জন"
                  : "Dr. Nurjahan (Mukti) — MBBS, FCPS (Obs & Gynae), Laparoscopic Surgeon"}
              </span>
            </p>
          </div>
        </div>

        {/* Main Article Content Card */}
        <div className="bg-white rounded-[28px] border border-royal/15 shadow-xl p-6 sm:p-10 space-y-8">
          
          {/* Highlight Info Box */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 p-5 rounded-2xl bg-slate-50 border border-line text-sm">
            <div className="flex items-center gap-3">
              <MapPin className="h-5 w-5 text-royal shrink-0" />
              <div>
                <span className="text-xs text-muted block">{lang === "bn" ? "অস্ত্রোপচারের স্থান:" : "Location:"}</span>
                <span className="font-bold text-ink">ইবনে সিনা হাসপাতাল, যশোর</span>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <UserCheck className="h-5 w-5 text-emerald-600 shrink-0" />
              <div>
                <span className="text-xs text-muted block">{lang === "bn" ? "রোগীর অবস্থা:" : "Patient Status:"}</span>
                <span className="font-bold text-emerald-700">সুস্থ ও স্থিতিশীল (Stable)</span>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Award className="h-5 w-5 text-amber-600 shrink-0" />
              <div>
                <span className="text-xs text-muted block">{lang === "bn" ? "অভিজ্ঞতা:" : "Experience:"}</span>
                <span className="font-bold text-ink">২০ বছর ধরে সফল অপারেশন</span>
              </div>
            </div>
          </div>

          {/* Article Paragraphs */}
          <div className="space-y-6 text-ink/85 leading-relaxed text-base">
            <p>
              {lang === "bn"
                ? "গতকাল রাতে প্রয়োজনীয় প্রস্তুতি, সিনিয়র এনেস্থেটিস্ট ও দক্ষ টিম নিয়ে অত্যন্ত সতর্কতার সঙ্গে অস্ত্রোপচারটি সম্পন্ন করেন ডা. নূরজাহান (মুক্তি)। তিনি দীর্ঘ ২০ বছর যাবত দক্ষতা এবং সফলতার সহিত অস্ত্রোপচার করছেন এবং রোগী দেখছেন।"
                : "Last night, Dr. Nurjahan (Mukti) successfully completed a highly delicate surgery with proper preparation, a senior anesthetist, and an expert team. She has been operating and treating patients with great skill and success for over 20 years."}
            </p>

            <p>
              {lang === "bn"
                ? "পূর্বের তিনটা সিজার থাকালে জরায়ু ও অন্যান্য নাড়িগুলো খুব খারাপভাবে জড়ানো ছিল। অত্যন্ত দক্ষতার সাথে সেগুলো মুক্ত করে জরায়ুসহ ফুলটাকে বের করে নিয়ে আসেন। রোগীর শারীরিক অবস্থা বর্তমানে ভালো ও স্থিতিশীল রয়েছে।"
                : "Due to three previous C-sections, the uterus and surrounding tissues were severely adhered. With utmost precision and expertise, she carefully freed them and safely delivered the baby along with the placenta. The patient's physical condition is currently good and stable."}
            </p>

            <div className="p-6 bg-pink-50/70 border border-pink-200 rounded-2xl space-y-3">
              <h3 className="text-lg font-bold text-pink-900 flex items-center gap-2">
                <HeartPulse className="h-5 w-5 text-pink-600" />
                {lang === "bn" ? "রোগীর পটভূমি ও জটিলতা" : "Patient Background & Complications"}
              </h3>
              <p className="text-sm text-ink/80">
                {lang === "bn"
                  ? "হাসপাতাল সূত্রে জানা যায়, ৩০ বছর বয়সী সাবিনা ইয়াসমিন চতুর্থবারের মতো গর্ভধারণ করেন। এর আগে তার তিনটি সন্তানই সিজারিয়ান অস্ত্রোপচারের মাধ্যমে জন্মগ্রহণ করে। এবারের গর্ভাবস্থায় পরীক্ষা-নিরীক্ষার মাধ্যমে তার 4th gravida with central placenta previa with previous 3 Caesarean section শনাক্ত হয়।"
                  : "According to hospital sources, 30-year-old Sabina Yasmin was pregnant for the fourth time, with her previous three children born via C-sections. Routine check-ups during this pregnancy identified her condition as 4th gravida with central placenta previa with previous 3 C-sections."}
              </p>
            </div>

            <h3 className="text-xl font-display font-bold text-royal pt-2">
              {lang === "bn" ? "সেন্ট্রাল প্লাসেন্টা প্রিভিয়া এবং ঝুঁকি" : "Central Placenta Previa and Risks"}
            </h3>
            <p>
              {lang === "bn"
                ? "এই অবস্থায় কোনো ডাক্তার অপারেশন করতে রাজি হয়নি। যার কারণে রোগীকে ঢাকায় রেফার করা হয়। সেন্ট্রাল প্লাসেন্টা প্রিভিয়া গর্ভাবস্থার একটি গুরুত্বপূর্ণ জটিলতা। এ অবস্থায় প্লাসেন্টা জরায়ুর নিচের অংশে অবস্থান করে এবং জরায়ু মুখ সম্পূর্ণভাবে ঢেকে দিতে পারে। বিশেষ করে পূর্বে একাধিক সিজারিয়ান অস্ত্রোপচারের ইতিহাস থাকলে এ ধরনের গর্ভাবস্থায় অতিরিক্ত রক্তক্ষরণসহ মৃত্যুঝুঁকি থাকে।"
                : "No other doctors were willing to perform the operation in this critical state, which is why the patient was advised to be referred to Dhaka. Central placenta previa is a major pregnancy complication where the placenta implants low in the uterus and completely covers the cervix. Especially with a history of multiple prior C-sections, such pregnancies carry severe risks of massive hemorrhage and life-threatening complications."}
            </p>

            <p>
              {lang === "bn"
                ? "রোগীর অবস্থা ও সম্ভাব্য ঝুঁকি বিবেচনায় প্রয়োজনীয় প্রস্তুতি গ্রহণের পর ডা. নূরজাহান (মুক্তি) অস্ত্রোপচারটি সম্পন্ন করেন। অস্ত্রোপচারের পর রোগীকে পর্যবেক্ষণে রাখা হয়েছে এবং বর্তমানে তার অবস্থা সন্তোষজনক বলে জানা গেছে।"
                : "Considering the patient's critical condition and potential risks, Dr. Nurjahan (Mukti) successfully performed the surgery after taking all necessary preparations. The patient has been kept under close observation post-surgery and her condition is reported to be satisfactory."}
            </p>
          </div>

          {/* Doctor's Expert Advice Box */}
          <div className="p-6 bg-royal/[0.04] border border-royal/15 rounded-2xl space-y-3">
            <h4 className="text-sm font-bold uppercase tracking-wider text-royal">
              {lang === "bn" ? "বিশেষজ্ঞ চিকিৎসকের পরামর্শ" : "Expert Medical Advice"}
            </h4>
            <blockquote className="text-sm italic text-ink/90 leading-relaxed border-l-4 border-royal pl-4">
              {lang === "bn"
                ? "প্লাসেন্টা প্রিভিয়া থাকলে গর্ভাবস্থায় যেকোনো ধরনের অস্বাভাবিক রক্তপাতকে গুরুত্বের সঙ্গে নিতে হবে। এ ধরনের উপসর্গ দেখা দিলে দেরি না করে দ্রুত হাসপাতালে এসে চিকিৎসকের পরামর্শ নেওয়া জরুরি।"
                : '"If placenta previa is present, any abnormal bleeding during pregnancy must be taken very seriously. If such symptoms appear, it is crucial to consult a doctor at the hospital immediately without delay."'}
            </blockquote>
            <p className="text-xs font-bold text-right text-royal">
              — ডা. নূরজাহান মুক্তি, এমবিবিএস, এফসিপিএস (গাইনি এন্ড অবস্)
            </p>
          </div>

          {/* Conclusion / Medical Insight */}
          <div className="border-t border-line pt-6 text-sm text-muted">
            <p>
              {lang === "bn"
                ? "চিকিৎსকদের মতে, প্লাসেন্টা প্রিভিয়ার মতো জটিল অবস্থায় সময়মতো রোগ নির্ণয়, পরিকল্পিত চিকিৎসা, প্রয়োজনীয় প্রস্তুতি এবং দক্ষ চিকিৎসা ব্যবস্থাপনা মা ও শিশুর নিরাপত্তায় গুরুত্বপূর্ণ ভূমিকা রাখে।"
                : "According to medical experts, timely diagnosis, planned treatment, necessary preparations, and skilled clinical management in complex conditions like placenta previa play a vital role in ensuring the safety of both mother and child."}
            </p>
          </div>

        </div>

        {/* Footer Back Button */}
        <div className="text-center pt-4">
          {onBackToHome && (
            <button
              onClick={onBackToHome}
              className="btn btn-primary px-8 py-3 shadow-lg"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              {lang === "bn" ? "হোম পেজে ফিরে যান" : "Return to Home Page"}
            </button>
          )}
        </div>

      </div>
    </div>
  );
}