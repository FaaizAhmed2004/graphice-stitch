import type { Metadata } from "next";
import Image from "next/image";
import PageLayout from "@/components/PageLayout";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Sample Designs — Graphics Stitch",
  description:
    "Browse our portfolio of real embroidery digitizing and vector art samples. See the quality of our work before you order.",
};

const SAMPLES = [
  {
    src: "/CamBridge.JPG",
    name: "CamBridge",
    category: "Embroidery",
  },
  {
    src: "/Christmas Characters Vector Art.png",
    name: "Christmas Characters",
    category: "Vector Art",
  },
  {
    src: "/Christmas Mickey Minnie Vector Art.png",
    name: "Christmas Mickey & Minnie",
    category: "Vector Art",
  },
  {
    src: "/Company_Logo-01.png",
    name: "Company Logo",
    category: "Logo Design",
  },
  {
    src: "/Cowboys Champions Vector Art R1.jpg",
    name: "Cowboys Champions",
    category: "Vector Art",
  },
  {
    src: "/Dallas Cowboys Vector Art.png",
    name: "Dallas Cowboys",
    category: "Vector Art",
  },
  {
    src: "/Dog 10 CM logo.JPG",
    name: "Dog Logo (10 CM)",
    category: "Embroidery",
  },
  {
    src: "/Dog 10 CM.PNG",
    name: "Dog Design (10 CM)",
    category: "Embroidery",
  },
  {
    src: "/Don Pinky Vector Art R1.png",
    name: "Don Pinky",
    category: "Vector Art",
  },
  {
    src: "/face Cap logo.JPG",
    name: "Face Cap Logo",
    category: "Embroidery",
  },
  {
    src: "/FACE.JPG",
    name: "Face Design",
    category: "Embroidery",
  },
  {
    src: "/Fresh Start.JPG",
    name: "Fresh Start",
    category: "Embroidery",
  },
  {
    src: "/GIRL LOGO.JPG",
    name: "Girl Logo",
    category: "Embroidery",
  },
  {
    src: "/Halos.JPG",
    name: "Halos",
    category: "Embroidery",
  },
  {
    src: "/INDIVDUAL.JPG",
    name: "Individual Design",
    category: "Embroidery",
  },
  {
    src: "/Left chest TEDDEY.JPG",
    name: "Left Chest Teddy",
    category: "Embroidery",
  },
  {
    src: "/LUCAS.JPG",
    name: "Lucas",
    category: "Embroidery",
  },
  {
    src: "/MARATHON JB sweatshirts.JPG",
    name: "Marathon JB Sweatshirts",
    category: "Embroidery",
  },
  {
    src: "/RAIDERS hat.JPG",
    name: "Raiders Hat",
    category: "Embroidery",
  },
  {
    src: "/Rosas JB.PNG",
    name: "Rosas JB",
    category: "Embroidery",
  },
  {
    src: "/The_DJ_You_Need.png",
    name: "The DJ You Need",
    category: "Vector Art",
  },
  {
    src: "/Vintage_Cutting.jpg",
    name: "Vintage Cutting",
    category: "Vector Art",
  },
  {
    src: "/Vintage_Cutting_Before_After.jpg",
    name: "Vintage Cutting — Before & After",
    category: "Vector Art",
  },
];

const CATEGORIES = ["All", "Embroidery", "Vector Art", "Logo Design"];

export default function SampleDesignsPage() {
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
            🖼️ Real Work. Real Results.
          </span>
          <h1 className="text-4xl md:text-5xl font-black mb-6">
            Sample{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-yellow-300">
              Designs
            </span>
          </h1>
          <p className="text-purple-100 text-lg max-w-2xl mx-auto">
            Browse our actual client work — embroidery digitizing, vector art conversions,
            and logo designs. Every stitch and vector path crafted by our team.
          </p>
        </div>
      </section>

      {/* Gallery */}
      <section className="py-20 bg-white dark:bg-gray-950">
        <div className="max-w-7xl mx-auto px-4">

          {/* Category pills */}
          <div className="flex flex-wrap gap-2 justify-center mb-12">
            {CATEGORIES.map((cat) => (
              <span
                key={cat}
                className="px-4 py-2 rounded-full text-sm font-semibold bg-purple-50 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 border border-purple-200 dark:border-purple-700/40 cursor-default"
              >
                {cat}
              </span>
            ))}
          </div>

          {/* Image grid */}
          <div className="grid sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-5">
            {SAMPLES.map((sample) => (
              <div
                key={sample.src}
                className="group bg-gray-50 dark:bg-gray-800 rounded-2xl overflow-hidden border border-gray-100 dark:border-gray-700 card-hover"
              >
                {/* Image */}
                <div className="relative h-52 w-full bg-gray-100 dark:bg-gray-700 overflow-hidden">
                  <Image
                    src={sample.src}
                    alt={sample.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  />
                </div>
                {/* Info */}
                <div className="p-4">
                  <span className="text-xs text-purple-600 dark:text-purple-400 font-semibold bg-purple-50 dark:bg-purple-900/30 px-2 py-0.5 rounded-full">
                    {sample.category}
                  </span>
                  <h3 className="font-bold text-gray-900 dark:text-white text-sm mt-2 leading-snug">
                    {sample.name}
                  </h3>
                </div>
              </div>
            ))}
          </div>

          {/* CTA */}
          <div className="mt-16 bg-purple-50 dark:bg-purple-900/20 border border-purple-200 dark:border-purple-700/40 rounded-2xl p-8 text-center">
            <p className="text-purple-700 dark:text-purple-300 font-bold text-xl mb-2">
              Like what you see?
            </p>
            <p className="text-gray-600 dark:text-gray-400 text-sm mb-6 max-w-lg mx-auto">
              Send us your logo, artwork, or design idea and we&apos;ll turn it into
              production-ready embroidery files or sharp vector art — fast.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold px-8 py-3 rounded-full hover:shadow-lg hover:shadow-purple-500/30 transition-all text-sm"
            >
              Get a Free Quote <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>
    </PageLayout>
  );
}
