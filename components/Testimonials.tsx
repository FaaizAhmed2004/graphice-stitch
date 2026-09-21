"use client";

import { useState } from "react";
import { Star, ChevronLeft, ChevronRight, Quote } from "lucide-react";
import { TESTIMONIALS } from "@/lib/constants";

export default function Testimonials() {
  const [current, setCurrent] = useState(0);
  const prev = () => setCurrent((c) => (c === 0 ? TESTIMONIALS.length - 1 : c - 1));
  const next = () => setCurrent((c) => (c === TESTIMONIALS.length - 1 ? 0 : c + 1));

  return (
    <section id="testimonials" className="py-28 bg-white dark:bg-gray-950">
      <div className="max-w-7xl mx-auto px-4">

        {/* Header */}
        <div className="text-center mb-16">
          <span className="inline-block bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 text-xs font-bold px-4 py-1.5 rounded-full mb-4 uppercase tracking-widest">
            Testimonials
          </span>
          <h2 className="text-4xl md:text-5xl font-black text-gray-900 dark:text-white mb-4">
            Don&apos;t Just Take{" "}
            <span className="gradient-text">Our Word For It</span>
          </h2>
          <p className="text-gray-500 dark:text-gray-400 max-w-xl mx-auto">
            Thousands of happy customers trust Graphics Stitch for embroidery and vector art.
          </p>
        </div>

        {/* Desktop grid */}
        <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-3 gap-5 mb-10">
          {TESTIMONIALS.map((t, i) => (
            <div key={i} className="bg-gray-50 dark:bg-gray-900 rounded-3xl p-6 border border-gray-100 dark:border-gray-800 card-hover relative overflow-hidden">
              <Quote className="absolute top-4 right-4 w-8 h-8 text-gray-200 dark:text-gray-800" />
              <div className="flex gap-0.5 mb-3">
                {[...Array(t.rating)].map((_, j) => (
                  <Star key={j} className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                ))}
              </div>
              <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed mb-5 italic">
                &ldquo;{t.text}&rdquo;
              </p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gray-900 dark:bg-gray-200 flex items-center justify-center text-white dark:text-gray-900 font-bold text-sm flex-shrink-0">
                  {t.name.charAt(0)}
                </div>
                <div>
                  <p className="font-bold text-sm text-gray-900 dark:text-white">{t.name}</p>
                  <p className="text-xs text-gray-400">{t.source}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Mobile carousel */}
        <div className="md:hidden relative mb-10">
          <div className="bg-gray-50 dark:bg-gray-900 rounded-3xl p-6 border border-gray-100 dark:border-gray-800">
            <Quote className="absolute top-4 right-4 w-8 h-8 text-gray-200 dark:text-gray-800" />
            <div className="flex gap-0.5 mb-3">
              {[...Array(TESTIMONIALS[current].rating)].map((_, j) => (
                <Star key={j} className="w-4 h-4 text-yellow-400 fill-yellow-400" />
              ))}
            </div>
            <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed mb-5 italic">
              &ldquo;{TESTIMONIALS[current].text}&rdquo;
            </p>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gray-900 dark:bg-gray-200 flex items-center justify-center text-white dark:text-gray-900 font-bold text-sm flex-shrink-0">
                {TESTIMONIALS[current].name.charAt(0)}
              </div>
              <div>
                <p className="font-bold text-sm text-gray-900 dark:text-white">{TESTIMONIALS[current].name}</p>
                <p className="text-xs text-gray-400">{TESTIMONIALS[current].source}</p>
              </div>
            </div>
          </div>
          <div className="flex items-center justify-center gap-4 mt-4">
            <button onClick={prev} className="p-2 rounded-full bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors">
              <ChevronLeft className="w-5 h-5 text-gray-600 dark:text-gray-300" />
            </button>
            <div className="flex gap-1.5">
              {TESTIMONIALS.map((_, i) => (
                <button key={i} onClick={() => setCurrent(i)}
                  className={`h-2 rounded-full transition-all ${i === current ? "bg-gray-900 dark:bg-white w-4" : "bg-gray-300 dark:bg-gray-600 w-2"}`} />
              ))}
            </div>
            <button onClick={next} className="p-2 rounded-full bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors">
              <ChevronRight className="w-5 h-5 text-gray-600 dark:text-gray-300" />
            </button>
          </div>
        </div>

        {/* Trust badges — unique asymmetric strip */}
        <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { value: "5.0",  label: "Average Rating",  bg: "bg-gray-900 dark:bg-gray-800 text-white" },
            { value: "50K+", label: "Happy Customers",  bg: "bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-white" },
            { value: "100%", label: "Quality Guarantee", bg: "bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-white" },
            { value: "Free", label: "Revisions",         bg: "bg-gray-900 dark:bg-gray-800 text-white" },
          ].map((b) => (
            <div key={b.label} className={`flex flex-col items-center p-5 rounded-3xl ${b.bg} text-center border border-gray-200 dark:border-gray-700`}>
              <span className="text-2xl font-black">{b.value}</span>
              <span className="text-xs opacity-60 mt-0.5">{b.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
