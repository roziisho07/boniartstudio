import { createClient } from "next-sanity";

import { apiVersion, dataset, projectId, readToken } from "../env";

const isDev = process.env.NODE_ENV !== "production";

export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  token: readToken,
  // Prefer fresh API reads; Next.js Data Cache + webhook revalidation handles caching.
  useCdn: false,
  perspective: readToken && isDev ? "drafts" : "published",
});
