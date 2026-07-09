import type { Metadata } from "next";
import PageLayout from "@/components/PageLayout";
import ContactForm from "@/components/ContactForm";
import Testimonials from "@/components/Testimonials";
import { ArrowRight, Zap, Cpu, Clock, HeadphonesIcon, CheckCircle } from "lucide-react";

export const metadata: Metadata = {
  title: "B2B / Bulk Digitizing Pricing — Graphics Stitch",
  description:
    "Flat-rate and custom volume pricing for embroidery digitizing businesses. API integration available. 50–500+ files per day. Next-day turnaround guaranteed.",
};

const B2B_FEATURES = [
  {
    icon: <Zap className="w-6 h-6" />,
    title: "20+ Years Experience",
    desc: "Our team includes certified digitizers highly skilled in the latest embroidery techniques and tools.",
  },
  {
    icon: <Cpu className="w-6 h-6" />,
    title: "API Integration",
    desc: "We can integrate our system with yours for a seamless, automated workflow — making collaboration effortless.",
  },
  {
    icon: <Clock className="w-6 h-6" />,
    title: "Fast Turnaround at Scale",
    desc: "Next-day turnaround whether you need 50 files per day or 500. Same-day rush delivery also available.",
  },
  {
    icon: <HeadphonesIcon className="w-6 h-6" />,
    title: "Dedicated Support",
    desc: "Speak directly with our experienced digitizers. Changes, questions, revisions — all handled quickly.",
  },
];

const SERVICES_LIST = [
  "Regular embroidery digitizing",
  "Vector art conversion",
  "3D puff embroidery",
  "Appliqué embroidery",
  "Coloreel technology",
  "Patch digitizing",
  "Full-back & jacket designs",
  "Logo & name left chest",
];

const PORTFOLIO = [
  { emoji: "🧵", label: "Left Chest Logo", color: "from-purple-500 to-indigo-600" },
  { emoji: "🎩", label: "3D Puff Cap", color: "from-pink-500 to-rose-600" },
  { emoji: "🛡️", label: "Embroidered Patch", color: "from-amber-500 to-orange-500" },
  { emoji: "🎨", label: "Vector Conversion", color: "from-teal-500 to-cyan-600" },
  { emoji: "🔥", label: "Complex Artwork", color: "from-red-500 to-pink-600" },
  { emoji: "👗", label: "Full Back Design", color: "from-violet-500 to-purple-600" },
];

export default function B2BPage() {
  return (
    <PageLayout>
      {/* Hero */}
      <section className="relative hero-gradient py-28 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute -top-32 -right-32 w-96 h-96 bg-purple-400/20 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-pink-400/20 rounded-full blur-3xl" />
        </div>
        <div className="relative max-w-5xl mx-auto px-4 text-center text-white">
          <span className="inline-block bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-4 py-2 text-sm font-medium mb-6">
            🏢 For Growing Businesses
          </span>
          <h1 className="text-4xl md:text-5xl xl:text-6xl font-black leading-tight mb-6">
            Increase Your{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-yellow-300">
              Business Potential
            </span>
          </h1>
          <p className="text-xl text-purple-100 max-w-2xl mx-auto mb-8">
            High quality, cost-effective embroidery and vector art digital files for large businesses.
            We support your growth without compromising on quality or speed.
          </p>
          <a
            href="#contact"
            className="inline-flex items-center gap-2 bg-gradient-to-r from-pink-500 to-rose-500 text-white font-bold px-10 py-4 rounded-full hover:shadow-xl hover:shadow-pink-500/40 hover:scale-105 transition-all text-lg"
          >
            Inquire Now <ArrowRight className="w-5 h-5" />
          </a>
        </div>
      </section>

      {/* Support scalability */}
      <section className="py-20 bg-white dark:bg-gray-950">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <span className="inline-block bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 text-sm font-semibold px-4 py-1.5 rounded-full mb-4">
            We Are Here For You
          </span>
          <h2 className="text-3xl md:text-4xl font-black text-gray-900 dark:text-white mb-6 max-w-3xl mx-auto">
            We support the scalability of your business, allowing you to meet higher demand without{" "}
            <span className="gradient-text">compromising on quality or delivery times.</span>
          </h2>
          <p className="text-gray-500 dark:text-gray-400 max-w-2xl mx-auto mb-10">
            Whether you run a small embroidery shop or a large-scale commercial operation, we have the capacity,
            expertise, and infrastructure to serve as your reliable digitizing partner.
          </p>
          <a
            href="#contact"
            className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold px-8 py-3.5 rounded-full hover:shadow-lg hover:shadow-purple-500/30 hover:scale-105 transition-all"
          >
            Get Started Today <ArrowRight className="w-4 h-4" />
          </a>
        </div>
      </section>

      {/* Why partner */}
      <section className="py-20 bg-gray-50 dark:bg-gray-900/50 section-pattern">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <span className="inline-block bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 text-sm font-semibold px-4 py-1.5 rounded-full mb-4">
              Why Partner With Us?
            </span>
            <h2 className="text-3xl md:text-4xl font-black text-gray-900 dark:text-white">
              Built for{" "}
              <span className="gradient-text">Business Growth</span>
            </h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {B2B_FEATURES.map((f) => (
              <div key={f.title} className="bg-white dark:bg-gray-800 rounded-2xl p-7 border border-gray-100 dark:border-gray-700 card-hover text-center">
                <div className="w-14 h-14 bg-gradient-to-br from-purple-100 to-pink-100 dark:from-purple-900/40 dark:to-pink-900/40 rounded-xl flex items-center justify-center text-purple-600 dark:text-purple-400 mx-auto mb-4">
                  {f.icon}
                </div>
                <h3 className="font-black text-gray-900 dark:text-white mb-3 text-base">{f.title}</h3>
                <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services + Portfolio */}
      <section className="py-20 bg-white dark:bg-gray-950">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            {/* Services list */}
            <div>
              <span className="inline-block bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 text-sm font-semibold px-4 py-1.5 rounded-full mb-4">
                Our Services
              </span>
              <h2 className="text-3xl font-black text-gray-900 dark:text-white mb-6">
                Everything You Need Under{" "}
                <span className="gradient-text">One Roof</span>
              </h2>
              <p className="text-gray-500 dark:text-gray-400 mb-8 leading-relaxed">
                Our digitizers are certified in the latest embroidery digitizing techniques and vector art,
                offering both expertise and quick turnarounds for customers with large orders.
              </p>
              <div className="grid sm:grid-cols-2 gap-3">
                {SERVICES_LIST.map((s) => (
                  <div key={s} className="flex items-center gap-2.5 text-sm text-gray-700 dark:text-gray-300">
                    <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                    {s}
                  </div>
                ))}
              </div>
              <a
                href="#contact"
                className="mt-8 inline-flex items-center gap-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold px-8 py-3.5 rounded-full hover:shadow-lg hover:shadow-purple-500/30 hover:scale-105 transition-all"
              >
                Inquire About B2B <ArrowRight className="w-4 h-4" />
              </a>
            </div>

            {/* Portfolio grid */}
            <div>
              <span className="inline-block bg-pink-100 dark:bg-pink-900/30 text-pink-700 dark:text-pink-300 text-sm font-semibold px-4 py-1.5 rounded-full mb-4">
                Portfolio Preview
              </span>
              <h3 className="text-2xl font-black text-gray-900 dark:text-white mb-6">
                Take a Tour &amp; Get Inspired
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                {PORTFOLIO.map((p) => (
                  <div
                    key={p.label}
                    className={`bg-gradient-to-br ${p.color} rounded-xl p-6 flex flex-col items-center justify-center text-white text-center card-hover`}
                  >
                    <div className="text-3xl mb-2">{p.emoji}</div>
                    <p className="text-xs font-semibold">{p.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="py-16 bg-gradient-to-r from-purple-700 via-purple-600 to-pink-600">
        <div className="max-w-3xl mx-auto px-4 text-center text-white">
          <h3 className="text-2xl md:text-3xl font-black mb-3">
            Join the List of Growing Businesses Who&apos;ve Partnered With Us!
          </h3>
          <p className="text-purple-100 mb-6">
            You are in good hands. Contact us today to discuss a custom plan tailored to your business needs.
          </p>
          <a
            href="#contact"
            className="inline-flex items-center gap-2 bg-white text-purple-700 font-bold px-8 py-3.5 rounded-full hover:scale-105 transition-transform shadow-lg"
          >
            Contact Us Now <ArrowRight className="w-4 h-4" />
          </a>
        </div>
      </section>

      <Testimonials />
      <ContactForm />
    </PageLayout>
  );
}
