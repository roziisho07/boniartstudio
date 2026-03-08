import type { Metadata } from "next";
import { PortableText } from "@portabletext/react";
import { getNewsPress } from "../lib/api";

export const metadata: Metadata = {
  title: "News & Press",
  description:
    "Latest news, press coverage, and exhibition updates from Shahid Hassan Boni.",
  alternates: {
    canonical: "/news-press",
  },
};

export default async function NewsPressPage() {
  const newsPress = await getNewsPress();

  return (
    <div className="max-w-2xl mx-auto py-16 px-8">
      <h1 className="text-3xl font-light mb-8">
        {newsPress?.title || "News & Press"}
      </h1>
      <div className="space-y-10">
        {(newsPress?.entries ?? []).map((entry) => (
          <article key={entry._key} className="space-y-2">
            <p className="text-xs uppercase tracking-wide text-gray-400">
              {entry.date ? new Date(entry.date).toLocaleDateString() : ""}
            </p>
            {entry.title && (
              <h2 className="text-lg font-semibold text-gray-600">
                {entry.title}
              </h2>
            )}
            {entry.publication && (
              <p className="text-sm text-gray-500">{entry.publication}</p>
            )}
            {entry.description && entry.description.length > 0 && (
              <div className="prose prose-sm text-gray-600">
                <PortableText value={entry.description} />
              </div>
            )}
            {entry.link && (
              <a
                href={entry.link}
                target="_blank"
                rel="noreferrer"
                className="text-sm underline text-blue-500"
              >
                Read more
              </a>
            )}
          </article>
        ))}

        {(newsPress?.entries ?? []).length === 0 && (
          <p className="text-sm text-gray-500">
            No news entries published yet.
          </p>
        )}
      </div>
    </div>
  );
}
