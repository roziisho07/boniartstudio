# Boni Art Site

Next.js + Sanity portfolio site.

## Local development

```bash
npm install
npm run dev
```

## Environment variables

Set these in `.env.local` and in your production deployment environment:

```bash
NEXT_PUBLIC_SANITY_PROJECT_ID="your-project-id"
NEXT_PUBLIC_SANITY_DATASET="production"
SANITY_API_READ_TOKEN=""
SANITY_REVALIDATE_SECRET="a-long-random-secret"
```

## Sanity revalidation webhook

This project uses tag-based cache invalidation via `app/api/revalidate/route.ts`.

1. In Sanity, create a webhook.
2. Set URL to `https://your-domain.com/api/revalidate`.
3. Set HTTP method to `POST`.
4. Set secret to the same value as `SANITY_REVALIDATE_SECRET`.
5. Trigger on create/update/delete for document types: `painting`, `about`, `newsPress`, `contact`.
6. (Optional) Payload can be minimal. `_type` is enough.

After webhook delivery, Next cache tags are revalidated and production pages update without waiting for time-based revalidation.

## Build checks

```bash
npm run lint
npm run build
```
