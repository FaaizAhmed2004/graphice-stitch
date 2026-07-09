"use client";

import { useState } from "react";

const PORTFOLIO_ITEMS = [
  { id: 1, title: "Company Logo — Left Chest", category: "Embroidery", emoji: "🧵", color: "from-gray-700 to-gray-900" },
  { id: 2, title: "Sports Team Cap Design",    category: "3D Puff",    emoji: "🎩", color: "from-gray-500 to-gray-700" },
  { id: 3, title: "Eagle Vector Art",          category: "Vector Art", emoji: "🦅", color: "from-gray-600 to-gray-800" },
  { id: 4, title: "Brand Full Back Jacket",    category: "Embroidery", emoji: "🧥", color: "from-gray-800 to-gray-950" },
  { id: 5, title: "Floral Patch Design",       category: "Patch",      emoji: "🌸", color: "from-gray-400 to-gray-600" },
  { id: 6, title: "Tiger Vector Conversion",   category: "Vector Art", emoji: "🐯", color: "from-gray-600 to-gray-900" },
];

const CATEGORIES = ["All", "Embroidery", "3D Puff", "Vector Art", "Patch"];

const SPECIALTIES = [
  { emoji: "🎩", title: "3D Puff",       desc: "Foam puff for bold caps"   },
  { emoji: "⚡", title: "Coloreel",      desc: "Latest thread tech"         },
  { emoji: "🔥", title: "Complex Art",   desc: "No project too hard"        },
  { emoji: "🎨", title: "Vector Art",    desc: "Scalable line art"          },
  { emoji: "🐾", title: "Pet Portraits", desc: "Custom pet digitizing"      },
];

export default function Portfolio() {
  const [active, setActive] = useState("All");

  const filtered =
    active === "All" ? PORTFOLIO_ITEMS : PORTFOLIO_ITEMS.filter((i) => i.category === active);

  return (
    <section id="portfolio" className="py-28 bg-gray-50 dark:bg-gray-950">
      <div className="max-w-7xl mx-auto px-4">

        {/* Header */}
        <div className="text-center mb-12">
          <span className="inline-block bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-400 text-xs font-bold px-4 py-1.5 rounded-full mb-4 uppercase tracking-widest border border-gray-200 dark:border-gray-700">
            Our Work
          </span>
          <h2 className="text-4xl md:text-5xl font-black text-gray-900 dark:text-white mb-4">
            Take a Tour &amp;{" "}
            <span className="gradient-text">Get Inspired</span>
          </h2>
          <p className="text-gray-500 dark:text-gray-400 max-w-xl mx-auto">
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
                  ? "bg-gray-900 dark:bg-white text-white dark:text-gray-900 border-transparent shadow"
                  : "bg-white dark:bg-gray-900 text-gray-600 dark:text-gray-400 border-gray-200 dark:border-gray-700 hover:border-gray-400 dark:hover:border-gray-500"
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
              className="group bg-white dark:bg-gray-900 rounded-3xl overflow-hidden border border-gray-100 dark:border-gray-800 card-hover cursor-pointer"
            >
              <div className={`h-52 bg-gradient-to-br ${item.color} relative flex items-center justify-center overflow-hidden`}>
                {/* Diagonal stripe overlay */}
                <div className="absolute inset-0 stripe-bg opacity-40" />
                <span className="text-6xl relative z-10 drop-shadow-2xl group-hover:scale-110 transition-transform duration-300">{item.emoji}</span>
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/15 transition-colors" />
              </div>
              <div className="p-5">
                <span className="inline-block text-xs font-semibold text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-800 px-2.5 py-1 rounded-full mb-2">
                  {item.category}
                </span>
                <h3 className="font-bold text-gray-900 dark:text-white text-sm">{item.title}</h3>
              </div>
            </div>
          ))}
        </div>

        {/* Specialties strip */}
        <div className="mt-16 grid sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {SPECIALTIES.map((s) => (
            <div key={s.title} className="bg-white dark:bg-gray-900 rounded-2xl p-5 text-center border border-gray-100 dark:border-gray-800 card-hover group">
              <div className="text-3xl mb-2 group-hover:scale-110 transition-transform duration-200">{s.emoji}</div>
              <h4 className="font-bold text-gray-900 dark:text-white text-sm mb-1">{s.title}</h4>
              <p className="text-xs text-gray-400">{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
