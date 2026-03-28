import { revalidatePath, revalidateTag } from "next/cache";
import { type NextRequest, NextResponse } from "next/server";
import { parseBody } from "next-sanity/webhook";
import { SANITY_TAGS } from "@/app/lib/api";

type WebhookPayload = {
  _id?: string;
  _type?: string;
};

const typeToTags: Record<string, string[]> = {
  painting: [SANITY_TAGS.paintings, SANITY_TAGS.years],
  about: [SANITY_TAGS.about],
  newsPress: [SANITY_TAGS.newsPress],
  contact: [SANITY_TAGS.contact],
  inSituMedia: [SANITY_TAGS.inSituMedia],
};

const typeToPaths: Record<string, string[]> = {
  painting: ["/", "/year/[year]"],
  about: ["/about"],
  newsPress: ["/news-press"],
  contact: ["/contact"],
  inSituMedia: ["/in-situ-media"],
};

export async function POST(request: NextRequest) {
  const secret = process.env.SANITY_REVALIDATE_SECRET;
  if (!secret) {
    return NextResponse.json(
      { message: "Missing SANITY_REVALIDATE_SECRET environment variable" },
      { status: 500 },
    );
  }

  const { isValidSignature, body } = await parseBody<WebhookPayload>(
    request,
    secret,
  );

  if (!isValidSignature) {
    return NextResponse.json({ message: "Invalid signature" }, { status: 401 });
  }

  const tags = new Set<string>([SANITY_TAGS.all]);

  const type = body?._type;
  if (type && typeToTags[type]) {
    for (const tag of typeToTags[type]) {
      tags.add(tag);
    }
  }

  for (const tag of tags) {
    revalidateTag(tag, "max");
  }

  // Fallback path revalidation helps singleton/static routes refresh deterministically.
  if (type && typeToPaths[type]) {
    for (const path of typeToPaths[type]) {
      if (path.includes("[")) {
        revalidatePath(path, "page");
      } else {
        revalidatePath(path);
      }
    }
  }

  // Layout includes sidebar years and should stay in sync after content updates.
  revalidatePath("/", "layout");

  return NextResponse.json({
    revalidated: true,
    tags: [...tags],
    paths: type && typeToPaths[type] ? typeToPaths[type] : [],
    id: body?._id ?? null,
    type: type ?? null,
  });
}
