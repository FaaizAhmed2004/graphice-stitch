import Link from "next/link";
import Image from "next/image";
import { Mail, Clock } from "lucide-react";
import { SITE_NAME, CONTACT_EMAIL, BUSINESS_HOURS } from "@/lib/constants";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-gray-950 text-gray-400">
      <div className="bg-gray-900 border-b border-gray-800 py-12">
        <div className="max-w-4xl mx-auto px-4 text-center text-white">
          <h3 className="text-2xl md:text-3xl font-black mb-3 text-white">
            Try Us Out Today — Discover the Difference
          </h3>
          <p className="text-gray-400 mb-6">
            Starting at just <strong className="text-white">$10</strong>. Same-day turnaround. 100% quality guarantee.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/contact"
              className="bg-white text-gray-900 font-bold px-8 py-3 rounded-full hover:scale-105 transition-transform shadow-lg"
            >
              Get a Free Quote
            </Link>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-14">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-10">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="relative w-10 h-10 rounded-xl overflow-hidden shrink-0">
                <Image
                  src="/Company_Logo-01.png"
                  alt={SITE_NAME}
                  fill
                  sizes="40px"
                  className="w-full h-full object-contain"
                />
              </div>
              <span className="text-white font-black text-lg">{SITE_NAME}</span>
            </div>
            <p className="text-sm text-gray-500 leading-relaxed mb-5">
              Professional embroidery digitizing and vector art services. Hand-crafted by expert artists with same-day turnaround.
            </p>
            <div className="flex gap-3">
              <a href="
https://www.instagram.com/graphic_stitch.co?utm_source=ig_web_button_share_sheet&stkn=ZDNlZDc0MzIxNw==" aria-label="Instagram" className="w-8 h-8 bg-gray-800 hover:bg-gray-700 rounded-lg flex items-center justify-center text-gray-400 hover:text-white transition-all duration-200">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>
              </a>
              <a href="https://www.facebook.com/profile.php?id=61591458807250" aria-label="Facebook" className="w-8 h-8 bg-gray-800 hover:bg-gray-700 rounded-lg flex items-center justify-center text-gray-400 hover:text-white transition-all duration-200">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
              </a>
              <a href="https://www.linkedin.com/" aria-label="LinkedIn" className="w-8 h-8 bg-gray-800 hover:bg-gray-700 rounded-lg flex items-center justify-center text-gray-400 hover:text-white transition-all duration-200">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4"><path d="M20.45 20.45h-3.55v-5.57c0-1.33-.03-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.36V9h3.41v1.56h.05c.47-.9 1.63-1.85 3.36-1.85 3.59 0 4.26 2.36 4.26 5.43v6.31ZM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12ZM7.12 20.45H3.56V9h3.56v11.45ZM22.23 0H1.77C.79 0 0 .77 0 1.72v20.56C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.72V1.72C24 .77 23.21 0 22.23 0Z"/></svg>
              </a>
            </div>
          </div>

          <div>
            <h4 className="text-white font-bold text-sm uppercase tracking-wider mb-4">Quick Links</h4>
            <ul className="space-y-2.5">
              {[
                { label: "Home", href: "/" },
                { label: "About Us", href: "/about" },
                { label: "Gallery", href: "/works" },
                { label: "Pricing", href: "/pricing" },
                { label: "FAQ's", href: "/embroidery-digitizing#faq" },
              ].map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-gray-500 hover:text-white transition-colors flex items-center gap-1.5 group"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-gray-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold text-sm uppercase tracking-wider mb-4">Services</h4>
            <ul className="space-y-2.5">
              {[
                { label: "Digitizing", href: "/embroidery-digitizing" },
                { label: "Vector Art", href: "/vector-art" },
                { label: "Custom Patches", href: "/patch-digitizing" },
              ].map((s) => (
                <li key={s.label}>
                  <Link
                    href={s.href}
                    className="text-sm text-gray-500 hover:text-white transition-colors flex items-center gap-1.5 group"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-gray-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                    {s.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold text-sm uppercase tracking-wider mb-4">Contact Us</h4>
            <ul className="space-y-4">
              <li>
                <a href={`mailto:${CONTACT_EMAIL}`} className="flex items-start gap-3 group">
                  <Mail className="w-4 h-4 text-gray-300 mt-0.5 shrink-0" />
                  <span className="text-sm text-gray-500 group-hover:text-white transition-colors break-all">{CONTACT_EMAIL}</span>
                </a>
              </li>
              <li className="flex items-start gap-3">
                <Clock className="w-4 h-4 text-gray-300 mt-0.5 shrink-0" />
                <span className="text-sm text-gray-500">{BUSINESS_HOURS}</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-gray-600">
            © {year} {SITE_NAME}. All Rights Reserved.
          </p>
          <div className="flex gap-4">
            <Link href="/privacy" className="text-xs text-gray-600 hover:text-gray-300 transition-colors">Privacy Policy</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
