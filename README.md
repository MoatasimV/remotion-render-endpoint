README.md (setup quick‑start)

### 1 · Fork & clone


$ gh repo fork /remotion-render-endpoint --clone


### 2 · Upstash Redis

1. Sign up → **Create database → Global → Free**.
2. Copy **REST URL** + **REST TOKEN**.
3. Add them to **GitHub repo secrets** *and* Vercel env.

### 3 · Vercel project

```sh
vercel init
vercel env add UPSTASH_REDIS_REST_URL
vercel env add UPSTASH_REDIS_REST_TOKEN
vercel env add GH_PAT   # classic PAT with repo scope

4 · Test locally

npm install && npm run render -- '{"payload":{},"fps":30,"width":1920,"height":1080,"out":"test.mp4"}'

5 · Deploy

vercel --prod

6 · Front‑end usage

Your existing useDownloadState.startExport() works unchanged:

const res = await fetch("/api/render", { method: "POST", body: JSON.stringify({ design: payload, options: { fps:30, size: payload.size, format:"mp4" } }), headers:{"Content-Type":"application/json"}});

Notes & tips

Progress: The sample sets progress = 0 → 100 only. You can pipe ffmpeg logs or Remotion hooks to Redis for finer progress.

Artifact link lives for 90 days. For permanent storage push to R2/S3/IPFS in an extra step.

Runner minutes: 2 000 min/month public → ≈ 4 000×30 s renders.