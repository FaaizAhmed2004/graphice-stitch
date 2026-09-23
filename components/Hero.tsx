"use client";

import { ArrowDown, ArrowUpRight, Sparkles } from "lucide-react";
import Link from "next/link";

export default function Hero() {
  const scrollTo = (id: string) =>
    document.querySelector(id)?.scrollIntoView({ behavior: "smooth" });

  return (
    <section className="hero relative isolate flex min-h-[min(860px,100svh)] items-end overflow-hidden bg-[#101010] text-white">
      <video autoPlay muted loop playsInline poster="/Vintage_Cutting.jpg" className="absolute inset-0 -z-20 h-full w-full object-cover opacity-60">
        <source src="/hero.mp4" type="video/mp4" />
      </video>
      <div className="absolute inset-0 -z-10 bg-[linear-gradient(90deg,rgba(8,8,8,.96)_0%,rgba(8,8,8,.72)_42%,rgba(8,8,8,.2)_100%)]" />
      <div className="absolute inset-0 -z-10 bg-[linear-gradient(0deg,rgba(8,8,8,.92)_0%,transparent_55%)]" />

      <div className="mx-auto w-full max-w-7xl px-5 pb-16 pt-40 sm:px-8 lg:pb-24">
        <div className="max-w-3xl">
          <div className="fade-up inline-flex items-center gap-2 border border-white/20 bg-black/20 px-3 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-white/70 backdrop-blur-md">
            <Sparkles className="h-3.5 w-3.5 text-[#d9ff53]" />
            Graphic Stitch / Design production studio
          </div>
          <h1 className="fade-up-delay-1 mt-7 max-w-4xl text-5xl font-black leading-[.94] tracking-[-.04em] sm:text-7xl lg:text-[7.5rem]">
            Built to be<br /><span className="text-[#d9ff53]">seen.</span>
          </h1>
          <p className="fade-up-delay-2 mt-7 max-w-xl text-base leading-7 text-white/70 sm:text-lg">
            Precision embroidery digitizing and vector artwork for brands that care how their work shows up in the real world.
          </p>
          <div className="fade-up-delay-3 mt-9 flex flex-wrap items-center gap-3">
            <button onClick={() => scrollTo("#contact")} className="group inline-flex items-center gap-3 bg-[#d9ff53] px-5 py-3.5 text-sm font-bold text-[#101010] transition hover:bg-white">
              Start a project <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
            </button>
            <Link href="/portal/login" className="inline-flex items-center gap-3 border border-white/30 bg-black/20 px-5 py-3.5 text-sm font-bold backdrop-blur-md transition hover:border-white hover:bg-white hover:text-black">
              Login <ArrowUpRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
        <div className="mt-20 flex flex-wrap items-end justify-between gap-8 border-t border-white/20 pt-5 text-xs uppercase tracking-[0.18em] text-white/50">
          <span>Manual craft / Fast turnaround / Clear communication</span>
          <button onClick={() => scrollTo("#services")} className="group flex items-center gap-2 text-white/80">Explore work <ArrowDown className="h-4 w-4 transition-transform group-hover:translate-y-1" /></button>
        </div>
      </div>
    </section>
  );
}
