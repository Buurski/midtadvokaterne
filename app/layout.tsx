import type { Metadata } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/nav/Navbar";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
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
      className={`${playfair.variable} ${inter.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col font-body bg-off-white text-text">
        <Navbar />
        {children}
      </body>
    </html>
  );
}
