"use client";

import Image from "next/image";
import { ArrowUpRight, HardHat, Layers, Maximize, PenTool, Shield, Shirt } from "lucide-react";
import { SERVICES } from "@/lib/constants";

const serviceImages = [
  "/Left chest TEDDEY.JPG",
  "/RAIDERS hat.JPG",
  "/Cowboys Champions Vector Art R1.jpg",
  "/MARATHON JB sweatshirts.JPG",
  "/vector.jpg",
  "/Fresh Start.JPG",
];

const serviceIcons = [Shirt, HardHat, Layers, Maximize, PenTool, Shield];

export default function Services() {
  const scrollToQuote = () =>
    document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" });

  return (
    <section id="services" className="overflow-hidden bg-[#101010] py-24 text-white sm:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="mb-14 flex flex-col justify-between gap-7 border-b border-white/15 pb-8 lg:flex-row lg:items-end">
          <div className="max-w-2xl">
            <p className="mb-4 text-xs font-bold uppercase tracking-[0.24em] text-[#d9ff53]">What we make</p>
            <h2 className="text-4xl font-black leading-[.98] tracking-[-.04em] sm:text-6xl">
              The right file changes<br />the whole <span className="text-white/35">finish.</span>
            </h2>
          </div>
          <p className="max-w-xs text-sm leading-6 text-white/55">
            From first sketch to production-ready artwork, every detail is built for the way your brand will be seen.
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {SERVICES.map((service, index) => {
            const Icon = serviceIcons[index];
            return (
              <article key={service.id} className={`group relative min-h-105 overflow-hidden border border-white/10 bg-[#1b1b1b] ${index === 0 ? "lg:col-span-2" : ""}`}>
                <Image src={serviceImages[index]} alt={service.title} fill sizes={index === 0 ? "(max-width: 1024px) 100vw, 66vw" : "(max-width: 1024px) 50vw, 33vw"} className="object-cover opacity-75 transition duration-700 ease-out group-hover:scale-110 group-hover:opacity-95" />
                <div className="absolute inset-0 bg-linear-to-t from-black via-black/45 to-black/5 transition duration-500 group-hover:via-black/30" />
                <div className="absolute left-5 top-5 flex items-center gap-2 text-xs font-bold uppercase tracking-[0.16em] text-white/70">
                  <span className="flex h-9 w-9 items-center justify-center border border-white/20 bg-black/30 backdrop-blur-md"><Icon className="h-4 w-4" /></span>
                  0{index + 1}
                </div>
                {service.badge && <span className="absolute right-5 top-5 border border-[#d9ff53]/40 bg-[#d9ff53] px-3 py-1.5 text-[10px] font-black uppercase tracking-[0.16em] text-black">{service.badge}</span>}
                <div className="absolute inset-x-5 bottom-5 translate-y-2 transition duration-500 group-hover:translate-y-0">
                  <div className="mb-3 flex items-end justify-between gap-4">
                    <h3 className="max-w-sm text-2xl font-black leading-none tracking-[-.03em]">{service.title}</h3>
                    <span className="shrink-0 text-sm font-bold text-[#d9ff53]">{service.price}<span className="ml-1 text-[10px] font-normal uppercase text-white/50">from</span></span>
                  </div>
                  <p className="max-w-lg text-sm leading-6 text-white/65 opacity-100 transition duration-500 md:opacity-0 md:group-hover:opacity-100">{service.description}</p>
                  <button onClick={scrollToQuote} className="mt-4 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.15em] text-[#d9ff53] opacity-100 transition duration-500 md:opacity-0 md:group-hover:opacity-100">Start a project <ArrowUpRight className="h-4 w-4" /></button>
                </div>
              </article>
            );
          })}
        </div>

        <div className="mt-10 flex flex-col items-start justify-between gap-5 border-t border-white/15 pt-6 sm:flex-row sm:items-center">
          <p className="text-sm text-white/45">Need something custom? We build production systems around it.</p>
          <button onClick={scrollToQuote} className="group inline-flex items-center gap-3 border border-white/25 px-5 py-3 text-sm font-bold transition hover:border-[#d9ff53] hover:bg-[#d9ff53] hover:text-black">Request a custom quote <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" /></button>
        </div>
      </div>
    </section>
  );
}
