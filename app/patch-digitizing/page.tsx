import type { Metadata } from "next";
import Link from "next/link";
import PageLayout from "@/components/PageLayout";
import ContactForm from "@/components/ContactForm";
import Testimonials from "@/components/Testimonials";
import FAQ from "@/components/FAQ";
import { ArrowRight, CheckCircle } from "lucide-react";
import ManagedServicesPricing from "@/components/ManagedServicesPricing";

export const metadata: Metadata = {
  title: "Custom Patch Digitizing Services — Graphic Stitch",
  description: "Professional embroidery, chenille, woven, leather, sublimation, and PVC patch digitizing with production-ready files and clear pricing.",
};

const PATCH_PRICING = [
  { name: "Embroidery Patches", note: "Up to 6 inches", lines: ["10 pcs $90 with free shipping", "25 pcs $110 with free shipping", "50 pcs $150 with free shipping", "100 pcs $190 with free shipping", "200 pcs $250 with free shipping"] },
  { name: "Chenille Patches", note: "Up to 6 inches", lines: ["10 pcs $90 with free shipping", "25 pcs $110 with free shipping", "50 pcs $150 with free shipping", "100 pcs $190 with free shipping", "200 pcs $250 with free shipping"] },
  { name: "Woven Patches", note: "Up to 6 inches", lines: ["10 pcs $90 with free shipping", "25 pcs $110 with free shipping", "50 pcs $150 with free shipping", "100 pcs $190 with free shipping", "200 pcs $250 with free shipping"] },
  { name: "Leather Patches", note: "Up to 6 inches", lines: ["10 pcs $90 with free shipping", "25 pcs $110 with free shipping", "50 pcs $150 with free shipping", "100 pcs $190 with free shipping", "200 pcs $250 with free shipping"] },
  { name: "Sublimation Patches", note: "Up to 6 inches", lines: ["10 pcs $90 with free shipping", "25 pcs $110 with free shipping", "50 pcs $150 with free shipping", "100 pcs $190 with free shipping", "200 pcs $250 with free shipping"] },
  { name: "PVC Patches", note: "Up to 6 inches", lines: ["10 pcs $90 with free shipping", "25 pcs $110 with free shipping", "50 pcs $150 with free shipping", "100 pcs $190 with free shipping", "200 pcs $250 with free shipping"] },
];

export default function PatchDigitizingPage() {
  return <PageLayout>
    <section className="relative overflow-hidden bg-[#101010] py-24 text-white">
      <div className="absolute inset-0 stripe-bg opacity-30" />
      <div className="relative mx-auto max-w-4xl px-4">
        <div>
          <span className="inline-flex rounded-full border border-[#d9ff53]/35 bg-[#d9ff53]/10 px-4 py-2 text-xs font-bold uppercase tracking-[.18em] text-[#d9ff53]">Patch production</span>
          <h1 className="mt-6 text-4xl font-black leading-tight sm:text-5xl xl:text-6xl">Custom patches built for your brand.</h1>
          <div className="mt-6 max-w-3xl space-y-4 text-lg leading-8 text-white/60">
            <p>We don&apos;t just create files - we turn your artwork into something special.</p>
            <p>With our Custom Patch Services, simply send us your artwork, and we&apos;ll transform it into a high-quality custom patch and have it delivered straight to your doorstep.</p>
            <p>Explore our Custom Patches collection and choose the style and variety that suits you best.</p>
          </div>
          <div className="mt-8 flex flex-wrap gap-3">{["Multiple patch styles", "Up to 6 inch pricing", "Production-ready files"].map((item) => <span key={item} className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-2 text-sm font-bold text-white/75"><CheckCircle className="h-4 w-4 text-[#d9ff53]" />{item}</span>)}</div>
          <Link href="/quote" className="mt-9 inline-flex items-center gap-2 rounded-xl bg-[#d9ff53] px-5 py-3.5 text-sm font-black text-[#171717] transition hover:bg-white">Start a patch quote <ArrowRight className="h-4 w-4" /></Link>
        </div>
      </div>
    </section>

    <section className="bg-[#101010] py-20 text-white"><div className="mx-auto max-w-7xl px-4"><div className="text-center"><span className="rounded-full bg-[#d9ff53]/15 px-4 py-2 text-xs font-bold uppercase tracking-[.18em] text-[#d9ff53]">Patch pricing</span><h2 className="mt-5 text-3xl font-black sm:text-4xl">Choose your patch style and quantity.</h2><p className="mx-auto mt-3 max-w-2xl text-sm leading-6 text-white/55">Prices shown are for patches up to 6 inches and include free shipping. Confirm artwork, backing, size, and final production details with a quote.</p></div><div className="mt-10 grid gap-4 md:grid-cols-2 xl:grid-cols-3">{PATCH_PRICING.map((item) => <article key={item.name} className="flex min-h-72.5 flex-col rounded-2xl border border-white/10 bg-[#202020] p-6 transition hover:-translate-y-1 hover:border-[#d9ff53] hover:shadow-xl hover:shadow-black/30"><h3 className="text-lg font-black text-white">{item.name}</h3><p className="mt-4 text-sm font-bold text-white/65">({item.note})</p><div className="mt-3 space-y-1 text-sm leading-5 text-white/75">{item.lines.map((line) => <p key={line}>{line}</p>)}</div><Link href="/quote" className="mt-auto inline-flex w-fit items-center gap-2 rounded-lg bg-[#d9ff53] px-4 py-2.5 text-xs font-black text-[#171717] transition hover:bg-white">Order now <ArrowRight className="h-3.5 w-3.5" /></Link></article>)}</div></div></section>

    <ManagedServicesPricing slugs={["patch-digitizing"]} title="Patch Services & Pricing" description="Compare patch services and place your order after signing in to the client workspace." />

    <section className="bg-[#101010] py-16 text-white"><div className="mx-auto max-w-4xl px-4 text-center"><h2 className="text-3xl font-black sm:text-4xl">Need a custom patch quantity or shape?</h2><p className="mx-auto mt-4 max-w-2xl text-white/55">Send the artwork, finished size, quantity, and preferred patch style. We will confirm the best production route.</p><Link href="/quote" className="mt-7 inline-flex items-center gap-2 rounded-xl bg-[#d9ff53] px-5 py-3.5 text-sm font-black text-[#171717]">Request a custom quote <ArrowRight className="h-4 w-4" /></Link></div></section>
    <Testimonials /><FAQ /><ContactForm />
  </PageLayout>;
}
