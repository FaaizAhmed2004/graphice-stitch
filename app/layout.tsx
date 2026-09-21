import type { Metadata } from "next";
import { Space_Grotesk } from "next/font/google";
import "./globals.css";
import ThemeProvider from "@/components/ThemeProvider";
import { Toaster } from "react-hot-toast";

const inter = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"),
  title: "Graphics Stitch — Professional Embroidery Digitizing & Vector Art",
  description:
    "High-quality embroidery digitizing and vector art services. Next-day turnaround, manual digitizing by expert artists. Starting at just $15.",
  keywords:
    "embroidery digitizing, vector art, digitizing service, embroidery files, DST PES EMB, 3D puff, patch digitizing, graphics stitch",
  icons: {
    icon: "/Company_Logo-01.png",
    apple: "/Company_Logo-01.png",
  },
  openGraph: {
    title: "Graphics Stitch — Professional Embroidery Digitizing & Vector Art",
    description:
      "Expert embroidery digitizing and vector art. Manual digitizing, next-day turnaround, starting at $15.",
    type: "website",
    images: [{ url: "/Company_Logo-01.png" }],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      data-scroll-behavior="smooth"
    >
      <body className={`${inter.variable} font-sans antialiased`}>
        <ThemeProvider>
          {children}
          <Toaster
            position="top-right"
            toastOptions={{
              duration: 5000,
              style: {
                borderRadius: "12px",
                fontFamily: "var(--font-inter), Inter, sans-serif",
                fontSize: "14px",
              },
              success: {
                style: {
                  background: "#f0fdf4",
                  color: "#166534",
                  border: "1px solid #bbf7d0",
                },
                iconTheme: { primary: "#16a34a", secondary: "#ffffff" },
              },
              error: {
                style: {
                  background: "#fef2f2",
                  color: "#991b1b",
                  border: "1px solid #fecaca",
                },
                iconTheme: { primary: "#dc2626", secondary: "#ffffff" },
              },
            }}
          />
        </ThemeProvider>
      </body>
    </html>
  );
}
