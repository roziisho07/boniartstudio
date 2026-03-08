import type { Metadata } from "next";
import { PortableText } from "@portabletext/react";
import CVSection from "../components/CVSection";
// import DownloadCVButton from "../components/DownloadCVButton";
import { getAbout } from "../lib/api";
import Image from "next/image";
import { urlFor } from "@/sanity/lib/image";
import { type SanityImageSource } from "@sanity/image-url/lib/types/types";

type AboutImageBlock = {
  _type?: string;
  asset?: unknown;
};

export const metadata: Metadata = {
  title: "About",
  description:
    "About Shahid Hassan Boni, Pakistani visual artist and art teacher. Biography, background, and curriculum vitae.",
  alternates: {
    canonical: "/about",
  },
};

export default async function AboutPage() {
  const about = await getAbout();
  const blocks = (about?.content ?? []) as AboutImageBlock[];
  const aboutImage = blocks.find(
    (block) => block?._type === "image" && block.asset,
  );
  const aboutImageSource =
    (about?.aboutImage as SanityImageSource | undefined) ??
    (aboutImage as SanityImageSource | undefined);
  const aboutImageUrl = aboutImageSource
    ? urlFor(aboutImageSource)
        .width(1200)
        .auto("format")
        .quality(82)
        .fit("max")
        .url()
    : null;
  const aboutImageAlt =
    (about?.aboutImage?.alt && about.aboutImage.alt.trim()) || "About image";

  return (
    <div className="max-w-6xl mx-auto py-16 px-8">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-12">
        <aside className="md:col-span-4 space-y-6">
          {aboutImageUrl && (
            <div className="border border-gray-200 bg-gray-50">
              <Image
                src={aboutImageUrl}
                alt={aboutImageAlt}
                width={900}
                height={1200}
                sizes="(max-width: 768px) 100vw, 33vw"
                unoptimized
                className="w-full h-auto object-cover"
              />
            </div>
          )}

          {/* {(!!about?.cv?.length || !!about?.cvData) && (
            <DownloadCVButton
              cv={about.cv}
              cvData={about.cvData}
              className="w-full inline-flex items-center justify-center gap-2 text-sm border border-gray-300 px-4 py-3 rounded-md hover:bg-gray-50 transition"
            />
          )} */}
        </aside>

        <section className="md:col-span-8">
          <h1 className="text-3xl font-light mb-8">
            {about?.title || "About"}
          </h1>
          <div className="prose prose-sm max-w-none">
            <PortableText value={about?.content ?? []} />
          </div>
        </section>
      </div>

      {(!!about?.cv?.length || !!about?.cvData) && (
        <CVSection cv={about?.cv} cvData={about?.cvData} />
      )}
    </div>
  );
}
