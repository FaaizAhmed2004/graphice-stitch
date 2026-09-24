import type { Metadata } from "next";
import PageLayout from "@/components/PageLayout";
import ContactForm from "@/components/ContactForm";
import { CheckCircle, ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "About Us — Graphic Stitch",
  description:
    "Learn about Graphics Stitch — professional embroidery digitizing and vector art services. 15+ years of experience. Expert in-house team. Worldwide clients.",
};

const TEAM = [
  { name: "Ahmed K.", role: "Owner — CEO", color: "bg-[#171717]" },
  { name: "Sara M.", role: "Admin / Accounting", color: "bg-[#202020]" },
  { name: "Zara B.", role: "Director of Business Dev.", color: "bg-[#2b2b2b]" },
  { name: "Nadia F.", role: "Social Media / Marketing", color: "bg-[#171717]" },
  { name: "Omar A.", role: "Head Digitizer", color: "bg-[#202020]" },
  { name: "Lisa D.", role: "Customer Service", color: "bg-[#2b2b2b]" },
  { name: "Hamza I.", role: "Digitizer", color: "bg-[#171717]" },
  { name: "Aisha J.", role: "Customer Service", color: "bg-[#202020]" },
  { name: "Bilal K.", role: "Digitizer", color: "bg-[#2b2b2b]" },
];

const VALUES = [
  { title: "Precision", desc: "Every stitch path is hand-crafted with attention to detail, ensuring flawless sew-out results." },
  { title: "Speed", desc: "Next-day turnaround on all standard orders. Same-day rush service available when you need it fast." },
  { title: "Partnership", desc: "We work as an extension of your team, not just a vendor. Your success is our success." },
  { title: "Guarantee", desc: "100% quality guarantee on every file. Free revisions within 14 days, or a full refund." },
];

export default function AboutPage() {
  return (
    <PageLayout>
      {/* Hero */}
      <section className="relative hero-gradient py-24 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute -top-32 -right-32 w-80 h-80 bg-[#d9ff53]/10 rounded-full blur-3xl" />
          <div className="absolute -bottom-32 -left-32 w-80 h-80 bg-white/5 rounded-full blur-3xl" />
        </div>
        <div className="relative max-w-4xl mx-auto px-4 text-center text-white">
          <span className="inline-block bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-4 py-2 text-sm font-medium mb-6">
            About Graphics Stitch
          </span>
          <h1 className="text-4xl md:text-5xl font-black mb-6">
            Welcome to{" "}
            <span className="text-[#d9ff53]">
              Graphics Stitch
            </span>
          </h1>
          <p className="text-white/65 text-lg max-w-2xl mx-auto">
            A professional online embroidery digitizing and vector art company
            serving customers worldwide with precision, consistency, and care.
          </p>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-20 bg-white dark:bg-gray-950">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-14 items-center">
            <div>
              <span className="inline-block bg-[#d9ff53]/20 text-[#587500] dark:text-[#d9ff53] text-sm font-semibold px-4 py-1.5 rounded-full mb-4">
                Our Story
              </span>
              <h2 className="text-3xl md:text-4xl font-black text-gray-900 dark:text-white mb-6">
                Expert Digitizing,{" "}
                <span className="gradient-text">Worldwide Reach</span>
              </h2>
              <div className="space-y-4 text-gray-600 dark:text-gray-400 leading-relaxed">
                <p>
                  Graphics Stitch is an online embroidery digitizing and vector art company serving customers
                  worldwide. We specialize in converting logos, artwork, and designs into professional,
                  machine-ready embroidery files with precision and consistency.
                </p>
                <p>
                  With more than 15 years of experience in embroidery digitizing, our team of expert designers
                  delivers high-quality digitized files optimized for embroidery machines of all types.
                  Our focus is on accuracy, efficiency, and delivering the best possible results for every
                  project — whether for small businesses, larger companies, or embroidery hobbyists.
                </p>
                <p>
                  We work 100% online, allowing customers from across the globe to submit their designs and
                  receive professional digitized files quickly and reliably.
                </p>
              </div>
              <ul className="mt-6 space-y-2">
                {[
                  "Manual digitizing — no auto-digitizing ever",
                  "All major embroidery machine formats",
                  "Worldwide clients — 100% online",
                  "Quality-first approach on every project",
                ].map((item) => (
                  <li key={item} className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300">
                    <CheckCircle className="w-4 h-4 text-green-500 shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 gap-4">
              {[
                { value: "50K+", label: "Happy Customers", color: "bg-[#171717]" },
                { value: "15+", label: "Years Experience", color: "bg-[#202020]" },
                { value: "24hr", label: "Turnaround Time", color: "bg-[#2b2b2b]" },
                { value: "100%", label: "Quality Guarantee", color: "bg-[#171717]" },
              ].map((s) => (
                <div key={s.label} className={`${s.color} rounded-2xl border border-black/10 p-8 text-white text-center`}>
                  <div className="text-3xl font-black mb-1">{s.value}</div>
                  <div className="text-white/80 text-sm">{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 bg-gray-50 dark:bg-gray-900/50 section-pattern">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <span className="inline-block bg-black/5 dark:bg-white/10 text-black/60 dark:text-white/70 text-sm font-semibold px-4 py-1.5 rounded-full mb-4">
              Our Values
            </span>
            <h2 className="text-3xl md:text-4xl font-black text-gray-900 dark:text-white">
              What Drives Us{" "}
              <span className="gradient-text">Every Day</span>
            </h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {VALUES.map((v) => (
              <div key={v.title} className="bg-white dark:bg-gray-800 rounded-2xl p-7 border border-gray-100 dark:border-gray-700 text-center card-hover">
                <h3 className="font-black text-gray-900 dark:text-white mb-3">{v.title}</h3>
                <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-20 bg-white dark:bg-gray-950">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <span className="inline-block bg-black/5 dark:bg-white/10 text-black/60 dark:text-white/70 text-sm font-semibold px-4 py-1.5 rounded-full mb-4">
              Our Team
            </span>
            <h2 className="text-3xl md:text-4xl font-black text-gray-900 dark:text-white mb-4">
              Behind Every Great Company Is a{" "}
              <span className="gradient-text">Great Team</span>
            </h2>
            <p className="text-gray-500 dark:text-gray-400 max-w-xl mx-auto">
              Get to know the talented individuals who make up our team of designers, digitizers,
              customer service specialists, and problem solvers.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
            {TEAM.map((member) => (
              <div key={member.name} className="bg-gray-50 dark:bg-gray-800 rounded-2xl p-6 text-center border border-gray-100 dark:border-gray-700 card-hover">
                <div className={`w-16 h-16 ${member.color} rounded-2xl flex items-center justify-center text-[#d9ff53] text-3xl mx-auto mb-4 shadow-lg`}>
                  {member.name.slice(0, 1)}
                </div>
                <h3 className="font-bold text-gray-900 dark:text-white text-sm">{member.name}</h3>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{member.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-[#101010]">
        <div className="max-w-3xl mx-auto px-4 text-center text-white">
          <h3 className="text-2xl md:text-3xl font-black mb-3">Ready to Work With Us?</h3>
          <p className="text-white/60 mb-6">
            Join thousands of happy customers who trust Graphics Stitch for their digitizing needs.
          </p>
          <a
            href="#contact"
            className="inline-flex items-center gap-2 bg-[#d9ff53] text-[#171717] font-bold px-8 py-3.5 rounded-full hover:bg-white hover:scale-105 transition-transform shadow-lg"
          >
            Get a Free Quote <ArrowRight className="w-4 h-4" />
          </a>
        </div>
      </section>

      <ContactForm />
    </PageLayout>
  );
}
