import { revalidateTag } from "next/cache";
import { type NextRequest, NextResponse } from "next/server";
import { parseBody } from "next-sanity/webhook";
import { SANITY_TAGS } from "@/app/lib/api";

type WebhookPayload = {
  _type?: string;
};

const typeToTags: Record<string, string[]> = {
  painting: [SANITY_TAGS.paintings, SANITY_TAGS.years],
  about: [SANITY_TAGS.about],
  newsPress: [SANITY_TAGS.newsPress],
  contact: [SANITY_TAGS.contact],
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

  return NextResponse.json({
    revalidated: true,
    tags: [...tags],
    type: type ?? null,
  });
}
