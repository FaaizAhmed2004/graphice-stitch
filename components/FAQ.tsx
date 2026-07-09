"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { FAQS } from "@/lib/constants";

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section id="faq" className="py-28 bg-gray-50 dark:bg-gray-900/60 section-pattern">
      <div className="max-w-4xl mx-auto px-4">
        <div className="text-center mb-14">
          <span className="inline-block bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-400 text-xs font-bold px-4 py-1.5 rounded-full mb-4 uppercase tracking-widest border border-gray-200 dark:border-gray-700">
            FAQ
          </span>
          <h2 className="text-4xl md:text-5xl font-black text-gray-900 dark:text-white mb-4">
            Have More <span className="gradient-text">Questions?</span>
          </h2>
          <p className="text-gray-500 dark:text-gray-400">
            Here are the most common questions we get from our customers.
          </p>
        </div>

        <div className="space-y-3">
          {FAQS.map((faq, index) => (
            <div
              key={index}
              className={`rounded-2xl border overflow-hidden transition-all duration-300 ${
                openIndex === index
                  ? "bg-gray-900 dark:bg-white border-gray-900 dark:border-white shadow-xl"
                  : "bg-white dark:bg-gray-900 border-gray-100 dark:border-gray-800 hover:border-gray-300 dark:hover:border-gray-600"
              }`}
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full flex items-center justify-between gap-4 p-5 text-left"
              >
                <span className={`font-semibold text-sm md:text-base transition-colors ${
                  openIndex === index ? "text-white dark:text-gray-900" : "text-gray-900 dark:text-white"
                }`}>
                  {faq.question}
                </span>
                <div className={`w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 transition-all duration-300 ${
                  openIndex === index
                    ? "bg-white/20 dark:bg-gray-900/20 rotate-180"
                    : "bg-gray-100 dark:bg-gray-800"
                }`}>
                  <ChevronDown className={`w-4 h-4 transition-colors ${
                    openIndex === index ? "text-white dark:text-gray-900" : "text-gray-400"
                  }`} />
                </div>
              </button>
              <div className={`overflow-hidden transition-all duration-300 ${openIndex === index ? "max-h-48" : "max-h-0"}`}>
                <div className="px-5 pb-5">
                  <p className={`text-sm leading-relaxed ${
                    openIndex === index ? "text-gray-300 dark:text-gray-600" : "text-gray-600 dark:text-gray-400"
                  }`}>
                    {faq.answer}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
