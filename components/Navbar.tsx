"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Menu, X, ChevronDown } from "lucide-react";
import { SITE_NAME, CONTACT_PHONE } from "@/lib/constants";

const NAV_ITEMS = [
  {
    label: "Services",
    children: [
      { label: "Embroidery Digitizing", href: "/embroidery-digitizing", emoji: "🧵" },
      { label: "Vector Art Conversion",  href: "/vector-art",            emoji: "🎨" },
      { label: "B2B / Bulk Pricing",     href: "/b2b",                   emoji: "🏢" },
    ],
  },
  { label: "Pricing",        href: "/pricing"        },
  // { label: "Blog",           href: "/blog"           },
  { label: "About",          href: "/about"          },
  { label: "Contact",        href: "/contact"        },
];

export default function Navbar() {
  const [isOpen,       setIsOpen]       = useState(false);
  const [scrolled,     setScrolled]     = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const pathname = usePathname();
  const isHome   = pathname === "/";

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  useEffect(() => {
    const frame = requestAnimationFrame(() => {
      setIsOpen(false);
      setOpenDropdown(null);
    });
    return () => cancelAnimationFrame(frame);
  }, [pathname]);

  const navBg = scrolled || !isHome
    ? "bg-[#101010]/95 backdrop-blur-md border-b border-white/10"
    : "bg-transparent";

  const linkBase = "px-3 py-2 text-sm font-medium rounded-lg transition-all duration-150";
  const idle     = "text-white/60 hover:text-white hover:bg-white/10";
  const active   = "text-white bg-white/10 font-semibold";

  return (
    <header className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${navBg}`}>

      {/* Top bar */}
      <div className="hidden md:block bg-gray-950 dark:bg-black text-gray-400 text-xs py-1.5">
        <div className="max-w-7xl mx-auto px-4 flex justify-between items-center">
          <span>{CONTACT_PHONE} / Embroidery + vector production</span>
          <span className="text-white/35">Next-day turnaround / From $15</span>
        </div>
      </div>

      {/* Main nav */}
      <nav className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between gap-4">

        {/* Logo */}
        <Link href="/" className="flex items-center gap-2.5 group shrink-0">
          <div className="w-10 h-10 rounded-xl overflow-hidden shrink-0 group-hover:scale-110 transition-transform duration-200 ring-1 ring-gray-200 dark:ring-gray-700">
            <Image
              src="/Company_Logo-01.png"
              alt={SITE_NAME}
              width={100}
              height={40}
              className="w-full h-full object-contain"
              priority
            />
          </div>
          <div className="leading-tight">
            <span className="text-base font-black text-white tracking-tight block">{SITE_NAME}</span>
            <span className="text-[10px] text-white/40 hidden sm:block">Design production studio</span>
          </div>
        </Link>

        {/* Desktop links */}
        <div className="hidden lg:flex items-center gap-0.5">
          {NAV_ITEMS.map((item) => {
            if (item.children) {
              const childActive = item.children.some((c) => pathname === c.href);
              return (
                <div
                  key={item.label}
                  className="relative"
                  onMouseEnter={() => setOpenDropdown(item.label)}
                  onMouseLeave={() => setOpenDropdown(null)}
                >
                  <button className={`${linkBase} flex items-center gap-1 ${childActive ? active : idle}`}>
                    {item.label}
                    <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${openDropdown === item.label ? "rotate-180" : ""}`} />
                  </button>
                  <div className={`absolute top-full left-0 mt-1 w-56 bg-white dark:bg-gray-900 rounded-2xl shadow-2xl shadow-black/10 border border-gray-100 dark:border-gray-800 overflow-hidden transition-all duration-200 origin-top ${openDropdown === item.label ? "opacity-100 scale-100 pointer-events-auto" : "opacity-0 scale-95 pointer-events-none"}`}>
                    {item.children.map((child) => (
                      <Link key={child.href} href={child.href}
                        className={`flex items-center gap-3 px-4 py-3 text-sm transition-colors ${pathname === child.href ? "text-gray-900 dark:text-white bg-gray-50 dark:bg-gray-800" : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-gray-800"}`}>
                        <span className="text-base">{child.emoji}</span>
                        <span className="font-medium">{child.label}</span>
                      </Link>
                    ))}
                  </div>
                </div>
              );
            }
            return (
              <Link key={item.label} href={item.href!}
                className={`${linkBase} ${pathname === item.href ? active : idle}`}>
                {item.label}
              </Link>
            );
          })}
        </div>

        {/* Right side */}
        <div className="flex items-center gap-3 shrink-0">
          <Link href="/portal/login"
            className="hidden sm:inline-flex items-center gap-1.5 border border-white/20 text-white/75 text-sm font-semibold px-4 py-2 rounded-full hover:border-white hover:text-white transition-colors">
            Login
          </Link>
          <Link href="/contact"
            className="hidden md:inline-flex items-center gap-1.5 bg-[#d9ff53] hover:bg-white text-[#101010] text-sm font-semibold px-5 py-2 rounded-full shadow hover:scale-105 transition-all duration-200">
            Get a Quote
          </Link>
          <button onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden p-2 rounded-lg text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            aria-label="Toggle menu">
            {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      <div className={`lg:hidden overflow-hidden transition-all duration-300 ${isOpen ? "max-h-[85vh]" : "max-h-0"}`}>
        <div className="bg-white dark:bg-gray-950 border-t border-gray-100 dark:border-gray-800 px-4 py-4 flex flex-col gap-1 overflow-y-auto">
          <p className="text-xs font-bold uppercase tracking-wider text-gray-400 px-4 pt-1 pb-2">Services</p>
          {[
            { label: "Embroidery Digitizing", href: "/embroidery-digitizing", },
            { label: "Vector Art Conversion",  href: "/vector-art",      },
            { label: "B2B / Bulk Pricing",     href: "/b2b", },
          ].map((l) => (
            <Link key={l.href} href={l.href}
              className={`flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium transition-colors ${pathname === l.href ? "text-gray-900 dark:text-white bg-gray-100 dark:bg-gray-800" : "text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-900"}`}>
              <span></span>{l.label}
            </Link>
          ))}
          <div className="my-2 h-px bg-gray-100 dark:bg-gray-800" />
          {[
            { label: "Pricing",        href: "/pricing"        },
            { label: "Blog",           href: "/blog"           },
            { label: "About",          href: "/about"          },
            { label: "Contact",        href: "/contact"        },
          ].map((l) => (
            <Link key={l.href} href={l.href}
              className={`px-4 py-2.5 rounded-xl text-sm font-medium transition-colors ${pathname === l.href ? "text-gray-900 dark:text-white bg-gray-100 dark:bg-gray-800" : "text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-900"}`}>
              {l.label}
            </Link>
          ))}
          <Link href="/portal/login" className="mt-2 px-4 py-2.5 rounded-xl text-sm font-bold text-white bg-white/10 text-center">
            Login / Sign up
          </Link>
          <Link href="/contact" className="mt-3 w-full bg-gray-900 dark:bg-white hover:bg-gray-700 dark:hover:bg-gray-100 text-white dark:text-gray-900 font-semibold py-3 rounded-xl text-center text-sm shadow block transition-colors">
            Get a Free Quote
          </Link>
        </div>
      </div>
    </header>
  );
}
