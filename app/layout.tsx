import type { Metadata } from "next";
import { Cormorant_Garamond, Inter } from "next/font/google";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-cormorant",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://rick-ladow-memorial.vercel.app"),
  title: "In Loving Memory — Richard Earl LaDow Jr. (1957 — 2026)",
  description:
    "A tribute to Rick: Richard Earl LaDow Jr. Celebrating his life, memories, and gathering details for his memorial on Saturday, November 7, 2026.",
  openGraph: {
    title: "Richard Earl LaDow Jr. (1957 — 2026) — Memorial Tribute",
    description:
      "Please join us for a gathering to celebrate Rick, remember the life he lived, and honor the love, laughter, and memories he left with each of us.",
    images: ["/images/rick-01.png"],
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${cormorant.variable} ${inter.variable} scroll-smooth`}>
      <body className="font-sans bg-brand-50 text-brand-950 antialiased selection:bg-brand-200 selection:text-brand-950">
        {children}
      </body>
    </html>
  );
}
