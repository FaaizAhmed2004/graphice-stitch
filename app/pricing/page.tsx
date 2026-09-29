import type { Metadata } from "next";
import PageLayout from "@/components/PageLayout";
import ContactForm from "@/components/ContactForm";
import { Check, ArrowRight, Clock, RefreshCw, ShieldCheck } from "lucide-react";

export const metadata: Metadata = {
  title: "Pricing — Graphic Stitch",
  description:
    "Transparent flat-rate pricing for embroidery digitizing, custom contracts, and vector art. No hidden fees.",
};

const EMBROIDERY_PRICING = [
  { name: "STANDARD Digitizing", details: ["Flat Rates (Unlimited Stitches)", "Leftchest Designs $10", "Caps Designs $10", "Hats Designs $10"] },
  { name: "3D Puff & Applique DIGITIZING", details: ["Flat Rates (Unlimited Stitches)", "Leftchest Designs $12", "Caps Designs $12", "JacketBacks $20"], highlighted: true },
  { name: "JacketBack DIGITIZING", details: ["$25 to $30 Flat for any kind of JacketBack Image Digitizing"] },
  { name: "Special Monthly Contract", details: ["Silver $400 (50 Leftchests & 10 Jacketbacks)", "Gold $700 (30 Leftchests & 15 Jacketbacks)", "Diamond $900 (50 Leftchests & 30 Jacketbacks)", "Platinum $1800 (Your Personal Designer, Unlimited Leftchests and Jacketbacks)"] },
];

const VECTOR_PRICING = [
  { name: "Regular Vectors", details: ["$10 Flat (Simple Vectors)"] },
  { name: "Standard Vectors", details: ["$15 Flat (DTF, DTG, Separations)"], highlighted: true },
  { name: "Complex Vectors", details: ["$25 Flat (Halftone, Detailed Images, Engraving)"] },
  { name: "Special Monthly Contract", details: ["Silver $400", "Gold $700", "Diamond $900", "Platinum $1800 (Your Personal Designer, Unlimited Vector Designs Any Type)"] },
];

const WHY_US = [
  { icon: <Clock className="w-5 h-5" />, title: "Same-Day Turnaround", desc: "Standard 24-hour delivery. Rush same-day available." },
  { icon: <RefreshCw className="w-5 h-5" />, title: "Free Revisions", desc: "Free changes within 14 days of delivery. No questions asked." },
  { icon: <ShieldCheck className="w-5 h-5" />, title: "Quality Guarantee", desc: "Not satisfied? Full refund or account credit within 14 days." },
  { icon: <Check className="w-5 h-5" />, title: "All Formats Included", desc: "Get your file in every format — no extra charge." },
];

function PricingCards({ items }: { items: { name: string; details: string[]; highlighted?: boolean }[] }) {
  return (
    <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
      {items.map((item) => (
        <article key={item.name} className={`flex flex-col rounded-2xl border p-7 text-center ${item.highlighted ? "border-[#d9ff53] bg-[#171717] text-white shadow-xl shadow-black/20" : "border-gray-100 bg-gray-50 dark:border-gray-700 dark:bg-gray-800"}`}>
          <h3 className={`mb-4 font-bold ${item.highlighted ? "text-white" : "text-gray-900 dark:text-white"}`}>{item.name}</h3>
          <div className={`flex flex-1 flex-col justify-center gap-3 text-sm leading-relaxed ${item.highlighted ? "text-white/75" : "text-gray-600 dark:text-gray-300"}`}>
            {item.details.map((detail) => <p key={detail}>{detail}</p>)}
          </div>
          <a href="/quote" className={`mt-6 inline-flex items-center justify-center gap-1 text-sm font-semibold transition-colors ${item.highlighted ? "text-[#d9ff53] hover:text-white" : "text-[#587500] hover:text-black dark:text-[#d9ff53] dark:hover:text-white"}`}>
            Order Now <ArrowRight className="h-3.5 w-3.5" />
          </a>
        </article>
      ))}
    </div>
  );
}

export default function PricingPage() {
  return (
    <PageLayout>
      {/* Hero */}
      <section className="relative hero-gradient py-24 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute -top-32 -right-32 w-80 h-80 rounded-full bg-[#d9ff53]/10 blur-3xl" />
          <div className="absolute -bottom-32 -left-32 w-80 h-80 rounded-full bg-white/10 blur-3xl" />
        </div>
        <div className="relative max-w-4xl mx-auto px-4 text-center text-white">
            <span className="inline-block rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm font-medium mb-6">
            Transparent Pricing
          </span>
          <h1 className="text-4xl md:text-5xl font-black mb-6">
            Professional Digitizing at{" "}
            <span className="text-[#d9ff53]">
              Affordable Prices
            </span>
          </h1>
          <p className="text-white/65 text-lg max-w-xl mx-auto">
            High quality. Low cost. No hidden fees. We can meet your budget
            at $10 per design or go more elaborate — your choice.
          </p>
        </div>
      </section>

      {/* Main Pricing */}
      <section className="py-20 bg-white dark:bg-gray-950">
        <div className="max-w-7xl mx-auto px-4">

          {/* Embroidery */}
          <div className="mb-20">
            <div className="text-center mb-10">
              <span className="inline-block bg-[#d9ff53]/20 text-[#587500] dark:text-[#d9ff53] text-sm font-semibold px-4 py-1.5 rounded-full mb-4">
                Embroidery Digitizing
              </span>
              <h2 className="text-2xl md:text-3xl font-black text-gray-900 dark:text-white">
                Embroidery Digitizing Prices
              </h2>
              <p className="text-gray-500 dark:text-gray-400 text-sm mt-2">Same day turnaround</p>
            </div>
            <PricingCards items={EMBROIDERY_PRICING} />
          </div>

          {/* Vector */}
          <div className="mb-16">
            <div className="text-center mb-10">
              <span className="inline-block bg-[#d9ff53]/20 text-[#587500] dark:text-[#d9ff53] text-sm font-semibold px-4 py-1.5 rounded-full mb-4">
                Vector Art
              </span>
              <h2 className="text-2xl md:text-3xl font-black text-gray-900 dark:text-white">
                Vector Prices
              </h2>
            </div>
            <PricingCards items={VECTOR_PRICING} />
          </div>

          {/* Why us */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 mt-16">
            {WHY_US.map((item) => (
              <div key={item.title} className="bg-gray-50 dark:bg-gray-800 rounded-2xl p-6 border border-gray-100 dark:border-gray-700 text-center">
                <div className="w-11 h-11 bg-[#d9ff53]/20 rounded-xl flex items-center justify-center text-[#587500] dark:text-[#d9ff53] mx-auto mb-3">
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
          <div className="rounded-3xl bg-[#171717] p-10 text-center text-white">
            <h3 className="text-2xl md:text-3xl font-black mb-3">Need a custom patch?</h3>
            <p className="text-white/60 mb-6 max-w-xl mx-auto">
              We build clean patch files with accurate borders, fills, and stitch direction for every garment and backing.
            </p>
            <a
              href="/embroidery-digitizing"
              className="inline-flex items-center gap-2 bg-[#d9ff53] text-[#171717] font-bold px-8 py-3.5 rounded-full hover:bg-white hover:scale-105 transition-transform shadow-lg"
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
