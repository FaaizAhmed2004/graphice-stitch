"use client";

import { Shirt, HardHat, Layers, Maximize, PenTool, Shield, ArrowRight } from "lucide-react";
import { SERVICES } from "@/lib/constants";

const iconMap: Record<string, React.ReactNode> = {
  shirt:      <Shirt    className="w-6 h-6" />,
  "hard-hat": <HardHat  className="w-6 h-6" />,
  layers:     <Layers   className="w-6 h-6" />,
  maximize:   <Maximize className="w-6 h-6" />,
  "pen-tool": <PenTool  className="w-6 h-6" />,
  shield:     <Shield   className="w-6 h-6" />,
};

export default function Services() {
  const scrollTo = (id: string) =>
    document.querySelector(id)?.scrollIntoView({ behavior: "smooth" });

  return (
    <section id="services" className="py-28 bg-white dark:bg-gray-950">
      <div className="max-w-7xl mx-auto px-4">

        {/* Header */}
        <div className="text-center mb-16">
          <span className="inline-block bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 text-xs font-bold px-4 py-1.5 rounded-full mb-4 uppercase tracking-widest">
            Our Services
          </span>
          <h2 className="text-4xl md:text-5xl font-black text-gray-900 dark:text-white mb-4">
            Everything You Need for{" "}
            <span className="gradient-text">Perfect Embroidery</span>
          </h2>
          <p className="text-gray-500 dark:text-gray-400 max-w-2xl mx-auto">
            From left-chest logos to full-back designs, we handle every style with
            precision, care, and fast turnaround.
          </p>
        </div>

        {/* Cards — bento-style layout */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {SERVICES.map((service, i) => (
            <div
              key={service.id}
              className={`group relative bg-gray-50 dark:bg-gray-900 rounded-3xl p-7 border border-gray-100 dark:border-gray-800 card-hover overflow-hidden
                ${i === 0 ? "lg:col-span-2 lg:row-span-1" : ""}`}
            >
              {/* Background accent */}
              <div className="absolute -right-8 -bottom-8 w-32 h-32 rounded-full bg-gray-200/40 dark:bg-gray-700/30 group-hover:scale-150 transition-transform duration-500" />

              {service.badge && (
                <span className="absolute top-5 right-5 text-xs font-bold px-2.5 py-1 rounded-full bg-gray-900 dark:bg-white text-white dark:text-gray-900">
                  {service.badge}
                </span>
              )}

              <div className="w-12 h-12 bg-gray-200 dark:bg-gray-800 rounded-2xl flex items-center justify-center text-gray-600 dark:text-gray-400 mb-5 group-hover:scale-110 group-hover:bg-gray-900 group-hover:text-white dark:group-hover:bg-white dark:group-hover:text-gray-900 transition-all duration-300">
                {iconMap[service.icon]}
              </div>

              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
                {service.title}
              </h3>
              <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed mb-6">
                {service.description}
              </p>

              <div className="flex items-center justify-between">
                <span className="text-2xl font-black gradient-text">
                  {service.price}
                  <span className="text-xs font-normal text-gray-400 ml-1">starting</span>
                </span>
                <button
                  onClick={() => scrollTo("#contact")}
                  className="flex items-center gap-1 text-gray-500 hover:text-gray-900 dark:hover:text-white text-sm font-semibold hover:gap-2 transition-all duration-150"
                >
                  Get Quote <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <p className="text-gray-400 mb-4 text-sm">
            Don&apos;t see what you need? We handle custom requests too.
          </p>
          <button
            onClick={() => scrollTo("#contact")}
            className="inline-flex items-center gap-2 bg-gray-900 dark:bg-white hover:bg-gray-700 dark:hover:bg-gray-100 text-white dark:text-gray-900 font-bold px-8 py-3.5 rounded-full shadow hover:shadow-gray-900/20 hover:scale-105 transition-all duration-200"
          >
            Request a Custom Quote <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </section>
  );
}
