import React, { useState } from "react";
import { User, Phone, MapPin, HeartHandshake, Send, Calendar, Clock, Stethoscope } from "lucide-react";
import { useLang } from "../i18n";

export function Booking() {
  const { lang } = useLang();
  
  // Active Tab State: 'general' or 'project'
  const [activeTab, setActiveTab] = useState<"general" | "project">("general");

  // Form State
  const [formData, setFormData] = useState({
    patientName: "",
    age: "",
    guardianName: "",
    address: "",
    mobile: "",
    chamber: "ইবনে সিনা হাসপাতাল (দড়াটানা)",
    preferredDate: "",
    problem: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    let message = "";

    if (activeTab === "general") {
      // General Appointment WhatsApp Message
      message = lang === 'bn' 
        ? `*সাধারণ চেম্বার সিরিয়াল অনুরোধ*%0A%0A` +
          `👤 *রোগীর নাম:* ${formData.patientName}%0A` +
          `🎂 *বয়স:* ${formData.age}%0A` +
          `📱 *মোবাইল নম্বর:* ${formData.mobile}%0A` +
          `📍 *ঠিকানা:* ${formData.address || "দেওয়া হয়নি"}%0A` +
          `🏥 *চেম্বার:* ${formData.chamber}%0A` +
          `📅 *পছন্দের তারিখ:* ${formData.preferredDate}%0A` +
          `📝 *সমস্যা/নোট:* ${formData.problem || "নেই"}`
        : `*General Chamber Appointment Request*%0A%0A` +
          `👤 *Patient Name:* ${formData.patientName}%0A` +
          `🎂 *Age:* ${formData.age}%0A` +
          `📱 *Mobile:* ${formData.mobile}%0A` +
          `📍 *Address:* ${formData.address || "N/A"}%0A` +
          `🏥 *Chamber:* ${formData.chamber}%0A` +
          `📅 *Preferred Date:* ${formData.preferredDate}%0A` +
          `📝 *Note:* ${formData.problem || "None"}`;
    } else {
      // Normal Delivery Project WhatsApp Message
      message = lang === 'bn' 
        ? `*Normal Delivery Project - রেজিস্ট্রেশন অনুরোধ*%0A%0A` +
          `👤 *রোগীর নাম:* ${formData.patientName}%0A` +
          `🎂 *বয়স:* ${formData.age}%0A` +
          `👨‍👩‍👧 *স্বামী/অভিভাবকের নাম:* ${formData.guardianName}%0A` +
          `📍 *ঠিকানা:* ${formData.address}%0A` +
          `📱 *মোবাইল নম্বর:* ${formData.mobile}`
        : `*Normal Delivery Project - Registration Request*%0A%0A` +
          `👤 *Patient Name:* ${formData.patientName}%0A` +
          `🎂 *Age:* ${formData.age}%0A` +
          `👨‍👩‍👧 *Guardian Name:* ${formData.guardianName}%0A` +
          `📍 *Address:* ${formData.address}%0A` +
          `📱 *Mobile:* ${formData.mobile}`;
    }

    window.open(`https://wa.me/8801759945057?text=${message}`, "_blank");
  };

  return (
    <section id="book" className="py-16 bg-gradient-to-b from-mist/50 to-white">
      <div className="shell max-w-4xl mx-auto">
        
        {/* Tab Selection Navigation */}
        <div className="flex justify-center mb-8">
          <div className="inline-flex rounded-2xl bg-slate-100 p-1.5 border border-line shadow-inner">
            <button
              onClick={() => setActiveTab("general")}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
                activeTab === "general"
                  ? "bg-white text-royal shadow-md"
                  : "text-muted hover:text-ink"
              }`}
            >
              <Stethoscope className="h-4 w-4" />
              {lang === 'bn' ? 'সাধারণ চেম্বার সিরিয়াল' : 'General Appointment'}
            </button>
            <button
              onClick={() => setActiveTab("project")}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
                activeTab === "project"
                  ? "bg-royal text-white shadow-md"
                  : "text-muted hover:text-ink"
              }`}
            >
              <HeartHandshake className="h-4 w-4" />
              {lang === 'bn' ? 'নরমাল ডেলিভারি প্রজেক্ট' : 'Normal Delivery Project'}
            </button>
          </div>
        </div>

        <div className="bg-white rounded-[28px] border border-royal/15 shadow-xl overflow-hidden">
          
          {/* Header depending on active tab */}
          <div className={`p-6 sm:p-8 text-center relative overflow-hidden transition-colors ${
            activeTab === 'project' ? 'bg-royal text-white' : 'bg-gradient-to-r from-royal to-ink text-white'
          }`}>
            <span className="inline-block bg-white/20 text-white text-[0.7rem] font-semibold uppercase tracking-widest px-3 py-1 rounded-full mb-2">
              {activeTab === 'project' 
                ? (lang === 'bn' ? 'স্পেশাল প্রজেক্ট কার্ড' : 'Special Project Card')
                : (lang === 'bn' ? 'ডাক্তার সিরিয়াল ফর্ম' : 'Doctor Appointment Form')}
            </span>
            <h2 className="text-2xl sm:text-3xl font-display font-bold">
              {activeTab === 'project' 
                ? 'Normal Delivery Project' 
                : (lang === 'bn' ? 'রোগী দেখার চেম্বার সিরিয়াল' : 'Chamber Consultation Booking')}
            </h2>
            <p className="text-xs sm:text-sm text-white/80 mt-1">
              {lang === 'bn' ? 'বিশেষজ্ঞ গাইনোকোলজিস্ট — ডাঃ নূর জাহান (মুক্তি)' : 'Specialist Gynecologist — Dr. Nurjahan (Mukti)'}
            </p>
          </div>

          {/* Form Content */}
          <form onSubmit={handleSubmit} className="p-6 sm:p-10 space-y-6">
            
            {/* Common Row: Patient Name & Age */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              <div className="sm:col-span-2 space-y-2">
                <label className="block text-xs font-semibold uppercase text-ink/70">
                  {lang === 'bn' ? 'রোগীর নাম *' : 'Patient Name *'}
                </label>
                <div className="relative">
                  <User className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted" />
                  <input
                    type="text"
                    name="patientName"
                    required
                    placeholder={lang === 'bn' ? 'রোগীর নাম লিখুন' : 'Enter patient name'}
                    value={formData.patientName}
                    onChange={handleChange}
                    className="w-full pl-10 pr-4 py-3 border border-line rounded-xl text-sm focus:outline-none focus:border-royal"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="block text-xs font-semibold uppercase text-ink/70">
                  {lang === 'bn' ? 'বয়স *' : 'Age *'}
                </label>
                <input
                  type="text"
                  name="age"
                  required
                  placeholder={lang === 'bn' ? 'যেমন: ২৫ বছর' : 'e.g., 25'}
                  value={formData.age}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-line rounded-xl text-sm focus:outline-none focus:border-royal"
                />
              </div>
            </div>

            {/* If Project Mode -> Guardian Name */}
            {activeTab === "project" && (
              <div className="space-y-2">
                <label className="block text-xs font-semibold uppercase text-ink/70">
                  {lang === 'bn' ? 'স্বামী / অভিভাবকের নাম *' : 'Husband / Guardian Name *'}
                </label>
                <div className="relative">
                  <HeartHandshake className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted" />
                  <input
                    type="text"
                    name="guardianName"
                    required
                    placeholder={lang === 'bn' ? 'স্বামী বা অভিভাবকের নাম' : 'Enter guardian name'}
                    value={formData.guardianName}
                    onChange={handleChange}
                    className="w-full pl-10 pr-4 py-3 border border-line rounded-xl text-sm focus:outline-none focus:border-royal"
                  />
                </div>
              </div>
            )}

            {/* Address & Mobile */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="block text-xs font-semibold uppercase text-ink/70">
                  {lang === 'bn' ? 'ঠিকানা *' : 'Address *'}
                </label>
                <div className="relative">
                  <MapPin className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted" />
                  <input
                    type="text"
                    name="address"
                    required={activeTab === 'project'}
                    placeholder={lang === 'bn' ? 'বর্তমান ঠিকানা' : 'Current address'}
                    value={formData.address}
                    onChange={handleChange}
                    className="w-full pl-10 pr-4 py-3 border border-line rounded-xl text-sm focus:outline-none focus:border-royal"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="block text-xs font-semibold uppercase text-ink/70">
                  {lang === 'bn' ? 'মোবাইল নম্বর *' : 'Mobile Number *'}
                </label>
                <div className="relative">
                  <Phone className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted" />
                  <input
                    type="tel"
                    name="mobile"
                    required
                    placeholder="017XXXXXXXX"
                    value={formData.mobile}
                    onChange={handleChange}
                    className="w-full pl-10 pr-4 py-3 border border-line rounded-xl text-sm focus:outline-none focus:border-royal"
                  />
                </div>
              </div>
            </div>

            {/* If General Appointment Mode -> Preferred Chamber & Date */}
            {activeTab === "general" && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="block text-xs font-semibold uppercase text-ink/70">
                    {lang === 'bn' ? 'চেম্বার নির্বাচন করুন *' : 'Select Chamber *'}
                  </label>
                  <select
                    name="chamber"
                    value={formData.chamber}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-line rounded-xl text-sm focus:outline-none focus:border-royal bg-white"
                  >
                    <option value="ইবনে সিনা হাসপাতাল (দড়াটানা)">ইবনে সিনা হাসপাতাল (দড়াটানা, যশোর)</option>
                    <option value="দড়াটানা হাসপাতাল এন্ড ডায়াগনস্টিক">দড়াটানা হাসপাতাল এন্ড ডায়াগনস্টিক</option>
                    <option value="ঝরনা ক্লিনিক (পাইকপট্টি)">ঝরনা ক্লিনিক (গুরুদাস বাবু লেন, পাইকপট্টি)</option>
                    <option value="অনলাইন ভিডিও কনসালটেশন">অনলাইন ভিডিও কনসালটেশন (Telehealth)</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <label className="block text-xs font-semibold uppercase text-ink/70">
                    {lang === 'bn' ? 'পছন্দের তারিখ *' : 'Preferred Date *'}
                  </label>
                  <div className="relative">
                    <Calendar className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted" />
                    <input
                      type="date"
                      name="preferredDate"
                      required
                      value={formData.preferredDate}
                      onChange={handleChange}
                      className="w-full pl-10 pr-4 py-3 border border-line rounded-xl text-sm focus:outline-none focus:border-royal"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Project Specific Note */}
            {activeTab === "project" && (
              <div className="p-4 bg-royal/[0.05] border border-royal/15 rounded-xl text-xs text-muted leading-relaxed">
                💡 {lang === 'bn' 
                  ? 'রেজিস্ট্রেশন ফি: ডেলিভারির খরচ থেকে কর্তন যোগ্য অগ্রিম ফি জমা প্রযোজ্য।' 
                  : 'Registration Fee: Advance fee applicable, deductible from delivery cost.'}
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full btn btn-primary py-3.5 justify-center text-base shadow-lg hover:shadow-xl transition-all"
            >
              <Send className="h-5 w-5 mr-2" />
              {activeTab === 'general'
                ? (lang === 'bn' ? 'সিরিয়াল পাঠান (WhatsApp)' : 'Book Appointment via WhatsApp')
                : (lang === 'bn' ? 'রেজিস্ট্রেশন জমা দিন (WhatsApp)' : 'Submit Registration via WhatsApp')}
            </button>
          </form>

        </div>
      </div>
    </section>
  );
}