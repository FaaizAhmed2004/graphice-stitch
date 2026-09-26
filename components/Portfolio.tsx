"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { PORTFOLIO_ITEMS } from "@/lib/constants";

const STATIC_CATEGORIES = ["All", "Embroidery", "3D Puff", "Vector Art", "Patch"];
type PortfolioItem = { id: string | number; title: string; category: string; image: string };
type Props = {
  items?: { id: string; title: string; category: string; image_url: string | null }[];
  /** show "View all works" CTA — used on homepage, hidden on /works page */
  showViewAll?: boolean;
};

function remoteImageLoader({ src }: { src: string }) {
  return src;
}

const SPECIALTIES = [
  { title: "3D Puff",       desc: "Foam puff for bold caps"   },
  { title: "Coloreel",      desc: "Latest thread tech"         },
  { title: "Complex Art",   desc: "No project too hard"        },
  { title: "Vector Art",    desc: "Scalable line art"          },
  { title: "Pet Portraits", desc: "Custom pet digitizing"      },
];

export default function Portfolio({ items, showViewAll = false }: Props) {
  const portfolioItems: PortfolioItem[] = items?.length
    ? items.filter((item) => item.image_url).map((item) => ({
        id: item.id, title: item.title, category: item.category, image: item.image_url as string,
      }))
    : PORTFOLIO_ITEMS;

  // Build category list dynamically from actual data
  const dynamicCats = ["All", ...Array.from(new Set(portfolioItems.map((i) => i.category))).filter(Boolean)];
  // fallback to static list if data is empty
  const CATEGORIES = portfolioItems.length ? dynamicCats : STATIC_CATEGORIES;

  const [active, setActive] = useState("All");

  const filtered =
    active === "All" ? portfolioItems : portfolioItems.filter((i) => i.category === active);

  return (
    <section id="portfolio" className="bg-[#101010] py-28 text-white">
      <div className="max-w-7xl mx-auto px-4">

        {/* Header */}
        <div className="text-center mb-12">
          <span className="inline-block rounded-full border border-white/15 bg-white/10 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-white/65 mb-4">
            Our Work
          </span>
          <h2 className="mb-4 text-4xl font-black text-white md:text-5xl">
            Take a Tour &amp;{" "}
            <span className="gradient-text">Get Inspired</span>
          </h2>
          <p className="mx-auto max-w-xl text-white/55">
            Every design is hand-crafted by our expert digitizers.
          </p>
        </div>

        {/* Filter pills */}
        <div className="flex flex-wrap justify-center gap-2 mb-10">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setActive(cat)}
              className={`px-5 py-2 rounded-full text-sm font-semibold transition-all duration-200 border ${
                active === cat
                  ? "bg-[#d9ff53] text-[#171717] border-transparent shadow"
                  : "bg-white/5 text-white/60 border-white/15 hover:border-[#d9ff53] hover:text-white"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {filtered.map((item) => (
            <div
              key={item.id}
              className="group cursor-pointer overflow-hidden rounded-3xl border border-white/10 bg-[#202020] card-hover"
            >
              <div className="relative flex h-52 items-center justify-center overflow-hidden bg-[#242424]">
                <Image src={item.image} alt={item.title} fill sizes="(max-width: 768px) 100vw, 33vw" loader={item.image.startsWith("/") ? undefined : remoteImageLoader} unoptimized={!item.image.startsWith("/")} className="object-cover transition duration-500 group-hover:scale-105" />
                <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-colors" />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/15 transition-colors" />
              </div>
              <div className="p-5">
                <span className="mb-2 inline-block rounded-full bg-[#d9ff53]/15 px-2.5 py-1 text-xs font-semibold text-[#d9ff53]">
                  {item.category}
                </span>
                <h3 className="text-sm font-bold text-white">{item.title}</h3>
              </div>
            </div>
          ))}
        </div>

        {/* View all CTA — only on homepage */}
        {showViewAll && (
          <div className="mt-10 flex justify-center">
            <Link
              href="/works"
              className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-6 py-3 text-sm font-semibold text-white hover:bg-white/10 hover:border-[#d9ff53] transition-all duration-200"
            >
              View all works <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        )}

        {/* Specialties strip */}
        <div className="mt-16 grid sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {SPECIALTIES.map((s) => (
            <div key={s.title} className="group rounded-2xl border border-white/10 bg-[#202020] p-5 text-center card-hover">
              <h4 className="mb-1 text-sm font-bold text-white">{s.title}</h4>
              <p className="text-xs text-white/45">{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
