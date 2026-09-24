import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Services from "@/components/Services";
import ManagedServicesPricing from "@/components/ManagedServicesPricing";
import Portfolio from "@/components/Portfolio";
import ContactForm from "@/components/ContactForm";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main>
      <Navbar />
      <Hero />
      <Services />
      <ManagedServicesPricing limit={6} />
      <Portfolio />
      <ContactForm />
      <Footer />
    </main>
  );
}
