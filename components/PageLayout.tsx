import Navbar from "./Navbar";
import Footer from "./Footer";
import { ReactNode } from "react";

interface PageLayoutProps {
  children: ReactNode;
}

export default function PageLayout({ children }: PageLayoutProps) {
  return (
    <>
      <Navbar />
      <main className="pt-20">{children}</main>
      <Footer />
    </>
  );
}
