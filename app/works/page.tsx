import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Portfolio from "@/components/Portfolio";
import { getSupabaseServerClient } from "@/lib/supabase/server";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Our Works | Graphic Stitch",
  description:
    "Browse our portfolio of embroidery digitizing, 3D puff, vector art, and custom patch projects — hand-crafted by expert digitizers.",
};

export default async function WorksPage() {
  const supabase = await getSupabaseServerClient();
  const { data: portfolio } = await supabase
    .from("portfolio_items")
    .select("id, title, category, image_url")
    .eq("published", true)
    .order("sort_order")
    .order("created_at", { ascending: false });

  return (
    <>
      <Navbar />

      {/* Page hero */}
      <section className="bg-[#101010] pt-36 pb-4 text-white text-center">
        <span className="inline-block rounded-full border border-white/15 bg-white/10 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-white/65 mb-4">
          Portfolio
        </span>
        <h1 className="text-4xl md:text-5xl font-black text-white mb-4">
          Our Works
        </h1>
        <p className="mx-auto max-w-xl text-white/55 text-base pb-2">
          Every design you see below was hand-crafted by our expert digitizers.
          Browse by category to find inspiration for your next project.
        </p>
      </section>

      {/* Reuse the same Portfolio component — no "View all" CTA here */}
      <Portfolio items={portfolio ?? undefined} showViewAll={false} />

      <Footer />
    </>
  );
}
