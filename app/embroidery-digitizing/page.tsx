import type { Metadata } from "next";
import Image from "next/image";
import PageLayout from "@/components/PageLayout";
import ContactForm from "@/components/ContactForm";
import Testimonials from "@/components/Testimonials";
import FAQ from "@/components/FAQ";
import ManagedServicesPricing from "@/components/ManagedServicesPricing";
import { CheckCircle, Clock, Star, ArrowRight, Upload, Settings, Download } from "lucide-react";

export const metadata: Metadata = {
  title: "Embroidery Digitizing Services — Graphic Stitch",
  description:
    "Professional embroidery digitizing starting at $15. Manual digitizing by expert artists. DST, PES, EMB, XXX formats. Next-day turnaround with quality guarantee.",
};

const PRICING = [
  { name: "Left Chest", price: "$10", note: "With artwork ready for embroidery", popular: false },
  { name: " Cap Design", price: "$10", note: "With artwork ready for embroidery", popular: true },
  { name: "3D Puff", price: "$10", note: "Foam puff technique", popular: false },
  { name: "JacketBack Digitizing", price: "$20-30", note: "Large scale designs", popular: false },
];

const HOW_IT_WORKS = [
  {
    step: "01",
    icon: <Upload className="w-6 h-6" />,
    title: "Send Your Artwork",
    desc: "Upload any image file — JPEG, PNG, GIF, HEIC, TIFF, PDF, AI, SVG, and more. High-resolution files produce the best results.",
  },
  {
    step: "02",
    icon: <Settings className="w-6 h-6" />,
    title: "Our Digitizers Get to Work",
    desc: "We manually digitize your design using Wilcom e4, Hatch, Pulse Tajima DG/ML, Wings XP 6, and more. No auto-digitizing — ever.",
  },
  {
    step: "03",
    icon: <Download className="w-6 h-6" />,
    title: "Receive Your File",
    desc: "Get your embroidery file via email in your preferred format: DST, PES, EMB, HUS, XXX, VIP, VP3, JEF, EXP, and more.",
  },
];

const FEATURES = [
  "In-house expert digitizers — no outsourcing",
  "Manual digitizing — no auto-digitizing software",
  "Next-day turnaround guaranteed",
  "All major machine formats supported",
  // "Free revisions within 14 days",
  "Custom patch borders and fills",
];

const SPECIALTIES = [
  { title: "3D Puff Embroidery", desc: "Bold foam-backed designs for caps and hats that truly stand out." },
  { title: "Coloreel Technology", desc: "We are trained in the latest Coloreel thread innovation software." },
  { title: "Complex Artwork", desc: "No project is too intricate. We thrive on complex, detailed designs." },
  { title: "Vector Art", desc: "Convert any raster image into clean, scalable vector line art." },
  { title: "Pet Portraits", desc: "Lifelike embroidery portraits of your beloved pets from photos." },
  { title: "Patch Digitizing", desc: "Crisp, clean patch files for uniforms, clubs, and custom branding." },
];

export default function EmbroideryDigitizingPage() {
  return (
    <PageLayout>
      {/* Hero */}
      <section className="relative overflow-hidden bg-[#101010] py-24 text-white">
        <div className="absolute inset-0 stripe-bg opacity-40" />
        <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-4 lg:grid-cols-[1.05fr_.95fr]">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full border border-[#d9ff53]/35 bg-[#d9ff53]/10 px-4 py-2 text-xs font-bold uppercase tracking-[.18em] text-[#d9ff53]"><Star className="h-4 w-4" />Embroidery production</span>
            <h1 className="mt-6 text-4xl font-black leading-tight sm:text-5xl xl:text-6xl">Professional embroidery files built to sew clean.</h1>
            <p className="mt-6 max-w-xl text-lg leading-8 text-white/60">Expert manual digitizing for shirts, caps, jackets, patches, and complex artwork. Production decisions are made for the real garment, not just the screen.</p>
            <div className="mt-8 flex flex-wrap gap-3">{["Manual digitizing", "Next-day turnaround", "Quality guarantee"].map((b) => <span key={b} className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-2 text-sm font-bold text-white/75"><CheckCircle className="h-4 w-4 text-[#d9ff53]" />{b}</span>)}</div>
          </div>
          <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-[#202020] shadow-2xl shadow-black/30"><Image src="/Left chest TEDDEY.JPG" alt="Embroidery digitizing project on a garment" width={900} height={620} className="h-85 w-full object-cover" priority /><div className="absolute inset-x-0 bottom-0 bg-linear-to-t from-black/85 to-transparent p-6"><p className="text-xs font-bold uppercase tracking-[.18em] text-[#d9ff53]">Made for real sew-out</p><p className="mt-2 text-xl font-black">Clean density, sharp detail, and dependable production files.</p></div></div>
        </div>
      </section>

      {/* Why choose us */}
      <section className="py-20 bg-white dark:bg-gray-950">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="inline-block bg-[#d9ff53]/20 text-[#587500] dark:text-[#d9ff53] text-sm font-semibold px-4 py-1.5 rounded-full mb-4">
                Why Graphics Stitch
              </span>
              <h2 className="text-3xl md:text-4xl font-black text-gray-900 dark:text-white mb-6">
                Prices start at just{" "}
                <span className="gradient-text">$10</span>
              </h2>
              <p className="text-gray-600 dark:text-gray-400 mb-8 leading-relaxed">
                Here is what sets us apart from the competition. We combine in-house expertise
                with competitive pricing — no compromises on quality.
              </p>
              <ul className="space-y-3 mb-8">
                {FEATURES.map((f) => (
                  <li key={f} className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <CheckCircle className="w-3 h-3 text-green-600" />
                    </div>
                    <span className="text-gray-700 dark:text-gray-300 text-sm">{f}</span>
                  </li>
                ))}
              </ul>
            </div>
            {/* Stats cards */}
            <div className="grid grid-cols-2 gap-4">
              {[
                { value: "50K+", label: "Happy Customers", color: "bg-[#202020]" },
                { value: "15+", label: "Years Experience", color: "bg-[#2b2b2b]" },
                { value: "24hr", label: "Turnaround", color: "bg-[#202020]" },
                { value: "100%", label: "Quality Guaranteed", color: "bg-[#2b2b2b]" },
              ].map((s) => (
                <div
                  key={s.label}
                  className={`${s.color} rounded-2xl border border-white/10 p-6 text-white text-center`}
                >
                  <div className="text-3xl font-black mb-1">{s.value}</div>
                  <div className="text-white/80 text-sm">{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="py-20 bg-gray-50 dark:bg-gray-900/50 section-pattern">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-14">
            <span className="inline-block bg-black/5 dark:bg-white/10 text-black/60 dark:text-white/70 text-sm font-semibold px-4 py-1.5 rounded-full mb-4">
              How It Works
            </span>
            <h2 className="text-3xl md:text-4xl font-black text-gray-900 dark:text-white mb-4">
              The Process Is Fast and{" "}
              <span className="gradient-text">Easy</span>
            </h2>
            <p className="text-gray-600 dark:text-gray-400 max-w-xl mx-auto">
              Just three simple steps to get your professional embroidery file delivered.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {HOW_IT_WORKS.map((step, i) => (
              <div key={i} className="relative">
                {i < HOW_IT_WORKS.length - 1 && (
                  <div className="hidden md:block absolute top-10 left-full w-full h-0.5 bg-[#d9ff53]/40 z-0 -translate-x-8" />
                )}
                <div className="relative bg-white dark:bg-gray-800 rounded-2xl p-8 border border-gray-100 dark:border-gray-700 text-center card-hover">
                  <div className="w-16 h-16 bg-[#171717] rounded-2xl flex items-center justify-center text-[#d9ff53] mx-auto mb-4 text-2xl font-black">
                    {step.step}
                  </div>
                  <div className="flex justify-center text-[#587500] dark:text-[#d9ff53] mb-3">
                    {step.icon}
                  </div>
                  <h3 className="font-black text-gray-900 dark:text-white text-lg mb-3">
                    {step.title}
                  </h3>
                  <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed">
                    {step.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="py-20 bg-white dark:bg-gray-950">
        <div className="max-w-5xl mx-auto px-4">
          <div className="text-center mb-12">
            <span className="inline-block bg-[#d9ff53]/20 text-[#587500] dark:text-[#d9ff53] text-sm font-semibold px-4 py-1.5 rounded-full mb-4">
              Pricing
            </span>
            <h2 className="text-3xl md:text-4xl font-black text-gray-900 dark:text-white mb-4">
              Competitive Prices,{" "}
              <span className="gradient-text">No Surprises</span>
            </h2>
            <p className="text-gray-600 dark:text-gray-400 max-w-xl mx-auto">
              Professional digitizing at affordable prices. Starting prices below — final cost depends on design complexity.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            {PRICING.map((item) => (
              <div
                key={item.name}
                className={`rounded-2xl p-6 text-center border transition-all ${
                  item.popular
                    ? "bg-[#171717] text-white border-[#d9ff53] shadow-xl shadow-black/25"
                    : "bg-gray-50 dark:bg-gray-800 border-gray-100 dark:border-gray-700 text-gray-800 dark:text-gray-200"
                }`}
              >
                {item.popular && (
                  <span className="inline-block text-xs font-bold bg-white/20 px-3 py-1 rounded-full mb-3">
                    Most Popular
                  </span>
                )}
                <h3 className="font-bold text-sm mb-3">{item.name}</h3>
                <div className={`text-3xl font-black mb-1 ${item.popular ? "text-white" : "gradient-text"}`}>
                  {item.price}
                </div>
                <p className={`text-xs mt-2 ${item.popular ? "text-white/65" : "text-gray-400"}`}>
                  {item.note}
                </p>
              </div>
            ))}
          </div>
          <div className="flex items-center gap-3 bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-700/40 rounded-xl p-4">
            <Clock className="w-5 h-5 text-amber-600 flex-shrink-0" />
            <p className="text-sm text-amber-800 dark:text-amber-300">
              <span className="font-bold">Fast Turnaround:</span> Standard next-day delivery. Same-day rush available for most orders.
            </p>
          </div>
          <p className="text-center text-gray-400 text-xs mt-4">
            * Starting prices. Final price based on complexity. Formats: DST, PES, EMB, XXX, HUS, VIP, VP3, JEF, EXP, and more.
          </p>
        </div>
      </section>

      <ManagedServicesPricing category="embroidery" title="Embroidery Services & Pricing" description="Review our embroidery services and place your order after signing in to the client workspace." />

      {/* Specialties */}
      <section className="py-20 bg-gray-50 dark:bg-gray-900/50 section-pattern">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <span className="inline-block bg-black/5 dark:bg-white/10 text-black/60 dark:text-white/70 text-sm font-semibold px-4 py-1.5 rounded-full mb-4">
              Our Specialties
            </span>
            <h2 className="text-3xl md:text-4xl font-black text-gray-900 dark:text-white mb-4">
              Embroidery Digitizing{" "}
              <span className="gradient-text">For Every Style</span>
            </h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {SPECIALTIES.map((s) => (
              <div key={s.title} className="bg-white dark:bg-gray-800 rounded-2xl p-6 border border-gray-100 dark:border-gray-700 card-hover">
                <h3 className="font-black text-gray-900 dark:text-white text-lg mb-2">{s.title}</h3>
                <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Free designs CTA */}
      <section className="py-16 bg-[#101010]">
        <div className="max-w-4xl mx-auto px-4 text-center text-white">
          <h3 className="text-2xl md:text-3xl font-black mb-3">
            See Our Quality For Yourself!
          </h3>
          <p className="text-white/60 mb-6">
            Explore our free designs library and download test files — completely risk-free.
          </p>
          <a
            href="/sample-designs"
            className="inline-flex items-center gap-2 bg-[#d9ff53] text-[#171717] font-bold px-8 py-3.5 rounded-full hover:bg-white hover:scale-105 transition-transform shadow-lg"
          >
            Browse Sample Designs <ArrowRight className="w-4 h-4" />
          </a>
        </div>
      </section>

      <Testimonials />
      <FAQ />
      <ContactForm />
    </PageLayout>
  );
}
