import type { Metadata } from "next";
import PageLayout from "@/components/PageLayout";
import ContactForm from "@/components/ContactForm";
import Testimonials from "@/components/Testimonials";
import FAQ from "@/components/FAQ";
import { Mail, MapPin, Clock, ChevronDown } from "lucide-react";
import { CONTACT_EMAIL, CONTACT_LOCATION, BUSINESS_HOURS } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Contact Us — Graphic Stitch",
  description:
    "Get in touch with Graphics Stitch for embroidery digitizing quotes, questions, and change requests.",
};

const CHANGE_POLICY_FAQS = [
  {
    question: "How can I submit my change request?",
    answer: "Simply reply to the email you received with your completed file. Describe the changes needed clearly and we will get to work right away.",
  },
  {
    question: "How soon will I get my file back after requesting a change?",
    answer: "Most changes are completed within 24 hours. Simple adjustments are often done same day.",
  },
  {
    question: "Is there a fee for my change request?",
    answer: "No fee for standard changes within 14 days of delivery. This includes color adjustments, minor resizing, and stitch tweaks.",
  },
  {
    question: "Is there an extra fee for a size change?",
    answer: "Significant size changes (e.g., converting a left-chest design to a full-back) may incur an additional fee as they require re-digitizing.",
  },
  {
    question: "What changes require a fee?",
    answer: "Complete redesigns, adding new elements not in the original artwork, or converting between design types may require additional charges. We will always notify you before proceeding.",
  },
];

export default function ContactPage() {
  return (
    <PageLayout>
      {/* Hero */}
      <section className="relative hero-gradient py-20 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute -top-32 -right-32 w-80 h-80 bg-[#d9ff53]/10 rounded-full blur-3xl" />
          <div className="absolute -bottom-32 -left-32 w-80 h-80 bg-white/5 rounded-full blur-3xl" />
        </div>
        <div className="relative max-w-4xl mx-auto px-4 text-center text-white">
          <span className="inline-block bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-4 py-2 text-sm font-medium mb-6">
            Get In Touch
          </span>
          <h1 className="text-4xl md:text-5xl font-black mb-6">
            Have Any{" "}
            <span className="text-[#d9ff53]">
              Questions?
            </span>
          </h1>
          <p className="text-white/65 text-lg max-w-xl mx-auto">
            Our team is ready to help. Reach out by phone or email and we&apos;ll respond quickly.
          </p>
        </div>
      </section>

      {/* Contact info cards */}
      <section className="py-16 bg-white dark:bg-gray-950">
        <div className="max-w-5xl mx-auto px-4">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {[
              {
                icon: <MapPin className="w-6 h-6" />,
                label: "Based In",
                value: CONTACT_LOCATION,
                href: "#location",
                color: "from-gray-700 to-gray-900",
              },
              {
                icon: <Mail className="w-6 h-6" />,
                label: "Email Us At",
                value: CONTACT_EMAIL,
                href: `mailto:${CONTACT_EMAIL}`,
                color: "bg-[#202020]",
              },
            ].map((item) => (
              <a
                key={item.label}
                href={item.href}
                target={item.href.startsWith("https") ? "_blank" : undefined}
                rel={item.href.startsWith("https") ? "noopener noreferrer" : undefined}
                className={`group ${item.color} rounded-2xl border border-white/10 p-6 text-white text-center card-hover`}
              >
                <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center mx-auto mb-3 group-hover:bg-white/30 transition-colors">
                  {item.icon}
                </div>
                <p className="text-white/70 text-xs uppercase tracking-wider mb-1">{item.label}</p>
                <p className="font-bold text-sm break-all">{item.value}</p>
              </a>
            ))}
          </div>

          {/* Hours */}
          <div className="mt-6 bg-gray-50 dark:bg-gray-800 rounded-2xl p-5 border border-gray-100 dark:border-gray-700 flex items-center gap-4 max-w-sm mx-auto">
            <div className="w-10 h-10 bg-[#d9ff53]/20 rounded-xl flex items-center justify-center shrink-0">
              <Clock className="w-5 h-5 text-[#587500] dark:text-[#d9ff53]" />
            </div>
            <div>
              <p className="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-0.5">Business Hours</p>
              <p className="font-bold text-sm text-gray-900 dark:text-white">{BUSINESS_HOURS}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Change Policy FAQ */}
      <section className="py-16 bg-gray-50 dark:bg-gray-900/50 section-pattern">
        <div className="max-w-3xl mx-auto px-4">
          <div className="text-center mb-10">
            <span className="inline-block bg-[#d9ff53]/20 text-[#587500] dark:text-[#d9ff53] text-sm font-semibold px-4 py-1.5 rounded-full mb-4">
              Change Policy
            </span>
            <h2 className="text-2xl md:text-3xl font-black text-gray-900 dark:text-white">
              Questions About{" "}
              <span className="gradient-text">Change Requests?</span>
            </h2>
          </div>
          <div className="space-y-3">
            {CHANGE_POLICY_FAQS.map((faq, i) => (
              <details key={i} className="group bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 overflow-hidden">
                <summary className="flex items-center justify-between gap-4 p-5 cursor-pointer list-none">
                  <div className="flex items-center gap-3">
                    <div className="w-7 h-7 rounded-lg bg-[#d9ff53]/20 flex items-center justify-center shrink-0">
                      <span className="text-[#587500] dark:text-[#d9ff53] text-xs font-bold">{i + 1}</span>
                    </div>
                    <span className="font-semibold text-gray-900 dark:text-white text-sm">{faq.question}</span>
                  </div>
                  <ChevronDown className="w-5 h-5 text-gray-400 shrink-0 group-open:rotate-180 transition-transform" />
                </summary>
                <div className="px-5 pb-5 pl-16">
                  <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">{faq.answer}</p>
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>

      <FAQ />
      <Testimonials />
      <ContactForm />
    </PageLayout>
  );
}
