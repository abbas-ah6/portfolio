import "./globals.css";
import { DM_Sans } from "next/font/google";
import { PrismicPreview } from "@prismicio/next";
import { repositoryName } from "@/prismicio";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import React from "react";

const dmSans = DM_Sans({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-dm-sans",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${dmSans.variable}`}>
      <body className="bg-[#070815] text-white">
        <Header />
        <React.StrictMode>
          {children}
        </React.StrictMode>
        <Footer />
      </body>
      <PrismicPreview repositoryName={repositoryName} />
    </html>
  );
}
