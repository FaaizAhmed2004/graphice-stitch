import type { Metadata } from "next";
import Link from "next/link";
import PageLayout from "@/components/PageLayout";
import NewsletterForm from "@/components/NewsletterForm";
import { ArrowRight, Calendar, Clock } from "lucide-react";

export const metadata: Metadata = {
  title: "Embroidery Blog & Learning Resources — Graphics Stitch",
  description:
    "Tips, tutorials, and industry insights on embroidery digitizing, machine settings, file formats, 3D puff, Coloreel technology, and more.",
};

const BLOG_POSTS = [
  {
    slug: "can-ai-artwork-be-used-for-embroidery",
    title: "Can AI Artwork Be Used for Embroidery? What You Need to Know",
    excerpt: "AI can generate amazing artwork in seconds — but before digitizing, your design may need changes. Here's why and what to watch for.",
    date: "Jun 25, 2026",
    readTime: "6 min read",
    category: "Digitizing Tips",
    color: "from-purple-500 to-indigo-600",
  },
  {
    slug: "embroidery-machine-maintenance",
    title: "Quick Embroidery Machine Maintenance Tips to Boost Your Results",
    excerpt: "Proper maintenance keeps your machine running smoothly and your designs looking sharp. Oiling, cleaning, and more explained.",
    date: "Feb 4, 2025",
    readTime: "5 min read",
    category: "Machine Care",
    color: "from-amber-500 to-orange-500",
  },
  {
    slug: "3d-puff-embroidery-101",
    title: "3D Puff Embroidery 101: Everything You Need to Know",
    excerpt: "3D puff embroidery adds depth and dimension to your designs. Discover techniques, tips, and when to use this eye-catching style.",
    date: "Feb 11, 2025",
    readTime: "7 min read",
    category: "Techniques",
    color: "from-pink-500 to-rose-600",
  },
  {
    slug: "embroidery-underlay",
    title: "Embroidery Underlay 101: What It Is and Why It Matters",
    excerpt: "Underlay is the most important part of digitizing that people overlook. Learn what it is and how it affects your final result.",
    date: "Jan 20, 2026",
    readTime: "6 min read",
    category: "Digitizing Tips",
    color: "from-teal-500 to-cyan-600",
  },
  {
    slug: "machine-formats",
    title: "Machine Embroidery File Formats Explained",
    excerpt: "DST, PES, EMB, HUS, VIP — confused by embroidery file formats? This guide breaks down every format and which machine uses what.",
    date: "May 14, 2025",
    readTime: "8 min read",
    category: "File Formats",
    color: "from-violet-500 to-purple-600",
  },
  {
    slug: "embroidery-thread-breaks",
    title: "Thread Breaks Every 5 Minutes? Here's How to Fix It",
    excerpt: "Few things are more frustrating than constant thread breaks mid-project. Identify the cause and fix it for good with these tips.",
    date: "Feb 25, 2026",
    readTime: "5 min read",
    category: "Troubleshooting",
    color: "from-red-500 to-pink-600",
  },
  {
    slug: "coloreel-technology",
    title: "Coloreel Technology: The Future of Embroidery",
    excerpt: "One of the most exciting innovations in recent years — Coloreel can produce millions of colors with a single thread. Here's how.",
    date: "Mar 12, 2025",
    readTime: "6 min read",
    category: "Technology",
    color: "from-fuchsia-500 to-pink-600",
  },
  {
    slug: "embroidery-machine-tension-guide",
    title: "Embroidery Machine Tension Problems? Here's How to Fix Them",
    excerpt: "Puckered fabric, loopy stitches, or thread breaks? Your machine tension is probably off. Learn what to look for and how to fix it.",
    date: "Jul 24, 2025",
    readTime: "7 min read",
    category: "Troubleshooting",
    color: "from-slate-500 to-gray-600",
  },
  {
    slug: "embroidery-stabilizers-guide",
    title: "Embroidery Backing Made Easy: Choose the Right Stabilizer",
    excerpt: "Cut-away, tear-away, water-soluble — understanding stabilizers is key to clean, professional embroidery results every time.",
    date: "Aug 27, 2025",
    readTime: "8 min read",
    category: "Techniques",
    color: "from-green-500 to-emerald-600",
  },
];

const CATEGORIES = ["All", "Digitizing Tips", "Techniques", "Machine Care", "Troubleshooting", "File Formats", "Technology"];

export default function BlogPage() {
  return (
    <PageLayout>
      {/* Hero */}
      <section className="relative hero-gradient py-24 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute -top-32 -right-32 w-80 h-80 bg-purple-500/20 rounded-full blur-3xl" />
          <div className="absolute -bottom-32 -left-32 w-80 h-80 bg-pink-500/20 rounded-full blur-3xl" />
        </div>
        <div className="relative max-w-4xl mx-auto px-4 text-center text-white">
          <span className="inline-block bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-4 py-2 text-sm font-medium mb-6">
            Sew What&apos;s New?
          </span>
          <h1 className="text-4xl md:text-5xl font-black mb-6">
            The Graphics Stitch{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-yellow-300">
              Learning Blog
            </span>
          </h1>
          <p className="text-purple-100 text-lg max-w-2xl mx-auto">
            Tips, tutorials, and industry insights straight from expert digitizers.
            Perfect for beginners and professionals alike.
          </p>
        </div>
      </section>

      {/* Newsletter signup */}
      <section className="py-12 bg-purple-600 dark:bg-purple-900">
        <div className="max-w-2xl mx-auto px-4 text-center">
          <h3 className="text-white font-black text-xl mb-2">Sign Up for Our Newsletter!</h3>
          <p className="text-purple-200 text-sm mb-6">
            Get free designs, embroidery tips, and exclusive coupons delivered monthly.
          </p>
          <NewsletterForm />
        </div>
      </section>

      {/* Blog posts */}
      <section className="py-20 bg-white dark:bg-gray-950">
        <div className="max-w-7xl mx-auto px-4">
          {/* Category filter */}
          <div className="flex flex-wrap gap-2 mb-10 justify-center">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                className={`px-4 py-2 rounded-full text-sm font-semibold transition-all border ${
                  cat === "All"
                    ? "bg-gradient-to-r from-purple-600 to-pink-600 text-white border-transparent shadow"
                    : "bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300 border-gray-200 dark:border-gray-600 hover:bg-purple-50 dark:hover:bg-gray-700"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Posts grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {BLOG_POSTS.map((post) => (
              <article
                key={post.slug}
                className="bg-gray-50 dark:bg-gray-800 rounded-2xl overflow-hidden border border-gray-100 dark:border-gray-700 card-hover group"
              >
                {/* Thumbnail */}
                <div className={`h-40 bg-gradient-to-br ${post.color} flex items-center justify-center`}>
                </div>

                <div className="p-5">
                  <span className="inline-block text-xs font-semibold text-purple-600 dark:text-purple-400 bg-purple-50 dark:bg-purple-900/30 px-2.5 py-1 rounded-full mb-3">
                    {post.category}
                  </span>
                  <h2 className="font-black text-gray-900 dark:text-white text-base mb-2 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors leading-snug">
                    {post.title}
                  </h2>
                  <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed mb-4 line-clamp-2">
                    {post.excerpt}
                  </p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3 text-xs text-gray-400">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3 h-3" /> {post.date}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3" /> {post.readTime}
                      </span>
                    </div>
                    <Link
                      href={`/blog/${post.slug}`}
                      className="flex items-center gap-1 text-purple-600 dark:text-purple-400 text-xs font-semibold hover:gap-2 transition-all"
                    >
                      Read <ArrowRight className="w-3 h-3" />
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Free designs CTA */}
      <section className="py-16 bg-gradient-to-r from-purple-600 to-pink-600">
        <div className="max-w-3xl mx-auto px-4 text-center text-white">
          <h3 className="text-2xl font-black mb-3">Check Our Free Designs Library!</h3>
          <p className="text-purple-100 mb-6">
            Download hundreds of free embroidery files ready to sew out — no strings attached.
          </p>
          <Link
            href="/sample-designs"
            className="inline-flex items-center gap-2 bg-white text-purple-700 font-bold px-8 py-3.5 rounded-full hover:scale-105 transition-transform shadow-lg"
          >
            Browse Sample Designs <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>
    </PageLayout>
  );
}
