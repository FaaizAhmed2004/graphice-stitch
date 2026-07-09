"use client";

import Image from "next/image";
import { Star, ArrowDown, CheckCircle, Sparkles } from "lucide-react";
import { STATS } from "@/lib/constants";

export default function Hero() {
  const scrollTo = (id: string) =>
    document.querySelector(id)?.scrollIntoView({ behavior: "smooth" });

  return (
    <section className="relative min-h-screen hero-gradient flex items-center overflow-hidden">

      {/* ── Animated background layers ── */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* large rotating ring */}
        <div className="absolute -top-64 -right-64 w-[700px] h-[700px] rounded-full border border-white/5 spin-slow" />
        <div className="absolute -top-48 -right-48 w-[560px] h-[560px] rounded-full border border-white/[0.04]" style={{ animationDelay: "2s" }} />
        {/* silver glow blobs */}
        <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-gray-400/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 left-1/4 w-80 h-80 bg-white/5 rounded-full blur-3xl" />
        {/* grid overlay */}
        <div className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage: "linear-gradient(rgba(255,255,255,0.6) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.6) 1px,transparent 1px)",
            backgroundSize: "64px 64px"
          }} />
        {/* diagonal stripes */}
        <div className="absolute inset-0 stripe-bg opacity-60" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 pt-32 pb-20 w-full">
        <div className="grid lg:grid-cols-2 gap-16 items-center">

          {/* ── LEFT ── */}
          <div className="text-white">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 glass rounded-full px-4 py-2 mb-8 fade-up">
              <Sparkles className="w-4 h-4 text-gray-300" />
              <span className="text-sm font-medium text-gray-200">50,000+ Happy Customers Since 2009</span>
            </div>

            {/* Headline */}
            <h1 className="text-5xl md:text-6xl xl:text-7xl font-black leading-[1.05] mb-6 fade-up-delay-1">
              <span className="block text-white">Professional</span>
              <span className="block shimmer py-1">Embroidery</span>
              <span className="block text-gray-300">Digitizing</span>
            </h1>

            {/* Sub */}
            <p className="text-lg text-gray-400 mb-8 leading-relaxed max-w-lg fade-up-delay-2">
              Hand-crafted digitizing files with next-day turnaround.
              No auto-digitizing — every design is manually crafted by expert artists.
            </p>

            {/* Checklist */}
            <ul className="space-y-3 mb-10 fade-up-delay-2">
              {[
                "Expert Digitizers — No Auto-Digitizing",
                "Next-Day / Same-Day Turnaround",
                "100% Quality Guarantee · Free Revisions",
              ].map((item) => (
                <li key={item} className="flex items-center gap-3 text-gray-300">
                  <CheckCircle className="w-5 h-5 text-gray-400 flex-shrink-0" />
                  <span className="text-sm">{item}</span>
                </li>
              ))}
            </ul>

            {/* CTAs */}
            <div className="flex flex-wrap gap-4 fade-up-delay-3">
              <button
                onClick={() => scrollTo("#contact")}
                className="group relative overflow-hidden bg-white text-gray-900 font-bold px-8 py-4 rounded-full shadow-xl hover:shadow-white/20 hover:scale-105 transition-all duration-200 text-base"
              >
                <span className="relative z-10">Get a Free Quote</span>
                <div className="absolute inset-0 bg-gradient-to-r from-gray-100 to-white opacity-0 group-hover:opacity-100 transition-opacity" />
              </button>
              <button
                onClick={() => scrollTo("#services")}
                className="glass border border-white/20 text-white font-bold px-8 py-4 rounded-full hover:bg-white/10 transition-all duration-200 text-base"
              >
                View Services
              </button>
            </div>

            <p className="mt-6 text-gray-500 text-sm fade-up-delay-4">
              Starting at just{" "}
              <span className="text-white font-black text-xl">$15</span>{" "}
              per design
            </p>
          </div>

          {/* ── RIGHT ── */}
          <div className="flex flex-col items-center gap-6 slide-in-left">
            {/* Main card */}
            <div className="relative w-full max-w-sm">
              {/* Rotating outer ring */}
              <div className="absolute -inset-4 rounded-[2.5rem] border border-white/10 spin-slow" />

              <div className="relative glow-ring rounded-3xl p-8 text-center float-animation"
                style={{ background: "linear-gradient(145deg, rgba(255,255,255,0.10) 0%, rgba(255,255,255,0.04) 100%)", backdropFilter: "blur(20px)", border: "1px solid rgba(255,255,255,0.12)" }}>

                {/* Logo */}
                <div className="w-24 h-24 mx-auto mb-5 rounded-2xl overflow-hidden bg-white/10 flex items-center justify-center shadow-2xl">
                  <Image
                    src="/Company_Logo-01.png"
                    alt="Graphics Stitch"
                    width={96}
                    height={96}
                    className="object-contain w-full h-full"
                  />
                </div>

                <h3 className="text-white text-xl font-black mb-1">Graphics Stitch</h3>
                <p className="text-gray-400 text-sm mb-4">Where Art Meets Thread</p>

                {/* Stars */}
                <div className="flex justify-center gap-1 mb-2">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                  ))}
                </div>
                <p className="text-gray-400 text-xs">5.0 Rating · 1,200+ Reviews</p>

                {/* Silver shimmer bar */}
                <div className="mt-5 h-px w-full" style={{ background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent)" }} />
                <p className="mt-4 text-xs text-gray-400 uppercase tracking-widest">Est. 2009</p>
              </div>

              {/* Floating badges */}
              <div className="absolute -top-3 -right-3 bg-white text-gray-900 text-xs font-black px-3 py-1.5 rounded-full shadow-xl pulse-ring">
                ✓ Next-Day
              </div>
              <div className="absolute -bottom-3 -left-3 bg-gray-800 border border-gray-600 text-gray-200 text-xs font-bold px-3 py-1.5 rounded-full shadow-xl">
                🎨 From $15
              </div>
            </div>

            {/* Stats grid */}
            <div className="grid grid-cols-2 gap-3 w-full max-w-sm">
              {STATS.map((stat, i) => (
                <div key={stat.label}
                  className={`glass rounded-2xl p-4 text-center border border-white/10 fade-up-delay-${i + 1}`}>
                  <div className="text-2xl font-black text-white">{stat.value}</div>
                  <div className="text-gray-400 text-xs mt-1">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="flex justify-center mt-16">
          <button
            onClick={() => scrollTo("#services")}
            className="flex flex-col items-center gap-2 text-gray-600 hover:text-gray-400 transition-colors group"
          >
            <span className="text-xs uppercase tracking-widest">Explore</span>
            <ArrowDown className="w-5 h-5 group-hover:translate-y-1 transition-transform animate-bounce" />
          </button>
        </div>
      </div>
    </section>
  );
}
