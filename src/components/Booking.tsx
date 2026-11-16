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
  const [loading, setLoading] = useState(false);

  // Receipt View State
  const [receipt, setReceipt] = useState<ReceiptData | null>(null);

  // Fixed Advance Amount for Normal Delivery Project
  const PROJECT_ADVANCE_AMOUNT = 2000;

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
    paymentMethod: "bkash",
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Generate Unique Receipt ID
    const randomNum = Math.floor(10000 + Math.random() * 90000);
    const receiptNo = `${activeTab === "project" ? "NDP" : "APT"}-${randomNum}`;
    const today = new Date().toLocaleDateString("en-GB");

    const isProjectBkash =
      activeTab === "project" && formData.paymentMethod === "bkash";

    const payloadData = {
      receiptNo,
      date: today,
      type: activeTab,
      patientName: formData.patientName,
      age: formData.age,
      guardianName: activeTab === "project" ? formData.guardianName : "",
      address: formData.address,
      mobile: formData.mobile,
      chamber: activeTab === "general" ? formData.chamber : "Normal Delivery Project",
      preferredDate: activeTab === "general" ? formData.preferredDate : "",
      paymentMethod: activeTab === "general" ? "none" : formData.paymentMethod,
      trxId: formData.trxId.toUpperCase(),
      advancePaid: isProjectBkash ? PROJECT_ADVANCE_AMOUNT : 0,
    };

    try {
      // ব্যাকএন্ড API-এ ডেটা পাঠানো হচ্ছে
      const apiResponse = await fetch('http://localhost:5000/api/appointments', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payloadData),
      });

      const apiResult = await apiResponse.json();

      if (!apiResult.success) {
        console.error('Database save warning:', apiResult.error);
      }
    } catch (err) {
      console.error('Backend connection error:', err);
    } finally {
      setLoading(false);
    }

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
      paymentMethod: activeTab === "general" ? "none" : formData.paymentMethod,
      trxId: formData.trxId.toUpperCase(),
      advancePaid: isProjectBkash ? PROJECT_ADVANCE_AMOUNT : 0,
    };

    // Set Receipt to display on screen
    setReceipt(generatedReceipt);

    // Prepare WhatsApp Message
    let message = "";

    if (activeTab === "general") {
      message =
        lang === "bn"
          ? `*সাধারণ চেম্বার সিরিয়াল অনুরোধ*%0A%0A` +
            `🔖 *Serial / Receipt No:* ${receiptNo}%0A` +
            `👤 *রোগীর নাম:* ${formData.patientName}%0A` +
            `🎂 *বয়স:* ${formData.age}%0A` +
            `📱 *মোবাইল নম্বর:* ${formData.mobile}%0A` +
            `📍 *ঠিকানা:* ${formData.address || "দেওয়া হয়নি"}%0A` +
            `🏥 *চেম্বার:* ${formData.chamber}%0A` +
            `📅 *পছন্দের তারিখ:* ${formData.preferredDate}%0A` +
            `💳 *ফি:* চেম্বারে সরাসরি পরিশোধযোগ্য (অ্যাডভান্স প্রযোজ্য নয়)`
          : `*General Chamber Appointment Request*%0A%0A` +
            `🔖 *Serial / Receipt No:* ${receiptNo}%0A` +
            `👤 *Patient Name:* ${formData.patientName}%0A` +
            `🎂 *Age:* ${formData.age}%0A` +
            `📱 *Mobile:* ${formData.mobile}%0A` +
            `📍 *Address:* ${formData.address || "N/A"}%0A` +
            `🏥 *Chamber:* ${formData.chamber}%0A` +
            `📅 *Preferred Date:* ${formData.preferredDate}%0A` +
            `💳 *Fee:* Payable at Chamber (No Advance Required)`;
    } else {
      const paymentInfoBn =
        formData.paymentMethod === "bkash"
          ? `💳 *পেমেন্ট মাধ্যম:* বিকাশ (bKash Personal)%0A💰 *অ্যাডভান্স পরিশোধিত:* ২,০০০ টাকা (ফিক্সড)%0A🧾 *Transaction ID:* ${formData.trxId.toUpperCase()}%0A🔖 *Receipt No:* ${receiptNo}`
          : `💳 *পেমেন্ট মাধ্যম:* চেম্বারে সরাসরি ক্যাশ (২,০০০ টাকা অ্যাডভান্স প্রযোজ্য)%0A🔖 *Booking ID:* ${receiptNo}`;

      const paymentInfoEn =
        formData.paymentMethod === "bkash"
          ? `💳 *Payment Method:* bKash Personal%0A💰 *Advance Paid:* 2,000 BDT (Fixed)%0A🧾 *Transaction ID:* ${formData.trxId.toUpperCase()}%0A🔖 *Receipt No:* ${receiptNo}`
          : `💳 *Payment Method:* Pay Cash at Chamber (2,000 BDT Advance applicable)%0A🔖 *Booking ID:* ${receiptNo}`;

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
                      ? "Normal Delivery Project — Advance Receipt"
                      : "Chamber Appointment — Serial Receipt"}
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
                    {receipt.type === "project" ? "Receipt / ID No" : "Serial / ID No"}
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
                        {receipt.type === "general"
                          ? lang === "bn"
                            ? "চেম্বার সিরিয়াল কনফার্মেশন স্লিপ"
                            : "Chamber Appointment Confirmation Slip"
                          : receipt.paymentMethod === "bkash"
                          ? lang === "bn"
                            ? "অ্যাডভান্স পেমেন্ট কনফার্মড (২,০০০ টাকা ফিক্সড)"
                            : "Advance Payment Confirmed (2,000 BDT Fixed)"
                          : lang === "bn"
                          ? "নরমাল ডেলিভারি প্রজেক্ট বুকিং স্লিপ"
                          : "Normal Delivery Project Booking Slip"}
                      </p>
                      <p className="text-xs text-emerald-700">
                        {lang === "bn"
                          ? "চেম্বারে আসার সময় এই রিসিপ্টটি প্রিন্ট করে বা মোবাইলে সাথে নিয়ে আসবেন।"
                          : "Please bring a printed or digital copy of this receipt to the chamber."}
                      </p>
                    </div>
                  </div>
                  {receipt.type === "project" && receipt.paymentMethod === "bkash" && (
                    <span className="px-3 py-1 rounded-full bg-emerald-600 text-white text-xs font-bold uppercase shrink-0">
                      PAID ৳2,000
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
                  {receipt.type === "general" ? (
                    <>
                      <div className="flex justify-between">
                        <span className="text-muted">
                          {lang === "bn" ? "অ্যাডভান্স পেমেন্ট:" : "Advance Payment:"}
                        </span>
                        <span className="font-bold text-emerald-700">
                          {lang === "bn"
                            ? "প্রযোজ্য নয় (০ টাকা)"
                            : "Not Required (0 BDT)"}
                        </span>
                      </div>
                      <p className="text-xs text-muted pt-1">
                        *{" "}
                        {lang === "bn"
                          ? "নোট: সাধারণ চেম্বার সিরিয়ালের জন্য কোনো অগ্রিম পেমেন্টের প্রয়োজন নেই। ভিজিট ফি সরাসরি চেম্বারে পরিশোধ করবেন।"
                          : "Note: No advance payment is required for a general chamber appointment. Consultation fee is payable directly at the chamber."}
                      </p>
                    </>
                  ) : (
                    <>
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
                              ২,০০০ টাকা (2,000 BDT)
                            </span>
                          </div>
                        </>
                      )}

                      <p className="text-xs text-muted pt-2">
                        *{" "}
                        {lang === "bn"
                          ? "নোট: পরিশোধিত ২,০০০ টাকা অগ্রিম ফি মূল ডেলিভারি খরচ থেকে কর্তনযোগ্য। অবশিষ্ট টাকা চেম্বারে/হাসপাতালে পরিশোধ করতে হবে।"
                          : "Note: The 2,000 BDT fixed advance payment is deductible from the total delivery cost. Remaining balance is payable at the chamber/hospital."}
                      </p>
                    </>
                  )}
                </div>

                <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 text-xs text-muted">
                  <div>
                    <p className="font-semibold text-ink">
                      {lang === "bn" ? "যোগাযোগ ও সিরিয়াল:" : "Chamber Contact:"}
                    </p>
                    <p>01926-576245, 01601-874467</p>
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
          <>
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
                    ? "ডাক্তার সিরিয়াল ফর্ম (অ্যাডভান্স ছাড়াই)"
                    : "Doctor Appointment Form (No Advance)"}
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

              <form onSubmit={handleSubmit} className="p-6 sm:p-10 space-y-6">
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

                {activeTab === "general" && (
                  <>
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

                    <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-xl text-xs text-emerald-800 leading-relaxed">
                      ✅{" "}
                      {lang === "bn"
                        ? "সাধারণ চেম্বার সিরিয়ালের জন্য কোনো অ্যাডভান্স পেমেন্ট লাগবে না। সাবমিট করার পর আপনার সিরিয়াল রিসিপ্টটি ডাউনলোড করে চেম্বারে নিয়ে আসবেন।"
                        : "No advance payment is required for general chamber appointments. After submitting, download your serial receipt and bring it to the chamber."}
                    </div>
                  </>
                )}

                {activeTab === "project" && (
                  <>
                    <div className="space-y-2">
                      <label className="block text-xs font-semibold uppercase text-ink/70">
                        {lang === "bn"
                          ? "পেমেন্ট মাধ্যম নির্বাচন করুন (২,০০০ টাকা ফিক্সড অ্যাডভান্স) *"
                          : "Select Payment Method (2,000 BDT Fixed Advance) *"}
                      </label>
                      <div className="relative">
                        <CreditCard className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted" />
                        <select
                          name="paymentMethod"
                          value={formData.paymentMethod}
                          onChange={handleChange}
                          className="w-full pl-10 pr-4 py-3 border border-line rounded-xl text-sm focus:outline-none focus:border-royal bg-white"
                        >
                          <option value="bkash">
                            {lang === "bn"
                              ? "বিকাশ পেমেন্ট (bKash Personal - ২,০০০ টাকা ফিক্সড অ্যাডভান্স)"
                              : "bKash Payment (2,000 BDT Fixed Advance)"}
                          </option>
                          <option value="cash">
                            {lang === "bn"
                              ? "চেম্বারে সরাসরি ক্যাশ প্রদান"
                              : "Cash at Chamber"}
                          </option>
                        </select>
                      </div>
                    </div>

                    {formData.paymentMethod === "bkash" && (
                      <div className="p-5 bg-pink-50 border border-pink-200 rounded-2xl space-y-4">
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-bold text-pink-900 uppercase">
                            {lang === "bn" ? "বিকাশ পার্সোনাল নম্বর" : "bKash Personal Number"}
                          </span>
                          <button
                            type="button"
                            onClick={handleCopyNumber}
                            className="inline-flex items-center gap-1.5 px-3 py-1 bg-pink-600 text-white rounded-lg text-xs font-bold hover:bg-pink-700 transition"
                          >
                            {copied ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
                            {copied ? (lang === "bn" ? "কপি হয়েছে!" : "Copied!") : (lang === "bn" ? "নম্বর কপি করুন" : "Copy Number")}
                          </button>
                        </div>
                        <p className="text-lg font-mono font-bold text-pink-700">
                          01759945057 <span className="text-xs font-normal text-muted">(Send Money / Personal)</span>
                        </p>
                        <p className="text-xs text-pink-800">
                          {lang === "bn"
                            ? "উপরের নম্বরে ২,০০০ টাকা সেন্ড মানি করে নিচের বক্সে আপনার বিকাশ ট্রানজেকশন আইডি (TrxID) লিখুন।"
                            : "Send Money 2,000 BDT to the above number and enter your bKash Transaction ID (TrxID) below."}
                        </p>

                        <div className="space-y-2">
                          <label className="block text-xs font-semibold uppercase text-ink/70">
                            {lang === "bn" ? "বিকাশ ট্রানজেকশন আইডি (TrxID) *" : "bKash TrxID *"}
                          </label>
                          <div className="relative">
                            <Hash className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted" />
                            <input
                              type="text"
                              name="trxId"
                              required={formData.paymentMethod === "bkash"}
                              placeholder="যেমন: 9J74H2K9L1"
                              value={formData.trxId}
                              onChange={handleChange}
                              className="w-full pl-10 pr-4 py-3 border border-pink-300 bg-white rounded-xl text-sm font-mono uppercase focus:outline-none focus:border-pink-600"
                            />
                          </div>
                        </div>
                      </div>
                    )}
                  </>
                )}

                <button
                  type="submit"
                  disabled={loading}
                  className={`w-full py-4 rounded-2xl text-white font-bold flex items-center justify-center gap-2 shadow-lg transition-all ${
                    activeTab === "project"
                      ? "bg-royal hover:bg-royal/90 shadow-royal/25"
                      : "bg-emerald-600 hover:bg-emerald-700 shadow-emerald-600/25"
                  }`}
                >
                  <Send className="h-4 w-4" />
                  {loading
                    ? lang === "bn"
                      ? "প্রক্রিয়াধীন রয়েছে..."
                      : "Processing..."
                    : activeTab === "project"
                    ? lang === "bn"
                      ? "নরমাল ডেলিভারি প্রজেক্ট বুকিং নিশ্চিত করুন"
                      : "Confirm Normal Delivery Project Booking"
                    : lang === "bn"
                    ? "চেম্বার সিরিয়াল বুকিং নিশ্চিত করুন"
                    : "Confirm Chamber Appointment"}
                </button>
              </form>
            </div>
          </>
        )}
      </div>
    </section>
  );
}