import React, { useState } from "react";
import { User, Phone, MapPin, Calendar, HeartHandshake, Send, CheckCircle2 } from "lucide-react";

export function Booking() {
  const [formData, setFormData] = useState({
    patientName: "",
    age: "",
    guardianName: "",
    address: "",
    mobile: "",
    consultationType: "Normal Delivery Project", // ডিফল্ট সিলেক্টেড
    advanceFee: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // WhatsApp Message Format
    const message = `*Normal Delivery Project - Registration Request*%0A%0A` +
      `👤 *রোগীর নাম:* ${formData.patientName}%0A` +
      `🎂 *বয়স:* ${formData.age}%0A` +
      `👨‍👩‍👧 *স্বামী/অভিভাবকের নাম:* ${formData.guardianName}%0A` +
      `📍 *ঠিকানা:* ${formData.address}%0A` +
      `📱 *মোবাইল নম্বর:* ${formData.mobile}%0A` +
      `🩺 *সার্ভিস:* ${formData.consultationType}%0A` +
      `💰 *অগ্রিম রেজিস্ট্রেশন ফি:* ${formData.advanceFee || "প্রযোজ্য নয়"} টাকা`;

    // Send to WhatsApp (Doctor's / Chamber WhatsApp)
    window.open(`https://wa.me/8801759945057?text=${message}`, "_blank");
  };

  return (
    <section id="book" className="py-16 bg-gradient-to-b from-mist/50 to-white">
      <div className="shell max-w-4xl mx-auto">
        <div className="bg-white rounded-[28px] border border-royal/15 shadow-xl overflow-hidden">
          
          {/* Card Header (Doctor & Project Info) */}
          <div className="bg-royal text-white p-6 sm:p-8 text-center relative overflow-hidden">
            <span className="inline-block bg-white/20 text-white text-[0.7rem] font-semibold uppercase tracking-widest px-3 py-1 rounded-full mb-2">
              Registration Card
            </span>
            <h2 className="text-2xl sm:text-3xl font-display font-bold">
              Normal Delivery Project
            </h2>
            <p className="text-xs sm:text-sm text-white/80 mt-1">
              বিশেষজ্ঞ গাইনোকোলজিস্ট — ডাঃ নূর জাহান (মুক্তি)
            </p>
            <p className="text-[0.75rem] text-white/60 mt-1">
              এম.বি.বি.এস, বি.সি.এস (স্বাস্থ্য), এফ.সি.পি.এস (গাইনী এন্ড অব্স), ল্যাপারোস্কোপিক সার্জন
            </p>
          </div>

          {/* Form Content */}
          <form onSubmit={handleSubmit} className="p-6 sm:p-10 space-y-6">
            
            {/* Row 1: Patient Name & Age */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              <div className="sm:col-span-2 space-y-2">
                <label className="block text-xs font-semibold uppercase text-ink/70">
                  রোগীর নাম *
                </label>
                <div className="relative">
                  <User className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted" />
                  <input
                    type="text"
                    name="patientName"
                    required
                    placeholder="রোগীর নাম লিখুন"
                    value={formData.patientName}
                    onChange={handleChange}
                    className="w-full pl-10 pr-4 py-3 border border-line rounded-xl text-sm focus:outline-none focus:border-royal"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="block text-xs font-semibold uppercase text-ink/70">
                  বয়স *
                </label>
                <input
                  type="text"
                  name="age"
                  required
                  placeholder="যেমন: ২৫ বছর"
                  value={formData.age}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-line rounded-xl text-sm focus:outline-none focus:border-royal"
                />
              </div>
            </div>

            {/* Row 2: Husband / Guardian Name */}
            <div className="space-y-2">
              <label className="block text-xs font-semibold uppercase text-ink/70">
                স্বামী / অভিভাবকের নাম *
              </label>
              <div className="relative">
                <HeartHandshake className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted" />
                <input
                  type="text"
                  name="guardianName"
                  required
                  placeholder="স্বামী বা অভিভাবকের নাম"
                  value={formData.guardianName}
                  onChange={handleChange}
                  className="w-full pl-10 pr-4 py-3 border border-line rounded-xl text-sm focus:outline-none focus:border-royal"
                />
              </div>
            </div>

            {/* Row 3: Address & Mobile */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="block text-xs font-semibold uppercase text-ink/70">
                  ঠিকানা *
                </label>
                <div className="relative">
                  <MapPin className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted" />
                  <input
                    type="text"
                    name="address"
                    required
                    placeholder="বর্তমান ঠিকানা"
                    value={formData.address}
                    onChange={handleChange}
                    className="w-full pl-10 pr-4 py-3 border border-line rounded-xl text-sm focus:outline-none focus:border-royal"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="block text-xs font-semibold uppercase text-ink/70">
                  মোবাইল নম্বর *
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

            {/* Row 4: Registration Fee Note */}
            <div className="p-4 bg-royal/[0.05] border border-royal/15 rounded-xl text-xs text-muted leading-relaxed">
              💡 <strong>রেজিস্ট্রেশন ফি:</strong> ডেলিভারির খরচ থেকে কর্তন যোগ্য অগ্রিম ফি জমা প্রযোজ্য (চেম্বারে বা হোয়াটসঅ্যাপে নিশ্চিত করা হবে)।
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full btn btn-primary py-3.5 justify-center text-base shadow-lg hover:shadow-xl transition-all"
            >
              <Send className="h-5 w-5 mr-2" />
              রেজিস্ট্রেশন জমা দিন (WhatsApp-এ পাঠান)
            </button>
          </form>

        </div>
      </div>
    </section>
  );
}