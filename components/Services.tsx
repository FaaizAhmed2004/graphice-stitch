"use client";

import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { SERVICES } from "@/lib/constants";

const serviceImages = [
  "/Left chest TEDDEY.JPG",        // Left Chest Digitizing
  "/RAIDERS hat.JPG",              // Cap / Hat Digitizing
  "/Halos.JPG",                    // 3D Puff Embroidery — cap/hat with raised design
  "/MARATHON JB sweatshirts.JPG",  // Full Back / Jacket
  "/Cowboys Champions Vector Art R1.jpg", // Vector Art Conversion
  "/Vintage_Cutting.jpg",          // Patch Digitizing
];

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
            return (
              <article key={service.id} className={`group relative min-h-105 overflow-hidden border border-white/10 bg-[#1b1b1b] ${index === 0 ? "lg:col-span-2" : ""}`}>
                <Image src={serviceImages[index]} alt={service.title} fill sizes={index === 0 ? "(max-width: 1024px) 100vw, 66vw" : "(max-width: 1024px) 50vw, 33vw"} className="object-cover opacity-75 transition duration-700 ease-out group-hover:scale-110 group-hover:opacity-95" />
                <div className="absolute inset-0 bg-linear-to-t from-black via-black/45 to-black/5 transition duration-500 group-hover:via-black/30" />
                  <button onClick={scrollToQuote} className="absolute bottom-5 right-5 inline-flex items-center gap-2 bg-[#d9ff53] px-4 py-3 text-xs font-bold uppercase tracking-[0.15em] text-[#101010] transition hover:bg-white">Start Project <ArrowUpRight className="h-4 w-4" /></button>
              </article>
            );
          })}
        </div>

      </div>
    </section>
  );
}
