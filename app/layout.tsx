import type { Metadata } from "next";
import { Cabin } from "next/font/google";
import "./globals.css";

const cabin = Cabin({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-cabin",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://rick-memorial.vercel.app"),
  title: "In Loving Memory — Richard Earl LaDow Jr. (1957 — 2026)",
  description:
    "A tribute to Rick: Richard Earl LaDow Jr. Celebrating his life, memories, and gathering details for his memorial on Saturday, November 7, 2026.",
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/rick-favicon.png", type: "image/png" },
    ],
    apple: [
      { url: "/rick-favicon.png", sizes: "128x128", type: "image/png" },
    ],
  },
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
    <html lang="en" className={`${cabin.variable} scroll-smooth`}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;0,700;1,300;1,400;1,500;1,600;1,700&family=Cabin:ital,wght@0,400;0,500;0,600;0,700;1,400;1,500;1,600;1,700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="font-sans bg-brand-50 text-brand-950 antialiased selection:bg-brand-200 selection:text-brand-950">
        {children}
      </body>
    </html>
  );
}
