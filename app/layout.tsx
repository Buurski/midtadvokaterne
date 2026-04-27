import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/nav/Navbar";
import { Footer } from "@/components/footer/Footer";

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-jakarta",
  display: "swap",
  weight: ["300", "400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "MidtAdvokaterne A/S — Advokater i Ikast",
  description:
    "MidtAdvokaterne er et erfarent advokatfirma i Ikast. Vi hjælper private og erhvervskunder med juridisk rådgivning siden 1964.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="da"
      className={`${jakarta.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col font-body bg-off-white text-text">
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
