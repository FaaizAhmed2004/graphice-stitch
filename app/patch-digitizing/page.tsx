import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import PageLayout from "@/components/PageLayout";
import ContactForm from "@/components/ContactForm";
import Testimonials from "@/components/Testimonials";
import FAQ from "@/components/FAQ";
import { ArrowRight, CheckCircle, Download, Palette, Scissors, Upload } from "lucide-react";

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

const PROCESS = [
  { icon: <Upload className="h-5 w-5" />, title: "Send your artwork", text: "Upload a logo, sketch, reference image, or existing patch idea." },
  { icon: <Palette className="h-5 w-5" />, title: "Choose the patch style", text: "Tell us whether you need embroidery, chenille, woven, leather, sublimation, or PVC." },
  { icon: <Scissors className="h-5 w-5" />, title: "We prepare production files", text: "Our team plans borders, fills, colors, backing, and stitch direction for a clean result." },
  { icon: <Download className="h-5 w-5" />, title: "Receive the final files", text: "Get your approved production-ready files and clear notes for manufacturing." },
];

export default function PatchDigitizingPage() {
  return <PageLayout>
    <section className="relative overflow-hidden bg-[#101010] py-24 text-white">
      <div className="absolute inset-0 stripe-bg opacity-30" />
      <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-4 lg:grid-cols-[1.05fr_.95fr]">
        <div>
          <span className="inline-flex rounded-full border border-[#d9ff53]/35 bg-[#d9ff53]/10 px-4 py-2 text-xs font-bold uppercase tracking-[.18em] text-[#d9ff53]">Patch production</span>
          <h1 className="mt-6 text-4xl font-black leading-tight sm:text-5xl xl:text-6xl">Custom patches built for your brand.</h1>
          <p className="mt-6 max-w-xl text-lg leading-8 text-white/60">From embroidered borders to chenille, woven, leather, sublimation, and PVC patches, Graphic Stitch prepares artwork that is clear, durable, and ready for production.</p>
          <div className="mt-8 flex flex-wrap gap-3">{["Multiple patch styles", "Up to 6 inch pricing", "Production-ready files"].map((item) => <span key={item} className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-2 text-sm font-bold text-white/75"><CheckCircle className="h-4 w-4 text-[#d9ff53]" />{item}</span>)}</div>
          <Link href="/quote" className="mt-9 inline-flex items-center gap-2 rounded-xl bg-[#d9ff53] px-5 py-3.5 text-sm font-black text-[#171717] transition hover:bg-white">Start a patch quote <ArrowRight className="h-4 w-4" /></Link>
        </div>
        <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-[#202020] shadow-2xl shadow-black/30"><Image src="/Vintage_Cutting_Before_After.jpg" alt="Custom patch production example" width={900} height={620} className="h-85 w-full object-cover" priority /><div className="absolute inset-x-0 bottom-0 bg-linear-to-t from-black/80 to-transparent p-6"><p className="text-xs font-bold uppercase tracking-[.18em] text-[#d9ff53]">Made for real production</p><p className="mt-2 text-xl font-black">Borders, fills, backing, and detail considered from the start.</p></div></div>
      </div>
    </section>

    <section className="bg-white py-20 dark:bg-gray-950"><div className="mx-auto max-w-7xl px-4"><div className="mx-auto max-w-2xl text-center"><span className="text-xs font-bold uppercase tracking-[.2em] text-black/45 dark:text-white/45">Why patch digitizing matters</span><h2 className="mt-3 text-3xl font-black text-[#171717] dark:text-white sm:text-4xl">A patch needs more than a clean picture.</h2><p className="mt-4 leading-7 text-black/55 dark:text-white/55">The right border, density, color count, and backing plan determine how a patch looks and holds up after production. We prepare every file with the finished patch in mind.</p></div><div className="mt-12 grid gap-5 md:grid-cols-3">{["Clean borders and satin edges", "Balanced stitch density and fills", "Color planning for repeatable production"].map((item) => <div key={item} className="rounded-2xl border border-black/10 bg-[#f8f7f4] p-6 dark:border-white/10 dark:bg-[#202020]"><CheckCircle className="h-5 w-5 text-[#6e9900] dark:text-[#d9ff53]" /><h3 className="mt-6 font-black text-[#171717] dark:text-white">{item}</h3><p className="mt-2 text-sm leading-6 text-black/55 dark:text-white/50">Practical artwork decisions that help your manufacturer achieve a consistent sew-out or patch finish.</p></div>)}</div></div></section>

    <section className="bg-[#f3f2ee] py-20"><div className="mx-auto max-w-7xl px-4"><div className="text-center"><span className="text-xs font-bold uppercase tracking-[.2em] text-black/45">Simple workflow</span><h2 className="mt-3 text-3xl font-black text-[#171717] sm:text-4xl">From artwork to patch-ready files.</h2></div><div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">{PROCESS.map((step, index) => <div key={step.title} className="rounded-2xl border border-black/10 bg-white p-6"><div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#171717] text-[#d9ff53]">{step.icon}</div><p className="mt-6 text-xs font-black uppercase tracking-wider text-black/35">0{index + 1}</p><h3 className="mt-2 font-black text-[#171717]">{step.title}</h3><p className="mt-2 text-sm leading-6 text-black/55">{step.text}</p></div>)}</div></div></section>

    <section className="bg-white py-20 dark:bg-gray-950"><div className="mx-auto max-w-7xl px-4"><div className="text-center"><span className="rounded-full bg-[#d9ff53]/20 px-4 py-2 text-xs font-bold uppercase tracking-[.18em] text-[#587500]">Patch pricing</span><h2 className="mt-5 text-3xl font-black text-[#171717] dark:text-white sm:text-4xl">Choose your patch style and quantity.</h2><p className="mx-auto mt-3 max-w-2xl text-sm leading-6 text-black/55 dark:text-white/55">Prices shown are for patches up to 6 inches and include free shipping. Confirm artwork, backing, size, and final production details with a quote.</p></div><div className="mt-10 grid gap-4 md:grid-cols-2 xl:grid-cols-3">{PATCH_PRICING.map((item) => <article key={item.name} className="flex min-h-72.5 flex-col rounded-2xl border border-black/15 bg-[#f8f9fa] p-6 transition hover:-translate-y-1 hover:border-[#6f9700] hover:shadow-xl"><h3 className="text-lg font-black text-[#171717]">{item.name}</h3><p className="mt-4 text-sm font-bold text-black/65">({item.note})</p><div className="mt-3 space-y-1 text-sm leading-5 text-black/75">{item.lines.map((line) => <p key={line}>{line}</p>)}</div><Link href="/quote" className="mt-auto inline-flex w-fit items-center gap-2 rounded-lg bg-[#2dc43b] px-4 py-2.5 text-xs font-black text-white transition hover:bg-[#239e2f]">Order now <ArrowRight className="h-3.5 w-3.5" /></Link></article>)}</div></div></section>

    <section className="bg-[#101010] py-16 text-white"><div className="mx-auto max-w-4xl px-4 text-center"><h2 className="text-3xl font-black sm:text-4xl">Need a custom patch quantity or shape?</h2><p className="mx-auto mt-4 max-w-2xl text-white/55">Send the artwork, finished size, quantity, and preferred patch style. We will confirm the best production route.</p><Link href="/quote" className="mt-7 inline-flex items-center gap-2 rounded-xl bg-[#d9ff53] px-5 py-3.5 text-sm font-black text-[#171717]">Request a custom quote <ArrowRight className="h-4 w-4" /></Link></div></section>
    <Testimonials /><FAQ /><ContactForm />
  </PageLayout>;
}
