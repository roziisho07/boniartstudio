import type { Metadata } from "next";
import "./globals.css";
import { Sidebar } from "./components/Sidebar";
import { getYears } from "./lib/api";

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL || "https://shahidhassanboni.com";
const siteTitle = "Shahid Hassan Boni";
const siteDescription =
  "Official portfolio of Shahid Hassan Boni, visual artist and art teacher. Explore paintings, exhibitions, CV, news, and contact details.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: siteTitle,
    template: "%s | Shahid Hassan Boni",
  },
  description: siteDescription,
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    url: siteUrl,
    title: siteTitle,
    description: siteDescription,
    siteName: siteTitle,
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "Shahid Hassan Boni - Visual Artist",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: siteTitle,
    description: siteDescription,
    images: ["/twitter-image"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
    shortcut: ["/favicon.ico"],
  },
  manifest: "/site.webmanifest",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const years = await getYears(); // returns [2026,2025,2024,...]
  const personLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Shahid Hassan Boni",
    jobTitle: "Visual Artist",
    nationality: "Pakistani",
    url: siteUrl,
    sameAs: [
      "https://instagram.com/shahid.hassan.boni",
      "https://facebook.com/boni.artist",
    ],
  };
  const websiteLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: siteTitle,
    url: siteUrl,
    description: siteDescription,
  };

  return (
    <html lang="en">
      <body className="font-sans antialiased bg-white text-black min-h-screen flex">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteLd) }}
        />
        <Sidebar years={years} />
        <main className="flex-1 min-h-screen min-w-0 pt-14 md:pt-0">
          {children}
        </main>
      </body>
    </html>
  );
}
