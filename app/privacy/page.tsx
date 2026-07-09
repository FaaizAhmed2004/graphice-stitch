import Link from "next/link";
import { Scissors } from "lucide-react";
import { SITE_NAME } from "@/lib/constants";

export default function PrivacyPage() {
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
        <h1 className="text-3xl font-black text-gray-900 dark:text-white mb-2">Privacy Policy</h1>
        <p className="text-gray-500 text-sm mb-10">Last updated: January 1, 2025</p>
        <div className="prose prose-gray dark:prose-invert max-w-none space-y-6 text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
          <section>
            <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-2">1. Information We Collect</h2>
            <p>When you submit a quote request or contact form, we collect your name, email address, phone number, and any design details you provide. This information is used solely to respond to your inquiry and fulfill your order.</p>
          </section>
          <section>
            <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-2">2. How We Use Your Information</h2>
            <p>We use your information to process orders, send quotes, communicate about your project, and improve our services. We do not sell or share your personal data with third parties for marketing purposes.</p>
          </section>
          <section>
            <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-2">3. Data Security</h2>
            <p>We implement appropriate technical and organizational measures to protect your personal information. All form submissions are transmitted over encrypted connections.</p>
          </section>
          <section>
            <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-2">4. Contact</h2>
            <p>For privacy-related inquiries, contact us at info@graphicsstitch.com.</p>
          </section>
        </div>
        <Link href="/" className="inline-flex items-center gap-2 mt-10 text-purple-600 dark:text-purple-400 font-semibold text-sm hover:underline">
          ← Back to Home
        </Link>
      </main>
    </div>
  );
}
