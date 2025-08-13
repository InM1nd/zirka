import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "ZIRKA - Investment Intelligence Dashboard",
  description: "AI-powered investment intelligence platform with company profiling, opportunity screening, and market scanning capabilities",
  keywords: ["AI", "investment", "dashboard", "company analysis", "opportunity screening", "market intelligence"],
  authors: [{ name: "ZIRKA Team" }],
  creator: "ZIRKA",
  publisher: "ZIRKA",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://zirka.ai"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "ZIRKA - Investment Intelligence Dashboard",
    description: "AI-powered investment intelligence platform with comprehensive analysis tools",
    url: "https://zirka.ai",
    siteName: "ZIRKA",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "ZIRKA - Investment Intelligence Dashboard",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "ZIRKA - Investment Intelligence Dashboard",
    description: "AI-powered investment intelligence platform with comprehensive analysis tools",
    images: ["/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "your-google-verification-code",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
