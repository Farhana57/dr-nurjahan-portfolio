import React, { useState } from "react";
import {
  User,
  Phone,
  MapPin,
  HeartHandshake,
  Send,
  Calendar,
  Stethoscope,
  CreditCard,
  Hash,
  Copy,
  Check,
  Printer,
  CheckCircle2,
  ArrowLeft,
} from "lucide-react";
import { useLang } from "../i18n";

interface ReceiptData {
  receiptNo: string;
  date: string;
  type: "general" | "project";
  patientName: string;
  age: string;
  guardianName: string;
  address: string;
  mobile: string;
  chamber: string;
  preferredDate: string;
  paymentMethod: string;
  trxId: string;
  advancePaid: number;
}

export function Booking() {
  const { lang } = useLang();

  // Active Tab State: 'general' or 'project'
  const [activeTab, setActiveTab] = useState<"general" | "project">("general");
  const [copied, setCopied] = useState(false);

  // Receipt View State
  const [receipt, setReceipt] = useState<ReceiptData | null>(null);

  // Fixed Advance Amount
  const ADVANCE_AMOUNT = 1000;

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
    paymentMethod: "bkash", // ডিফল্ট বিকাশ রাখা হলো যাতে ১০০০ টাকা অ্যাডভান্স ও রিসিপ্ট সুবিধা পাওয়া যায়
    trxId: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleCopyNumber = () => {
    navigator.clipboard.writeText("01759945057");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handlePrintReceipt = () => {
    window.print();
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Generate Unique Receipt ID
    const randomNum = Math.floor(10000 + Math.random() * 90000);
    const receiptNo = `${activeTab === "project" ? "NDP" : "APT"}-${randomNum}`;
    const today = new Date().toLocaleDateString("en-GB");

    const generatedReceipt: ReceiptData = {
      receiptNo,
      date: today,
      type: activeTab,
      patientName: formData.patientName,
      age: formData.age,
      guardianName: formData.guardianName,
      address: formData.address,
      mobile: formData.mobile,
      chamber: formData.chamber,
      preferredDate: formData.preferredDate,
      paymentMethod: formData.paymentMethod,
      trxId: formData.trxId.toUpperCase(),
      advancePaid: formData.paymentMethod === "bkash" ? ADVANCE_AMOUNT : 0,
    };

    // Set Receipt to display on screen
    setReceipt(generatedReceipt);

    // Prepare WhatsApp Message
    let message = "";
    const paymentInfoBn =
      formData.paymentMethod === "bkash"
        ? `💳 *পেমেন্ট মাধ্যম:* বিকাশ (bKash Personal)%0A💰 *অ্যাডভান্স পরিশোধিত:* ১,০০০ টাকা (ফিক্সড)%0A🧾 *Transaction ID:* ${formData.trxId.toUpperCase()}%0A🔖 *Receipt No:* ${receiptNo}`
        : `💳 *পেমেন্ট মাধ্যম:* চেম্বারে সরাসরি ক্যাশ (১,০০০ টাকা অ্যাডভান্স প্রযোজ্য)%0A🔖 *Booking ID:* ${receiptNo}`;

    const paymentInfoEn =
      formData.paymentMethod === "bkash"
        ? `💳 *Payment Method:* bKash Personal%0A💰 *Advance Paid:* 1,000 BDT (Fixed)%0A🧾 *Transaction ID:* ${formData.trxId.toUpperCase()}%0A🔖 *Receipt No:* ${receiptNo}`
        : `💳 *Payment Method:* Pay Cash at Chamber (1,000 BDT Advance applicable)%0A🔖 *Booking ID:* ${receiptNo}`;

    if (activeTab === "general") {
      message =
        lang === "bn"
          ? `*সাধারণ চেম্বার সিরিয়াল অনুরোধ*%0A%0A` +
            `👤 *রোগীর নাম:* ${formData.patientName}%0A` +
            `🎂 *বয়স:* ${formData.age}%0A` +
            `📱 *মোবাইল নম্বর:* ${formData.mobile}%0A` +
            `📍 *ঠিকানা:* ${formData.address || "দেওয়া হয়নি"}%0A` +
            `🏥 *চেম্বার:* ${formData.chamber}%0A` +
            `📅 *পছন্দের তারিখ:* ${formData.preferredDate}%0A` +
            `${paymentInfoBn}`
          : `*General Chamber Appointment Request*%0A%0A` +
            `👤 *Patient Name:* ${formData.patientName}%0A` +
            `🎂 *Age:* ${formData.age}%0A` +
            `📱 *Mobile:* ${formData.mobile}%0A` +
            `📍 *Address:* ${formData.address || "N/A"}%0A` +
            `🏥 *Chamber:* ${formData.chamber}%0A` +
            `📅 *Preferred Date:* ${formData.preferredDate}%0A` +
            `${paymentInfoEn}`;
    } else {
      message =
        lang === "bn"
          ? `*Normal Delivery Project - রেজিস্ট্রেশন অনুরোধ*%0A%0A` +
            `👤 *রোগীর নাম:* ${formData.patientName}%0A` +
            `🎂 *বয়স:* ${formData.age}%0A` +
            `👨‍👩‍👧 *স্বামী/অভিভাবকের নাম:* ${formData.guardianName}%0A` +
            `📍 *ঠিকানা:* ${formData.address}%0A` +
            `📱 *মোবাইল নম্বর:* ${formData.mobile}%0A` +
            `${paymentInfoBn}`
          : `*Normal Delivery Project - Registration Request*%0A%0A` +
            `👤 *Patient Name:* ${formData.patientName}%0A` +
            `🎂 *Age:* ${formData.age}%0A` +
            `👨‍👩‍👧 *Guardian Name:* ${formData.guardianName}%0A` +
            `📍 *Address:* ${formData.address}%0A` +
            `📱 *Mobile:* ${formData.mobile}%0A` +
            `${paymentInfoEn}`;
    }

    window.open(`https://wa.me/8801759945057?text=${message}`, "_blank");
  };

  return (
    <section id="book" className="py-16 bg-gradient-to-b from-mist/50 to-white">
      {/* Print-only CSS for clean receipt printing */}
      <style>{`
        @media print {
          body * {
            visibility: hidden;
          }
          #printable-receipt, #printable-receipt * {
            visibility: visible;
          }
          #printable-receipt {
            position: fixed;
            left: 0;
            top: 0;
            width: 100%;
            box-shadow: none !important;
            border: 2px solid #1e3a8a !important;
          }
          .no-print {
            display: none !important;
          }
        }
      `}</style>

      <div className="shell max-w-4xl mx-auto">
        {/* ================= RECEIPT VIEW (AFTER SUBMISSION) ================= */}
        {receipt ? (
          <div className="space-y-6">
            <div className="flex flex-wrap items-center justify-between gap-4 no-print">
              <button
                type="button"
                onClick={() => setReceipt(null)}
                className="inline-flex items-center gap-2 text-sm font-semibold text-royal hover:underline"
              >
                <ArrowLeft className="h-4 w-4" />
                {lang === "bn" ? "নতুন বুকিং করুন" : "Back to Booking Form"}
              </button>

              <button
                type="button"
                onClick={handlePrintReceipt}
                className="btn btn-primary px-6 py-2.5 shadow-md"
              >
                <Printer className="h-4 w-4 mr-2" />
                {lang === "bn"
                  ? "রিসিপ্ট ডাউনলোড / প্রিন্ট করুন (PDF)"
                  : "Download / Print Receipt (PDF)"}
              </button>
            </div>

            {/* Printable Receipt Card */}
            <div
              id="printable-receipt"
              className="bg-white rounded-[24px] border-2 border-royal/30 shadow-2xl overflow-hidden"
            >
              <div className="bg-royal text-white p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-4 border-b-4 border-amber-400">
                <div className="text-center sm:text-left">
                  <span className="inline-block bg-white/20 text-white text-[0.7rem] font-bold uppercase tracking-widest px-3 py-1 rounded-full mb-2">
                    {receipt.type === "project"
                      ? "Normal Delivery Project — Registration Card"
                      : "Chamber Appointment — Advance Receipt"}
                  </span>
                  <h2 className="text-2xl sm:text-3xl font-display font-bold">
                    {lang === "bn"
                      ? "ডাঃ নূর জাহান (মুক্তি)"
                      : "Dr. Nurjahan (Mukti)"}
                  </h2>
                  <p className="text-xs text-white/85 mt-1">
                    {lang === "bn"
                      ? "এম.বি.বি.এস, বি.সি.এস (স্বাস্থ্য), এফ.সি.পি.এস (গাইনী এন্ড অব্স), ল্যাপারোস্কোপিক সার্জন"
                      : "MBBS, BCS (Health), FCPS (Obs & Gynae), Laparoscopic Surgeon"}
                  </p>
                </div>

                <div className="bg-white/15 backdrop-blur-sm px-4 py-3 rounded-2xl text-center sm:text-right border border-white/20">
                  <p className="text-[0.65rem] uppercase tracking-wider text-white/80">
                    Receipt / ID No
                  </p>
                  <p className="text-lg font-mono font-bold text-amber-300">
                    {receipt.receiptNo}
                  </p>
                  <p className="text-xs text-white/80 mt-0.5">
                    Date: {receipt.date}
                  </p>
                </div>
              </div>

              <div className="p-6 sm:p-8 space-y-6">
                <div className="flex items-center justify-between p-4 rounded-2xl bg-emerald-50 border border-emerald-200">
                  <div className="flex items-center gap-3">
                    <CheckCircle2 className="h-6 w-6 text-emerald-600 shrink-0" />
                    <div>
                      <p className="text-sm font-bold text-emerald-900">
                        {receipt.paymentMethod === "bkash"
                          ? lang === "bn"
                            ? "অ্যাডভান্স পেমেন্ট কনফার্মড (১,০০০ টাকা ফিক্সড)"
                            : "Advance Payment Confirmed (1,000 BDT Fixed)"
                          : lang === "bn"
                          ? "বুকিং কনফার্মেশন স্লিপ"
                          : "Booking Confirmation Slip"}
                      </p>
                      <p className="text-xs text-emerald-700">
                        {lang === "bn"
                          ? "চেম্বারে আসার সময় এই রিসিপ্টটি সাথে নিয়ে আসবেন।"
                          : "Please bring this receipt to the chamber."}
                      </p>
                    </div>
                  </div>
                  {receipt.paymentMethod === "bkash" && (
                    <span className="px-3 py-1 rounded-full bg-emerald-600 text-white text-xs font-bold uppercase">
                      PAID ৳1,000
                    </span>
                  )}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm border-y border-line py-5">
                  <div>
                    <span className="text-xs text-muted block">
                      {lang === "bn" ? "রোগীর নাম:" : "Patient Name:"}
                    </span>
                    <span className="font-bold text-ink text-base">
                      {receipt.patientName}
                    </span>
                  </div>

                  <div>
                    <span className="text-xs text-muted block">
                      {lang === "bn" ? "বয়স:" : "Age:"}
                    </span>
                    <span className="font-semibold text-ink">{receipt.age}</span>
                  </div>

                  {receipt.type === "project" && (
                    <div>
                      <span className="text-xs text-muted block">
                        {lang === "bn"
                          ? "স্বামী / অভিভাবকের নাম:"
                          : "Husband / Guardian Name:"}
                      </span>
                      <span className="font-semibold text-ink">
                        {receipt.guardianName}
                      </span>
                    </div>
                  )}

                  <div>
                    <span className="text-xs text-muted block">
                      {lang === "bn" ? "মোবাইল নম্বর:" : "Mobile Number:"}
                    </span>
                    <span className="font-semibold text-ink">
                      {receipt.mobile}
                    </span>
                  </div>

                  <div className="sm:col-span-2">
                    <span className="text-xs text-muted block">
                      {lang === "bn" ? "ঠিকানা:" : "Address:"}
                    </span>
                    <span className="font-semibold text-ink">
                      {receipt.address || "N/A"}
                    </span>
                  </div>

                  {receipt.type === "general" && (
                    <>
                      <div>
                        <span className="text-xs text-muted block">
                          {lang === "bn" ? "নির্বাচিত চেম্বার:" : "Chamber:"}
                        </span>
                        <span className="font-semibold text-ink">
                          {receipt.chamber}
                        </span>
                      </div>
                      <div>
                        <span className="text-xs text-muted block">
                          {lang === "bn" ? "পছন্দের তারিখ:" : "Preferred Date:"}
                        </span>
                        <span className="font-semibold text-ink">
                          {receipt.preferredDate}
                        </span>
                      </div>
                    </>
                  )}
                </div>

                <div className="bg-slate-50 p-5 rounded-2xl border border-line space-y-2.5 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted">
                      {lang === "bn" ? "পেমেন্ট মাধ্যম:" : "Payment Method:"}
                    </span>
                    <span className="font-bold text-ink">
                      {receipt.paymentMethod === "bkash"
                        ? "bKash Personal (01759945057)"
                        : lang === "bn"
                        ? "চেম্বারে ক্যাশ প্রদান"
                        : "Cash at Chamber"}
                    </span>
                  </div>

                  {receipt.paymentMethod === "bkash" && (
                    <>
                      <div className="flex justify-between">
                        <span className="text-muted">
                          {lang === "bn"
                            ? "বিকাশ Transaction ID (TrxID):"
                            : "bKash Transaction ID (TrxID):"}
                        </span>
                        <span className="font-mono font-bold text-pink-700">
                          {receipt.trxId}
                        </span>
                      </div>
                      <div className="flex justify-between text-base pt-2 border-t border-line">
                        <span className="font-bold text-ink">
                          {lang === "bn"
                            ? "অগ্রিম পরিশোধিত (Fixed Advance):"
                            : "Fixed Advance Paid:"}
                        </span>
                        <span className="font-bold text-emerald-700">
                          ১,০০০ টাকা (1,000 BDT)
                        </span>
                      </div>
                    </>
                  )}

                  <p className="text-xs text-muted pt-2">
                    *{" "}
                    {lang === "bn"
                      ? "নোট: পরিশোধিত ১,০০০ টাকা অগ্রিম ফি মূল বিল বা ডেলিভারি খরচ থেকে কর্তনযোগ্য। অবশিষ্ট টাকা চেম্বারে পরিশোধ করতে হবে।"
                      : "Note: The 1,000 BDT fixed advance payment is deductible from the total service/delivery fee. Remaining balance is payable at the chamber."}
                  </p>
                </div>

                <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 text-xs text-muted">
                  <div>
                    <p className="font-semibold text-ink">
                      {lang === "bn" ? "যোগাযোগ ও সিরিয়াল:" : "Chamber Contact:"}
                    </p>
                    <p>01926-576245, 01601-874467, 01759-945057</p>
                  </div>
                  <div className="text-center sm:text-right">
                    <div className="w-36 border-b border-dashed border-ink/40 mb-1 mx-auto sm:ml-auto"></div>
                    <p>
                      {lang === "bn"
                        ? "কর্তৃপক্ষের স্বাক্ষর (চেম্বার ভেরিফিকেশন)"
                        : "Authorized Signature (Chamber Verification)"}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          /* ================= BOOKING FORM VIEW ================= */
          <>
            {/* Tab Selection Navigation */}
            <div className="flex justify-center mb-8">
              <div className="inline-flex rounded-2xl bg-slate-100 p-1.5 border border-line shadow-inner">
                <button
                  type="button"
                  onClick={() => setActiveTab("general")}
                  className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
                    activeTab === "general"
                      ? "bg-white text-royal shadow-md"
                      : "text-muted hover:text-ink"
                  }`}
                >
                  <Stethoscope className="h-4 w-4" />
                  {lang === "bn"
                    ? "সাধারণ চেম্বার সিরিয়াল"
                    : "General Appointment"}
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab("project")}
                  className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
                    activeTab === "project"
                      ? "bg-royal text-white shadow-md"
                      : "text-muted hover:text-ink"
                  }`}
                >
                  <HeartHandshake className="h-4 w-4" />
                  {lang === "bn"
                    ? "নরমাল ডেলিভারি প্রজেক্ট"
                    : "Normal Delivery Project"}
                </button>
              </div>
            </div>

            <div className="bg-white rounded-[28px] border border-royal/15 shadow-xl overflow-hidden">
              {/* Header depending on active tab */}
              <div
                className={`p-6 sm:p-8 text-center relative overflow-hidden transition-colors ${
                  activeTab === "project"
                    ? "bg-royal text-white"
                    : "bg-gradient-to-r from-royal to-ink text-white"
                }`}
              >
                <span className="inline-block bg-white/20 text-white text-[0.7rem] font-semibold uppercase tracking-widest px-3 py-1 rounded-full mb-2">
                  {activeTab === "project"
                    ? lang === "bn"
                      ? "স্পেশাল প্রজেক্ট কার্ড"
                      : "Special Project Card"
                    : lang === "bn"
                    ? "ডাক্তার সিরিয়াল ফর্ম"
                    : "Doctor Appointment Form"}
                </span>
                <h2 className="text-2xl sm:text-3xl font-display font-bold">
                  {activeTab === "project"
                    ? "Normal Delivery Project"
                    : lang === "bn"
                    ? "রোগী দেখার চেম্বার সিরিয়াল"
                    : "Chamber Consultation Booking"}
                </h2>
                <p className="text-xs sm:text-sm text-white/80 mt-1">
                  {lang === "bn"
                    ? "বিশেষজ্ঞ গাইনোকোলজিস্ট — ডাঃ নূর জাহান (মুক্তি)"
                    : "Specialist Gynecologist — Dr. Nurjahan (Mukti)"}
                </p>
              </div>

              {/* Form Content */}
              <form onSubmit={handleSubmit} className="p-6 sm:p-10 space-y-6">
                {/* Common Row: Patient Name & Age */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                  <div className="sm:col-span-2 space-y-2">
                    <label className="block text-xs font-semibold uppercase text-ink/70">
                      {lang === "bn" ? "রোগীর নাম *" : "Patient Name *"}
                    </label>
                    <div className="relative">
                      <User className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted" />
                      <input
                        type="text"
                        name="patientName"
                        required
                        placeholder={
                          lang === "bn"
                            ? "রোগীর নাম লিখুন"
                            : "Enter patient name"
                        }
                        value={formData.patientName}
                        onChange={handleChange}
                        className="w-full pl-10 pr-4 py-3 border border-line rounded-xl text-sm focus:outline-none focus:border-royal"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="block text-xs font-semibold uppercase text-ink/70">
                      {lang === "bn" ? "বয়স *" : "Age *"}
                    </label>
                    <input
                      type="text"
                      name="age"
                      required
                      placeholder={lang === "bn" ? "যেমন: ২৫ বছর" : "e.g., 25"}
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
                      {lang === "bn"
                        ? "স্বামী / অভিভাবকের নাম *"
                        : "Husband / Guardian Name *"}
                    </label>
                    <div className="relative">
                      <HeartHandshake className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted" />
                      <input
                        type="text"
                        name="guardianName"
                        required
                        placeholder={
                          lang === "bn"
                            ? "স্বামী বা অভিভাবকের নাম"
                            : "Enter guardian name"
                        }
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
                      {lang === "bn" ? "ঠিকানা *" : "Address *"}
                    </label>
                    <div className="relative">
                      <MapPin className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted" />
                      <input
                        type="text"
                        name="address"
                        required={activeTab === "project"}
                        placeholder={
                          lang === "bn" ? "বর্তমান ঠিকানা" : "Current address"
                        }
                        value={formData.address}
                        onChange={handleChange}
                        className="w-full pl-10 pr-4 py-3 border border-line rounded-xl text-sm focus:outline-none focus:border-royal"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="block text-xs font-semibold uppercase text-ink/70">
                      {lang === "bn" ? "মোবাইল নম্বর *" : "Mobile Number *"}
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
                        {lang === "bn"
                          ? "চেম্বার নির্বাচন করুন *"
                          : "Select Chamber *"}
                      </label>
                      <select
                        name="chamber"
                        value={formData.chamber}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-line rounded-xl text-sm focus:outline-none focus:border-royal bg-white"
                      >
                        <option value="ইবনে সিনা হাসপাতাল (দড়াটানা)">
                          ইবনে সিনা হাসপাতাল (দড়াটানা, যশোর)
                        </option>
                        <option value="দড়াটানা হাসপাতাল এন্ড ডায়াগনস্টিক">
                          দড়াটানা হাসপাতাল এন্ড ডায়াগনস্টিক
                        </option>
                        <option value="ঝরনা ক্লিনিক (পাইকপট্টি)">
                          ঝরনা ক্লিনিক (গুরুদাস বাবু লেন, পাইকপট্টি)
                        </option>
                        <option value="অনলাইন ভিডিও কনসালটেশন">
                          অনলাইন ভিডিও কনসালটেশন (Telehealth)
                        </option>
                      </select>
                    </div>

                    <div className="space-y-2">
                      <label className="block text-xs font-semibold uppercase text-ink/70">
                        {lang === "bn"
                          ? "পছন্দের তারিখ *"
                          : "Preferred Date *"}
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

                {/* Payment Method Option */}
                <div className="space-y-2">
                  <label className="block text-xs font-semibold uppercase text-ink/70">
                    {lang === "bn"
                      ? "পেমেন্ট মাধ্যম নির্বাচন করুন *"
                      : "Select Payment Method *"}
                  </label>
                  <div className="relative">
                    <CreditCard className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted" />
                    <select
                      name="paymentMethod"
                      value={formData.paymentMethod}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-line rounded-xl text-sm focus:outline-none focus:border-royal bg-white"
                    >
                      <option value="bkash">
                        {lang === "bn"
                          ? "বিকাশ পেমেন্ট (bKash Personal - ১,০০০ টাকা ফিক্সড অ্যাডভান্স)"
                          : "bKash Payment (1,000 BDT Fixed Advance)"}
                      </option>
                      <option value="cash">
                        {lang === "bn"
                          ? "চেম্বারে সরাসরি ক্যাশ প্রদান (১,০০০ টাকা অগ্রিম প্রযোজ্য)"
                          : "Pay Cash at Chamber (1,000 BDT Advance applicable)"}
                      </option>
                    </select>
                  </div>
                </div>

                {/* bKash Instruction & TrxID Field when 'bkash' is selected */}
                {formData.paymentMethod === "bkash" && (
                  <div className="p-5 bg-pink-50/80 border border-pink-200 rounded-2xl space-y-4">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                      <div>
                        <p className="text-xs font-bold uppercase tracking-wider text-pink-700">
                          {lang === "bn"
                            ? "বিকাশ পার্সোনাল নম্বর (Send Money)"
                            : "bKash Personal Number (Send Money)"}
                        </p>
                        <div className="flex items-center gap-3 mt-1">
                          <p className="text-lg font-bold text-ink">
                            01759945057
                          </p>
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold bg-pink-600 text-white">
                            {lang === "bn"
                              ? "অ্যাডভান্স: ১,০০০ টাকা"
                              : "Advance: 1,000 BDT"}
                          </span>
                        </div>
                      </div>
                      <button
                        type="button"
                        onClick={handleCopyNumber}
                        className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-pink-600 text-white text-xs font-semibold hover:bg-pink-700 transition self-start sm:self-auto"
                      >
                        {copied ? (
                          <Check className="h-3.5 w-3.5" />
                        ) : (
                          <Copy className="h-3.5 w-3.5" />
                        )}
                        {copied
                          ? lang === "bn"
                            ? "কপি হয়েছে"
                            : "Copied"
                          : lang === "bn"
                          ? "নম্বর কপি করুন"
                          : "Copy Number"}
                      </button>
                    </div>

                    <p className="text-xs text-ink/75 leading-relaxed">
                      {lang === "bn"
                        ? 'উপরের বিকাশ পার্সোনাল নম্বরে ফিক্সড ১,০০০ টাকা "Send Money" করার পর নিচের ঘরে আপনার বিকাশ Transaction ID (TrxID) লিখে ফর্মটি জমা দিন। জমা দেওয়ার সাথে সাথেই আপনি চেম্বারে আসার জন্য ডাউনলোডযোগ্য রিসিপ্ট পেয়ে যাবেন।'
                        : 'Send Money 1,000 BDT to the bKash number above, enter the Transaction ID (TrxID) below, and submit to instantly receive your downloadable receipt for the chamber.'}
                    </p>

                    <div className="space-y-1.5">
                      <label className="block text-xs font-semibold uppercase text-pink-900">
                        {lang === "bn"
                          ? "বিকাশ Transaction ID (TrxID) *"
                          : "bKash Transaction ID (TrxID) *"}
                      </label>
                      <div className="relative">
                        <Hash className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-pink-600" />
                        <input
                          type="text"
                          name="trxId"
                          required={formData.paymentMethod === "bkash"}
                          placeholder={
                            lang === "bn" ? "যেমন: BGH78K9L2P" : "e.g., BGH78K9L2P"
                          }
                          value={formData.trxId}
                          onChange={handleChange}
                          className="w-full pl-10 pr-4 py-2.5 border border-pink-300 bg-white rounded-xl text-sm focus:outline-none focus:border-pink-600 uppercase"
                        />
                      </div>
                    </div>
                  </div>
                )}

                {/* Project Specific Note */}
                {activeTab === "project" && (
                  <div className="p-4 bg-royal/[0.05] border border-royal/15 rounded-xl text-xs text-muted leading-relaxed">
                    💡{" "}
                    {lang === "bn"
                      ? "রেজিস্ট্রেশন ফি: ডেলিভারির খরচ থেকে কর্তন যোগ্য ১,০০০ টাকা অগ্রিম ফি প্রযোজ্য। বাকি টাকা চেম্বারে পরিশোধ করতে হবে।"
                      : "Registration Fee: Fixed 1,000 BDT advance fee applicable, deductible from delivery cost. Remaining balance payable at chamber."}
                  </div>
                )}

                {/* Submit Button */}
                <button
                  type="submit"
                  className="w-full btn btn-primary py-3.5 justify-center text-base shadow-lg hover:shadow-xl transition-all"
                >
                  <Send className="h-5 w-5 mr-2" />
                  {formData.paymentMethod === "bkash"
                    ? lang === "bn"
                      ? "১,০০০ টাকা বিকাশ তথ্যসহ কনফার্ম করুন ও রিসিপ্ট নিন"
                      : "Confirm 1,000 BDT bKash Payment & Get Receipt"
                    : activeTab === "general"
                    ? lang === "bn"
                      ? "সিরিয়াল পাঠান (WhatsApp)"
                      : "Book Appointment via WhatsApp"
                    : lang === "bn"
                    ? "রেজিস্ট্রেশন জমা দিন (WhatsApp)"
                    : "Submit Registration via WhatsApp"}
                </button>
              </form>
            </div>
          </>
        )}
      </div>
    </section>
  );
}