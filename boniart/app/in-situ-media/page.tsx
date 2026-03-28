import type { Metadata } from "next";
import { PortableText } from "@portabletext/react";
import { getInSituMedia } from "../lib/api";
import { InSituMediaGallery } from "../components/InSituMediaGallery";

export const metadata: Metadata = {
  title: "Other Medium",
  description:
    "Installations and multimedia works by Shahid Hassan Boni, including image documentation and YouTube video presentations.",
  keywords: [
    "Shahid Hassan Boni",
    "Other Medium",
    "Installations",
    "Multimedia art",
    "Video art",
    "Contemporary art Pakistan",
  ],
  alternates: {
    canonical: "/in-situ-media",
  },
  openGraph: {
    title: "Other Medium | Shahid Hassan Boni",
    description:
      "Installations and multimedia works by Shahid Hassan Boni, including image documentation and YouTube video presentations.",
    url: "/in-situ-media",
    type: "website",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "Other Medium by Shahid Hassan Boni",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Other Medium | Shahid Hassan Boni",
    description:
      "Installations and multimedia works by Shahid Hassan Boni, including image documentation and YouTube video presentations.",
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
};

export default async function InSituMediaPage() {
  const inSituMedia = await getInSituMedia();

  return (
    <div className="max-w-5xl mx-auto py-16 px-8">
      <h1 className="text-3xl font-light mb-8">Other Medium</h1>

      {(inSituMedia?.intro ?? []).length > 0 && (
        <div className="prose prose-sm max-w-none text-gray-600 mb-10">
          <PortableText value={inSituMedia?.intro ?? []} />
        </div>
      )}
      <InSituMediaGallery items={inSituMedia?.items ?? []} />
    </div>
  );
}
