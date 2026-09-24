import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Services from "@/components/Services";
import ManagedServicesPricing from "@/components/ManagedServicesPricing";
import Portfolio from "@/components/Portfolio";
import ContactForm from "@/components/ContactForm";
import Footer from "@/components/Footer";
import { getSupabaseServerClient } from "@/lib/supabase/server";

export const dynamic = "force-dynamic";

export default async function Home() {
  const supabase = await getSupabaseServerClient();
  const { data: portfolio } = await supabase
    .from("portfolio_items")
    .select("id, title, category, image_url")
    .eq("published", true)
    .order("sort_order");

  return (
    <main>
      <Navbar />
      <Hero />
      <Services />
      <ManagedServicesPricing limit={6} />
      <Portfolio items={portfolio ?? undefined} />
      <ContactForm />
      <Footer />
    </main>
  );
}
