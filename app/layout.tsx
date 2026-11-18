import type { Metadata } from "next";
import { Manrope } from "next/font/google";
import Script from "next/script";
import AdBanner from "@/components/AdBanner";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import "./globals.css";

const manrope = Manrope({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-manrope",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://perfecthub.vercel.app"),
  title: {
    default: "PerfectHub",
    template: "%s | PerfectHub",
  },
  description:
    "PerfectHub helps people worldwide find the perfect version of everything with tools, prompts, templates, code, and guides.",
  keywords: [
    "perfecthub",
    "global calculators",
    "SEO content platform",
    "prompts and templates",
    "code examples",
    "PerfectHub",
  ],
  openGraph: {
    title: "PerfectHub",
    description: "Find the perfect version of everything.",
    url: "https://perfecthub.vercel.app",
    siteName: "PerfectHub",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "PerfectHub",
    description: "Find the perfect version of everything.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${manrope.variable} font-manrope antialiased`}>
        <div className="site-bg flex min-h-screen flex-col text-slate-900">
          <Navbar />
          <main className="mx-auto w-full max-w-7xl flex-1 px-4 pb-16 pt-32 sm:px-6 md:pt-36 lg:px-8">
            {children}
            <AdBanner className="mt-10" size="large" />
          </main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
