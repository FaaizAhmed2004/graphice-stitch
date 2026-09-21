import type { Metadata } from "next";
import PageLayout from "@/components/PageLayout";
import ContactForm from "@/components/ContactForm";
import { Check, ArrowRight, Clock, RefreshCw, ShieldCheck } from "lucide-react";

export const metadata: Metadata = {
  title: "Pricing — Graphics Stitch",
  description:
    "Transparent pricing for embroidery digitizing and vector art. Left chest from $15, 3D Puff from $25, Full Back from $65. No hidden fees.",
};

const EMBROIDERY_PRICING = [
  { name: "Left Chest", price: "$15", note: "With artwork ready for embroidery", popular: false },
  { name: "Left Chest + Cap", price: "$20", note: "With artwork ready for embroidery", popular: true },
  { name: "3D Puff", price: "$25", note: "Foam puff technique included", popular: false },
  { name: "Full Back / Jacket", price: "$65", note: "Large scale designs", popular: false },
];

const VECTOR_PRICING = [
  { name: "Simple Artwork", price: "$15", note: "Basic logos, 1–3 colors, clean shapes", popular: false },
  { name: "Complex Artwork", price: "$20", note: "Detailed illustrations, many colors", popular: true },
];

const WHY_US = [
  { icon: <Clock className="w-5 h-5" />, title: "Next-Day Turnaround", desc: "Standard 24-hour delivery. Rush same-day available." },
  { icon: <RefreshCw className="w-5 h-5" />, title: "Free Revisions", desc: "Free changes within 14 days of delivery. No questions asked." },
  { icon: <ShieldCheck className="w-5 h-5" />, title: "Quality Guarantee", desc: "Not satisfied? Full refund or account credit within 14 days." },
  { icon: <Check className="w-5 h-5" />, title: "All Formats Included", desc: "Get your file in every format — no extra charge." },
];

export default function PricingPage() {
  return (
    <PageLayout>
      {/* Hero */}
      <section className="relative hero-gradient py-24 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute -top-32 -right-32 w-80 h-80 bg-purple-500/20 rounded-full blur-3xl" />
          <div className="absolute -bottom-32 -left-32 w-80 h-80 bg-pink-500/20 rounded-full blur-3xl" />
        </div>
        <div className="relative max-w-4xl mx-auto px-4 text-center text-white">
          <span className="inline-block bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-4 py-2 text-sm font-medium mb-6">
            💰 Transparent Pricing
          </span>
          <h1 className="text-4xl md:text-5xl font-black mb-6">
            Professional Digitizing at{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-yellow-300">
              Affordable Prices
            </span>
          </h1>
          <p className="text-purple-100 text-lg max-w-xl mx-auto">
            High quality. Low cost. No hidden fees. We can meet your budget
            at $15 per design or go more elaborate — your choice.
          </p>
        </div>
      </section>

      {/* Main Pricing */}
      <section className="py-20 bg-white dark:bg-gray-950">
        <div className="max-w-7xl mx-auto px-4">

          {/* Embroidery */}
          <div className="mb-20">
            <div className="text-center mb-10">
              <span className="inline-block bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 text-sm font-semibold px-4 py-1.5 rounded-full mb-4">
                Embroidery Digitizing
              </span>
              <h2 className="text-2xl md:text-3xl font-black text-gray-900 dark:text-white">
                Embroidery Digitizing Prices
              </h2>
              <p className="text-gray-500 dark:text-gray-400 text-sm mt-2">Fast Next-Day Service Turnaround</p>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 max-w-5xl mx-auto">
              {EMBROIDERY_PRICING.map((item) => (
                <div
                  key={item.name}
                  className={`relative rounded-2xl p-7 text-center border transition-all ${
                    item.popular
                      ? "bg-gradient-to-br from-purple-600 to-indigo-700 text-white border-transparent shadow-2xl shadow-purple-500/30 scale-105"
                      : "bg-gray-50 dark:bg-gray-800 border-gray-100 dark:border-gray-700"
                  }`}
                >
                  {item.popular && (
                    <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-pink-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow">
                      Most Popular
                    </span>
                  )}
                  <h3 className={`font-bold text-sm mb-4 ${item.popular ? "text-white" : "text-gray-700 dark:text-gray-300"}`}>
                    {item.name}
                  </h3>
                  <div className={`text-4xl font-black mb-3 ${item.popular ? "text-white" : "gradient-text"}`}>
                    {item.price}
                  </div>
                  <p className={`text-xs leading-relaxed ${item.popular ? "text-purple-200" : "text-gray-400"}`}>
                    {item.note}
                  </p>
                  <a
                    href="#contact"
                    className={`mt-5 inline-flex items-center gap-1 text-xs font-semibold ${
                      item.popular ? "text-white hover:text-purple-200" : "text-purple-600 dark:text-purple-400 hover:text-pink-600"
                    } transition-colors`}
                  >
                    Get Quote <ArrowRight className="w-3 h-3" />
                  </a>
                </div>
              ))}
            </div>
            <p className="text-center text-gray-400 text-xs mt-5">
              * Starting prices. Final cost depends on complexity. Formats: DST, PES, EMB, XXX, HUS, VIP, VP3, JEF, EXP and more.
            </p>
          </div>

          {/* Vector */}
          <div className="mb-16">
            <div className="text-center mb-10">
              <span className="inline-block bg-pink-100 dark:bg-pink-900/30 text-pink-700 dark:text-pink-300 text-sm font-semibold px-4 py-1.5 rounded-full mb-4">
                Vector Art
              </span>
              <h2 className="text-2xl md:text-3xl font-black text-gray-900 dark:text-white">
                Vector Art Conversion Prices
              </h2>
            </div>
            <div className="grid sm:grid-cols-2 gap-5 max-w-2xl mx-auto">
              {VECTOR_PRICING.map((item) => (
                <div
                  key={item.name}
                  className={`rounded-2xl p-8 text-center border ${
                    item.popular
                      ? "bg-gradient-to-br from-pink-600 to-rose-600 text-white border-transparent shadow-xl shadow-pink-500/30"
                      : "bg-gray-50 dark:bg-gray-800 border-gray-100 dark:border-gray-700"
                  }`}
                >
                  {item.popular && (
                    <span className="text-xs font-bold bg-white/20 px-3 py-1 rounded-full block mb-3">Most Common</span>
                  )}
                  <h3 className={`font-bold mb-3 ${item.popular ? "text-white" : "text-gray-900 dark:text-white"}`}>
                    {item.name}
                  </h3>
                  <div className={`text-4xl font-black mb-2 ${item.popular ? "text-white" : "gradient-text"}`}>
                    {item.price}
                  </div>
                  <p className={`text-sm ${item.popular ? "text-pink-100" : "text-gray-500 dark:text-gray-400"}`}>
                    {item.note}
                  </p>
                </div>
              ))}
            </div>
            <p className="text-center text-gray-400 text-xs mt-5">
              * Formats delivered: AI, EPS, SVG, PDF, JPG, PNG. CDR (Corel Draw) on request. We convert existing art — not original creation.
            </p>
          </div>

          {/* Why us */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 mt-16">
            {WHY_US.map((item) => (
              <div key={item.title} className="bg-gray-50 dark:bg-gray-800 rounded-2xl p-6 border border-gray-100 dark:border-gray-700 text-center">
                <div className="w-11 h-11 bg-purple-100 dark:bg-purple-900/40 rounded-xl flex items-center justify-center text-purple-600 dark:text-purple-400 mx-auto mb-3">
                  {item.icon}
                </div>
                <h4 className="font-bold text-gray-900 dark:text-white text-sm mb-2">{item.title}</h4>
                <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Patch service banner */}
      <section className="py-16 bg-gray-50 dark:bg-gray-900/50">
        <div className="max-w-4xl mx-auto px-4">
          <div className="bg-gradient-to-r from-purple-700 via-purple-600 to-pink-600 rounded-3xl p-10 text-center text-white">
            <h3 className="text-2xl md:text-3xl font-black mb-3">🛡️ Need a custom patch?</h3>
            <p className="text-purple-100 mb-6 max-w-xl mx-auto">
              We build clean patch files with accurate borders, fills, and stitch direction for every garment and backing.
            </p>
            <a
              href="/embroidery-digitizing"
              className="inline-flex items-center gap-2 bg-white text-purple-700 font-bold px-8 py-3.5 rounded-full hover:scale-105 transition-transform shadow-lg"
            >
              Explore Patch Digitizing <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      </section>

      <ContactForm />
    </PageLayout>
  );
}
