import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import TeslaNavbar from "./components/navbar&footer/navbar";
import TeslaFooter from "./components/navbar&footer/footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Axentra",
  description: "Axentra - Electric Cars, Solar & Clean Energy",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <TeslaNavbar />
        <main className="pt-14">{children}</main>
        <TeslaFooter />
      </body>
    </html>
  );
}