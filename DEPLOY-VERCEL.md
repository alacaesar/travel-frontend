# Publish the Next.js app on Vercel

Strapi stays on your VPS (or wherever your API is). Vercel only hosts the Next frontend.

## Option A — Vercel dashboard (recommended first time)

1. Push the **frontend** repo to GitHub (if it is not already).

2. In [vercel.com/new](https://vercel.com/new), **Import** that repository.

3. **Configure the project**
   - **Framework Preset:** Next.js (auto-detected).
   - **Root Directory:** leave default if the repo is only `frontend`; if this app lives inside a monorepo, set **Root Directory** to `frontend` and turn **Include files outside the root directory** on only if Vercel asks (usually off is fine when the repo root is `frontend`).

4. **Environment variables** — add before clicking **Deploy** (or under **Settings → Environment Variables**):

   | Name | Environment | Value |
   |------|-------------|--------|
   | `NEXT_PUBLIC_STRAPI_API_URL` | Production, Preview, Development | Your public Strapi base URL, e.g. `https://api.yourdomain.com` — **no** trailing slash, **no** `/api` suffix. |
   | `REVALIDATION_TOKEN` | Production (optional) | Long random string if you will call `/api/revalidate` from Strapi webhooks. |

5. Click **Deploy**. When it finishes, open the **.vercel.app** URL.

6. **Strapi CORS** — On the server, set `STRAPI_ALLOWED_ORIGINS` to include at least:
   - `https://<your-project>.vercel.app`
   - Any **Preview** URLs you care about (each preview has its own subdomain), or use your custom domain once connected.

7. **Custom domain (optional)** — Project **Settings → Domains** → add `www.yoursite.com` and follow DNS instructions.

---

## Option B — Vercel CLI (from your machine)

```bash
cd frontend
npm install
npx vercel login
npx vercel              # first time: link/create project, preview deploy
npx vercel env add NEXT_PUBLIC_STRAPI_API_URL   # paste your Strapi HTTPS URL
npx vercel --prod       # production deploy
```

Use the same env var names as in the table above. Add `.vercel` to `.gitignore` if you do not want the link stored in git (optional).

---

## Checklist after deploy

- [ ] Home page loads without “Error loading data” (Strapi must be up and URL correct).
- [ ] Browser **Network** tab: requests to your API return **200**, not **CORS** errors.
- [ ] If images break later when using `next/image`, `next.config.mjs` already adds `remotePatterns` for `NEXT_PUBLIC_STRAPI_API_URL` + `/uploads/**`.

---

## SSH deploy (legacy)

`.github/workflows/deploy.yaml` only runs on **workflow_dispatch**. Vercel is the main host; use Actions only if you still need the old SSH server.
