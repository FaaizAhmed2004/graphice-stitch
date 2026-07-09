"use client";

import { useState } from "react";
import { Send, CheckCircle, Loader2, Mail, Phone, Clock, MessageSquare } from "lucide-react";
import toast from "react-hot-toast";
import { CONTACT_EMAIL, CONTACT_PHONE, BUSINESS_HOURS, WHATSAPP_NUMBER } from "@/lib/constants";

interface FormState {
  name: string;
  email: string;
  phone: string;
  service: string;
  size: string;
  notes: string;
}

const initialForm: FormState = {
  name: "", email: "", phone: "", service: "", size: "", notes: "",
};

const SERVICES_LIST = [
  "Left Chest Digitizing", "Cap / Hat Digitizing", "3D Puff Embroidery",
  "Full Back / Jacket", "Vector Art Conversion", "Patch Digitizing", "Other / Custom",
];

const SIZE_OPTIONS = [
  "Left Chest (3\" - 4\")", "Front Center (4\" - 5\")", "Full Back (10\" - 12\")",
  "Cap Front (2.5\" - 3\")", "Sleeve (2\" - 3\")", "Patch (Custom Size)", "Other",
];

const inputClass = "w-full px-4 py-3 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl text-sm text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-400 dark:focus:ring-gray-500 focus:border-transparent transition";

export default function ContactForm() {
  const [form, setForm]         = useState<FormState>(initialForm);
  const [loading, setLoading]   = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.service) {
      toast.error("Please fill in all required fields.");
      return;
    }
    setLoading(true);
    try {
      const res  = await fetch("/api/contact", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(form) });
      const data = await res.json();
      if (res.ok) {
        setSubmitted(true);
        setForm(initialForm);
        toast.success("Message sent! We'll get back to you within 24 hours.");
      } else {
        toast.error(data.error || "Something went wrong. Please try again.");
      }
    } catch {
      toast.error("Network error. Please try again or WhatsApp us directly.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" className="py-28 bg-white dark:bg-gray-950">
      <div className="max-w-7xl mx-auto px-4">

        {/* Header */}
        <div className="text-center mb-14">
          <span className="inline-block bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 text-xs font-bold px-4 py-1.5 rounded-full mb-4 uppercase tracking-widest">
            Get In Touch
          </span>
          <h2 className="text-4xl md:text-5xl font-black text-gray-900 dark:text-white mb-4">
            Start Your Order or{" "}
            <span className="gradient-text">Get a Free Quote</span>
          </h2>
          <p className="text-gray-500 dark:text-gray-400 max-w-xl mx-auto">
            Fill out the form below and our team will respond within 24 hours with your quote.
          </p>
        </div>

        <div className="grid lg:grid-cols-5 gap-8 max-w-6xl mx-auto">

          {/* ── Left info panel ── */}
          <div className="lg:col-span-2 space-y-5">

            {/* Dark contact card */}
            <div className="bg-gray-900 dark:bg-gray-800 rounded-3xl p-7 text-white">
              <h3 className="text-xl font-black mb-1">Contact Information</h3>
              <p className="text-gray-400 text-sm mb-7">We are here to help. Reach out any way you prefer.</p>

              <div className="space-y-5">
                <a href={`mailto:${CONTACT_EMAIL}`} className="flex items-center gap-3 group">
                  <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:bg-white/20 transition-colors">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Email</p>
                    <p className="font-semibold text-sm break-all">{CONTACT_EMAIL}</p>
                  </div>
                </a>

                <a href={`tel:${CONTACT_PHONE}`} className="flex items-center gap-3 group">
                  <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:bg-white/20 transition-colors">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Phone / WhatsApp</p>
                    <p className="font-semibold text-sm">{CONTACT_PHONE}</p>
                  </div>
                </a>

                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Clock className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Business Hours</p>
                    <p className="font-semibold text-sm">{BUSINESS_HOURS}</p>
                  </div>
                </div>

                <a href={`https://wa.me/${WHATSAPP_NUMBER}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 group">
                  <div className="w-10 h-10 bg-green-600/40 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:bg-green-600/60 transition-colors">
                    <MessageSquare className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">WhatsApp</p>
                    <p className="font-semibold text-sm">Chat With Us Now</p>
                  </div>
                </a>
              </div>

              {/* Silver shimmer divider */}
              <div className="my-6 h-px" style={{ background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.15), transparent)" }} />

              <ul className="space-y-2.5">
                {[
                  "Manual digitizing — no auto-digitizing",
                  "Next-day turnaround guaranteed",
                  "Free revisions within 14 days",
                  "All file formats supported",
                  "Bulk / B2B pricing available",
                ].map((item) => (
                  <li key={item} className="flex items-center gap-2 text-sm text-gray-300">
                    <span className="w-4 h-4 rounded-full bg-gray-600 text-gray-300 flex items-center justify-center text-xs flex-shrink-0">✓</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* ── Right form ── */}
          <div className="lg:col-span-3">
            {submitted ? (
              <div className="h-full flex flex-col items-center justify-center text-center py-16 bg-gray-50 dark:bg-gray-900 rounded-3xl border border-gray-100 dark:border-gray-800">
                <div className="w-20 h-20 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mb-6">
                  <CheckCircle className="w-10 h-10 text-gray-700 dark:text-gray-300" />
                </div>
                <h3 className="text-2xl font-black text-gray-900 dark:text-white mb-3">Message Sent!</h3>
                <p className="text-gray-500 dark:text-gray-400 max-w-sm">
                  Thank you! We&apos;ve received your request and will respond within 24 hours.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="mt-6 text-gray-600 dark:text-gray-400 font-semibold text-sm hover:underline"
                >
                  Submit another request
                </button>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                className="bg-gray-50 dark:bg-gray-900 rounded-3xl p-8 border border-gray-100 dark:border-gray-800"
              >
                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1.5">
                      Full Name <span className="text-red-400">*</span>
                    </label>
                    <input type="text" name="name" value={form.name} onChange={handleChange}
                      placeholder="John Smith" required className={inputClass} />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1.5">
                      Email Address <span className="text-red-400">*</span>
                    </label>
                    <input type="email" name="email" value={form.email} onChange={handleChange}
                      placeholder="john@example.com" required className={inputClass} />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1.5">
                      Phone / WhatsApp
                    </label>
                    <input type="tel" name="phone" value={form.phone} onChange={handleChange}
                      placeholder="+1 (555) 000-0000" className={inputClass} />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1.5">
                      Service Required <span className="text-red-400">*</span>
                    </label>
                    <select name="service" value={form.service} onChange={handleChange} required className={inputClass}>
                      <option value="">Select a service...</option>
                      {SERVICES_LIST.map((s) => <option key={s} value={s}>{s}</option>)}
                    </select>
                  </div>

                  <div className="sm:col-span-2">
                    <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1.5">
                      Size / Position
                    </label>
                    <select name="size" value={form.size} onChange={handleChange} className={inputClass}>
                      <option value="">Select size / position...</option>
                      {SIZE_OPTIONS.map((s) => <option key={s} value={s}>{s}</option>)}
                    </select>
                  </div>

                  <div className="sm:col-span-2">
                    <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1.5">
                      Notes / Special Instructions
                    </label>
                    <textarea name="notes" value={form.notes} onChange={handleChange}
                      rows={4} maxLength={500}
                      placeholder="Describe your design, color requirements, or any special instructions..."
                      className={`${inputClass} resize-none`} />
                    <p className="text-xs text-gray-400 mt-1 text-right">{form.notes.length}/500</p>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="mt-6 w-full flex items-center justify-center gap-2 bg-gray-900 dark:bg-white hover:bg-gray-700 dark:hover:bg-gray-100 text-white dark:text-gray-900 font-bold py-4 rounded-xl hover:shadow-xl hover:scale-[1.02] transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed disabled:scale-100"
                >
                  {loading ? (
                    <><Loader2 className="w-5 h-5 animate-spin" />Sending...</>
                  ) : (
                    <><Send className="w-5 h-5" />Send Message &amp; Get Quote</>
                  )}
                </button>

                <p className="text-center text-xs text-gray-400 mt-3">
                  We typically respond within a few hours. Your info is kept private.
                </p>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
