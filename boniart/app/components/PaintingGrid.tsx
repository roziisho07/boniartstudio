"use client";
import { useState } from "react";
import Image from "next/image";
import { urlFor } from "@/sanity/lib/image";
import { type SanityImageSource } from "@sanity/image-url/lib/types/types";

interface Painting {
  title: string;
  slug: { current: string };
  image: SanityImageSource;
  exhibitionText?: string;
  medium?: string;
  dimensions?: string;
}

interface PaintingGridProps {
  paintings: Painting[];
}

type ImageWithMetadata = {
  alt?: string;
  asset?: {
    metadata?: {
      dimensions?: {
        width?: number;
        height?: number;
      };
    };
  };
};

function toGridImageUrl(source: SanityImageSource | undefined) {
  if (!source) return null;

  try {
    // Request a right-sized asset from Sanity to avoid proxy timeouts in Next image optimizer.
    return urlFor(source)
      .width(1600)
      .auto("format")
      .quality(80)
      .fit("max")
      .url();
  } catch {
    return null;
  }
}

function toModalImageUrl(source: SanityImageSource | undefined) {
  if (!source) return null;

  try {
    return urlFor(source)
      .width(2200)
      .auto("format")
      .quality(85)
      .fit("max")
      .url();
  } catch {
    return null;
  }
}

export default function PaintingGrid({ paintings }: PaintingGridProps) {
  const [selectedPainting, setSelectedPainting] = useState<Painting | null>(
    null,
  );
  const modalImageUrl = selectedPainting
    ? toModalImageUrl(selectedPainting.image)
    : null;

  const getImageDimensions = (source: SanityImageSource) => {
    const image = source as ImageWithMetadata;
    const width = image.asset?.metadata?.dimensions?.width;
    const height = image.asset?.metadata?.dimensions?.height;

    if (
      typeof width === "number" &&
      typeof height === "number" &&
      width > 0 &&
      height > 0
    ) {
      return { width, height };
    }

    return { width: 1200, height: 1200 };
  };

  return (
    <>
      <div className="columns-1 md:columns-2 lg:columns-3 gap-8 p-8">
        {paintings.map((painting) => {
          const gridImageUrl = toGridImageUrl(painting.image);

          return (
            <div
              key={painting.slug.current}
              className="mb-8 break-inside-avoid cursor-pointer group"
              onClick={() => setSelectedPainting(painting)}
            >
              <div className="relative bg-gray-50 mb-3 overflow-hidden">
                {gridImageUrl && (
                  <Image
                    src={gridImageUrl}
                    alt={
                      (painting.image as ImageWithMetadata).alt ||
                      painting.title
                    }
                    width={getImageDimensions(painting.image).width}
                    height={getImageDimensions(painting.image).height}
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    unoptimized
                    className="object-contain mix-blend-darken group-hover:scale-105 transition duration-500"
                  />
                )}

                <div className="pointer-events-none absolute left-3 bottom-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="bg-black/65 text-white px-3 py-2 rounded-sm">
                    <p className="text-sm font-medium leading-tight">
                      {painting.title}
                    </p>
                    {painting.medium && (
                      <p className="text-xs text-white/80 leading-tight mt-1">
                        {painting.medium}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Full-size modal */}
      {selectedPainting && (
        <div
          className="fixed inset-0 bg-white/95 z-50 flex items-start md:items-center justify-center p-4 md:p-8 overflow-y-auto"
          onClick={() => setSelectedPainting(null)}
        >
          <button
            onClick={() => setSelectedPainting(null)}
            className="absolute top-6 right-6 text-3xl text-gray-400 hover:text-black z-10"
          >
            ×
          </button>

          <div
            className="max-w-6xl w-full my-auto flex flex-col md:flex-row gap-8 items-center"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="relative flex-1 w-full flex justify-center">
              {modalImageUrl && (
                <Image
                  src={modalImageUrl}
                  alt={selectedPainting.title}
                  width={600}
                  height={600}
                  sizes="(max-width: 768px) 100vw, 80vw"
                  unoptimized
                  className="w-auto h-auto max-w-full max-h-[72vh] md:max-h-[84vh] object-contain"
                />
              )}
            </div>

            <div className="md:w-80 space-y-4">
              <h2 className="text-2xl font-light">{selectedPainting.title}</h2>
              {selectedPainting.exhibitionText && (
                <p className="text-sm text-gray-600">
                  {selectedPainting.exhibitionText}
                </p>
              )}
              {selectedPainting.medium && (
                <p className="text-sm text-gray-500">
                  {selectedPainting.medium}
                </p>
              )}
              {selectedPainting.dimensions && (
                <p className="text-sm text-gray-500">
                  {selectedPainting.dimensions}
                </p>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
