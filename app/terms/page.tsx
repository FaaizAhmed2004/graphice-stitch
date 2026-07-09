import Link from "next/link";
import { Scissors } from "lucide-react";
import { SITE_NAME } from "@/lib/constants";

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-950">
      <header className="border-b border-gray-100 dark:border-gray-800 py-4 px-6">
        <Link href="/" className="inline-flex items-center gap-2">
          <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-purple-600 to-pink-600 flex items-center justify-center">
            <Scissors className="w-4 h-4 text-white" />
          </div>
          <span className="font-black gradient-text">{SITE_NAME}</span>
        </Link>
      </header>
      <main className="max-w-3xl mx-auto px-4 py-16">
        <h1 className="text-3xl font-black text-gray-900 dark:text-white mb-2">Terms & Conditions</h1>
        <p className="text-gray-500 text-sm mb-10">Last updated: January 1, 2025</p>
        <div className="space-y-6 text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
          <section>
            <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-2">1. Services</h2>
            <p>Graphics Stitch provides embroidery digitizing and vector art conversion services. All work is performed manually by professional artists. Starting prices are subject to change based on design complexity.</p>
          </section>
          <section>
            <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-2">2. Turnaround Time</h2>
            <p>Standard turnaround is next business day. Rush same-day service is available for most orders. Turnaround times begin upon receipt of all required artwork and order details.</p>
          </section>
          <section>
            <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-2">3. Revisions & Refunds</h2>
            <p>We offer free revisions within 14 days of file delivery. If you are not satisfied after revisions, a full refund or account credit will be issued. Refund requests must be submitted within 14 days of delivery.</p>
          </section>
          <section>
            <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-2">4. Intellectual Property</h2>
            <p>You warrant that you have the right to use all artwork and logos submitted to us for digitizing. Graphics Stitch is not responsible for any intellectual property violations arising from customer-submitted artwork.</p>
          </section>
          <section>
            <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-2">5. File Delivery</h2>
            <p>Completed files are delivered via email in the requested format. Multiple formats are available at no extra cost. Files are stored for 90 days after delivery.</p>
          </section>
          <section>
            <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-2">6. Contact</h2>
            <p>For questions about these terms, contact us at info@graphicsstitch.com.</p>
          </section>
        </div>
        <Link href="/" className="inline-flex items-center gap-2 mt-10 text-purple-600 dark:text-purple-400 font-semibold text-sm hover:underline">
          ← Back to Home
        </Link>
      </main>
    </div>
  );
}
