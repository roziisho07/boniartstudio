import type { Metadata } from "next";
import PaintingGrid from "@/app/components/PaintingGrid";
import { getPaintingsByYear } from "@/app/lib/api";
import { notFound } from "next/navigation";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ year: string }>;
}): Promise<Metadata> {
  const { year } = await params;

  return {
    title: `Works ${year}`,
    description: `Paintings and works by Shahid Hassan Boni from ${year}.`,
    alternates: {
      canonical: `/year/${year}`,
    },
  };
}

export default async function YearPage({
  params,
}: {
  params: Promise<{ year: string }>;
}) {
  const { year: yearParam } = await params;
  const year = Number(yearParam);

  if (!Number.isInteger(year)) {
    notFound();
  }

  const paintings = await getPaintingsByYear(year);
  if (paintings.length === 0) {
    notFound();
  }

  return (
    <div>
      <div className="sticky top-0 bg-white/80 backdrop-blur-sm border-b border-gray-100 px-8 py-4 z-10">
        <h1 className="text-3xl font-light">Works {year}</h1>
      </div>
      <PaintingGrid paintings={paintings} />
    </div>
  );
}
