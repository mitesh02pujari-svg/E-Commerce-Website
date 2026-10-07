import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { SITE_CONFIG } from "@/lib/constants";
import { getCurrentProfile } from "@/lib/db/auth";
import { getCartItemCount } from "@/lib/db/cart";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: `${SITE_CONFIG.name} | Modern Full-Stack E-Commerce`,
  description: SITE_CONFIG.description,
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const profile = await getCurrentProfile().catch(() => null);
  const cartCount = profile ? await getCartItemCount(profile.id).catch(() => 0) : 0;

  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-screen flex flex-col bg-slate-50 text-slate-900 dark:bg-slate-950 dark:text-slate-100 font-sans">
        <Navbar user={profile} cartCount={cartCount} />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
