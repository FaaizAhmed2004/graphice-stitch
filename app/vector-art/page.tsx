import type { Metadata } from "next";
import Image from "next/image";
import PageLayout from "@/components/PageLayout";
import ContactForm from "@/components/ContactForm";
import ManagedServicesPricing from "@/components/ManagedServicesPricing";
import Testimonials from "@/components/Testimonials";
import { CheckCircle, Upload, Settings, Download, ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Vector Art Conversion Services — Graphic Stitch",
  description:
    "Professional vector art conversion starting at $15. We convert any image to AI, EPS, SVG, PDF, PNG. Perfect for screen printing, vinyl, laser cutting and more.",
};

const USES = [
  { title: "Screen Printing", desc: "Perfect scalable files for screen printing on any garment." },
  { title: "Vinyl Cutting", desc: "Precise paths for plotter and vinyl cutting machines." },
  { title: "Laser Engraving", desc: "Clean vector files optimized for laser engravers." },
  { title: "Print Production", desc: "High-resolution print-ready files for any media." },
  { title: "Digital Media", desc: "Scalable graphics for web, apps, and digital platforms." },
  { title: "Promotional Items", desc: "Versatile files for mugs, bags, pens, and merchandise." },
];

const HOW_IT_WORKS = [
  {
    step: "01",
    icon: <Upload className="w-6 h-6" />,
    title: "Send Your Artwork",
    desc: "We accept JPEG, PNG, GIF, BMP, HEIC, TIFF, PDF, and more. Any resolution — we work with what you have.",
  },
  {
    step: "02",
    icon: <Settings className="w-6 h-6" />,
    title: "Our Designers Trace It",
    desc: "Our artists manually trace every design using the latest software to achieve the best possible vector result.",
  },
  {
    step: "03",
    icon: <Download className="w-6 h-6" />,
    title: "Receive Your Vector File",
    desc: "You get a zipped folder with AI, EPS, SVG, PDF, PNG files. Corel Draw files available on request.",
  },
];

export default function VectorArtPage() {
  return (
    <PageLayout>
      {/* Hero */}
      <section className="relative overflow-hidden bg-[#101010] py-24 text-white">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute -top-32 -right-32 h-80 w-80 rounded-full bg-[#d9ff53]/10 blur-3xl" />
          <div className="absolute -bottom-32 -left-32 h-80 w-80 rounded-full bg-white/5 blur-3xl" />
          <div className="absolute inset-0 stripe-bg opacity-40" />
        </div>
        <div className="relative max-w-7xl mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left — text */}
            <div className="text-white">
              <div className="inline-flex items-center gap-2 glass rounded-full px-4 py-2 mb-6 border border-white/20">
                <span className="text-sm font-medium">Professional Vector Conversion</span>
              </div>
              <h1 className="text-4xl md:text-5xl xl:text-6xl font-black leading-tight mb-6">
                <span className="block text-white">Professional</span>
                <span className="block text-[#d9ff53] py-1">Vector Art</span>
                <span className="block text-white/55">Conversion</span>
              </h1>
              <p className="text-lg text-gray-400 max-w-lg mb-8 leading-relaxed">
                We convert your raster images into clean, scalable, print-ready vector files.
                Perfect for screen printing, vinyl, laser cutting, and more.
              </p>
              <div className="flex flex-wrap gap-3 mb-8">
                {["Manual Tracing", "Next-Day Turnaround", "All Formats Delivered"].map((b) => (
                  <span key={b} className="flex items-center gap-1.5 glass border border-white/20 px-4 py-2 rounded-full text-sm font-medium text-gray-200">
                    <CheckCircle className="w-4 h-4 text-gray-400" /> {b}
                  </span>
                ))}
              </div>
                <p className="text-white/45 text-sm">
                Starting at just{" "}
                <span className="text-[#d9ff53] font-black text-2xl">$10</span>
              </p>
            </div>

            {/* Right — real sample images */}
            <div className="flex flex-col gap-4">
              {/* Main showcase image */}
              <div className="relative rounded-3xl overflow-hidden glow-ring float-animation">
                <Image
                  src="/vector-butterfly.png"
                  alt="Vector butterfly art sample"
                  width={600}
                  height={380}
                  className="w-full h-64 object-cover"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                <div className="absolute bottom-4 left-4">
                  <span className="bg-white/10 backdrop-blur-sm border border-white/20 text-white text-xs font-semibold px-3 py-1.5 rounded-full">
                    Vector Art Sample
                  </span>
                </div>
              </div>
              {/* Secondary image */}
              <div className="relative rounded-2xl overflow-hidden border border-white/10">
                <Image
                  src="/vector.jpg"
                  alt="Vector art conversion example"
                  width={600}
                  height={220}
                  className="w-full h-44 object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                <div className="absolute bottom-3 left-3">
                  <span className="bg-white/10 backdrop-blur-sm border border-white/20 text-white text-xs font-semibold px-3 py-1.5 rounded-full">
                    Professional Conversion
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* What is vector art */}
      <section className="py-20 bg-white dark:bg-gray-950">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-14 items-center">
            <div>
              <span className="inline-block bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 text-xs font-bold px-4 py-1.5 rounded-full mb-4 uppercase tracking-widest">
                What Is Vector Art?
              </span>
              <h2 className="text-3xl md:text-4xl font-black text-gray-900 dark:text-white mb-6">
                Infinitely Scalable.{" "}
                <span className="gradient-text">Crystal Clear.</span>
              </h2>
              <p className="text-gray-600 dark:text-gray-400 mb-4 leading-relaxed">
                Vector files are defined by mathematical paths — points, lines, curves, and shapes — rather than pixels.
                This means they can be scaled to any size without ever losing quality or sharpness.
              </p>
              <p className="text-gray-600 dark:text-gray-400 mb-6 leading-relaxed">
                Unlike raster images (JPEG, PNG), vector graphics are resolution-independent and infinitely editable.
                Each shape and layer is independent, allowing easy separation, color changes, and modifications.
              </p>
              <ul className="space-y-3">
                {[
                  "Scale to any size without quality loss",
                  "Easily edit colors and individual elements",
                  "Print-ready at any resolution",
                  "Compatible with all design and cutting software",
                ].map((f) => (
                  <li key={f} className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300">
                    <CheckCircle className="w-4 h-4 text-gray-500 flex-shrink-0" /> {f}
                  </li>
                ))}
              </ul>
            </div>

            {/* Real sample images — before/after style */}
            <div className="grid grid-cols-2 gap-4">
              <div className="rounded-2xl overflow-hidden border border-gray-200 dark:border-gray-700 group card-hover">
                <div className="relative h-48">
                  <Image
                    src="/vector.jpg"
                    alt="Before vector conversion"
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                    sizes="50vw"
                  />
                </div>
                <div className="p-3 bg-gray-50 dark:bg-gray-800">
                  <div className="text-xs font-bold uppercase tracking-wider text-gray-500 mb-1">Before / Raster</div>
                  <p className="text-xs text-gray-400">Original image — pixelated at scale</p>
                  <div className="mt-2 text-xs bg-red-50 dark:bg-red-900/20 text-red-500 dark:text-red-400 px-2 py-1 rounded-lg inline-block">
                    JPEG / PNG
                  </div>
                </div>
              </div>
              <div className="rounded-2xl overflow-hidden border border-gray-300 dark:border-gray-600 group card-hover ring-1 ring-gray-400/20">
                <div className="relative h-48">
                  <Image
                    src="/vector-butterfly.png"
                    alt="After vector conversion — butterfly"
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                    sizes="50vw"
                  />
                </div>
                <div className="p-3 bg-gray-900 dark:bg-gray-800">
                  <div className="text-xs font-bold uppercase tracking-wider text-gray-300 mb-1">After / Vector</div>
                  <p className="text-xs text-gray-400">Crisp at any size — fully editable</p>
                  <div className="mt-2 text-xs bg-white/10 text-gray-200 px-2 py-1 rounded-lg inline-block">
                    AI / EPS / SVG
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Use cases */}
      <section className="py-20 bg-gray-50 dark:bg-gray-900/50 section-pattern">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <span className="inline-block bg-[#d9ff53]/20 text-[#587500] dark:text-[#d9ff53] text-sm font-semibold px-4 py-1.5 rounded-full mb-4">
              Use Cases
            </span>
            <h2 className="text-3xl md:text-4xl font-black text-gray-900 dark:text-white mb-4">
              What Is Vector Art{" "}
              <span className="gradient-text">Used For?</span>
            </h2>
            <p className="text-gray-600 dark:text-gray-400 max-w-xl mx-auto">
              Vector art is an excellent solution for a wide range of industries and applications.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {USES.map((use) => (
              <div key={use.title} className="bg-white dark:bg-gray-800 rounded-2xl p-6 border border-gray-100 dark:border-gray-700 card-hover">
                <h3 className="font-bold text-gray-900 dark:text-white mb-2">{use.title}</h3>
                <p className="text-gray-500 dark:text-gray-400 text-sm">{use.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="py-20 bg-white dark:bg-gray-950">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <span className="inline-block bg-black/5 dark:bg-white/10 text-black/60 dark:text-white/70 text-sm font-semibold px-4 py-1.5 rounded-full mb-4">
              How It Works
            </span>
            <h2 className="text-3xl md:text-4xl font-black text-gray-900 dark:text-white mb-4">
              The Process Is Fast and{" "}
              <span className="gradient-text">Easy</span>
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {HOW_IT_WORKS.map((step, i) => (
              <div key={i} className="bg-gray-50 dark:bg-gray-800 rounded-2xl p-8 border border-gray-100 dark:border-gray-700 text-center card-hover">
                <div className="w-14 h-14 bg-[#171717] rounded-2xl flex items-center justify-center text-[#d9ff53] mx-auto mb-4 text-xl font-black">
                  {step.step}
                </div>
                <div className="flex justify-center text-[#587500] dark:text-[#d9ff53] mb-3">{step.icon}</div>
                <h3 className="font-black text-gray-900 dark:text-white text-lg mb-3">{step.title}</h3>
                <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <ManagedServicesPricing category="vector" title="Vector Services & Pricing" description="See the available vector services and place your order after signing in to your client workspace." />

      {/* Pricing */}
      <section className="py-20 bg-gray-50 dark:bg-gray-900/50 section-pattern">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <span className="inline-block bg-[#d9ff53]/20 text-[#587500] dark:text-[#d9ff53] text-sm font-semibold px-4 py-1.5 rounded-full mb-4">
            Pricing
          </span>
          <h2 className="text-3xl font-black text-gray-900 dark:text-white mb-8">
            Vector Art Prices
          </h2>
          <div className="grid sm:grid-cols-2 gap-6 mb-6">
            {[
              { name: "Simple Artwork", price: "$15", desc: "Clean logos, basic shapes, 1-3 colors" },
              { name: "Complex Artwork", price: "$25", desc: "Detailed illustrations, gradients, many colors", popular: true },
            ].map((p) => (
              <div key={p.name} className={`rounded-2xl p-8 text-center border ${(p as { popular?: boolean }).popular ? "bg-[#171717] text-white border-[#d9ff53] shadow-xl" : "bg-white dark:bg-gray-800 border-gray-100 dark:border-gray-700"}`}>
                {(p as { popular?: boolean }).popular && <span className="text-xs font-bold bg-white/20 px-3 py-1 rounded-full block mb-3">Most Common</span>}
                <h3 className={`font-bold mb-3 ${(p as { popular?: boolean }).popular ? "text-white" : "text-gray-900 dark:text-white"}`}>{p.name}</h3>
                <div className={`text-4xl font-black mb-2 ${(p as { popular?: boolean }).popular ? "text-white" : "gradient-text"}`}>{p.price}</div>
                <p className={`text-sm ${(p as { popular?: boolean }).popular ? "text-white/65" : "text-gray-500 dark:text-gray-400"}`}>{p.desc}</p>
              </div>
            ))}
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-xl p-4 text-sm text-gray-600 dark:text-gray-400 border border-gray-100 dark:border-gray-700 mb-6">
            <strong className="text-[#587500] dark:text-[#d9ff53]">Formats delivered:</strong> AI, EPS, SVG, PDF, JPG, PNG (zipped folder).
            Corel Draw CDR files available on request.
          </div>
          <a
            href="#contact"
            className="inline-flex items-center gap-2 bg-[#171717] text-[#d9ff53] font-bold px-8 py-4 rounded-full hover:bg-[#d9ff53] hover:text-[#171717] hover:scale-105 transition-all"
          >
            Get a Vector Art Quote <ArrowRight className="w-4 h-4" />
          </a>
          <p className="text-xs text-gray-400 mt-4">
            * We convert images into vector line art. We do not create original artwork from scratch.
          </p>
        </div>
      </section>

      <Testimonials />
      <ContactForm />
    </PageLayout>
  );
}
