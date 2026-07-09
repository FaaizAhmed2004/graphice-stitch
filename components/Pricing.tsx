"use client";

import { Check, ArrowRight } from "lucide-react";
import { PRICING_EMBROIDERY, PRICING_VECTOR, FORMATS_EMBROIDERY, FORMATS_VECTOR } from "@/lib/constants";

export default function Pricing() {
  const scrollTo = (id: string) =>
    document.querySelector(id)?.scrollIntoView({ behavior: "smooth" });

  return (
    <section id="pricing" className="py-28 section-pattern">
      <div className="max-w-7xl mx-auto px-4">

        {/* Header */}
        <div className="text-center mb-16">
          <span className="inline-block bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-400 text-xs font-bold px-4 py-1.5 rounded-full mb-4 uppercase tracking-widest border border-gray-200 dark:border-gray-700">
            Pricing
          </span>
          <h2 className="text-4xl md:text-5xl font-black text-gray-900 dark:text-white mb-4">
            Competitive Prices,{" "}
            <span className="gradient-text">Uncompromising Quality</span>
          </h2>
          <p className="text-gray-500 dark:text-gray-400 max-w-2xl mx-auto">
            Professional digitizing at prices that make sense. No hidden fees — just great work.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">

          {/* ── Embroidery ── */}
          <div className="bg-white dark:bg-gray-900 rounded-3xl p-8 border border-gray-200 dark:border-gray-800 shadow-sm">
            <div className="flex items-center gap-3 mb-7">
              <div className="w-11 h-11 bg-gray-900 dark:bg-white rounded-xl flex items-center justify-center text-xl">🧵</div>
              <h3 className="text-xl font-black text-gray-900 dark:text-white">Embroidery Digitizing</h3>
            </div>

            <div className="space-y-2.5 mb-6">
              {PRICING_EMBROIDERY.map((item) => (
                <div key={item.name}
                  className={`flex items-center justify-between p-3.5 rounded-xl transition-all ${
                    item.popular
                      ? "bg-gray-900 dark:bg-white text-white dark:text-gray-900 shadow-lg"
                      : "bg-gray-50 dark:bg-gray-800 text-gray-800 dark:text-gray-100"
                  }`}>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-sm">{item.name}</span>
                      {item.popular && (
                        <span className={`text-xs px-2 py-0.5 rounded-full ${item.popular ? "bg-white/20 dark:bg-gray-900/20" : ""}`}>
                          Popular
                        </span>
                      )}
                    </div>
                    <p className={`text-xs mt-0.5 ${item.popular ? "text-gray-300 dark:text-gray-600" : "text-gray-400"}`}>{item.note}</p>
                  </div>
                  <span className={`text-2xl font-black ${item.popular ? "text-white dark:text-gray-900" : "gradient-text"}`}>{item.price}</span>
                </div>
              ))}
            </div>

            <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-3 mb-5">
              <p className="text-xs text-gray-500 dark:text-gray-400">
                <span className="font-bold text-gray-700 dark:text-gray-300">Formats:</span> {FORMATS_EMBROIDERY}
              </p>
            </div>

            <ul className="space-y-2 mb-6">
              {["Free revisions within 14 days", "Next-day turnaround", "All machine formats available"].map((f) => (
                <li key={f} className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                  <Check className="w-4 h-4 text-gray-500 dark:text-gray-400 flex-shrink-0" /> {f}
                </li>
              ))}
            </ul>

            <button onClick={() => scrollTo("#contact")}
              className="w-full bg-gray-900 dark:bg-white hover:bg-gray-700 dark:hover:bg-gray-100 text-white dark:text-gray-900 font-bold py-3.5 rounded-xl hover:shadow-lg hover:scale-[1.02] transition-all flex items-center justify-center gap-2">
              Get Embroidery Quote <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          {/* ── Vector Art ── */}
          <div className="bg-white dark:bg-gray-900 rounded-3xl p-8 border border-gray-200 dark:border-gray-800 shadow-sm">
            <div className="flex items-center gap-3 mb-7">
              <div className="w-11 h-11 bg-gray-900 dark:bg-white rounded-xl flex items-center justify-center text-xl">🎨</div>
              <h3 className="text-xl font-black text-gray-900 dark:text-white">Vector Art Conversion</h3>
            </div>

            <div className="space-y-2.5 mb-6">
              {PRICING_VECTOR.map((item) => (
                <div key={item.name}
                  className={`flex items-center justify-between p-3.5 rounded-xl transition-all ${
                    item.popular
                      ? "bg-gray-900 dark:bg-white text-white dark:text-gray-900 shadow-lg"
                      : "bg-gray-50 dark:bg-gray-800 text-gray-800 dark:text-gray-100"
                  }`}>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-sm">{item.name}</span>
                      {item.popular && (
                        <span className="text-xs px-2 py-0.5 rounded-full bg-white/20 dark:bg-gray-900/20">Popular</span>
                      )}
                    </div>
                    <p className={`text-xs mt-0.5 ${item.popular ? "text-gray-300 dark:text-gray-600" : "text-gray-400"}`}>{item.note}</p>
                  </div>
                  <span className={`text-2xl font-black ${item.popular ? "text-white dark:text-gray-900" : "gradient-text"}`}>{item.price}</span>
                </div>
              ))}
            </div>

            <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-3 mb-5">
              <p className="text-xs text-gray-500 dark:text-gray-400">
                <span className="font-bold text-gray-700 dark:text-gray-300">Formats:</span> {FORMATS_VECTOR}
              </p>
            </div>

            <ul className="space-y-2 mb-6">
              {["High-quality scalable files", "Screen printing ready", "Ideal for print, vinyl, laser"].map((f) => (
                <li key={f} className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                  <Check className="w-4 h-4 text-gray-500 dark:text-gray-400 flex-shrink-0" /> {f}
                </li>
              ))}
            </ul>

            <button onClick={() => scrollTo("#contact")}
              className="w-full bg-gray-900 dark:bg-white hover:bg-gray-700 dark:hover:bg-gray-100 text-white dark:text-gray-900 font-bold py-3.5 rounded-xl hover:shadow-lg hover:scale-[1.02] transition-all flex items-center justify-center gap-2">
              Get Vector Quote <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* B2B banner */}
        <div className="mt-8 max-w-4xl mx-auto bg-gray-900 dark:bg-gray-800 rounded-2xl p-6 text-white text-center border border-gray-700">
          <h3 className="text-lg font-black mb-2">🏢 B2B / Bulk Pricing Available</h3>
          <p className="text-gray-400 text-sm mb-4">
            Running a high-volume embroidery business? We offer flat-rate and custom plans tailored to your needs.
          </p>
          <button onClick={() => scrollTo("#contact")}
            className="inline-flex items-center gap-2 bg-white text-gray-900 font-bold px-6 py-2.5 rounded-full hover:scale-105 transition-transform text-sm">
            Contact for B2B Pricing <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <p className="text-center text-gray-400 text-xs mt-4">
          * Prices shown are starting rates. Final price depends on design complexity.
        </p>
      </div>
    </section>
  );
}
