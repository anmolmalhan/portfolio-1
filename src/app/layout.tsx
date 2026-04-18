import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Dev Motion Portfolio",
  description: "I build fast, animated web experiences.",
};

import { Header } from "@/components/ui/Header";
import CustomCursor from "@/components/animations/CustomCursor";
import SmoothScroll from "@/components/animations/SmoothScroll";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col selection:bg-background selection:text-foreground">
        <SmoothScroll>
          <CustomCursor />
          <Header />
          <main className="flex-1 flex flex-col w-full relative z-10">{children}</main>
        </SmoothScroll>
      </body>
    </html>
  );
}
