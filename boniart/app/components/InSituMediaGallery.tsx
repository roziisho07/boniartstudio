"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import { PortableText } from "@portabletext/react";
import { type SanityImageSource } from "@sanity/image-url/lib/types/types";
import {
  type InSituMediaImageItem,
  type InSituMediaItem,
  type InSituMediaVideoItem,
} from "../lib/api";
import { urlFor } from "@/sanity/lib/image";

type InSituMediaGalleryProps = {
  items: InSituMediaItem[];
};

function trimWords(text: string, maxWords = 16): string {
  const words = text.trim().split(/\s+/);
  if (words.length <= maxWords) {
    return text.trim();
  }

  return `${words.slice(0, maxWords).join(" ")}...`;
}

type PortableTextChild = {
  _type?: string;
  text?: string;
};

type PortableTextBlock = {
  _type?: string;
  children?: PortableTextChild[];
};

function portableTextToPlain(value?: unknown[]): string {
  if (!Array.isArray(value)) {
    return "";
  }

  return value
    .map((block) => {
      const typedBlock = block as PortableTextBlock;
      if (!Array.isArray(typedBlock.children)) {
        return "";
      }

      return typedBlock.children
        .map((child) => (child?._type === "span" ? child.text || "" : ""))
        .join("");
    })
    .filter(Boolean)
    .join(" ")
    .replace(/\s+/g, " ")
    .trim();
}

function getYouTubeEmbedUrl(rawUrl?: string): string | null {
  if (!rawUrl) {
    return null;
  }

  try {
    const url = new URL(rawUrl);
    const host = url.hostname.replace("www.", "");

    if (host === "youtu.be") {
      const id = url.pathname.split("/").filter(Boolean)[0];
      return id ? `https://www.youtube.com/embed/${id}` : null;
    }

    if (host === "youtube.com" || host === "m.youtube.com") {
      const watchId = url.searchParams.get("v");
      if (watchId) {
        return `https://www.youtube.com/embed/${watchId}`;
      }

      if (url.pathname.startsWith("/embed/")) {
        return `https://www.youtube.com${url.pathname}`;
      }

      if (url.pathname.startsWith("/shorts/")) {
        const id = url.pathname.split("/").filter(Boolean)[1];
        return id ? `https://www.youtube.com/embed/${id}` : null;
      }
    }

    return null;
  } catch {
    return null;
  }
}

export function InSituMediaGallery({ items }: InSituMediaGalleryProps) {
  const [selectedImage, setSelectedImage] =
    useState<InSituMediaImageItem | null>(null);

  const imageItems = useMemo(
    () =>
      items.filter(
        (item) => item._type === "mediaImage",
      ) as InSituMediaImageItem[],
    [items],
  );
  const videoItems = useMemo(
    () =>
      items.filter(
        (item) => item._type === "mediaVideo",
      ) as InSituMediaVideoItem[],
    [items],
  );

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setSelectedImage(null);
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  const selectedImageUrl = selectedImage?.image
    ? urlFor(selectedImage.image as SanityImageSource)
        .width(2200)
        .auto("format")
        .quality(85)
        .fit("max")
        .url()
    : null;

  return (
    <>
      <div className="space-y-14">
        <section>
          <div className="mb-6">
            <h2 className="text-xl font-medium text-gray-800">Installations</h2>
          </div>

          {imageItems.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
              {imageItems.map((item) => {
                const imageSource = item.image as SanityImageSource | undefined;
                const imageUrl = imageSource
                  ? urlFor(imageSource)
                      .width(900)
                      .auto("format")
                      .quality(80)
                      .fit("crop")
                      .url()
                  : null;
                const title = item.caption || "Untitled image";
                const plainDescription = portableTextToPlain(item.description);

                return (
                  <article
                    key={item._key}
                    className="group rounded-xl border border-gray-200 bg-white shadow-sm overflow-hidden"
                  >
                    <button
                      type="button"
                      onClick={() => setSelectedImage(item)}
                      className="block w-full text-left"
                    >
                      {imageUrl ? (
                        <Image
                          src={imageUrl}
                          alt={item.image?.alt || title}
                          width={900}
                          height={700}
                          sizes="(max-width: 640px) 100vw, (max-width: 1280px) 50vw, 33vw"
                          unoptimized
                          className="h-52 w-full object-cover transition-transform duration-300 group-hover:scale-[1.02]"
                        />
                      ) : (
                        <div className="h-52 w-full bg-gray-100" />
                      )}

                      <div className="p-4 space-y-2">
                        <h3 className="text-base font-medium text-gray-900">
                          {title}
                        </h3>
                        {plainDescription && (
                          <p className="text-sm text-gray-600 leading-relaxed">
                            {trimWords(plainDescription, 18)}
                          </p>
                        )}
                      </div>
                    </button>
                  </article>
                );
              })}
            </div>
          ) : (
            <p className="text-sm text-gray-500">No images added yet.</p>
          )}
        </section>

        <section className="rounded-2xl border border-gray-200 bg-gray-50 p-5 sm:p-7">
          <div className="mb-6">
            <h2 className="text-xl font-medium text-gray-800">Multimedia</h2>
          </div>

          {videoItems.length > 0 ? (
            <div className="space-y-8">
              {videoItems.map((item) => {
                const embedUrl = getYouTubeEmbedUrl(item.youtubeUrl);
                const plainDescription = portableTextToPlain(item.description);

                return (
                  <article key={item._key} className="space-y-3">
                    {embedUrl ? (
                      <div className="aspect-video w-full overflow-hidden rounded-lg border border-gray-200 bg-black">
                        <iframe
                          src={embedUrl}
                          title={item.title || "YouTube video"}
                          className="h-full w-full"
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                          referrerPolicy="strict-origin-when-cross-origin"
                          allowFullScreen
                        />
                      </div>
                    ) : (
                      <p className="text-sm text-gray-500">
                        Invalid YouTube URL for this video entry.
                      </p>
                    )}

                    {item.title && (
                      <h3 className="text-base font-medium text-gray-900">
                        {item.title}
                      </h3>
                    )}

                    {plainDescription && (
                      <p className="text-sm text-gray-600 leading-relaxed">
                        {trimWords(plainDescription, 24)}
                      </p>
                    )}
                  </article>
                );
              })}
            </div>
          ) : (
            <p className="text-sm text-gray-500">No videos added yet.</p>
          )}
        </section>
      </div>

      {selectedImage && selectedImageUrl && (
        <div
          className="fixed inset-0 z-[100] bg-black/80 p-4 sm:p-6 md:p-10"
          role="dialog"
          aria-modal="true"
          onClick={() => setSelectedImage(null)}
        >
          <div
            className="mx-auto h-full w-full max-w-7xl rounded-xl bg-white overflow-hidden grid grid-cols-1 lg:grid-cols-12"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="relative lg:col-span-8 bg-gray-100 min-h-[40vh] lg:min-h-full">
              <Image
                src={selectedImageUrl}
                alt={
                  selectedImage.image?.alt ||
                  selectedImage.caption ||
                  "In situ image"
                }
                fill
                unoptimized
                sizes="(max-width: 1024px) 100vw, 70vw"
                className="object-contain"
              />
            </div>

            <div className="lg:col-span-4 p-5 sm:p-6 overflow-y-auto">
              <div className="flex items-start justify-between gap-4 mb-5">
                <h3 className="text-xl font-medium text-gray-900">
                  {selectedImage.caption || "Untitled image"}
                </h3>
                <button
                  type="button"
                  onClick={() => setSelectedImage(null)}
                  className="text-sm text-gray-500 hover:text-gray-800"
                  aria-label="Close modal"
                >
                  Close
                </button>
              </div>

              {(selectedImage.description ?? []).length > 0 ? (
                <div className="prose prose-sm max-w-none text-gray-700">
                  <PortableText value={selectedImage.description ?? []} />
                </div>
              ) : (
                <p className="text-sm text-gray-500">
                  No description provided.
                </p>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
